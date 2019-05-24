'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../../css/refcorebutton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const propTypes = {
//   buttons: PropTypes.object,
//   ishasemptyBtn: PropTypes.bool,
//   language: PropTypes.string,
// }

// const defaultProps = {
//   buttons: {
//     okText: "确认",
//     cancelText: "取消",
//     clearText: "清空已选",
//   },
//   ishasemptyBtn: true,
//   language: 'zh_CN'
// }

// import 'bee-button/build/Button.css'
// import {Button} from 'tinper-bee';
function RefCoreButton(props) {
	var buttons = props.buttons,
	    language = props.language,
	    onClickBtn = props.onClickBtn,
	    _props$emptyBut = props.emptyBut,
	    emptyBut = _props$emptyBut === undefined ? true : _props$emptyBut;

	var saveButton = '';
	var cancelButton = '';
	var clearButton = '';

	switch (language) {
		case "en_US":
			saveButton = 'Ok';
			cancelButton = 'Cancel';
			clearButton = 'Empty';
			break;
		case "zh_TW":
			saveButton = '確認';
			cancelButton = "取消";
			clearButton = '清空已選';
			break;
		case "fr_FR":
			saveButton = 'Confirmation';
			cancelButton = 'Annuler';
			clearButton = 'Videz';
			break;
		case "de_DE":
			saveButton = 'Bestätigt';
			cancelButton = 'Abgesagt';
			clearButton = 'Leer';
			break;
		case "ja_JP":
			saveButton = '確認する';
			cancelButton = '取り消す';
			clearButton = '空を清める';
			break;
		case "zh_CN":
		default:
			saveButton = "确认";
			cancelButton = "取消";
			clearButton = '清空已选';
	}
	if (buttons) {
		saveButton = buttons.okText || "确认";
		cancelButton = buttons.cancelText || "取消";
		clearButton = buttons.clearText || '清空已选';
	}
	return _react2["default"].createElement(
		'div',
		{ className: 'ref-core-button' },
		emptyBut ? _react2["default"].createElement(
			_beeButton2["default"],
			{ className: 'ref-core-button-empty', shape: 'border', onClick: function onClick() {
					return onClickBtn('clear');
				} },
			clearButton
		) : '',
		_react2["default"].createElement(
			_beeButton2["default"],
			{ shape: 'border', onClick: function onClick() {
					return onClickBtn('cancel');
				} },
			cancelButton
		),
		_react2["default"].createElement(
			_beeButton2["default"],
			{ colors: 'primary', onClick: function onClick() {
					return onClickBtn('save');
				} },
			saveButton
		)
	);
}
exports["default"] = RefCoreButton;
module.exports = exports['default'];