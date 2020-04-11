var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

let state = {
    board: [],
    players: [],
    turn: 0,
};

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    state.players.push({
        id: socket.id,
        score: 0,
        turn: 0,
    });

    console.log(state.players);

    // send the players object to the new player
    socket.emit('currentPlayers', state.players);

    socket.broadcast.emit('newPlayer', state.players);

    socket.on('startGame', function (board) {
        state.board = board;
        io.emit('startGame', state);
    });

    socket.on('updateGameState', function (newState, playerIndex, gameObject, values) {
        state = newState;
        io.emit('updateGameState', state, playerIndex, gameObject, values);
    });

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.id);

        state.players = state.players.filter((x) => {
            return x.id != socket.id;
        });

        console.log(state.players);

        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    socket.on('error', function () {
        socket.socket.reconnect();
    });
});

server.listen(3000, function () {
    console.log(`Listening on ${server.address().port}`);
});
