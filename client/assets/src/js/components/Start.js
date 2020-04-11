import Block from './Block';
import { DataBlocks } from '../helpers/Data';

export default class Start {
    constructor(scene) {
        this.renderStart = () => {
            let start = scene.add
                .text(75, 350, ['Start Game'])
                .setFontSize(18)
                .setColor('#00ffff')
                .setInteractive();

            start.on('pointerdown', function() {
                console.log('startGame!');
                scene.socket.emit('startGame');
            });

            start.on('pointerover', function() {
                start.setColor('#ff69b4');
            });

            start.on('pointerout', function() {
                start.setColor('#00ffff');
            });

            return start;
        };

        this.startGame = () => {
            for (let i = 0; i < DataBlocks.length; i++) {
                let playerBlock = new Block(scene);
                playerBlock.renderPlayer(i, scene.isPlayerA);
            }
        };
    }
}
