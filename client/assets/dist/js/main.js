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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Block = function Block(scene) {
  _classCallCheck(this, Block);

  this.renderPlayer = function (blockIndex, playerIndex) {
    var block = scene.physics.add.sprite(0, 400, "block-".concat(blockIndex)).setOrigin(0, 0).setInteractive();
    scene.input.setDraggable(block);
    block.setData({
      shape: _helpers_Data__WEBPACK_IMPORTED_MODULE_0__["DataBlocks"][blockIndex],
      played: false,
      index: blockIndex
    });
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

  this.renderOpponent = function (x, y, blockIndex, playerIndex, sprite) {
    console.log('renderOpponent');
    var block = scene.physics.add.sprite(x, y, sprite).setOrigin(0, 0);
    block.setData({
      shape: _helpers_Data__WEBPACK_IMPORTED_MODULE_0__["DataBlocks"][blockIndex],
      played: false,
      index: blockIndex
    });

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

/***/ "./assets/src/js/components/Start.js":
/*!*******************************************!*\
  !*** ./assets/src/js/components/Start.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Start; });
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block */ "./assets/src/js/components/Block.js");
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/Data */ "./assets/src/js/helpers/Data.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Start = function Start(scene) {
  _classCallCheck(this, Start);

  this.renderStart = function () {
    var start = scene.add.text(400, 30, ['Start Game']).setFontSize(18).setColor('#333333').setInteractive();
    start.on('pointerdown', function () {
      console.log('startGame!');
      scene.socket.emit('startGame', _helpers_Data__WEBPACK_IMPORTED_MODULE_1__["DataBoard"]);
    });
    start.on('pointerover', function () {
      start.setColor('#111111');
    });
    start.on('pointerout', function () {
      start.setColor('#222222');
    });
    return start;
  };

  this.startGame = function (state) {
    var scoreString = '';

    for (var i = 0; i < state.players.length; i++) {
      scoreString = scoreString += "".concat(i, ": ").concat(state.players[i].score, " ");
    }

    scene.scoreText.setText(scoreString);

    for (var _i = 0; _i < _helpers_Data__WEBPACK_IMPORTED_MODULE_1__["DataBlocks"].length; _i++) {
      var playerBlock = new _Block__WEBPACK_IMPORTED_MODULE_0__["default"](scene);
      playerBlock.renderPlayer(_i, scene.playerIndex);
    }

    scene.startButton.disableInteractive();
    scene.startButton.visible = 0;
  };
};



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
/*! exports provided: arraySum, testSides, testCorners, testBoard, updateBoard, renderBoard, playTurn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraySum", function() { return arraySum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testSides", function() { return testSides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testCorners", function() { return testCorners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testBoard", function() { return testBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateBoard", function() { return updateBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderBoard", function() { return renderBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playTurn", function() { return playTurn; });
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/Data */ "./assets/src/js/helpers/Data.js");

var BOARD_WIDTH = 640;
var BOARD_HEIGHT = 640;
var BOARD_TOP = 96;
var BOARD_LEFT = 96;
var GRID_SIZE = 32;
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
function testSides(state, playerIndex, boardX, boardY) {
  var hit = false;
  var team = playerIndex + 1;

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
  var miss = false;
  var team = playerIndex + 1;
  var topEdge = 0;
  var leftEdge = 0;
  var rightEdge = (BOARD_WIDTH + BOARD_LEFT) / GRID_SIZE;
  var bottomEdge = (BOARD_HEIGHT + BOARD_TOP) / GRID_SIZE;

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
function testBoard(state, hit, playerIndex, block) {
  var currentHit = hit;
  var boardX;
  var boardY;
  var positionX = 0;
  var positionY = 0;

  for (boardY = block.y; boardY < state.board.length && boardY < block.y + block.height; boardY++) {
    positionX = 0;

    for (boardX = block.x; boardX < state.board[boardY].length && boardX < block.x + block.width; boardX++) {
      var shapeXY = block.shape[positionY][positionX];
      var boardXY = state.board[boardY][boardX];

      if (shapeXY == 1 && boardXY > 0) {
        currentHit = true;
      } else if (shapeXY == 1 && testSides(state, playerIndex, boardX, boardY)) {
        currentHit = true;
      } else if (state.players[playerIndex].turn != 0 && shapeXY == 1 && testCorners(state, playerIndex, boardX, boardY)) {
        currentHit = true;
      }

      positionX++;
    }

    positionY++;
  }

  return currentHit;
}
function updateBoard(state, team, block) {
  var currentState = state;
  var boardX;
  var boardY;
  var positionX = 0;
  var positionY = 0;
  var hit = false;

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
function playTurn(state, playerIndex, blockIndex, x, y) {
  var currentState = state;
  var hit = false;
  var shape = _helpers_Data__WEBPACK_IMPORTED_MODULE_0__["DataBlocks"][blockIndex];
  var block = {
    shape: shape,
    x: Math.round((x - BOARD_LEFT) / GRID_SIZE),
    y: Math.round((y - BOARD_TOP) / GRID_SIZE),
    width: shape[0].length,
    height: shape.length,
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
    currentState.players[playerIndex].turn++;
    currentState.turn++;
    currentState = updateBoard(currentState, playerIndex, block);
    renderBoard(currentState);
    return currentState;
  } else {
    throw 'Hit';
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
/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Game */ "./assets/src/js/scenes/Game.js");


var config = {
  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,
  physics: {
    "default": 'arcade',
    arcade: {
      debug: true,
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
  scene: [_scenes_Game__WEBPACK_IMPORTED_MODULE_1__["default"]]
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
/* harmony import */ var _components_Start__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Start */ "./assets/src/js/components/Start.js");
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

      for (var i = 1; i <= _helpers_Data__WEBPACK_IMPORTED_MODULE_1__["DataBlocks"].length; i++) {
        this.load.image("block-".concat(i), "assets/src/img/blocks/".concat(i, ".png"));
      }
    }
  }, {
    key: "create",
    value: function create() {
      var self = this;
      this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_0___default()('http://localhost:3000');
      this.state = {};
      this.board = new _components_Board__WEBPACK_IMPORTED_MODULE_4__["default"](this);
      this.renderBoard = this.board.renderBoard();
      this.start = new _components_Start__WEBPACK_IMPORTED_MODULE_5__["default"](this);
      this.startButton = this.start.renderStart();
      this.scoreText = this.add.text(16, 16, '', {
        fontSize: '18px',
        fill: '#0000FF'
      });
      this.socket.on('connect', function () {
        console.log('Connected!');
      });
      this.socket.on('currentPlayers', function (players) {
        var id = players.findIndex(function (x) {
          return x.id === self.socket.id;
        });

        if (id > -1) {
          self.player = players[id];
          self.playerIndex = id;
          console.log(players[id]);
          console.log(id);
        }
      });
      this.socket.on('startGame', function (state) {
        console.log('startGame!');
        self.state = state;
        self.start.startGame(state);
      });
      this.socket.on('updateGameState', function (state, playerIndex, gameObject, values) {
        console.log('updateGameState');
        self.state = state;
        var scoreString = '';

        for (var i = 0; i < state.players.length; i++) {
          scoreString = scoreString + "".concat(i, ": ").concat(state.players[i].score, ", ");
        }

        self.scoreText.setText(scoreString);

        if (playerIndex !== self.playerIndex) {
          var sprite = gameObject.textureKey;
          var block = new _components_Block__WEBPACK_IMPORTED_MODULE_3__["default"](self);
          block.renderOpponent(gameObject.x, gameObject.y, values.index, playerIndex, sprite).disableInteractive();
        }
      });
      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = Phaser.Math.Snap.To(dragX, 32);
        gameObject.y = Phaser.Math.Snap.To(dragY, 32);
      });
      this.input.on('dragstart', function (pointer, gameObject) {
        self.children.bringToTop(gameObject);
      });
      this.input.on('dragend', function (pointer, gameObject, dropped) {
        var values = null;

        if (gameObject.data.values != undefined) {
          values = gameObject.data.values;
        }

        try {
          self.state = Object(_helpers_Logic__WEBPACK_IMPORTED_MODULE_2__["playTurn"])(self.state, self.playerIndex, values.index, gameObject.x, gameObject.y);
          self.socket.emit('updateGameState', self.state, self.playerIndex, gameObject, values);
          gameObject.disableInteractive();
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, {
    key: "update",
    value: function update() {}
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