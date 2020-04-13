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

    return hit;
}

function testCorners(state, playerIndex, boardX, boardY) {
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

    return miss;
}

function testEdges(boardX, boardY) {
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
                // console.log(boardY, boardX, boardXY);
                if (state.players[playerIndex].turnCount <= 0) {
                    if (testEdges(boardX, boardY)) {
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
        let row = matrix.map(e => e[i]).reverse();
        result.push(row);
    }
    return result;
}

function setRotatedBlock(currentBlock) {
    let newBlock = currentBlock;

    for (let i = 0; i < newBlock.angle; i++) {
        newBlock.shape = rotate90Clockwise(newBlock.shape);
    }

    newBlock.width = newBlock.shape[0].length;
    newBlock.height = newBlock.shape.length;

    return newBlock;
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
    }

    console.log(row);
}

// export function getOrigin(gameObject, index) {
//     let blockIndex = index;
//     let origin = {
//         x: 0,
//         y: 0
//     };

//     if (index == undefined) {
//         if (gameObject.data.values.index != undefined) {
//             blockIndex = gameObject.data.values.index;
//         }
//     }

//     let shape = DataBlocks[blockIndex];
//     let angle = gameObject.angle;

//     if (angle < 0) {
//         angle += 360;
//     }

//     let block = {
//         shape: shape,
//         angle: Math.round(angle / TURN_DEGREE),
//         x: Math.round((gameObject.x - BOARD_LEFT) / GRID_SIZE),
//         y: Math.round((gameObject.y - BOARD_TOP) / GRID_SIZE),
//         width: shape[0].length,
//         height: shape.length
//     };

//     block = setRotatedBlock(block);

//     if (block.width % 2) {
//         origin.x = (block.width / 2) * 32;
//     } else {
//         origin.x = (block.width / 2) * 32;
//     }

//     if (block.height % 2) {
//         origin.y = (block.height / 2) * 32;
//     } else {
//         origin.y = (block.width / 2) * 32;
//     }

//     // if (block.angle == 0) {
//     //     // origin.x = (block.width / block.angle) * 32;
//     //     // origin.y = (block.height / block.angle) * 32;

//     // } else if (block.angle == 1) {
//     //     if (origin.x % 2) {
//     //         origin.x = (block.width - 1) * 32;
//     //         origin.y = (block.height - 1) * 32;
//     //     }
//     // } else if (block.angle == 2) {
//     //     // origin.x = (block.width / block.angle) * 32;
//     //     // origin.y = (block.height / block.angle) * 32;
//     //     // origin.x = 64;
//     //     // origin.y = 32;
//     // } else if (block.angle == 3) {
//     //     // origin.x = block.height * 32;
//     //     // origin.y = block.width * 32;
//     //     // origin.x = 64;
//     //     // origin.y = 64;
//     // }

//     console.log(block);
//     console.log(origin);

//     return origin;
// }

export function getNewShape(gameObject) {
    let shape = null;

    if (gameObject.data.values != undefined) {
        shape = gameObject.data.values.shape;
    }

    let angle = gameObject.angle;

    if (angle < 0) {
        angle += 360;
    }

    console.log(gameObject.angle, angle);

    let block = {
        shape: shape,
        angle: Math.round(angle / TURN_DEGREE),
        x: Math.round((gameObject.x - BOARD_LEFT) / GRID_SIZE),
        y: Math.round((gameObject.y - BOARD_TOP) / GRID_SIZE),
        width: shape[0].length,
        height: shape.length
    };

    block = setRotatedBlock(block);

    return block.shape;
}

export function playTurn(state, playerIndex, gameObject) {
    let currentState = state;
    let hit = false;
    let shape = null;

    if (gameObject.data.values != undefined) {
        shape = gameObject.data.values.shape;
    }

    console.log(Math.floor(gameObject.x - BOARD_LEFT));
    console.log(Math.floor(gameObject.y - BOARD_TOP));

    let block = {
        shape: shape,
        x: Math.floor((gameObject.x - BOARD_LEFT) / GRID_SIZE),
        y: Math.floor((gameObject.y - BOARD_TOP) / GRID_SIZE),
        width: shape[0].length,
        height: shape.length,
        points: arraySum(shape)
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

    renderBoard(currentState);

    if (!hit) {
        currentState.players[playerIndex].score += block.points;
        currentState.players[playerIndex].turnCount++;
        currentState.turnCount++;
        currentState = updateBoard(currentState, playerIndex, block);

        return currentState;
    } else {
        throw 'Hit';
    }
}
