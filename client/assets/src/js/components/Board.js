import { DataMap, DataBoard } from '../helpers/Data';

export default class Board {
    constructor(scene) {
        this.renderBoard = () => {
            scene.add.sprite(416, 416, 'grid');
            let dropZone = scene.add.zone(416, 416, 196, 196).setRectangleDropZone(196, 196);
            return dropZone;
        };
    }
}
