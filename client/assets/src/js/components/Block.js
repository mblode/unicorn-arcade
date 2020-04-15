import { DataBlocks } from '../helpers/Data';
import { getOrigin } from '../helpers/Logic';

export default class Block {
    constructor(scene) {
        this.renderPlayer = (blockIndex, playerIndex) => {
            let leftMargin = 1;
            for (let i = 0; i < blockIndex; i++) {
                leftMargin += DataBlocks[i][0].length + 1;
            }

            let block = scene.physics.add
                .sprite(leftMargin * 32, 736, `block-${blockIndex}`)
                .setInteractive()
                .setOrigin(0.5, 0.5);

            scene.input.setDraggable(block);

            block.setData({ shape: DataBlocks[blockIndex], played: false, index: blockIndex });

            if (playerIndex == 0) {
                block.setTint(0xf6d240);
            } else if (playerIndex == 1) {
                block.setTint(0xafd55b);
            } else if (playerIndex == 2) {
                block.setTint(0xd82c0a);
            } else {
                block.setTint(0x2465c8);
            }

            return block;
        };

        this.renderOpponent = (gameObject, blockIndex, shape, playerIndex) => {
            console.log(gameObject);
            let block = scene.physics.add.sprite(gameObject.x, gameObject.y, gameObject.textureKey).setOrigin(0.5, 0.5);
            block.rotation = gameObject.rotation;

            block.setData({ shape: shape, played: false, index: blockIndex });

            if (playerIndex == 0) {
                block.setTint(0xf6d240);
            } else if (playerIndex == 1) {
                block.setTint(0xafd55b);
            } else if (playerIndex == 2) {
                block.setTint(0xd82c0a);
            } else {
                block.setTint(0x2465c8);
            }

            return block;
        };
    }
}
