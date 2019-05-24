'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _beeInputGroup = require('bee-input-group');

var _beeInputGroup2 = _interopRequireDefault(_beeInputGroup);

require('../../css/refcoresearch.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }
// import 'bee-form-control/build/FormControl.css'
// import 'bee-input-group/build/InputGroup.css'
// import {FormControl,InputGroup} from 'tinper-bee';


var RefCoreSearch = function (_Component) {
	_inherits(RefCoreSearch, _Component);

	function RefCoreSearch(props) {
		_classCallCheck(this, RefCoreSearch);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onChange = function (value) {
			_this.setState({ value: value });
			if (_this.props.onChange) {
				_this.props.onChange(value);
			}
		};

		_this.onClear = function () {
			_this.setState({ value: '' });
		};

		_this.keypress = function (e) {
			if (e.which !== 13) return;
			_this.onSearch(_this.state.value);
		};

		_this.onSearch = function () {
			if (_this.props.onSearch) {
				_this.props.onSearch(_this.state.value);
			}
		};

		_this.state = {
			value: props.value || ""
		};
		return _this;
	}

	RefCoreSearch.prototype.render = function render() {
		var _props = this.props,
		    _props$language = _props.language,
		    language = _props$language === undefined ? '' : _props$language,
		    _props$placeholder = _props.placeholder,
		    placeholder = _props$placeholder === undefined ? '' : _props$placeholder,
		    _props$className = _props.className,
		    className = _props$className === undefined ? '' : _props$className,
		    _props$show = _props.show,
		    show = _props$show === undefined ? true : _props$show;

		if (!placeholder) {
			switch (language) {
				case "en_US":
					placeholder = 'Search';
					break;
				case "fr_FR":
					placeholder = 'Recherche';
					break;
				case "de_DE":
					placeholder = 'Suche';
					break;
				case "ja_JP":
					placeholder = '検索';
					break;
				case "zh_TW":
				case "zh_CN":
				default:
					placeholder = '搜索';
			}
		}

		return _react2["default"].createElement(
			_beeInputGroup2["default"],
			{ simple: true,
				className: 'ref-core-search ' + className + ' ' + (show ? '' : 'ref-core-search-hide')
			},
			_react2["default"].createElement(_beeFormControl2["default"], {
				className: 'ref-core-search-input',
				value: this.state.value,
				onChange: this.onChange,
				onKeyPress: this.keypress,
				placeholder: placeholder,
				type: 'text'
			}),
			_react2["default"].createElement(
				_beeInputGroup2["default"].Button,
				{ shape: 'border', onClick: this.onSearch.bind(this) },
				_react2["default"].createElement(
					'span',
					{ className: 'uf uf-search' },
					' '
				)
			)
		);
	};

	return RefCoreSearch;
}(_react.Component);

exports["default"] = RefCoreSearch;
module.exports = exports['default'];