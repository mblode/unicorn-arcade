import { DataBlocks } from '../helpers/Data';

const BOARD_WIDTH = 640;
const BOARD_HEIGHT = 640;
const BOARD_TOP = 96;
const BOARD_LEFT = 96;
const GRID_SIZE = 32;
const TURN_DEGREE = 90;

function arraySum(i) {
    var sum = 0;
    for (var a = 0; a < i.length; a++) {
        if (typeof i[a] == 'number') {
            sum += i[a];
        } else if (i[a] instanceof Array) {
            sum += arraySum(i[a]);
        }
    }
    return sum;
}

function testSides(state, playerIndex, boardX, boardY) {
    let hit = false;
    let team = playerIndex + 1;
    const topEdge = 0;
    const leftEdge = 0;
    const rightEdge = BOARD_WIDTH / GRID_SIZE;
    const bottomEdge = BOARD_HEIGHT / GRID_SIZE;

    if (boardY + 1 < bottomEdge) {
        if (state.board[boardY + 1][boardX] == team) {
            hit = true;
        }
    }

    if (boardY - 1 > topEdge) {
        if (state.board[boardY - 1][boardX] == team) {
            hit = true;
        }
    }

    if (boardX + 1 < rightEdge) {
        if (state.board[boardY][boardX + 1] == team) {
            hit = true;
        }
    }

    if (boardX - 1 > leftEdge) {
        if (state.board[boardY][boardX - 1] == team) {
            hit = true;
        }
    }

    return hit;
}

function testCorners(state, playerIndex, boardX, boardY) {
    let miss = false;
    let team = playerIndex + 1;
    const topEdge = 0;
    const leftEdge = 0;
    const rightEdge = BOARD_WIDTH / GRID_SIZE;
    const bottomEdge = BOARD_HEIGHT / GRID_SIZE;

    if (boardY + 1 < bottomEdge && boardX + 1 < rightEdge) {
        if (state.board[boardY + 1][boardX + 1] == team) {
            miss = true;
        }
    }

    if (boardY + 1 < bottomEdge && boardX - 1 >= leftEdge) {
        if (state.board[boardY + 1][boardX - 1] == team) {
            miss = true;
        }
    }

    if (boardY - 1 >= topEdge && boardX - 1 >= leftEdge) {
        if (state.board[boardY - 1][boardX - 1] == team) {
            miss = true;
        }
    }

    if (boardY - 1 >= topEdge && boardX + 1 < rightEdge) {
        if (state.board[boardY - 1][boardX + 1] == team) {
            miss = true;
        }
    }

    return miss;
}

function testEdges(playerIndex, boardX, boardY) {
    let onEdge = false;
    const topEdge = 0;
    const leftEdge = 0;
    const rightEdge = BOARD_WIDTH / GRID_SIZE - 1;
    const bottomEdge = BOARD_HEIGHT / GRID_SIZE - 1;

    if (boardY == topEdge && boardX == leftEdge && playerIndex == 0) {
        onEdge = true;
    }

    if (boardY == topEdge && boardX == rightEdge && playerIndex == 1) {
        onEdge = true;
    }

    if (boardY == bottomEdge && boardX == leftEdge && playerIndex == 2) {
        onEdge = true;
    }

    if (boardY == bottomEdge && boardX == rightEdge && playerIndex == 3) {
        onEdge = true;
    }

    return onEdge;
}

function testBoard(state, hit, playerIndex, block) {
    let currentHit = hit;
    let miss = false;
    let boardX;
    let boardY;
    let positionX = 0;
    let positionY = 0;

    for (boardY = block.y; boardY < state.board.length && boardY < block.y + block.height; boardY++) {
        positionX = 0;

        if (currentHit) {
            break;
        }

        for (boardX = block.x; boardX < state.board[boardY].length && boardX < block.x + block.width; boardX++) {
            let shapeXY = block.shape[positionY][positionX];
            let boardXY = state.board[boardY][boardX];

            if (shapeXY == 1) {
                if (state.players[playerIndex].turnCount <= 0) {
                    if (testEdges(playerIndex, boardX, boardY)) {
                        miss = true;
                    }
                } else {
                    if (boardXY > 0) {
                        currentHit = true;
                        console.log(1);
                    }

                    if (testCorners(state, playerIndex, boardX, boardY)) {
                        miss = true;
                        console.log(2);
                    }

                    if (testSides(state, playerIndex, boardX, boardY)) {
                        currentHit = true;
                        console.log(3);
                    }
                }
            }

            positionX++;
        }

        positionY++;
    }

    if (!miss) {
        currentHit = true;
    }

    return currentHit;
}

function updateBoard(state, playerIndex, block) {
    let currentState = state;
    let team = playerIndex + 1;
    let boardX;
    let boardY;
    let positionX = 0;
    let positionY = 0;

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

function rotate90Clockwise(matrix) {
    let result = [];
    for (let i = 0; i < matrix[0].length; i++) {
        let row = matrix.map((e) => e[i]).reverse();
        result.push(row);
    }
    return result;
}

function setRotatedBlock(shape, angle) {
    let newShape = shape;

    for (let i = 0; i < angle; i++) {
        newShape = rotate90Clockwise(newShape);
    }

    return newShape;
}

function flipH(a) {
    const h = a.length;
    let b = new Array(h);

    for (let y = 0; y < h; y++) {
        let w = a[y].length;
        b[y] = new Array(w);

        for (let x = 0; x < w; x++) {
            let n = w - 1 - x;
            b[y][n] = a[y][x];
        }
    }

    return b;
}

function flipV(a) {
    const h = a.length;
    let b = new Array(h);

    for (let y = 0; y < h; y++) {
        let w = a[y].length;
        let n = h - 1 - y;
        b[n] = new Array(w);

        for (let x = 0; x < w; x++) {
            b[n][x] = a[y][x];
        }
    }

    return b;
}

export function renderBoard(state) {
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

export function rotateShape(gameObject, angle) {
    let shape = null;

    if (gameObject.data.values != undefined) {
        shape = gameObject.data.values.shape;
    }

    if (angle < 0) {
        angle += 360;
    }

    angle = Math.round(angle / TURN_DEGREE);

    return setRotatedBlock(shape, angle);
}

export function flipShape(gameObject, angle) {
    let shape = null;

    if (gameObject.data.values != undefined) {
        shape = gameObject.data.values.shape;
    }

    shape = flipH(shape);
    shape = flipV(shape);

    return shape;
}

export function playTurn(state, playerIndex, gameObject) {
    let currentState = state;
    let hit = false;
    let shape = null;

    if (gameObject.data.values != undefined) {
        shape = gameObject.data.values.shape;
    }

    let width = shape[0].length;
    let height = shape.length;

    let block = {
        shape: shape,
        x: Math.floor((gameObject.x - BOARD_LEFT) / GRID_SIZE - width / 2),
        y: Math.floor((gameObject.y - BOARD_TOP) / GRID_SIZE - height / 2),
        width: width,
        height: height,
        points: arraySum(shape),
    };

    if (block.x < 0 || block.y < 0) {
        hit = true;
    } else if (
        block.x + block.width > currentState.board.length ||
        block.y + block.height > currentState.board[0].length
    ) {
        hit = true;
    } else {
        hit = testBoard(currentState, hit, playerIndex, block);
    }

    if (!hit) {
        currentState.players[playerIndex].score += block.points;
        currentState.players[playerIndex].turnCount++;
        currentState.turnCount++;
        currentState = updateBoard(currentState, playerIndex, block);
        console.log('Success');

        renderBoard(currentState);

        return currentState;
    } else {
        throw 'Failure';
    }
}
