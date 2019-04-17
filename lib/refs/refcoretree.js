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

var _beeTree = require('bee-tree');

var _beeTree2 = _interopRequireDefault(_beeTree);

require('bee-tree/build/Tree.css');

var _immutable = require('immutable');

require('../utils/polyfill_shim.js');

require('../../css/refcoretree.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }
// import {Tree} from 'tinper-bee';


var TreeNode = _beeTree2["default"].TreeNode;


var nodeKeysFunc = function nodeKeysFunc(item, index) {
	return item.id || index;
};

var RefCoreTree = function (_Component) {
	_inherits(RefCoreTree, _Component);

	function RefCoreTree(props) {
		_classCallCheck(this, RefCoreTree);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onMouseEnter = function (e) {

			// return
			_this.setState({
				isHover: e.node.props.eventKey
			});
		};

		_this.onDoubleClick = function (record, index, event) {

			_this.props.onDoubleClick(record, index, event);
		};

		_this.onMouseLeave = function (e, treenode) {

			// return
			_this.setState({
				isHover: "",
				editKey: ""
			});
		};

		_this.loop = function (datas) {
			var _this$props = _this.props,
			    checkable = _this$props.checkable,
			    _this$props$nodeKeys = _this$props.nodeKeys,
			    nodeKeys = _this$props$nodeKeys === undefined ? nodeKeysFunc : _this$props$nodeKeys,
			    _this$props$displayFi = _this$props.displayField,
			    displayField = _this$props$displayFi === undefined ? "refname" : _this$props$displayFi;

			return datas.map(function (item, i) {
				var key = nodeKeys(item, i);
				var text = '';
				if (typeof displayField === 'function') {
					text = displayField(item);
				} else {
					text = displayField.format(item);
				}
				if (item.children && item.children.length) {
					return _react2["default"].createElement(
						TreeNode,
						{ className: 'ref-core-tree-node', key: key, title: _react2["default"].createElement(
								'div',
								{ className: 'ref-core-tree-node-text' },
								text,
								checkable ? '' : _react2["default"].createElement('i', { className: 'ref-core-tree-node-selected' })
							), attr: item, isLeaf: !!item.isLeaf },
						_this.loop(item.children)
					);
				}
				return _react2["default"].createElement(TreeNode, { className: 'ref-core-tree-node', key: key, title: _react2["default"].createElement(
						'div',
						{ className: 'ref-core-tree-node-text' },
						text,
						checkable ? '' : _react2["default"].createElement('i', { className: 'ref-core-tree-node-selected' })
					), attr: item, isLeaf: !!item.isLeaf });
			});
		};

		_this.state = {
			isHover: "",
			editKey: "",
			checkedKey: []
		};
		_this.children = [];
		_this.children = _this.loop(props.data || []);
		return _this;
	}

	RefCoreTree.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextState) {
		if (!(0, _immutable.is)(nextState, this.state) || !(0, _immutable.is)(nextProps, this.props)) {
			this.children = this.loop(nextProps.data || []);
			return true;
		} else {
			return false;
		}
	};

	RefCoreTree.prototype.checkAllchildren = function checkAllchildren(v, id) {
		// return
		var _state = this.state,
		    checkedKey = _state.checkedKey,
		    isHover = _state.isHover;

		if (v) {
			checkedKey.push(id);
		} else {
			checkedKey.splice(id, 1);
		}
		this.setState({
			checkedKey: checkedKey
		});
		this.props.checkAllchildrenFun(v, id);
	};

	// looploadData = datas => {

	// 	let { parentNodeDisableCheck } = this.props;
	// 	return datas.map((item) => {
	// 		if (item.children && item.children.length) {
	// 			return <TreeNode className="ref-core-tree-node" key={item.id} title={item.refname} attr={item} disableCheckbox={parentNodeDisableCheck}>{this.looploadData(item.children)}</TreeNode>;
	// 		}
	// 		return <TreeNode className="ref-core-tree-node"  key={item.id} title={item.refname} attr={item} isLeaf={item.isLeaf} />;
	// 	});
	// }
	RefCoreTree.prototype.render = function render() {
		var _props = this.props,
		    data = _props.data,
		    _props$show = _props.show,
		    show = _props$show === undefined ? true : _props$show,
		    others = _objectWithoutProperties(_props, ['data', 'show']);

		return _react2["default"].createElement(
			'div',
			{ className: 'ref-core-tree ' + (show ? '' : 'ref-core-tree-hide') },
			_react2["default"].createElement(
				_beeTree2["default"],
				_extends({}, others, { onMouseLeave: this.onMouseLeave, onMouseEnter: this.onMouseEnter, onDoubleClick: this.onDoubleClick.bind(this) }),
				this.children.map(function (item) {
					return item;
				})
			)
		);
	};

	return RefCoreTree;
}(_react.Component);

exports["default"] = RefCoreTree;
module.exports = exports['default'];