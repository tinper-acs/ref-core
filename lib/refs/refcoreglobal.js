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

require('../utils/polyfill_shim.js');

var _request = require('../utils/request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

var RefCoreGlobal = function (_Component) {
    _inherits(RefCoreGlobal, _Component);

    function RefCoreGlobal(props) {
        _classCallCheck(this, RefCoreGlobal);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            // checkedArray: props.checkedArray,
        };
        return _this;
    }

    RefCoreGlobal.prototype.componentDidMount = function componentDidMount() {
        // var self = this;
        // var { refType , checkedArray } = this.props;
        // var tempCheckedArray = checkedArray;
        // if(this.props.onBeforeAjax){
        //     this.props.onBeforeAjax('begin')
        // }
        // //对checkedArray作判断
        // function ajaxWrap(val){
        //     var value = {};
        //     var url = option.refModelUrl.totalDataUrl
        //     fetchJ(url,{
        //         ...option.param,
        //         pk_val:val,
        //     })
        //     // .then( (response) => { return JSON.parse(response); })
        //     .then( ({ data }) => {
        //         var checkedArray = data.filter(({refpk})=>{
        //             return tempCheckedArray.indexOf(refpk)>-1
        //         })
        //         checkedArray = checkedArray.map((v,k)=>{
        //             v.key = v.refpk;
        //             return v
        //         })
        //         self.setState({
        //             checkedArray,
        //         })
        //         // return checkedArray;
        //     })
        //     .catch(()=>{
        //         self.setState({
        //             checkedArray:[]
        //         })
        //     })
        // }
        // if(!checkedArray || checkedArray==[] || checkedArray.length === 0 ){
        //     checkedArray = [];
        // }else{
        //     if(typeof(checkedArray[0]) === 'object'){
        //         //todo nothing
        //     }else{
        //         ajaxWrap(checkedArray);
        //     }
        // }
    };

    RefCoreGlobal.prototype.render = function render() {
        // var { checkedArray } = this.state;
        return _react2["default"].createElement(
            'div',
            null,
            _react2["default"].cloneElement(this.props.children, _extends({}, this.props))
        );
    };

    return RefCoreGlobal;
}(_react.Component);

exports["default"] = RefCoreGlobal;
module.exports = exports['default'];