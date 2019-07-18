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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../../css/refcoretab.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    show: _propTypes2["default"].bool,
    onSelectTabItem: _propTypes2["default"].func,
    selectedData: _propTypes2["default"].array,
    selecteing: _propTypes2["default"].bool
};

var defaultProps = {
    show: true,
    onSelectTabItem: function onSelectTabItem() {},
    selectedData: [],
    selecteing: true
};

var RefCoreTab = function (_Component) {
    _inherits(RefCoreTab, _Component);

    function RefCoreTab(props) {
        _classCallCheck(this, RefCoreTab);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onSelectTabItem = function () {
            var _this$props = _this.props,
                onSelectTabItem = _this$props.onSelectTabItem,
                selectedData = _this$props.selectedData,
                selecteing = _this$props.selecteing;

            onSelectTabItem(selectedData, selecteing ? 'selected' : 'selecting');
        };

        _this.Alreadychosen = '';
        _this.Hidechosen = '';

        var language = props.language;

        switch (language) {
            case "zh_CN":
                _this.Alreadychosen = '已选';
                _this.Hidechosen = "收起已选";
                break;
            case "en_US":
                _this.Alreadychosen = 'chosen';
                _this.Hidechosen = "Hide";
                break;
            case "zh_TW":
                _this.Alreadychosen = '已選';
                _this.Hidechosen = "收起已選";
                break;
            case "fr_FR":
                _this.Alreadychosen = 'Choisissez';
                _this.Hidechosen = "Cacher";
                break;
            case "de_DE":
                _this.Alreadychosen = 'Gewählt Hat';
                _this.Hidechosen = "Versteckt";
                break;
            case "ja_JP":
                _this.Alreadychosen = '選択した';
                _this.Hidechosen = "隠して";
                break;
            default:
                _this.Alreadychosen = '已选';
                _this.Hidechosen = "收起已选";
        }
        return _this;
    }

    RefCoreTab.prototype.render = function render() {
        var _props = this.props,
            className = _props.className,
            selectedData = _props.selectedData,
            show = _props.show,
            selecteing = _props.selecteing;

        return _react2["default"].createElement(
            'div',
            { className: 'ref-tabs-panel ' + (show ? '' : 'ref-tabs-hide') + ' ' + className },
            this.props.children,
            _react2["default"].createElement(
                'a',
                { className: 'selectedItemSum',
                    onClick: this.onSelectTabItem },
                !selecteing ? this.Hidechosen : this.Alreadychosen + ('\uFF1A' + selectedData.length)
            )
        );
    };

    return RefCoreTab;
}(_react.Component);

RefCoreTab.propTypes = propTypes;
RefCoreTab.defaultProps = defaultProps;
exports["default"] = RefCoreTab;
module.exports = exports['default'];