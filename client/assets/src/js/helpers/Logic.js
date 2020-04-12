import { DataBlocks } from '../helpers/Data';

const BOARD_WIDTH = 640;
const BOARD_HEIGHT = 640;
const BOARD_TOP = 96;
const BOARD_LEFT = 96;
const GRID_SIZE = 32;

export function arraySum(i) {
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

export function testSides(state, playerIndex, boardX, boardY) {
    let hit = false;
    let team = playerIndex + 1;

    if (boardY + 1 < (BOARD_HEIGHT + BOARD_TOP) / GRID_SIZE) {
        if (state.board[boardY + 1][boardX] == team) {
            hit = true;
        }
    }

    if (boardY - 1 > 0) {
        if (state.board[boardY - 1][boardX] == team) {
            hit = true;
        }
    }

    if (boardX + 1 < (BOARD_WIDTH + BOARD_LEFT) / GRID_SIZE) {
        if (state.board[boardY][boardX + 1] == team) {
            hit = true;
        }
    }

    if (boardX - 1 > 0) {
        if (state.board[boardY][boardX - 1] == team) {
            hit = true;
        }
    }

    console.log('Hit: ' + hit);

    return hit;
}

export function testCorners(state, playerIndex, boardX, boardY) {
    let miss = false;
    let team = playerIndex + 1;
    const topEdge = 0;
    const leftEdge = 0;
    const rightEdge = BOARD_WIDTH / GRID_SIZE - 1;
    const bottomEdge = BOARD_HEIGHT / GRID_SIZE - 1;

    if (boardY + 1 < bottomEdge && boardX + 1 < rightEdge) {
        if (state.board[boardY + 1][boardX + 1] == team) {
            miss = true;
        }
    }

    if (boardY + 1 < bottomEdge && boardX - 1 > leftEdge) {
        if (state.board[boardY + 1][boardX - 1] == team) {
            miss = true;
        }
    }

    if (boardY - 1 > topEdge && boardX - 1 > leftEdge) {
        if (state.board[boardY - 1][boardX - 1] == team) {
            miss = true;
        }
    }

    if (boardY - 1 > topEdge && boardX + 1 < rightEdge) {
        if (state.board[boardY - 1][boardX + 1] == team) {
            miss = true;
        }
    }

    console.log('Miss: ' + miss);

    return miss;
}

export function testEdges(boardX, boardY) {
    let onEdge = false;
    const topEdge = 0;
    const leftEdge = 0;
    const rightEdge = BOARD_WIDTH / GRID_SIZE - 1;
    const bottomEdge = BOARD_HEIGHT / GRID_SIZE - 1;

    if (boardY == bottomEdge && boardX == rightEdge) {
        onEdge = true;
    }

    if (boardY == bottomEdge && boardX == leftEdge) {
        onEdge = true;
    }

    if (boardY == topEdge && boardX == leftEdge) {
        onEdge = true;
    }

    if (boardY == topEdge && boardX == rightEdge) {
        onEdge = true;
    }

    console.log(boardX, boardY, topEdge, leftEdge, rightEdge, bottomEdge);
    console.log('On Edge: ' + onEdge);

    return onEdge;
}

export function testBoard(state, hit, playerIndex, block) {
    let currentHit = hit;
    let miss = false;
    let boardX;
    let boardY;
    let positionX = 0;
    let positionY = 0;

    console.log('Turn: ' + state.players[playerIndex].turnCount);

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
                    if (testEdges(boardX, boardY)) {
                        miss = true;
                        break;
                    }
                } else {
                    if (boardXY > 0) {
                        currentHit = true;
                        console.log(2);
                        break;
                    } else if (testCorners(state, playerIndex, boardX, boardY)) {
                        miss = true;
                        console.log(3);
                        break;
                    } else if (testSides(state, playerIndex, boardX, boardY)) {
                        currentHit = true;
                        console.log(4);
                        break;
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

export function updateBoard(state, playerIndex, block) {
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

export function playTurn(state, playerIndex, blockIndex, gameObject) {
    let currentState = state;
    let hit = false;
    let shape = DataBlocks[blockIndex];
    let block = {
        shape: shape,
        x: Math.round((gameObject.x - BOARD_LEFT) / GRID_SIZE),
        y: Math.round((gameObject.y - BOARD_TOP) / GRID_SIZE),
        rotation: Math.round(gameObject.rotation),
        width: shape[0].length,
        height: shape.length,
        points: arraySum(shape)
    };

    if (block.x < 0 || block.y < 0) {
        hit = true;
        console.log(1);
    } else if (
        block.x + block.width > currentState.board.length ||
        block.y + block.height > currentState.board[0].length
    ) {
        hit = true;
        console.log(2);
    } else {
        hit = testBoard(currentState, hit, playerIndex, block);
        console.log(3);
    }

    if (!hit) {
        currentState.players[playerIndex].score += block.points;
        currentState.players[playerIndex].turnCount++;
        currentState.turnCount++;
        currentState = updateBoard(currentState, playerIndex, block);

        renderBoard(currentState);

        return currentState;
    } else {
        throw 'Hit';
    }
}
