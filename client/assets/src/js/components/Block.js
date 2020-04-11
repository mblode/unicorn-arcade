import { DataBlocks } from '../helpers/Data';

export default class Block {
    constructor(scene) {
        this.renderPlayer = (index, isPlayerA) => {
            let block = scene.physics.add
                .sprite(0, 400, `block-${index}`)
                .setOrigin(0, 0)
                .setInteractive();

            scene.input.setDraggable(block);

            block.setData({ shape: DataBlocks[index], played: false, index: index });

            if (isPlayerA) {
                block.setTint(0x0000ff);
            } else {
                block.setTint(0xff0000);
            }

            return block;
        };

        this.renderOpponent = (x, y, index, sprite) => {
            console.log('renderOpponent');
            let block = scene.physics.add.sprite(x, y, sprite).setOrigin(0, 0);

            block.setData({ shape: DataBlocks[index], played: false, index: index });
            block.setTint(0xff0000);

            return block;
        };
    }
}
