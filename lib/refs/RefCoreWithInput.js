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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _request = require('../utils/request');

var _beeInputGroup = require('bee-input-group');

var _beeInputGroup2 = _interopRequireDefault(_beeInputGroup);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _immutable = require('immutable');

require('../../css/refcorewithinput.css');

require('../utils/polyfill_shim.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }
// import 'bee-form-control/build/FormControl.css'
// import 'bee-input-group/build/InputGroup.css'
// import 'bee-icon/build/Icon.css'


var refValParse = function refValParse(value) {
	if (!value) return { refname: '', refpk: '' };

	try {
		var valueMap = JSON.parse(value);
		if (!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')) {
			return { refname: '', refpk: '' };
		} else {
			return valueMap;
		}
	} catch (e) {
		return { refname: '', refpk: '' };
	}
};

var propTypes = {
	matchUrl: _propTypes2["default"].string,
	param: _propTypes2["default"].object,
	style: _propTypes2["default"].object,
	// displayField: PropTypes.string,//显示内容的键
	valueField: _propTypes2["default"].string, //真实 value 的键
	filterUrl: _propTypes2["default"].string,
	value: _propTypes2["default"].string,
	wrapClassName: _propTypes2["default"].string,
	canClickGoOn: _propTypes2["default"].func,
	canInputGoOn: _propTypes2["default"].func,
	filterData: _propTypes2["default"].array,
	filterUrlFunc: _propTypes2["default"].func
};

var defaultProps = {
	className: '',
	backdrop: true,
	style: {
		width: 200
	},
	param: {
		refCode: 'test_common' //test_common||test_grid||test_tree||test_treeTable
	},
	onCancel: function onCancel(p) {},
	onSave: function onSave(sels) {},
	value: '',
	// displayField: 'refname',//显示内容的键
	valueField: 'refpk', //真实 value 的键
	//将 filterRefUrl 改为 mactchUrl
	matchUrl: '',
	filterUrl: '',
	wrapClassName: '',
	canClickGoOn: function canClickGoOn() {
		return true;
	},
	canInputGoOn: function canInputGoOn() {
		return true;
	},
	filterData: [],
	filterUrlFunc: function filterUrlFunc(value) {}
};

var FilterItem = function FilterItem(props) {
	return _react2["default"].createElement(
		'li',
		{
			className: 'ref-filter-item',
			onClick: function onClick(e) {
				if (e.target.dataset.type !== 'filteritem') {
					e.target.dataset.type = 'filteritem';
				}
			},
			'data-value': props.value,
			'data-type': 'filteritem'

		},
		props.text
	);
};

var getFilterData = function getFilterData(data, valueField, displayField) {
	var filterItems = [],
	    filterDataMap = {};
	data.forEach(function (item) {
		var values = item[valueField];
		//displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
		var names = '';
		if (typeof displayField === 'function') {
			names = displayField(item);
		} else {
			names = displayField.format(item);
		}
		filterItems.push(_react2["default"].createElement(FilterItem, { key: values, text: names, value: values }));
		filterDataMap[values] = item;
	});
	return { filterItems: filterItems, filterDataMap: filterDataMap };
};

var RefCoreWithInput = function (_Component) {
	_inherits(RefCoreWithInput, _Component);

	function RefCoreWithInput(props) {
		_classCallCheck(this, RefCoreWithInput);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleChange = function (values, record) {
			var _this$props = _this.props,
			    onChange = _this$props.onChange,
			    value = _this$props.value;

			if (values === value) return;
			if (onChange) {
				onChange(values, record);
			}
		};

		_this.onCancelModal = function (p) {

			_this.setState({
				isClick: false,
				showModal: false
			});
			_this.props.onCancel(p, _this.refDom);
		};

		_this.onSaveModal = function (result) {
			var _this$props2 = _this.props,
			    _this$props2$displayF = _this$props2.displayField,
			    displayField = _this$props2$displayF === undefined ? '{refname}' : _this$props2$displayF,
			    valueField = _this$props2.valueField,
			    onSave = _this$props2.onSave;

			var values = result.map(function (item) {
				return item[valueField];
			}).join(',');
			var names = result.map(function (item) {
				if (typeof displayField === 'function') {
					return displayField(item);
				} else {
					return displayField.format(item);
				}
			}).join(';');

			_this.setState({
				checkedArray: result,
				savedData: values,
				savedShow: names,
				isClick: false,
				showModal: false
			}, function () {
				onSave(result, names, _this.refDom);
				_this.handleChange((0, _stringify2["default"])({
					refname: names,
					refpk: values
				}), result);
			});
		};

		_this.handleClick = function () {
			var isClick = _this.state.isClick;

			if (_this.props.disabled || isClick) {
				return;
			}
			if (!_this.props.canClickGoOn()) return;
			_this.setState({
				isClick: true,
				showModal: true
			});
		};

		_this.onClickFilterItem = function (e) {
			e.stopPropagation();
			var _e$target$dataset = e.target.dataset,
			    dataset = _e$target$dataset === undefined ? {} : _e$target$dataset;

			if (dataset.type !== 'filteritem') {
				return;
			}
			var filterDataMap = _this.state.filterDataMap;
			var _this$props3 = _this.props,
			    _this$props3$displayF = _this$props3.displayField,
			    displayField = _this$props3$displayF === undefined ? "{refname}" : _this$props3$displayF,
			    valueField = _this$props3.valueField,
			    onSave = _this$props3.onSave;

			var filterDataItem = filterDataMap[dataset.value];
			var savedData = filterDataItem[valueField];
			//displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
			var savedShow = '';
			if (typeof displayField === 'function') {
				savedShow = displayField(filterDataItem);
			} else {
				savedShow = displayField.format(filterDataItem);
			}
			_this.setState({
				savedData: savedData, savedShow: savedShow,
				filtering: false,
				checkedArray: [filterDataMap[dataset.value]]
			}, function () {

				_this.handleChange((0, _stringify2["default"])({
					refname: savedShow,
					refpk: dataset.value
				}));
				onSave([filterDataItem]);
			});
		};

		_this.onFilter = function (content) {
			var _this$props4 = _this.props,
			    filterUrl = _this$props4.filterUrl,
			    param = _this$props4.param,
			    valueField = _this$props4.valueField,
			    _this$props4$displayF = _this$props4.displayField,
			    displayField = _this$props4$displayF === undefined ? "{refname}" : _this$props4$displayF;
			//20190417这里修改逻辑，如果filterUrl存在，使用下面逻辑，否则回调然后用户传数据进来

			if (!filterUrl) {
				_this.props.filterUrlFunc(content);
				return false;
			}
			if (!content) return;
			(0, _request.get)(filterUrl, _extends({}, param, {
				refCode: param.refCode,
				content: content
			})).then(function (response) {
				var data = response.data;

				var _getFilterData = getFilterData(data, valueField, displayField),
				    filterItems = _getFilterData.filterItems,
				    filterDataMap = _getFilterData.filterDataMap;

				_this.setState({
					filterItems: filterItems,
					filterDataMap: filterDataMap
				});
			});
		};

		_this.onChangeFormControl = function (value) {
			if (!_this.props.canInputGoOn(value)) return;
			_this.setState({
				filterText: value,
				filtering: true
			});
			_this.onFilter(value);
		};

		_this.onBlurFormControl = function () {
			_this.setState({
				filterText: '',
				filtering: Boolean(_this.selectFilter)
			});
		};

		_this.onFocusFormControl = function () {};

		_this.onFilterMouseEnter = function () {
			_this.selectFilter = true;
		};

		_this.onFilterMouseLeave = function () {
			_this.selectFilter = false;
		};

		_this.onMatchInitValue = function (checkedArray) {
			_this.setState({ checkedArray: checkedArray });
		};

		var valueMap = refValParse(props.value) || {};
		_this.state = {
			checkedArray: [],
			savedData: '',
			savedShow: valueMap.refname,
			filterText: '',
			filterItems: [],
			filterData: props.filterUrl ? [] : props.filterData || [],
			filterDataMap: {},
			filtering: false,
			showModal: false
		};
		_this.childrenComponent = _this.props.children;
		return _this;
	}

	RefCoreWithInput.prototype.componentDidMount = function componentDidMount() {}
	// this.setValues();
	// this.initComponent(this.props)

	// shouldComponentUpdate(nextProps, nextState){
	// 	return true;
	// }
	;

	RefCoreWithInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		var _props = this.props,
		    valueField = _props.valueField,
		    _props$displayField = _props.displayField,
		    displayField = _props$displayField === undefined ? "{refname}" : _props$displayField,
		    filterUrl = _props.filterUrl;

		if (nextProps.value !== this.props.value) {
			var valueMap = refValParse(nextProps.value) || {};
			// let { valueField } = this.props;
			var checkedArray = this.state.checkedArray;

			var diffValue = checkedArray.some(function (item) {
				return !Boolean(~valueMap.refpk.indexOf(item[valueField]));
			});
			if (!(0, _immutable.is)(this.state.filterData, nextProps.filterData) && !filterUrl) {
				var _getFilterData2 = getFilterData(nextProps.filterData, valueField, displayField),
				    filterItems = _getFilterData2.filterItems,
				    filterDataMap = _getFilterData2.filterDataMap;

				this.setState({
					filterItems: filterItems,
					filterDataMap: filterDataMap,
					filterData: nextProps.filterData,
					checkedArray: diffValue ? [] : checkedArray,
					savedShow: valueMap.refname
				}, function () {
					_this2.handleChange(nextProps.value);
				});
			} else {
				this.setState({
					checkedArray: diffValue ? [] : checkedArray,
					savedShow: valueMap.refname
				}, function () {
					_this2.handleChange(nextProps.value);
				});
			}
		} else {
			//filterUrl不存在，只传入filterData
			if (!(0, _immutable.is)(this.state.filterData, nextProps.filterData) && !filterUrl) {
				var _getFilterData3 = getFilterData(nextProps.filterData, valueField, displayField),
				    _filterItems = _getFilterData3.filterItems,
				    _filterDataMap = _getFilterData3.filterDataMap;

				this.setState({
					filterItems: _filterItems,
					filterDataMap: _filterDataMap,
					filterData: nextProps.filterData
				});
			}
			return false;
		}
		return true;
	};
	// componentWillReceiveProps(nextProp) {
	// 	if (nextProp.value !== this.props.value) {
	// 		this.initComponent(nextProp);
	// 	}
	// }

	/**
  * 点击打开参照弹出层时，做字段校验。
  */

	/**
  * 控制模糊匹配时选择匹配项文本框失去焦点后 blur 先于 click 触发造成的选择未生效问题
  */


	RefCoreWithInput.prototype.render = function render() {
		var _this3 = this;

		var _state = this.state,
		    savedShow = _state.savedShow,
		    savedData = _state.savedData,
		    filterItems = _state.filterItems,
		    filtering = _state.filtering,
		    filterText = _state.filterText,
		    checkedArray = _state.checkedArray,
		    showModal = _state.showModal;
		var _props2 = this.props,
		    displayField = _props2.displayField,
		    valueField = _props2.valueField,
		    form = _props2.form,
		    rules = _props2.rules,
		    className = _props2.className,
		    wrapClassName = _props2.wrapClassName,
		    disabled = _props2.disabled,
		    style = _props2.style,
		    placeholder = _props2.placeholder,
		    _props2$theme = _props2.theme,
		    theme = _props2$theme === undefined ? 'ref-red' : _props2$theme,
		    _props2$clearBut = _props2.clearBut,
		    clearBut = _props2$clearBut === undefined ? 'false' : _props2$clearBut;
		var _props$menuIcon = this.props.menuIcon,
		    menuIcon = _props$menuIcon === undefined ? _react2["default"].createElement(
			'span',
			{ className: 'uf uf-navmenu ' + (disabled ? 'ref-input-wrap-display' : '') },
			' '
		) : _props$menuIcon;

		var childrenProps = _extends(_extends({}, this.props), {
			showModal: showModal,
			checkedArray: checkedArray,
			onCancel: this.onCancelModal,
			onSave: this.onSaveModal,
			onMatchInitValue: this.onMatchInitValue
		});
		delete childrenProps.children;
		return _react2["default"].createElement(
			'div',
			{ className: 'ref-input-wrap ' + wrapClassName + ' ' + theme,
				style: _extends({}, style)
			},
			_react2["default"].createElement(
				_beeInputGroup2["default"],
				{ simple: true,
					style: {
						width: '100%'
					} },
				_react2["default"].createElement(_beeFormControl2["default"], _extends({
					disabled: disabled,
					type: 'text',
					style: {
						width: '100%'
					}
				}, savedShow ? { readOnly: "readonly" } : '', {
					placeholder: placeholder,
					value: filtering ? filterText : savedShow,
					onFocus: this.onFocusFormControl,
					onChange: this.onChangeFormControl,
					onBlur: this.onBlurFormControl
				})),
				_react2["default"].createElement(
					_beeInputGroup2["default"].Button,
					{ className: 'clear-icon', shape: 'border', onClick: function onClick() {
							return _this3.onSaveModal([]);
						} },
					_react2["default"].createElement('span', { className: 'uf uf-close-c ' + (disabled || !checkedArray.length || !clearBut ? 'hide' : '') })
				),
				_react2["default"].createElement(
					_beeInputGroup2["default"].Button,
					{ shape: 'border', onClick: this.handleClick },
					menuIcon
				)
			),
			_react2["default"].cloneElement(this.childrenComponent, childrenProps),
			_react2["default"].createElement(
				'div',
				{ className: 'ref-input-wrap-filter-panel', style: { display: filtering ? '' : 'none', width: style.width || 200 } },
				_react2["default"].createElement(
					'ul',
					{
						onClick: this.onClickFilterItem,
						onMouseEnter: this.onFilterMouseEnter,
						onMouseLeave: this.onFilterMouseLeave
					},
					filterItems.length ? filterItems.map(function (item) {
						return item;
					}) : _react2["default"].createElement(
						'li',
						{ className: 'ref-filter-empty' },
						'\u6CA1\u6709\u5339\u914D\u5230\u6570\u636E'
					)
				)
			)
		);
	};

	return RefCoreWithInput;
}(_react.Component);

RefCoreWithInput.propTypes = propTypes;
RefCoreWithInput.defaultProps = defaultProps;
exports["default"] = RefCoreWithInput;
module.exports = exports['default'];