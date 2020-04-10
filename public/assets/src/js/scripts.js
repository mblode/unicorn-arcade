var socket = io.connect('http://localhost:3000');

var config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 },
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 832,
        height: 832,
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('grid', 'assets/src/img/grid.png');
    this.load.image('ship', 'assets/src/img/spaceShips_001.png');
    this.load.image('otherPlayer', 'assets/src/img/enemyBlack5.png');
    this.load.image('star', 'assets/src/img/star_gold.png');
}

function create() {
    var self = this;

    this.add.sprite(416, 416, 'grid');

    this.otherPlayers = this.add.group();

    socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === socket.id) {
                addPlayer(self, players[id]);
            } else {
                addOtherPlayers(self, players[id]);
            }
        });
    });

    socket.on('newPlayer', function (playerInfo) {
        addOtherPlayers(self, playerInfo);
    });

    socket.on('disconnect', function (playerId) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerId === otherPlayer.playerId) {
                otherPlayer.destroy();
            }
        });
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    socket.on('playerMoved', function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.setRotation(playerInfo.rotation);
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            }
        });
    });

    this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
    this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FF0000' });

    socket.on('scoreUpdate', function (scores) {
        self.blueScoreText.setText('Blue: ' + scores.blue);
        self.redScoreText.setText('Red: ' + scores.red);
    });

    socket.on('starLocation', function (starLocation) {
        if (self.star) self.star.destroy();
        self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
        self.physics.add.overlap(
            self.ship,
            self.star,
            function () {
                socket.emit('starCollected');
            },
            null,
            self
        );
    });
}

function update() {
    if (this.ship) {
        if (this.cursors.left.isDown) {
            // this.ship.setAngularVelocity(-150);
        } else if (this.cursors.right.isDown) {
            // this.ship.setAngularVelocity(150);
        } else {
            // this.ship.setAngularVelocity(0);
        }

        // if (this.cursors.up.isDown) {
        //     this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
        // } else {
        //     this.ship.setAcceleration(0);
        // }

        this.physics.world.wrap(this.ship, 5);

        // emit player movement
        var x = this.ship.x;
        var y = this.ship.y;
        var r = this.ship.rotation;

        if (
            this.ship.oldPosition &&
            (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)
        ) {
            socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
        }

        // save old position data
        this.ship.oldPosition = {
            x: this.ship.x,
            y: this.ship.y,
            rotation: this.ship.rotation,
        };
    }
}

function addPlayer(self, playerInfo) {
    self.ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship').setOrigin(0, 0).setDisplaySize(64, 64);

    self.ship.setInteractive();
    self.input.setDraggable(self.ship);

    if (playerInfo.team === 'blue') {
        self.ship.setTint(0x0000ff);
    } else {
        self.ship.setTint(0xff0000);
    }

    self.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, 32);
        gameObject.y = Phaser.Math.Snap.To(dragY, 32);
    });
}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.physics.add
        .sprite(playerInfo.x, playerInfo.y, 'otherPlayer')
        .setOrigin(0, 0)
        .setDisplaySize(64, 64);

    if (playerInfo.team === 'blue') {
        otherPlayer.setTint(0x0000ff);
    } else {
        otherPlayer.setTint(0xff0000);
    }
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
}
