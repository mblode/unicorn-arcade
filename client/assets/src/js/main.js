import Phaser from 'phaser';
import Game from './scenes/Game';

var config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 832,
        height: 832
    },
    scene: [Game]
};

const game = new Phaser.Game(config);
