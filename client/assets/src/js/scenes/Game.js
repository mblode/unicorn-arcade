import io from 'socket.io-client';
import { DataBlocks, DataBoard, DataMap } from '../helpers/Data';
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

        this.isPlayerA = false;
        this.boardState = DataBoard;

        this.board = new Board(this);
        this.renderBoard = this.board.renderBoard();

        this.start = new Start(this);
        this.renderStart = this.start.renderStart();

        this.socket.on('connect', function() {
            console.log('Connected!');
        });

        this.socket.on('isPlayerA', function() {
            console.log('isPlayerA');
            self.isPlayerA = true;
        });

        this.socket.on('startGame', function() {
            console.log('startGame!');
            self.start.startGame();
            self.renderStart.disableInteractive();
        });

        this.socket.on('blockPlayed', function(gameObject, isPlayerA, values) {
            console.log('blockPlayed');

            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.textureKey;
                let block = new Block(self);
                block.renderOpponent(gameObject.x, gameObject.y, values.index, sprite).disableInteractive();
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

            gameObject.setData({ played: true });

            gameObject.disableInteractive();
            self.socket.emit('blockPlayed', gameObject, self.isPlayerA, values);
        });

        //     gameObject.x = Phaser.Math.Snap.To(gameObject.input.dragStartX);
        //     gameObject.y = Phaser.Math.Snap.To(gameObject.input.dragStartY);
        //     // dropZone.data.values.cards++;
        //     // gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 50;
    }

    update() {}
}
