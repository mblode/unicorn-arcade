import Block from './Block';
import { DataBoard, DataBlocks } from '../helpers/Data';

export default class Start {
    constructor(scene) {
        this.renderStart = () => {
            let start = scene.add
                .text(400, 30, ['Start Game'])
                .setFontSize(18)
                .setColor('#333333')
                .setInteractive();

            start.on('pointerdown', function() {
                console.log('startGame!');
                scene.socket.emit('startGame', DataBoard);
            });

            start.on('pointerover', function() {
                start.setColor('#111111');
            });

            start.on('pointerout', function() {
                start.setColor('#222222');
            });

            return start;
        };

        this.startGame = state => {
            let scoreString = '';

            for (let i = 0; i < state.players.length; i++) {
                scoreString = scoreString += `${i}: ${state.players[i].score} `;
            }

            scene.scoreText.setText(scoreString);

            for (let i = 0; i < DataBlocks.length; i++) {
                let playerBlock = new Block(scene);
                playerBlock.renderPlayer(i, scene.playerIndex);
            }

            scene.startButton.disableInteractive();
            scene.startButton.visible = 0;
        };
    }
}
