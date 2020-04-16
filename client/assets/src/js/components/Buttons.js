import Block from './Block';
import { DataBlocks } from '../helpers/Data';

export default class Buttons {
    constructor(scene) {
        const style = { font: 'bold 18px Arial', fill: '#333333', align: 'center' };

        this.renderStart = () => {
            let self = this;

            // var buttons = scene.rexUI.add.buttons({
            //     // x: 0,
            //     // y: 0,
            //     // anchor: undefined,
            //     // width: undefined,
            //     // height: undefined,

            //     orientation: 0,

            //     // Elements
            //     background: backgroundGameObject,

            //     buttons: [
            //         buttonGameObject,
            //         buttonGameObject,
            //         // ...
            //     ],
            //     expand: false,
            //     align: undefined,
            //     click: {
            //         mode: 'pointerup',
            //         clickInterval: 100
            //     }

            //     space: 0,

            //     // name: '',
            //     // draggable: false,

            //     // type: undefined,
            //     // setValueCallback: undefined,
            //     // setValueCallbackScope: undefined
            // });

            let start = scene.add
                .text(400, 30, ['Join game'], style)
                .setOrigin(0.5)
                .setInteractive();

            start.on('pointerdown', function() {
                scene.socket.emit('joinGame');
                self.joinGame();
            });

            start.on('pointerover', function() {
                start.setColor('#111111');
            });

            start.on('pointerout', function() {
                start.setColor('#222222');
            });

            return start;
        };

        this.renderPass = () => {
            let pass = scene.add
                .text(200, 30, ['Pass turn'], style)
                .setOrigin(0.5)
                .setInteractive();

            pass.on('pointerdown', function() {
                scene.socket.emit('pass');
            });

            pass.on('pointerover', function() {
                pass.setColor('#111111');
            });

            pass.on('pointerout', function() {
                pass.setColor('#222222');
            });

            return pass;
        };

        this.renderSubmit = () => {
            let submit = scene.add
                .text(600, 30, ['Submit piece'], style)
                .setOrigin(0.5)
                .setInteractive();

            submit.on('pointerdown', function() {
                scene.socket.emit('submit');
            });

            submit.on('pointerover', function() {
                submit.setColor('#111111');
            });

            submit.on('pointerout', function() {
                submit.setColor('#222222');
            });

            return submit;
        };

        this.renderScore = (string) => {
            let submit = scene.add
                .text(600, 30, [string], style)
                .setOrigin(0.5)
                .setInteractive();

            return submit;
        };

        this.joinGame = () => {
            console.log('Join');

            scene.startButton.setText('Waiting for other players');
            scene.startButton.disableInteractive();
        };

        this.startGame = (state) => {
            // var panel = new ScrollablePanel(scene, config);
            // scene.add.existing(panel);

            let scoreString = '';

            for (let i = 0; i < state.players.length; i++) {
                scoreString = scoreString += `${i}: ${state.players[i].score} `;
            }

            this.renderScore(scoreString);

            for (let i = 0; i < DataBlocks.length; i++) {
                let playerBlock = new Block(scene);
                playerBlock.renderPlayer(i, scene.playerIndex);
            }

            scene.startButton.disableInteractive();
            scene.startButton.visible = 0;

            this.renderPass();
            this.renderSubmit();
        };
    }
}
