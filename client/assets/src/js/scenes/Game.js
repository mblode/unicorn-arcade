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

        this.state = {};

        this.board = new Board(this);
        this.renderBoard = this.board.renderBoard();

        this.start = new Start(this);
        this.startButton = this.start.renderStart();

        this.scoreText = this.add.text(16, 16, '', { fontSize: '18px', fill: '#0000FF' });

        this.socket.on('connect', function() {
            console.log('Connected!');
        });

        this.socket.on('currentPlayers', function(players) {
            let id = players.findIndex(x => x.id === self.socket.id);

            if (id > -1) {
                self.player = players[id];
                self.playerIndex = id;

                console.log(players[id]);
                console.log(id);
            }
        });

        this.socket.on('startGame', function(state) {
            console.log('startGame!');

            self.state = state;
            self.start.startGame(state);
        });

        this.socket.on('updateGameState', function(state, playerIndex, gameObject, values) {
            console.log('updateGameState');
            self.state = state;

            let scoreString = '';

            for (let i = 0; i < state.players.length; i++) {
                scoreString = scoreString + `${i}: ${state.players[i].score}, `;
            }

            self.scoreText.setText(scoreString);

            if (playerIndex !== self.playerIndex) {
                let sprite = gameObject.textureKey;
                let block = new Block(self);
                block
                    .renderOpponent(gameObject.x, gameObject.y, values.index, playerIndex, sprite)
                    .disableInteractive();
            }
        });

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = Phaser.Math.Snap.To(dragX, 32);
            gameObject.y = Phaser.Math.Snap.To(dragY, 32);
        });

        this.input.on('dragstart', function(pointer, gameObject) {
            self.children.bringToTop(gameObject);
        });

        this.input.on('dragend', function(pointer, gameObject, dropped) {
            let values = null;

            if (gameObject.data.values != undefined) {
                values = gameObject.data.values;
            }

            try {
                self.state = playTurn(self.state, self.playerIndex, values.index, gameObject.x, gameObject.y);
                self.socket.emit('updateGameState', self.state, self.playerIndex, gameObject, values);
                gameObject.disableInteractive();
            } catch (e) {
                console.log(e);
            }
        });
    }

    update() {}
}
