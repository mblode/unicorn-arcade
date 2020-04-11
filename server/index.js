var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

let players = [];
let board = [];

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    }

    socket.on('startGame', function () {
        io.emit('startGame');
    });

    socket.on('blockPlayed', function (gameObject, isPlayerA, values) {
        io.emit('blockPlayed', gameObject, isPlayerA, values);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter((player) => player !== socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerTurn', function (gameObject) {
        socket.broadcast.emit('playerMoved', gameObject, state.players[socket.id]);
    });

    socket.on('error', function () {
        socket.socket.reconnect();
    });
});

server.listen(3000, function () {
    console.log(`Listening on ${server.address().port}`);
});
