import io from 'socket.io-client';
import { DataBlocks } from '../helpers/Data';
import { playTurn, flipShape, rotateShape } from '../helpers/Logic';
import Block from '../components/Block';
import Board from '../components/Board';
import Buttons from '../components/Buttons';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game',
        });
    }

    preload() {
        this.load.image('grid', 'assets/src/img/grid.png');

        for (var i = 0; i < DataBlocks.length; i++) {
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

        this.buttons = new Buttons(this);
        this.startButton = this.buttons.renderStart();

        this.socket.on('connect', function() {
            console.log('Connected!');
        });

        this.socket.on('joinGame', function(payload) {
            console.log('Joined!');

            self.state = payload;
            self.buttons.joinGame(payload);
        });

        this.socket.on('startGame', function(payload) {
            console.log('Start game!');

            let id = payload.players.findIndex((x) => x.id === self.socket.id);

            if (id > -1) {
                self.player = payload.players[id];
                self.playerIndex = id;
            }

            self.state = payload;
            self.buttons.startGame(payload);
        });

        this.socket.on('updateGameState', function(payload) {
            self.state = payload.state;

            let scoreString = '';

            for (let i = 0; i < payload.state.players.length; i++) {
                scoreString = scoreString + `${i}: ${payload.state.players[i].score}, `;
            }

            self.scoreText.setText(scoreString);

            if (payload.playerIndex !== self.playerIndex) {
                let block = new Block(self);

                block.renderOpponent(
                    payload.gameObject,
                    payload.values.index,
                    payload.values.shape,
                    payload.playerIndex
                );
            }
        });

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            let shape = gameObject.data.values.shape;
            let width = shape[0].length;
            let height = shape.length;

            if (width % 2 == 0) {
                gameObject.x = Phaser.Math.Snap.To(dragX, 32);
            } else {
                gameObject.x = Phaser.Math.Snap.To(dragX, 32, 16);
            }

            if (height % 2 == 0) {
                gameObject.y = Phaser.Math.Snap.To(dragY, 32);
            } else {
                gameObject.y = Phaser.Math.Snap.To(dragY, 32, 16);
            }
        });

        this.input.on('dragstart', function(pointer, gameObject) {
            self.children.bringToTop(gameObject);
            self.currentBlock = gameObject;
        });

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            self.currentBlock = null;
            let values = null;

            if (gameObject.data.values != undefined) {
                values = gameObject.data.values;
            }

            try {
                self.state = playTurn(self.state, self.playerIndex, gameObject);

                const payload = {
                    roomIndex: 0,
                    playerIndex: self.playerIndex,
                    state: self.state,
                    gameObject: gameObject,
                    values: values,
                };

                self.socket.emit('updateGameState', payload);
                gameObject.disableInteractive();
            } catch (e) {
                console.log(e);
            }
        });
    }

    update() {
        let w = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        let a = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let s = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        let d = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let up = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        let left = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        let down = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        let right = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        if (this.currentBlock) {
            if (Phaser.Input.Keyboard.JustDown(a) || Phaser.Input.Keyboard.JustDown(left)) {
                let angle = -90;
                this.currentBlock.angle += angle;

                console.log(this.currentBlock.data.values.shape);

                let newShape = rotateShape(this.currentBlock, angle);
                this.currentBlock.setData({ shape: newShape });

                console.log(this.currentBlock.data.values.shape);
            }

            if (Phaser.Input.Keyboard.JustDown(d) || Phaser.Input.Keyboard.JustDown(right)) {
                let angle = 90;
                this.currentBlock.angle += angle;

                console.log(this.currentBlock.data.values.shape);

                let newShape = rotateShape(this.currentBlock, angle);
                this.currentBlock.setData({ shape: newShape });

                console.log(this.currentBlock.data.values.shape);
            }

            if (
                Phaser.Input.Keyboard.JustDown(s) ||
                Phaser.Input.Keyboard.JustDown(down) ||
                Phaser.Input.Keyboard.JustDown(w) ||
                Phaser.Input.Keyboard.JustDown(up)
            ) {
                if (this.currentBlock.scaleY == 1) {
                    this.currentBlock.scaleY = -1;
                    this.currentBlock.scaleX = -1;
                } else {
                    this.currentBlock.scaleY = 1;
                    this.currentBlock.scaleX = 1;
                }

                console.log(this.currentBlock.data.values.shape);

                let newShape = flipShape(this.currentBlock);
                this.currentBlock.setData({ shape: newShape });

                console.log(this.currentBlock.data.values.shape);
            }
        }
    }
}
