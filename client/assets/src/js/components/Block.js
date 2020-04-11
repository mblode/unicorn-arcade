import { DataBlocks } from '../helpers/Data';

export default class Block {
    constructor(scene) {
        this.renderPlayer = (blockIndex, playerIndex) => {
            let block = scene.physics.add
                .sprite(0, 400, `block-${blockIndex}`)
                .setOrigin(0, 0)
                .setInteractive();

            scene.input.setDraggable(block);

            block.setData({ shape: DataBlocks[blockIndex], played: false, index: blockIndex });

            console.log(playerIndex);

            if (playerIndex == 0) {
                block.setTint(0x0000ff);
            } else if (playerIndex == 1) {
                block.setTint(0xff0000);
            } else if (playerIndex == 2) {
                block.setTint(0x00ff00);
            } else {
                block.setTint(0xf00f0);
            }

            return block;
        };

        this.renderOpponent = (x, y, blockIndex, playerIndex, sprite) => {
            console.log('renderOpponent');
            let block = scene.physics.add.sprite(x, y, sprite).setOrigin(0, 0);

            block.setData({ shape: DataBlocks[blockIndex], played: false, index: blockIndex });

            if (playerIndex == 0) {
                block.setTint(0x0000ff);
            } else if (playerIndex == 1) {
                block.setTint(0xff0000);
            } else if (playerIndex == 2) {
                block.setTint(0x00ff00);
            } else {
                block.setTint(0xf00f0);
            }

            return block;
        };
    }
}
