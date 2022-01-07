'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nextUi = require('@tinper/next-ui');

require('../../css/refcorebutton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RefCoreButton(props) {
	var buttons = props.buttons,
	    language = props.language,
	    onClickBtn = props.onClickBtn,
	    _props$emptyBut = props.emptyBut,
	    emptyBut = _props$emptyBut === undefined ? true : _props$emptyBut,
	    _props$footerBtnDom = props.footerBtnDom,
	    footerBtnDom = _props$footerBtnDom === undefined ? '' : _props$footerBtnDom;

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
			_nextUi.Button,
			{ className: 'ref-core-button-empty', shape: 'border', onClick: function onClick() {
					return onClickBtn('clear');
				} },
			clearButton
		) : '',
		!!footerBtnDom ? _react2["default"].createElement(
			'div',
			{ className: 'ref-core-customed-button' },
			_react2["default"].cloneElement(footerBtnDom)
		) : null,
		_react2["default"].createElement(
			_nextUi.Button,
			{ shape: 'border', onClick: function onClick() {
					return onClickBtn('cancel');
				} },
			cancelButton
		),
		_react2["default"].createElement(
			_nextUi.Button,
			{ colors: 'primary', onClick: function onClick() {
					return onClickBtn('save');
				} },
			saveButton
		)
	);
}
exports["default"] = RefCoreButton;
module.exports = exports['default'];