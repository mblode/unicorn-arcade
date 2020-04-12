import io from 'socket.io-client';
import { DataBlocks } from '../helpers/Data';
import { playTurn } from '../helpers/Logic';
import Block from '../components/Block';
import Board from '../components/Board';
import Start from '../components/Start';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('grid', 'assets/src/img/grid.png');

        for (var i = 1; i <= DataBlocks.length; i++) {
            this.load.image(`block-${i}`, `assets/src/img/blocks/${i}.png`);
        }
    }

    create() {
        let self = this;

        this.socket = io('http://localhost:3000');
        this.cursors = this.input.keyboard;
        this.currentBlock = null;

        this.state = {};

        this.board = new Board(this);
        this.renderBoard = this.board.renderBoard();

        this.start = new Start(this);
        this.startButton = this.start.renderStart();

        this.scoreText = this.add.text(16, 16, '', { fontSize: '18px', fill: '#0000FF' });

        this.socket.on('connect', function() {
            console.log('Connected!');
        });

        // this.socket.on('join', function(payload) {
        //     console.log('join');
        // });

        this.socket.on('startGame', function(payload) {
            let id = payload.players.findIndex(x => x.id === self.socket.id);

            if (id > -1) {
                self.player = payload.players[id];
                self.playerIndex = id;
            }

            self.state = payload;
            self.start.startGame(payload);
        });

        this.socket.on('updateGameState', function(payload) {
            self.state = payload.state;

            let scoreString = '';

            for (let i = 0; i < payload.state.players.length; i++) {
                scoreString = scoreString + `${i}: ${payload.state.players[i].score}, `;
            }

            self.scoreText.setText(scoreString);

            // if (playerIndex !== self.playerIndex) {
            let sprite = payload.gameObject.textureKey;
            let block = new Block(self);
            block
                .renderOpponent(
                    payload.gameObject.x,
                    payload.gameObject.y,
                    payload.gameObject.rotation,
                    payload.values.index,
                    self.playerIndex,
                    sprite
                )
                .disableInteractive();
            // }
        });

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = Phaser.Math.Snap.To(dragX, 32);
            gameObject.y = Phaser.Math.Snap.To(dragY, 32);
        });

        this.input.on('dragstart', function(pointer, gameObject) {
            self.children.bringToTop(gameObject);
            this.currentBlock = gameObject;
        });

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            this.currentBlock = null;
            let values = null;

            if (gameObject.data.values != undefined) {
                values = gameObject.data.values;
            }

            try {
                self.state = playTurn(self.state, self.playerIndex, values.index, gameObject);

                const payload = {
                    roomIndex: 0,
                    state: self.state,
                    gameObject: gameObject,
                    values: values
                };

                self.socket.emit('updateGameState', payload);
                gameObject.disableInteractive();
            } catch (e) {
                console.log(e);
            }
        });
    }

    update() {
        let a = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let d = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let left = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let right = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        if (this.currentBlock) {
            console.log(this.currentBlock);

            if (Phaser.Input.Keyboard.JustDown(a) || Phaser.Input.Keyboard.JustDown(left)) {
                console.log('Left');
                this.currentBlock.angle -= 90;
            }

            if (Phaser.Input.Keyboard.JustDown(d) || Phaser.Input.Keyboard.JustDown(right)) {
                console.log('Right');
                this.currentBlock.angle += 90;
            }
        }
    }
}
