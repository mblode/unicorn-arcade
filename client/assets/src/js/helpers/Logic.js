import { DataBoard, DataMap, DataBlocks } from '../helpers/Data';

const BOARD_WIDTH = 640;
const BOARD_HEIGHT = 640;
const BOARD_TOP = 96;
const BOARD_LEFT = 96;
const GRID_SIZE = 32;

function arraySum(i) {
    var sum = 0; // missing var added
    for (var a = 0; a < i.length; a++) {
        // missing var added
        if (typeof i[a] == 'number') {
            sum += i[a];
        } else if (i[a] instanceof Array) {
            sum += arraySum(i[a]);
        }
    }
    return sum;
}

function testSurrounding() {
    let currentHit = hit;
    let boardX;
    let boardY;

    for (boardY = block.y; boardY < state.board.length && boardY < block.y + block.height; boardY++) {
        for (boardX = block.x; boardX < state.board[boardY].length && boardX < block.x + block.width; boardX++) {
            if (state.board[boardY + diffX][boardX + diffY]) {
                currentHit = true;
            }
        }
    }
    return hit;
}

function testBoard(state, hit, team, block) {
    let currentHit = hit;
    let boardX;
    let boardY;
    let positionX = 0;
    let positionY = 0;

    for (boardY = block.y; boardY < state.board.length && boardY < block.y + block.height; boardY++) {
        positionX = 0;

        for (boardX = block.x; boardX < state.board[boardY].length && boardX < block.x + block.width; boardX++) {
            let shapeXY = block.shape[positionY][positionX];
            let boardXY = state.board[boardY][boardX];

            if (shapeXY == 1 && boardXY > 0) {
                currentHit = true;
            } else {
                for (shapeXY) {
                    if (shapeXY == 1 && boardXY > 0) {
                        currentHit = true;
                    }
                }
            }

            positionX++;
        }

        positionY++;
    }

    return currentHit;
}

function updateBoard(state, team, block) {
    let currentState = state;
    let boardX;
    let boardY;
    let positionX = 0;
    let positionY = 0;
    let hit = false;

    for (boardY = block.y; boardY < currentState.board.length && boardY < block.y + block.height; boardY++) {
        positionX = 0;

        for (boardX = block.x; boardX < currentState.board[boardY].length && boardX < block.x + block.width; boardX++) {
            let shapeXY = block.shape[positionY][positionX];
            let boardXY = currentState.board[boardY][boardX];

            if (shapeXY == 1 && boardXY == 0) {
                currentState.board[boardY][boardX] = team;
            }

            positionX++;
        }

        positionY++;
    }

    return currentState;
}

function renderBoard(state) {
    let boardX;
    let boardY;
    let row = '';

    for (boardY = 0; boardY < state.board.length; boardY++) {
        row = '';
        for (boardX = 0; boardX < state.board[boardY].length; boardX++) {
            row += `${state.board[boardY][boardX]} `;
        }

        console.log(row);
    }
}

export default function Logic(state, team, index, x, y) {
    let currentState = state;
    let hit = false;
    let shape = DataBlocks[index];
    let block = {
        shape: shape,
        x: Math.round((x - BOARD_WIDTH - BOARD_LEFT) / GRID_SIZE),
        y: Math.round((y - BOARD_HEIGHT - BOARD_TOP) / GRID_SIZE),
        width: shape[0].length,
        height: shape.length,
        points: arraySum(shape)
    };

    if (block.x + block.width > currentState.board.length || block.y + block.height > currentState.board[0].length) {
        hit = true;
    } else {
        hit = testBoard(currentState, hit, team, block);
    }

    if (!hit) {
        currentState.score[team - 1] += block.points;

        console.log('Success');

        currentState = updateBoard(currentState, team, block);
    } else {
        console.log('Failure');
    }

    renderBoard(currentState);

    return currentState;
}
