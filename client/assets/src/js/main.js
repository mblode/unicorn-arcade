import Phaser from 'phaser';
import Game from './scenes/Game';
import Logic from './helpers/Logic';
import { DataBoard } from './helpers/Data';

// var config = {
//     type: Phaser.AUTO,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: true,
//             gravity: { y: 0 }
//         }
//     },
//     scale: {
//         mode: Phaser.Scale.FIT,
//         parent: 'phaser-example',
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//         width: 832,
//         height: 832
//     },
//     scene: [Game]
// };

// const game = new Phaser.Game(config);

let state = {
    board: DataBoard,
    score: [0, 0, 0, 0]
};

state = Logic(state, 1, 5, 896, 896);
state = Logic(state, 2, 9, 992, 992);
