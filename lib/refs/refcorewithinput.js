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

var _immutable = require('immutable');

require('../../css/refcorewithinput.css');

require('../utils/polyfill_shim.js');

var _menuSelector = require('menu-selector');

var _menuSelector2 = _interopRequireDefault(_menuSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

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
  param: _propTypes2["default"].object,
  style: _propTypes2["default"].object,
  displayField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].array]), //显示内容的键
  valueField: _propTypes2["default"].string, //真实 value 的键
  value: _propTypes2["default"].string,
  wrapClassName: _propTypes2["default"].string,
  canClickGoOn: _propTypes2["default"].func,
  canInputGoOn: _propTypes2["default"].func,
  filterUrl: _propTypes2["default"].string,
  filterData: _propTypes2["default"].array,
  filterUrlFunc: _propTypes2["default"].func
};

var defaultProps = {
  className: '',
  backdrop: true,
  style: {
    width: 300
  },
  param: {
    refCode: 'test_grid' //test_common||test_grid||test_tree||test_treeTable
  },
  onCancel: function onCancel(p) {},
  onSave: function onSave(sels) {},
  value: '',
  displayField: '{refname}', //显示内容的键
  valueField: 'refpk', //真实 value 的键
  //将 filterRefUrl 改为 mactchUrl
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

// const getFilterData = (data, valueField, displayField) => {
//   let filterItems = [], filterDataMap = {};
//   data.forEach(item => {
//     let values = item[valueField];
//     //displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
//     let names = '';
//     if (typeof displayField === 'function') {
//       names = displayField(item);
//     } else {
//       names = displayField.format(item);
//     }
//     filterItems.push(<FilterItem key={values} text={names} value={values} />);
//     filterDataMap[values] = item;
//   });
//   return { filterItems, filterDataMap }
// }

var RefCoreWithInput = function (_Component) {
  _inherits(RefCoreWithInput, _Component);

  function RefCoreWithInput(props) {
    _classCallCheck(this, RefCoreWithInput);

    // let valueMap = refValParse(props.value) || {};
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
        value: result,
        // savedData: values,
        // savedShow: names,
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

    _this.onClickFilterItem = function (status, id, item, selectedArray) {
      // e.stopPropagation();
      // let { dataset = {} } = e.target;
      // if (dataset.type !== 'filteritem') {
      //   return;
      // }
      // let { filterDataMap } = this.state;
      var _this$props3 = _this.props,
          _this$props3$displayF = _this$props3.displayField,
          displayField = _this$props3$displayF === undefined ? "{refname}" : _this$props3$displayF,
          valueField = _this$props3.valueField,
          onSave = _this$props3.onSave;
      // let filterDataItem = filterDataMap[dataset.value];
      // let savedData = filterDataItem[valueField];
      // //displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
      // let savedShow = '';
      // if (typeof displayField === 'function') {
      //   savedShow = displayField(filterDataItem);
      // } else {
      //   savedShow = displayField.format(filterDataItem);
      // }

      var ids = [];
      var names = selectedArray.map(function (item) {
        if (typeof displayField === 'function') {
          ids.push(item[valueField]);
          return displayField(item);
        } else {
          ids.push(item[valueField]);
          return displayField.format(item);
        }
      }).join(';');
      _this.setState({
        // savedData, savedShow,
        filtering: false,
        value: selectedArray,
        // checkedArray: [filterDataMap[dataset.value]]
        checkedArray: selectedArray
      }, function () {
        _this.handleChange((0, _stringify2["default"])({
          refname: names,
          refpk: ids.join(';'),
          selectedArray: selectedArray
        }));
        // onSave([filterDataItem]);
        onSave(selectedArray);
      });
    };

    _this.onDropdownVisibleChange = function (open) {
      if (open && !_this.state.showModal) {
        _this.onFilter(_this.props.searchValue);
      }
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
        // let { filterItems, filterDataMap } = getFilterData(data, valueField, displayField);

        _this.setState({
          filterData: data
          // filterItems,
          // filterDataMap
        });
      });
    };

    _this.onChangeFormControl = function (value) {
      if (!_this.props.canInputGoOn(value)) return;
      // this.setState({
      //   filterText: value,
      //   filtering: true
      // });
      _this.onFilter(value);
    };

    _this.onMatchInitValue = function (checkedArray) {
      _this.setState({ checkedArray: checkedArray });
    };

    _this.state = {
      checkedArray: [],
      value: props.value,
      // savedData: '',
      // savedShow: valueMap.refname,
      // filterText: '',
      // filterItems: [],
      filterData: props.filterUrl ? [] : props.filterData || [],
      // filterDataMap: {},
      // filtering: false,
      showModal: false
    };
    _this.childrenComponent = _this.props.children;
    return _this;
  }

  RefCoreWithInput.prototype.componentDidMount = function componentDidMount() {};

  RefCoreWithInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    // let { filterItems, filterDataMap } = this.getNewFilterData;
    if (nextProps.value !== this.state.value) {
      var valueMap = refValParse(nextProps.value) || {};
      var valueField = this.props.valueField;
      var checkedArray = this.state.checkedArray;

      var diffValue = checkedArray.some(function (item) {
        return !Boolean(~valueMap.refpk.indexOf(item[valueField]));
      });
      this.setState({
        checkedArray: diffValue ? [] : checkedArray,
        value: diffValue ? [] : checkedArray,
        savedShow: valueMap.refname,
        filterData: !nextProps.filterUrl ? nextProps.filterData : this.state.filterData
        // filterItems:!nextProps.filterUrl ?filterItems : this.state.filterItems,
        // filterDataMap:!nextProps.filterUrl ?filterDataMap:this.state.filterDataMap,
      }, function () {
        _this2.handleChange(nextProps.value, _this2.state.checkedArray);
      });
    } else {
      this.setState({
        filterData: !nextProps.filterUrl ? nextProps.filterData : this.state.filterData
        // filterItems:filterItems,
        // filterDataMap:filterDataMap,
      });
      return false;
    }
    return true;
  };

  // getNewFilterData= (nextProps) =>{
  //   let  filterItems=[], filterDataMap = {};
  //   if (!is(this.state.filterData, nextProps.filterData) && !this.props.filterUrl) {
  //         return getFilterData(nextProps.filterData, valueField, displayField)
  //   }
  //   return { filterItems,filterDataMap};
  // }

  /**
   * 点击打开参照弹出层时，做字段校验。
   */


  // onBlurFormControl = () => {
  //   this.setState({
  //     filterText: '',
  //     filtering: Boolean(this.selectFilter)
  //   });

  // }

  // onFocusFormControl = () => {
  // }
  /**
   * 控制模糊匹配时选择匹配项文本框失去焦点后 blur 先于 click 触发造成的选择未生效问题
   */
  // onFilterMouseEnter = () => {
  //   this.selectFilter = true;
  // }
  // onFilterMouseLeave = () => {
  //   this.selectFilter = false;
  // }

  RefCoreWithInput.prototype.render = function render() {
    var _state = this.state,
        savedShow = _state.savedShow,
        savedData = _state.savedData,
        filterItems = _state.filterItems,
        filtering = _state.filtering,
        filterText = _state.filterText,
        checkedArray = _state.checkedArray,
        showModal = _state.showModal,
        filterData = _state.filterData;
    var _props = this.props,
        displayField = _props.displayField,
        valueField = _props.valueField,
        form = _props.form,
        rules = _props.rules,
        className = _props.className,
        wrapClassName = _props.wrapClassName,
        disabled = _props.disabled,
        style = _props.style,
        searchValue = _props.searchValue,
        placeholder = _props.placeholder,
        _props$theme = _props.theme,
        theme = _props$theme === undefined ? 'ref-red' : _props$theme,
        multiple = _props.multiple,
        _props$selectorDispla = _props.selectorDisplay,
        selectorDisplay = _props$selectorDispla === undefined ? '{refname}' : _props$selectorDispla;
    var value = this.state.value;


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
      _react2["default"].createElement(_menuSelector2["default"], {
        style: {
          width: '100%'
        },
        transitionName: 'rc-tree-select-dropdown-slide-up',
        choiceTransitionName: 'rc-tree-select-selection__choice-zoom',
        showSearch: true,
        allowClear: true,
        showMenuIcon: true,
        disabled: disabled,
        placeholder: placeholder,
        value: value,
        onSearch: this.onChangeFormControl,
        onMenuIconClick: this.handleClick,
        searchValue: searchValue,
        valueList: filterData,
        onSelectorChange: this.onClickFilterItem,
        displayField: displayField,
        valueField: valueField,
        className: className,
        multiple: multiple,
        inputDisplay: selectorDisplay,
        onDropdownVisibleChange: this.onDropdownVisibleChange
      }),
      _react2["default"].cloneElement(this.childrenComponent, childrenProps)
    );
  };

  return RefCoreWithInput;
}(_react.Component);

RefCoreWithInput.propTypes = propTypes;
RefCoreWithInput.defaultProps = defaultProps;
exports["default"] = RefCoreWithInput;
module.exports = exports['default'];