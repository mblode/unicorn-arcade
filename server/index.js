var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var Game = require('./classes/Game');

var rooms = [];

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('join', function (data) {
        var game;

        if (rooms.length === 0 || !rooms[rooms.length - 1].isWaiting()) {
            game = new Game();
            rooms.push(game);
        } else {
            game = rooms[rooms.length - 1];
        }

        game.addPlayer(socket);

        console.log(game.getNumPlayers());

        if (game.getNumPlayers() >= 2) {
            io.emit('startGame', game.state);
        }
    });

    socket.on('updateGameState', function (payload) {
        var game = rooms[payload.roomIndex];

        game.state = payload.state;

        io.emit('updateGameState', payload);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.id);
    });

    socket.on('error', function (error) {
        console.log(socket.id + ' error ' + error);
        socket.socket.reconnect();
    });
});

app.get('/rooms', function (req, res) {
    var content = '';
    content += '<h1>Latest Rooms</h1>';
    content += '<ul>';

    for (var i = rooms.length - 1; i >= 0; i--) {
        content += '<li>Num. players: ' + rooms[i].getNumPlayers() + '; Status: ' + rooms[i].status + '</li>';
    }
    content += '</ul>';

    res.send(content);
});

app.get('/rooms/:id', function (req, res) {
    if (typeof rooms[req.params.id] != 'undefined') {
        var game = rooms[req.params.id];

        res.send('Num. players: ' + game.getNumPlayers() + '; Status: ' + game.status);
    } else {
        res.send("The game doesn't exists");
    }
});

server.listen(3000, function () {
    console.log(`Listening on ${server.address().port}`);
});
