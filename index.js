var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var state = {
    players: {},
    star: {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
    },
    scores: {
        blue: 0,
        red: 0,
    },
};

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    // create a new player and add it to our players object
    state.players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: Math.floor(Math.random() * 2) == 0 ? 'red' : 'blue',
    };

    // send the players object to the new player
    socket.emit('currentPlayers', state.players);

    // send the star object to the new player
    socket.emit('starLocation', state.star);

    // send the current scores
    socket.emit('scoreUpdate', state.scores);

    // update all other players of the new player
    socket.broadcast.emit('newPlayer', state.players[socket.id]);

    socket.on('disconnect', function () {
        console.log('user disconnected');

        // remove this player from our players object
        delete state.players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        state.players[socket.id].x = movementData.x;
        state.players[socket.id].y = movementData.y;
        state.players[socket.id].rotation = movementData.rotation;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', state.players[socket.id]);
    });

    socket.on('starCollected', function () {
        if (state.players[socket.id].team === 'red') {
            state.scores.red += 10;
        } else {
            state.scores.blue += 10;
        }

        state.star.x = Math.floor(Math.random() * 700) + 50;
        state.star.y = Math.floor(Math.random() * 500) + 50;
        io.emit('starLocation', state.star);
        io.emit('scoreUpdate', state.scores);
    });
});

server.listen(3000, function () {
    console.log(`Listening on ${server.address().port}`);
});
