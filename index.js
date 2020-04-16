const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    io = require('socket.io')(server),
    path = require('path'),
    Game = require('./server/classes/Game');

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var rooms = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/index.html'));
});

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('joinGame', function (data) {
        var game;

        if (rooms.length === 0 || !rooms[rooms.length - 1].isWaiting()) {
            game = new Game();
            rooms.push(game);
        } else {
            game = rooms[rooms.length - 1];
        }

        game.addPlayer(socket);

        console.log(game.getNumPlayers());

        // if (game.getNumPlayers() >= 2) {
        io.emit('startGame', game.state);
        // }
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

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(errorhandler());

    app.use(function (err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

// finally, let's start our server...
server.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port + '. Open http://localhost:' + server.address().port);
});
