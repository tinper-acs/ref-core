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

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _beeTable = require('bee-table');

var _beeTable2 = _interopRequireDefault(_beeTable);

var _beeCheckbox = require('bee-checkbox');

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _beePagination = require('bee-pagination');

var _beePagination2 = _interopRequireDefault(_beePagination);

require('bee-table/build/Table.css');

require('bee-checkbox/build/Checkbox.css');

require('bee-pagination/build/Pagination.css');

require('../../css/refcoretable.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }
// import {Table,Checkbox,Pagination} from 'tinper-bee';


var RefCoreTable = function (_Component) {
  _inherits(RefCoreTable, _Component);

  function RefCoreTable(props) {
    _classCallCheck(this, RefCoreTable);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onAllCheckChange = function () {
      var self = _this;
      var checkedArray = [];
      var listData = self.state.data.concat();
      for (var i = 0; i < self.state.checkedArray.length; i++) {
        checkedArray[i] = !self.state.checkedAll;
      }
      self.setState({
        checkedAll: !self.state.checkedAll,
        checkedArray: checkedArray
      });
      var a = listData.slice().filter(function (v, k) {
        return checkedArray[k] == true;
      });
      _this.onSelectTableItems(a);
    };

    _this.onCheckboxChange = function (text, record, index) {
      var self = _this;
      var allFlag = false;
      var checkedArray = self.state.checkedArray.concat();
      checkedArray[index] = !self.state.checkedArray[index];
      for (var i = 0; i < self.state.checkedArray.length; i++) {
        if (checkedArray[i] == false) {
          allFlag = false;
          break;
        } else {
          allFlag = true;
        }
      }
      self.setState({
        checkedAll: allFlag,
        checkedArray: checkedArray
      });
      var a = _this.state.data.slice().filter(function (v, k) {
        return checkedArray[k] == true;
      });
      _this.onSelectTableItems(a);
    };

    _this.clickRowHandler = function (record, index, event) {
      var checkedArray = _this.state.checkedArray.concat();
      if (_this.props.multiple) {
        checkedArray = checkedArray.map(function (v, k) {
          if (k !== index) {
            return false;
          }
        });
      }
      checkedArray[index] = !_this.state.checkedArray[index];
      _this.setState({
        checkedArray: checkedArray
      });
      var a = _this.state.data.slice().filter(function (v, k) {
        return checkedArray[k] == true;
      });

      _this.onSelectTableItems(a);
    };

    _this.clickRowDoubleHandler = function (record, index, event) {
      var checkedArray = _this.state.checkedArray.concat();
      if (_this.props.multiple) {
        checkedArray = checkedArray.map(function (v, k) {
          if (k !== index) {
            return false;
          }
          return true;
        });
        checkedArray[index] = !_this.state.checkedArray[index];
        _this.setState({
          checkedArray: checkedArray
        });
        _this.onSelectTableItems(_this.state.data.slice().filter(function (v, k) {
          return checkedArray[k] == true;
        }), 'multiple');
        // setTimeout(()=>{
        //   this.onClickBtn('save');
        // },100)
      }
    };

    _this.rowClassNameHandler = function (record, index, indent) {
      if (_this.state.checkedArray[index]) {
        if (_this.props.multiple) {
          return 'selected';
        } else {
          return '';
        }
      } else {
        return '';
      }
    };

    _this.onSelectTableItems = _this.onSelectTableItems.bind(_this);
    _this.onClickBtn = _this.onClickBtn.bind(_this);
    return _this;
  }

  // initScroll = (refTable) => {
  //   // 监听滚动加载u-table-tbody
  //   let self = this;
  //   refTable.addEventListener('scroll', self.props.onSendData(refTable), false);
  // }

  //选择列表参数


  RefCoreTable.prototype.componentDidMount = function componentDidMount() {
    var refTable = _reactDom2["default"].findDOMNode(this.refTable).getElementsByClassName('u-table-body')[0];
    if (!this.props.hasPage && refTable) {
      this.props.onSendData(refTable);
    } else {
      //todo nothing
    }
  };

  RefCoreTable.prototype.handleSelect = function handleSelect(eventKey) {
    this.props.handlePageSelect(eventKey);
  };

  RefCoreTable.prototype.onSelectTableItems = function onSelectTableItems(v, autoSave) {
    this.props.onTableSelect(v, autoSave);
  };

  RefCoreTable.prototype.onClickBtn = function onClickBtn(v) {
    this.props.onClickBtn(v);
  };
  //全选/全不选

  //对某一个checkbox的点击事件


  RefCoreTable.prototype.renderColumnsMultiSelect = function renderColumnsMultiSelect(columns) {
    var self = this;
    var _state = this.state,
        data = _state.data,
        checkedArray = _state.checkedArray;
    var multiSelect = this.props.multiSelect;

    var select_column = {};
    var indeterminate_bool = false;
    if (!this.props.multiple) {
      if (multiSelect && multiSelect.type === "checkbox") {
        var i = checkedArray.length - 1;
        while (i >= 0) {
          if (checkedArray[i]) {
            indeterminate_bool = true;
            break;
          }
          i--;
        } //判断是否有部分选中
        var defaultColumns = [{
          title: _react2["default"].createElement(_beeCheckbox2["default"], {
            className: 'table-checkbox',
            checked: this.state.checkedAll,
            indeterminate: indeterminate_bool && !this.state.checkedAll,
            onChange: this.onAllCheckChange
          }),
          key: "checkbox",
          dataIndex: "checkbox",
          width: "5%",
          render: function render(text, record, index) {
            return _react2["default"].createElement(_beeCheckbox2["default"], {
              className: 'table-checkbox',
              checked: checkedArray[index],
              onChange: self.onCheckboxChange.bind(this, text, record, index),
              onClick: function onClick(e) {
                return e.stopPropagation();
              }
            });
          }
        }];
        columns = defaultColumns.concat(columns);
      }
    } else {
      columns = [{ key: "radio", width: '5%' }].concat(columns);
    }
    return columns;
  };

  RefCoreTable.prototype.render = function render() {
    var _this2 = this;

    var _props$data = this.props.data,
        _props$data$listData = _props$data.listData,
        listData = _props$data$listData === undefined ? [] : _props$data$listData,
        _props$data$cols = _props$data.cols,
        cols = _props$data$cols === undefined ? [] : _props$data$cols;

    var selectedArray = this.props.selectedArray;
    var tabActiveKey = this.props.tabActiveKey;
    var language = this.props.language;
    var len = listData.length;
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
    var checkedArrayCreater = new Array(len).fill(false);
    function ifInSelected(v, selectedArray) {
      var flag = false;
      selectedArray.forEach(function (val) {
        if (val.key == v.key || val.refpk == v.key) flag = true;
      });
      return flag;
    }
    listData.slice().forEach(function (v, k) {
      ifInSelected(v, selectedArray) ? checkedArrayCreater[k] = true : checkedArrayCreater[k] = false;
    });
    var data = null,
        checkedArray = null;
    if (tabActiveKey == '__selected') {
      //data = listData.filter((v,k)=>{return ifInSelected(v,selectedArray)});
      data = selectedArray;
      checkedArray = data.slice().forEach(function (v, k) {
        ifInSelected(v, selectedArray) ? checkedArrayCreater[k] = true : checkedArrayCreater[k] = false;
      });
    } else {
      data = listData;
      checkedArray = checkedArrayCreater;
    }
    var ifAllSelected = checkedArrayCreater.indexOf(false) > -1;
    this.state = {
      checkedAll: !ifAllSelected && data.length != 0, //data.length == selectedArray.length 
      checkedArray: checkedArrayCreater,
      data: data
    };
    var columns = this.renderColumnsMultiSelect(cols);
    var option = {
      scroll: { y: 270 },
      emptyText: function emptyText() {
        return nodata;
      },
      style: { 'height': 301 }
    };
    return _react2["default"].createElement(
      'div',
      { className: 'tableCon' },
      _react2["default"].createElement(
        'div',
        { className: 'ref-core-table' },
        _react2["default"].createElement(_beeTable2["default"], _extends({}, option, { ref: function ref(el) {
            return _this2.refTable = el;
          },
          columns: columns,
          data: this.state.data,
          rowClassName: this.rowClassNameHandler,
          onRowClick: this.clickRowHandler,
          onRowDoubleClick: this.clickRowDoubleHandler
        }))
      ),
      this.props.hasPage && _react2["default"].createElement(
        'div',
        { className: 'ref-core-table-pagination-wrap' },
        _react2["default"].createElement(_beePagination2["default"], {
          first: true, last: true, prev: true, next: true, boundaryLinks: true,
          items: this.props.pageCount,
          size: 'sm',
          maxButtons: 5,
          activePage: this.props.curPage + 1,
          onSelect: this.handleSelect.bind(this)
        })
      )
    );
  };

  return RefCoreTable;
}(_react.Component);

RefCoreTable.defaultProps = {
  prefixCls: "bee-table",
  multiSelect: {
    type: "checkbox",
    param: "key"
  }
};
exports["default"] = RefCoreTable;
module.exports = exports['default'];