'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRefInput = exports.createRefModal = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

//监听者模式对象
function Listenter() {
    this.events = {};
    this.on = function (type, handler) {
        if (typeof this.events[type] == "undefined") {
            this.events[type] = [];
        }
        this.events[type].push(handler);
    };
    this.fire = function (event) {
        if (this.events[event] instanceof Array) {
            var events = this.events[event];
            for (var i = 0, len = events.length; i < len; i++) {
                events[i](event);
            }
        }
    };
    return this;
}

//监听队列
var Queue = {};

//用于监听触发时间的 ReactJS 容器

var Container = function (_Component) {
    _inherits(Container, _Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

        _this2.onCancelModal = function (p) {
            var onCancel = _this2.props.onCancel;

            _this2.setState({
                showModal: false
            });
            if (onCancel) {
                onCancel();
            }
        };

        _this2.onSaveModal = function (record) {
            var onSave = _this2.props.onSave;

            _this2.setState({
                checkedArray: record,
                showModal: false
            });
            if (onSave) {
                onSave(record);
            }
        };

        _this2.state = props;
        return _this2;
    }

    Container.prototype.componentDidMount = function componentDidMount() {
        var _this3 = this;

        var _this = this;
        var listener = Queue[this.props.eventId].listener;

        if (!listener) {
            listener = Queue[this.props.eventId] = new Listenter();
        }
        listener.on("show", function () {
            _this.setState({
                showModal: true
            });
        });
        listener.on("hide", function () {
            _this.setState({
                showModal: false
            }, function () {
                var onCancel = _this3.props.onCancel;

                if (onCancel) {
                    onCancel();
                }
            });
        });
    };

    Container.prototype.render = function render() {
        var children = this.props.children;

        return _react2["default"].cloneElement(children, _extends({}, this.state, {
            onSave: this.onSaveModal,
            onCancel: this.onCancelModal
        }));
    };

    return Container;
}(_react.Component);

function createRefInput(selector, component, props) {
    var dom = document.getElementById(selector);
    var destory = function destory() {
        try {
            dom.parentNode.removeChild(dom);
        } catch (e) {
            console.log(e);
        }
    };

    _reactDom2["default"].render(_react2["default"].cloneElement(component, _extends({}, props)), dom);
    return {
        destory: destory,
        dom: dom
    };
};

function createRefModal(_ref, callback) {
    var component = _ref.component,
        props = _objectWithoutProperties(_ref, ['component']);

    var modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);
    //随机生成队列ID
    var eventId = 'listener-' + Math.random();

    Queue[eventId] = new Listenter();
    var param = {
        show: function show() {
            if (!Queue[eventId]) {
                return false;
            } else {
                Queue[eventId].fire('show');
                return true;
            }
        },
        hide: function hide() {
            if (!Queue[eventId]) {
                return false;
            } else {
                Queue[eventId].fire('hide');
                return true;
            }
        },
        destory: function destory() {
            if (!Queue[eventId]) {
                return false;
            } else {
                delete Queue[eventId];
                return true;
            }
        }
    };
    _reactDom2["default"].render(_react2["default"].createElement(
        Container,
        _extends({}, props, {

            eventId: eventId
        }),
        _react2["default"].cloneElement(component)
    ), modalContainer, function () {
        if (typeof callback === 'function') {
            callback(param);
        }
    });
    return param;
}

exports.createRefModal = createRefModal;
exports.createRefInput = createRefInput;