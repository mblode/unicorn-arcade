import Zone from '../helpers/Zone';
import Block from '../helpers/Block';



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
    this.load.image('player', 'assets/src/img/spaceShips_001.png');
    this.load.image('otherPlayer', 'assets/src/img/enemyBlack5.png');
    this.load.image('star', 'assets/src/img/star_gold.png');

    for (var i = 1; i <= 21; i++) {
        this.load.image(`block-${i}`, `assets/src/img/blocks/${i}.png`);
    }
}

function create() {
    var self = this;

    this.add.sprite(416, 416, 'grid');

    this.otherPlayers = this.add.group();
    this.otherPlayersBlocks = this.add.group();

    this.zone = new Zone(this);
    this.dropZone = this.zone.renderZone();
    this.outline = this.zone.renderOutline(this.dropZone);

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
            self.player,
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
    if (this.block) {
        if (this.block.oldPosition && (x !== this.block.oldPosition.x || y !== this.block.oldPosition.y)) {
            socket.emit('playerMovement', { x: this.block.x, y: this.block.y });
        }

        // save old position data
        this.block.oldPosition = {
            x: this.block.x,
            y: this.block.y,
        };
    }
}

function addPlayer(self, playerInfo) {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player').setOrigin(0, 0).setDisplaySize(64, 64);

    self.player.setInteractive();
    self.input.setDraggable(self.player);

    if (playerInfo.team === 'blue') {
        self.player.setTint(0x0000ff);
    } else {
        self.player.setTint(0xff0000);
    }

    self.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, 32);
        gameObject.y = Phaser.Math.Snap.To(dragY, 32);
    });

    for (var i = 1; i <= 21; i++) {
        addPlayerBlock(self, playerInfo, i);
    }
}

function addPlayerBlock(self, playerInfo, index) {
    self.block = self.physics.add.sprite(0, 400, `block-${index}`).setOrigin(0, 0);

    self.block.setInteractive();
    self.input.setDraggable(self.block);

    if (playerInfo.team === 'blue') {
        self.block.setTint(0x0000ff);
    } else {
        self.block.setTint(0xff0000);
    }

    self.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, 32);
        gameObject.y = Phaser.Math.Snap.To(dragY, 32);
    });

    this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.setTint(0xff69b4);
        self.children.bringToTop(gameObject);
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
        gameObject.setTint();
        if (!dropped) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        dropZone.data.values.cards++;
        gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 50;
        gameObject.y = dropZone.y;
        gameObject.disableInteractive();
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

function addOtherBlock(self, playerInfo, index) {
    const otherPlayerBlock = self.physics.add.sprite(0, 0, `block-${index}`).setOrigin(0, 0);

    if (playerInfo.team === 'blue') {
        self.block.setTint(0x0000ff);
    } else {
        self.block.setTint(0xff0000);
    }

    otherPlayerBlock.playerId = playerInfo.playerId;
    self.otherPlayerBlocks.add(otherPlayerBlock);
}
