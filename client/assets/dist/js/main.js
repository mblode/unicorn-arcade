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

  this.renderPlayer = function (index, isPlayerA) {
    var block = scene.physics.add.sprite(0, 400, "block-".concat(index)).setOrigin(0, 0).setInteractive();
    scene.input.setDraggable(block);
    block.setData({
      shape: _helpers_Data__WEBPACK_IMPORTED_MODULE_0__["DataBlocks"][index],
      played: false,
      index: index
    });

    if (isPlayerA) {
      block.setTint(0x0000ff);
    } else {
      block.setTint(0xff0000);
    }

    return block;
  };

  this.renderOpponent = function (x, y, index, sprite) {
    console.log('renderOpponent');
    var block = scene.physics.add.sprite(x, y, sprite).setOrigin(0, 0);
    block.setData({
      shape: _helpers_Data__WEBPACK_IMPORTED_MODULE_0__["DataBlocks"][index],
      played: false,
      index: index
    });
    block.setTint(0xff0000);
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
    var start = scene.add.text(75, 350, ['Start Game']).setFontSize(18).setColor('#00ffff').setInteractive();
    start.on('pointerdown', function () {
      console.log('startGame!');
      scene.socket.emit('startGame');
    });
    start.on('pointerover', function () {
      start.setColor('#ff69b4');
    });
    start.on('pointerout', function () {
      start.setColor('#00ffff');
    });
    return start;
  };

  this.startGame = function () {
    for (var i = 0; i < _helpers_Data__WEBPACK_IMPORTED_MODULE_1__["DataBlocks"].length; i++) {
      var playerBlock = new _Block__WEBPACK_IMPORTED_MODULE_0__["default"](scene);
      playerBlock.renderPlayer(i, scene.isPlayerA);
    }
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
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/mblode/Sites/unicorn/client/assets/src/js/helpers/Logic.js: Unexpected token, expected \";\" (54:28)\n\n\u001b[0m \u001b[90m 52 | \u001b[39m                currentHit \u001b[33m=\u001b[39m \u001b[36mtrue\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 53 | \u001b[39m            } \u001b[36melse\u001b[39m {\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 54 | \u001b[39m                \u001b[36mfor\u001b[39m (shapeXY) {\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                            \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 55 | \u001b[39m                    \u001b[36mif\u001b[39m (shapeXY \u001b[33m==\u001b[39m \u001b[35m1\u001b[39m \u001b[33m&&\u001b[39m boardXY \u001b[33m>\u001b[39m \u001b[35m0\u001b[39m) {\u001b[0m\n\u001b[0m \u001b[90m 56 | \u001b[39m                        currentHit \u001b[33m=\u001b[39m \u001b[36mtrue\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 57 | \u001b[39m                    }\u001b[0m\n    at Parser._raise (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:742:17)\n    at Parser.raiseWithData (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:735:17)\n    at Parser.raise (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:729:17)\n    at Parser.unexpected (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:8757:16)\n    at Parser.expect (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:8743:28)\n    at Parser.parseFor (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11694:10)\n    at Parser.parseForStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11422:17)\n    at Parser.parseStatementContent (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11106:21)\n    at Parser.parseStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11081:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11656:25)\n    at Parser.parseBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11642:10)\n    at Parser.parseBlock (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11626:10)\n    at Parser.parseStatementContent (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11157:21)\n    at Parser.parseStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11081:17)\n    at Parser.parseIfStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11434:51)\n    at Parser.parseStatementContent (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11126:21)\n    at Parser.parseStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11081:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11656:25)\n    at Parser.parseBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11642:10)\n    at Parser.parseBlock (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11626:10)\n    at Parser.parseStatementContent (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11157:21)\n    at Parser.parseStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11081:17)\n    at /Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11699:60\n    at Parser.withTopicForbiddingContext (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:10956:14)\n    at Parser.parseFor (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11699:22)\n    at Parser.parseForStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11422:17)\n    at Parser.parseStatementContent (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11106:21)\n    at Parser.parseStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11081:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11656:25)\n    at Parser.parseBlockBody (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11642:10)\n    at Parser.parseBlock (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11626:10)\n    at Parser.parseStatementContent (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11157:21)\n    at Parser.parseStatement (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11081:17)\n    at /Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11699:60\n    at Parser.withTopicForbiddingContext (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:10956:14)\n    at Parser.parseFor (/Users/mblode/Sites/unicorn/client/node_modules/@babel/parser/lib/index.js:11699:22)");

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
/* harmony import */ var _helpers_Logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/Logic */ "./assets/src/js/helpers/Logic.js");
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/Data */ "./assets/src/js/helpers/Data.js");



 // var config = {
//     type: Phaser.AUTO,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: true,
//             gravity: { y: 0 }
//         }
//     },
//     scale: {
//         mode: Phaser.Scale.FIT,
//         parent: 'phaser-example',
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//         width: 832,
//         height: 832
//     },
//     scene: [Game]
// };
// const game = new Phaser.Game(config);

var state = {
  board: _helpers_Data__WEBPACK_IMPORTED_MODULE_3__["DataBoard"],
  score: [0, 0, 0, 0]
};
state = Object(_helpers_Logic__WEBPACK_IMPORTED_MODULE_2__["default"])(state, 1, 5, 896, 896);
state = Object(_helpers_Logic__WEBPACK_IMPORTED_MODULE_2__["default"])(state, 2, 9, 992, 992);

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
/* harmony import */ var _components_Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Block */ "./assets/src/js/components/Block.js");
/* harmony import */ var _components_Board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Board */ "./assets/src/js/components/Board.js");
/* harmony import */ var _components_Start__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Start */ "./assets/src/js/components/Start.js");
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
      this.isPlayerA = false;
      this.boardState = _helpers_Data__WEBPACK_IMPORTED_MODULE_1__["DataBoard"];
      this.board = new _components_Board__WEBPACK_IMPORTED_MODULE_3__["default"](this);
      this.renderBoard = this.board.renderBoard();
      this.start = new _components_Start__WEBPACK_IMPORTED_MODULE_4__["default"](this);
      this.renderStart = this.start.renderStart();
      this.socket.on('connect', function () {
        console.log('Connected!');
      });
      this.socket.on('isPlayerA', function () {
        console.log('isPlayerA');
        self.isPlayerA = true;
      });
      this.socket.on('startGame', function () {
        console.log('startGame!');
        self.start.startGame();
        self.renderStart.disableInteractive();
      });
      this.socket.on('blockPlayed', function (gameObject, isPlayerA, values) {
        console.log('blockPlayed');

        if (isPlayerA !== self.isPlayerA) {
          var sprite = gameObject.textureKey;
          var block = new _components_Block__WEBPACK_IMPORTED_MODULE_2__["default"](self);
          block.renderOpponent(gameObject.x, gameObject.y, values.index, sprite).disableInteractive();
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

        gameObject.setData({
          played: true
        });
        gameObject.disableInteractive();
        self.socket.emit('blockPlayed', gameObject, self.isPlayerA, values);
      }); //     gameObject.x = Phaser.Math.Snap.To(gameObject.input.dragStartX);
      //     gameObject.y = Phaser.Math.Snap.To(gameObject.input.dragStartY);
      //     // dropZone.data.values.cards++;
      //     // gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 50;
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