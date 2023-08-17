'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../../css/refcoreerror.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RefCoreError = function RefCoreError(props) {
  var language = props.language,
      show = props.show,
      nodataText = props.nodataText;

  var nodata = "没有查询到数据";
  switch (language) {
    case "zh_CN":
      nodata = '没有查询到数据';
      break;
    case "en_US":
      nodata = 'No query to data';
      break;
    case "zh_TW":
      nodata = '沒有査詢到數據';
      break;
    case "fr_FR":
      nodata = 'Pas de données';
      break;
    case "de_DE":
      nodata = 'Keine abfrage zu Daten';
      break;
    case "ja_JP":
      nodata = 'データが検索されていません';
      break;
    default:
      nodata = '没有查询到数据';
  }
  if (nodataText) {
    nodata = nodataText;
  }
  return _react2["default"].createElement(
    'div',
    { className: show ? 'ref-core-error' : 'ref-core-error-hide' },
    nodata
  );
};
exports["default"] = RefCoreError;
module.exports = exports['default'];