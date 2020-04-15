(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/main"],{

/***/ "./assets/src/js/components/Block.js":
/*!*******************************************!*\
  !*** ./assets/src/js/components/Block.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Block; });
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/Data */ "./assets/src/js/helpers/Data.js");
/* harmony import */ var _helpers_Logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/Logic */ "./assets/src/js/helpers/Logic.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Block = function Block(scene) {
  _classCallCheck(this, Block);

  this.renderPlayer = function (blockIndex, playerIndex) {
    var leftMargin = 1;

    for (var i = 0; i < blockIndex; i++) {
      leftMargin += _helpers_Data__WEBPACK_IMPORTED_MODULE_0__["DataBlocks"][i][0].length + 1;
    }

    var block = scene.physics.add.sprite(leftMargin * 32, 736, "block-".concat(blockIndex)).setInteractive().setOrigin(0.5, 0.5);
    scene.input.setDraggable(block);
    block.setData({
      shape: _helpers_Data__WEBPACK_IMPORTED_MODULE_0__["DataBlocks"][blockIndex],
      played: false,
      index: blockIndex
    });

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

  this.renderOpponent = function (gameObject, blockIndex, shape, playerIndex) {
    console.log(gameObject);
    var block = scene.physics.add.sprite(gameObject.x, gameObject.y, gameObject.textureKey).setOrigin(0.5, 0.5);
    block.rotation = gameObject.rotation;
    block.setData({
      shape: shape,
      played: false,
      index: blockIndex
    });

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
};



/***/ }),

/***/ "./assets/src/js/components/Board.js":
/*!*******************************************!*\
  !*** ./assets/src/js/components/Board.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/Data */ "./assets/src/js/helpers/Data.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Board = function Board(scene) {
  _classCallCheck(this, Board);

  this.renderBoard = function () {
    scene.add.sprite(416, 416, 'grid');
    var dropZone = scene.add.zone(416, 416, 196, 196).setRectangleDropZone(196, 196);
    return dropZone;
  };
};



/***/ }),

/***/ "./assets/src/js/components/Buttons.js":
/*!*********************************************!*\
  !*** ./assets/src/js/components/Buttons.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/mblode/Sites/unicorn/client/assets/src/js/components/Buttons.js: Unexpected token, expected \",\" (33:16)\n\n\u001b[0m \u001b[90m 31 | \u001b[39m                }\u001b[0m\n\u001b[0m \u001b[90m 32 | \u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 33 | \u001b[39m                space\u001b[33m:\u001b[39m \u001b[35m0\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 34 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 35 | \u001b[39m                \u001b[90m// name: '',\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 36 | \u001b[39m                \u001b[90m// draggable: false,\u001b[39m\u001b[0m\n    at Parser._raise (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:742:17)\n    at Parser.raiseWithData (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:735:17)\n    at Parser.raise (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:729:17)\n    at Parser.unexpected (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:8757:16)\n    at Parser.expect (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:8743:28)\n    at Parser.parseObj (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:10365:14)\n    at Parser.parseExprAtom (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9995:28)\n    at Parser.parseExprSubscripts (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9602:23)\n    at Parser.parseMaybeUnary (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9582:21)\n    at Parser.parseExprOps (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9452:23)\n    at Parser.parseMaybeConditional (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9425:23)\n    at Parser.parseMaybeAssign (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9380:21)\n    at Parser.parseExprListItem (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:10718:18)\n    at Parser.parseCallExpressionArguments (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9790:22)\n    at Parser.parseSubscript (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9696:31)\n    at Parser.parseSubscripts (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9625:19)\n    at Parser.parseExprSubscripts (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9608:17)\n    at Parser.parseMaybeUnary (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9582:21)\n    at Parser.parseExprOps (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9452:23)\n    at Parser.parseMaybeConditional (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9425:23)\n    at Parser.parseMaybeAssign (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9380:21)\n    at Parser.parseVar (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11740:26)\n    at Parser.parseVarStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11549:10)\n    at Parser.parseStatementContent (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11148:21)\n    at Parser.parseStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11081:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11656:25)\n    at Parser.parseBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11642:10)\n    at Parser.parseBlock (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11626:10)\n    at Parser.parseFunctionBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:10634:24)\n    at Parser.parseArrowExpression (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:10603:10)\n    at Parser.parseParenAndDistinguishExpression (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:10221:12)\n    at Parser.parseExprAtom (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9947:21)\n    at Parser.parseExprSubscripts (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9602:23)\n    at Parser.parseMaybeUnary (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9582:21)\n    at Parser.parseExprOps (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9452:23)\n    at Parser.parseMaybeConditional (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:9425:23)");

/***/ }),

/***/ "./assets/src/js/helpers/Data.js":
/*!***************************************!*\
  !*** ./assets/src/js/helpers/Data.js ***!
  \***************************************/
/*! exports provided: DataMap, DataBoard, DataBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataMap", function() { return DataMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataBoard", function() { return DataBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataBlocks", function() { return DataBlocks; });
var DataMap = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var DataBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var DataBlocks = [[[1]], [[1, 1]], [[1, 1], [0, 1]], [[1, 1, 1]], [[1, 1], [1, 1]], [[0, 1, 0], [1, 1, 1]], [[1, 1, 1, 1]], [[0, 0, 1], [1, 1, 1]], [[0, 1, 1], [1, 1, 0]], [[1, 0, 0, 0], [1, 1, 1, 1]], [[0, 1, 0], [0, 1, 0], [1, 1, 1]], [[1, 0, 0], [1, 0, 0], [1, 1, 1]], [[0, 1, 1, 1], [1, 1, 0, 0]], [[0, 0, 1], [1, 1, 1], [1, 0, 0]], [[1], [1], [1], [1]], [[1, 0], [1, 1], [1, 1]], [[0, 1, 1], [1, 1, 0], [1, 0, 0]], [[1, 1], [1, 0], [1, 1]], [[0, 1, 1], [1, 1, 0], [0, 1, 0]], [[0, 1, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0, 0], [1, 1, 1, 1]]];

/***/ }),

/***/ "./assets/src/js/helpers/Logic.js":
/*!****************************************!*\
  !*** ./assets/src/js/helpers/Logic.js ***!
  \****************************************/
/*! exports provided: renderBoard, rotateShape, flipShape, playTurn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderBoard", function() { return renderBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateShape", function() { return rotateShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flipShape", function() { return flipShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playTurn", function() { return playTurn; });
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/Data */ "./assets/src/js/helpers/Data.js");

var BOARD_WIDTH = 640;
var BOARD_HEIGHT = 640;
var BOARD_TOP = 96;
var BOARD_LEFT = 96;
var GRID_SIZE = 32;
var TURN_DEGREE = 90;

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
  var hit = false;
  var team = playerIndex + 1;
  var topEdge = 0;
  var leftEdge = 0;
  var rightEdge = BOARD_WIDTH / GRID_SIZE;
  var bottomEdge = BOARD_HEIGHT / GRID_SIZE;

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
  var miss = false;
  var team = playerIndex + 1;
  var topEdge = 0;
  var leftEdge = 0;
  var rightEdge = BOARD_WIDTH / GRID_SIZE;
  var bottomEdge = BOARD_HEIGHT / GRID_SIZE;

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
  var onEdge = false;
  var topEdge = 0;
  var leftEdge = 0;
  var rightEdge = BOARD_WIDTH / GRID_SIZE - 1;
  var bottomEdge = BOARD_HEIGHT / GRID_SIZE - 1;

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
  var currentHit = hit;
  var miss = false;
  var boardX;
  var boardY;
  var positionX = 0;
  var positionY = 0;

  for (boardY = block.y; boardY < state.board.length && boardY < block.y + block.height; boardY++) {
    positionX = 0;

    if (currentHit) {
      break;
    }

    for (boardX = block.x; boardX < state.board[boardY].length && boardX < block.x + block.width; boardX++) {
      var shapeXY = block.shape[positionY][positionX];
      var boardXY = state.board[boardY][boardX];

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
  var currentState = state;
  var team = playerIndex + 1;
  var boardX;
  var boardY;
  var positionX = 0;
  var positionY = 0;

  for (boardY = block.y; boardY < currentState.board.length && boardY < block.y + block.height; boardY++) {
    positionX = 0;

    for (boardX = block.x; boardX < currentState.board[boardY].length && boardX < block.x + block.width; boardX++) {
      var shapeXY = block.shape[positionY][positionX];
      var boardXY = currentState.board[boardY][boardX];

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
  var result = [];

  var _loop = function _loop(i) {
    var row = matrix.map(function (e) {
      return e[i];
    }).reverse();
    result.push(row);
  };

  for (var i = 0; i < matrix[0].length; i++) {
    _loop(i);
  }

  return result;
}

function setRotatedBlock(shape, angle) {
  var newShape = shape;

  for (var i = 0; i < angle; i++) {
    newShape = rotate90Clockwise(newShape);
  }

  return newShape;
}

function flipH(a) {
  var h = a.length;
  var b = new Array(h);

  for (var y = 0; y < h; y++) {
    var w = a[y].length;
    b[y] = new Array(w);

    for (var x = 0; x < w; x++) {
      var n = w - 1 - x;
      b[y][n] = a[y][x];
    }
  }

  return b;
}

function flipV(a) {
  var h = a.length;
  var b = new Array(h);

  for (var y = 0; y < h; y++) {
    var w = a[y].length;
    var n = h - 1 - y;
    b[n] = new Array(w);

    for (var x = 0; x < w; x++) {
      b[n][x] = a[y][x];
    }
  }

  return b;
}

function renderBoard(state) {
  var boardX;
  var boardY;
  var row = '';

  for (boardY = 0; boardY < state.board.length; boardY++) {
    row = '';

    for (boardX = 0; boardX < state.board[boardY].length; boardX++) {
      row += "".concat(state.board[boardY][boardX], " ");
    }

    console.log(row);
  }
}
function rotateShape(gameObject, angle) {
  var shape = null;

  if (gameObject.data.values != undefined) {
    shape = gameObject.data.values.shape;
  }

  if (angle < 0) {
    angle += 360;
  }

  angle = Math.round(angle / TURN_DEGREE);
  return setRotatedBlock(shape, angle);
}
function flipShape(gameObject, angle) {
  var shape = null;

  if (gameObject.data.values != undefined) {
    shape = gameObject.data.values.shape;
  }

  shape = flipH(shape);
  shape = flipV(shape);
  return shape;
}
function playTurn(state, playerIndex, gameObject) {
  var currentState = state;
  var hit = false;
  var shape = null;

  if (gameObject.data.values != undefined) {
    shape = gameObject.data.values.shape;
  }

  var width = shape[0].length;
  var height = shape.length;
  var block = {
    shape: shape,
    x: Math.floor((gameObject.x - BOARD_LEFT) / GRID_SIZE - width / 2),
    y: Math.floor((gameObject.y - BOARD_TOP) / GRID_SIZE - height / 2),
    width: width,
    height: height,
    points: arraySum(shape)
  };

  if (block.x < 0 || block.y < 0) {
    hit = true;
  } else if (block.x + block.width > currentState.board.length || block.y + block.height > currentState.board[0].length) {
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

/***/ }),

/***/ "./assets/src/js/main.js":
/*!*******************************!*\
  !*** ./assets/src/js/main.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var phaser3_rex_plugins_templates_ui_ui_plugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser3-rex-plugins/templates/ui/ui-plugin.js */ "./node_modules/phaser3-rex-plugins/templates/ui/ui-plugin.js");
/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/Game */ "./assets/src/js/scenes/Game.js");



var config = {
  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,
  physics: {
    "default": 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0
      }
    }
  },
  scale: {
    mode: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scale.CENTER_BOTH,
    width: 832,
    height: 832
  },
  scene: [_scenes_Game__WEBPACK_IMPORTED_MODULE_2__["default"]],
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: phaser3_rex_plugins_templates_ui_ui_plugin_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      mapping: 'rexUI'
    }]
  }
};
var game = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game(config);

/***/ }),

/***/ "./assets/src/js/scenes/Game.js":
/*!**************************************!*\
  !*** ./assets/src/js/scenes/Game.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/Data */ "./assets/src/js/helpers/Data.js");
/* harmony import */ var _helpers_Logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/Logic */ "./assets/src/js/helpers/Logic.js");
/* harmony import */ var _components_Block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Block */ "./assets/src/js/components/Block.js");
/* harmony import */ var _components_Board__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Board */ "./assets/src/js/components/Board.js");
/* harmony import */ var _components_Buttons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Buttons */ "./assets/src/js/components/Buttons.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








var Game = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Game, _Phaser$Scene);

  var _super = _createSuper(Game);

  function Game() {
    _classCallCheck(this, Game);

    return _super.call(this, {
      key: 'Game'
    });
  }

  _createClass(Game, [{
    key: "preload",
    value: function preload() {
      this.load.image('grid', 'assets/src/img/grid.png');

      for (var i = 0; i < _helpers_Data__WEBPACK_IMPORTED_MODULE_1__["DataBlocks"].length; i++) {
        this.load.image("block-".concat(i), "assets/src/img/blocks/".concat(i, ".png"));
      }
    }
  }, {
    key: "create",
    value: function create() {
      var self = this;
      this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_0___default()('http://localhost:3000');
      this.cursors = this.input.keyboard;
      this.currentBlock = null;
      this.state = {};
      this.board = new _components_Board__WEBPACK_IMPORTED_MODULE_4__["default"](this);
      this.renderBoard = this.board.renderBoard();
      this.buttons = new _components_Buttons__WEBPACK_IMPORTED_MODULE_5__["default"](this);
      this.startButton = this.buttons.renderStart();
      this.socket.on('connect', function () {
        console.log('Connected!');
      });
      this.socket.on('joinGame', function (payload) {
        console.log('Joined!');
        self.state = payload;
        self.buttons.joinGame(payload);
      });
      this.socket.on('startGame', function (payload) {
        console.log('Start game!');
        var id = payload.players.findIndex(function (x) {
          return x.id === self.socket.id;
        });

        if (id > -1) {
          self.player = payload.players[id];
          self.playerIndex = id;
        }

        self.state = payload;
        self.buttons.startGame(payload);
      });
      this.socket.on('updateGameState', function (payload) {
        self.state = payload.state;
        var scoreString = '';

        for (var i = 0; i < payload.state.players.length; i++) {
          scoreString = scoreString + "".concat(i, ": ").concat(payload.state.players[i].score, ", ");
        }

        self.scoreText.setText(scoreString);

        if (payload.playerIndex !== self.playerIndex) {
          var block = new _components_Block__WEBPACK_IMPORTED_MODULE_3__["default"](self);
          block.renderOpponent(payload.gameObject, payload.values.index, payload.values.shape, payload.playerIndex);
        }
      });
      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        var shape = gameObject.data.values.shape;
        var width = shape[0].length;
        var height = shape.length;

        if (width % 2 == 0) {
          gameObject.x = Phaser.Math.Snap.To(dragX, 32);
        } else {
          gameObject.x = Phaser.Math.Snap.To(dragX, 32, 16);
        }

        if (height % 2 == 0) {
          gameObject.y = Phaser.Math.Snap.To(dragY, 32);
        } else {
          gameObject.y = Phaser.Math.Snap.To(dragY, 32, 16);
        }
      });
      this.input.on('dragstart', function (pointer, gameObject) {
        self.children.bringToTop(gameObject);
        self.currentBlock = gameObject;
      });
      this.input.on('dragend', function (pointer, gameObject, dropped) {
        self.currentBlock = null;
        var values = null;

        if (gameObject.data.values != undefined) {
          values = gameObject.data.values;
        }

        try {
          self.state = Object(_helpers_Logic__WEBPACK_IMPORTED_MODULE_2__["playTurn"])(self.state, self.playerIndex, gameObject);
          var payload = {
            roomIndex: 0,
            playerIndex: self.playerIndex,
            state: self.state,
            gameObject: gameObject,
            values: values
          };
          self.socket.emit('updateGameState', payload);
          gameObject.disableInteractive();
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      var w = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      var a = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      var s = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      var d = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      var up = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      var left = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      var down = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      var right = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      if (this.currentBlock) {
        if (Phaser.Input.Keyboard.JustDown(a) || Phaser.Input.Keyboard.JustDown(left)) {
          var angle = -90;
          this.currentBlock.angle += angle;
          console.log(this.currentBlock.data.values.shape);
          var newShape = Object(_helpers_Logic__WEBPACK_IMPORTED_MODULE_2__["rotateShape"])(this.currentBlock, angle);
          this.currentBlock.setData({
            shape: newShape
          });
          console.log(this.currentBlock.data.values.shape);
        }

        if (Phaser.Input.Keyboard.JustDown(d) || Phaser.Input.Keyboard.JustDown(right)) {
          var _angle = 90;
          this.currentBlock.angle += _angle;
          console.log(this.currentBlock.data.values.shape);

          var _newShape = Object(_helpers_Logic__WEBPACK_IMPORTED_MODULE_2__["rotateShape"])(this.currentBlock, _angle);

          this.currentBlock.setData({
            shape: _newShape
          });
          console.log(this.currentBlock.data.values.shape);
        }

        if (Phaser.Input.Keyboard.JustDown(s) || Phaser.Input.Keyboard.JustDown(down) || Phaser.Input.Keyboard.JustDown(w) || Phaser.Input.Keyboard.JustDown(up)) {
          if (this.currentBlock.scaleY == 1) {
            this.currentBlock.scaleY = -1;
            this.currentBlock.scaleX = -1;
          } else {
            this.currentBlock.scaleY = 1;
            this.currentBlock.scaleX = 1;
          }

          console.log(this.currentBlock.data.values.shape);

          var _newShape2 = Object(_helpers_Logic__WEBPACK_IMPORTED_MODULE_2__["flipShape"])(this.currentBlock);

          this.currentBlock.setData({
            shape: _newShape2
          });
          console.log(this.currentBlock.data.values.shape);
        }
      }
    }
  }]);

  return Game;
}(Phaser.Scene);



/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./assets/src/js/main.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mblode/Sites/unicorn/client/assets/src/js/main.js */"./assets/src/js/main.js");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);