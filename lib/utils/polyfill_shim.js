'use strict';

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _fill = require('babel-runtime/core-js/array/fill');

var _fill2 = _interopRequireDefault(_fill);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof = typeof _symbol2["default"] === "function" && typeof _iterator2["default"] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] && obj !== _symbol2["default"].prototype ? "symbol" : typeof obj; };

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _promisePolyfill = require('promise-polyfill');

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _arrayPrototype = require('array.prototype.fill');

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (typeof _assign2["default"] === 'undefined' || _assign2["default"] === "undefined") {
    Object.assign = _objectAssign2["default"];
}
if (typeof window.Promise === 'undefined') {
    window.Promise = _promisePolyfill2["default"];
}
if (typeof _fill2["default"] === 'undefined') {
    Array.fill = _arrayPrototype2["default"];
}

/**
 * var template1="我是{0}，今年{1}了";
  var template2="我是{name}，今年{age}了";
  var result1=template1.format("loogn",22);
  var result2=template2.format({name:"loogn",age:22});
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && (typeof args === 'undefined' ? 'undefined' : _typeof(args)) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};