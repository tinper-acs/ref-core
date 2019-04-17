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

var _beeCheckbox = require('bee-checkbox');

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

require('bee-checkbox/build/Checkbox.css');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../../css/refcorelist.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }
// import {Checkbox} from 'tinper-bee';


var propTypes = {
	data: _propTypes2["default"].array,
	multiple: _propTypes2["default"].bool,
	selectArray: _propTypes2["default"].array,
	refListChecked: _propTypes2["default"].func,
	onClickBtn: _propTypes2["default"].func,
	language: _propTypes2["default"].string
};

var defaultProps = {
	data: [],
	multiple: false,
	selectArray: [],
	refListChecked: function refListChecked() {},
	onClickBtn: function onClickBtn() {},
	language: ''
};

var RefCoreList = function (_Component) {
	_inherits(RefCoreList, _Component);

	function RefCoreList(props) {
		_classCallCheck(this, RefCoreList);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onDoubleClick = function (checkid) {
			var _this$props = _this.props,
			    data = _this$props.data,
			    multiple = _this$props.multiple;

			var selectArray = [];
			if (multiple) {
				data.forEach(function (item, index) {
					if (item.refpk == checkid) {
						item.checked = !item.checked;
					} else {
						item.checked = false;
					}
					if (item.checked) {
						selectArray.push(item);
					}
				});
				_this.props.refListChecked(selectArray);
				setTimeout(function () {
					_this.props.onClickBtn('save');
				}, 100);
			}
		};

		_this.changeCheck = function (checkid) {
			var _this$props2 = _this.props,
			    data = _this$props2.data,
			    multiple = _this$props2.multiple;

			var selectArray = [];
			if (multiple) {
				data.forEach(function (item, index) {
					if (item.refpk == checkid) {
						item.checked = !item.checked;
					} else {
						item.checked = false;
					}
					if (item.checked) {
						selectArray.push(item);
					}
				});
			} else {
				data.forEach(function (item, index) {
					if (item.refpk == checkid) {
						item.checked = !item.checked;
					}
					if (item.checked) {
						selectArray.push(item);
					}
				});
			}
			_this.props.refListChecked(selectArray);
		};

		_this.state = {
			dataList: []
		};
		return _this;
	}

	RefCoreList.prototype.componentWillMount = function componentWillMount() {};

	RefCoreList.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    data = _props.data,
		    selectArray = _props.selectArray,
		    language = _props.language;

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
		var loop = function loop(data) {
			return data.map(function (item, index) {
				item.checked = false;
				selectArray.forEach(function (element) {
					if (item.refpk == element.refpk) {
						item.checked = true;
					}
				});
				return _react2["default"].createElement(
					'div',
					{ className: 'ref-core-list-checkbox', key: index },
					_react2["default"].createElement(
						_beeCheckbox2["default"],
						{ colors: 'info', onDoubleClick: function onDoubleClick() {
								return _this2.onDoubleClick(item.refpk);
							}, checked: item.checked, onChange: function onChange() {
								return _this2.changeCheck(item.refpk);
							} },
						item.refname
					)
				);
			});
		};
		return _react2["default"].createElement(
			'div',
			{ className: 'ref-core-list' },
			data.length ? loop(data) : _react2["default"].createElement(
				'div',
				{ className: 'ref-core-nodata' },
				nodata
			)
		);
	};

	return RefCoreList;
}(_react.Component);

RefCoreList.propTypes = propTypes;
RefCoreList.defaultProps = defaultProps;
exports["default"] = RefCoreList;
module.exports = exports['default'];