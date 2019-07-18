'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof _symbol2["default"] === "function" && typeof _iterator2["default"] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] && obj !== _symbol2["default"].prototype ? "symbol" : typeof obj; };

exports.post = post;
exports.get = get;
exports.fetchJ = fetchJ;

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchTools = {
  params: function params(_params) {
    try {
      return (0, _keys2["default"])(_params).map(function (key) {
        var param = _params[key];
        switch (typeof param === 'undefined' ? 'undefined' : _typeof(param)) {
          case 'object':
            param = escape((0, _stringify2["default"])(param));
            break;
          case 'undefined':
            param = '';
            break;
          default:
            break;
        }
        return key + '=' + param;
      }).join('&');
    } catch (e) {
      // console.log('error in urlParams');
      return '';
    }
  },
  fetch: function (_fetch) {
    function fetch(_x, _x2) {
      return _fetch.apply(this, arguments);
    }

    fetch.toString = function () {
      return _fetch.toString();
    };

    return fetch;
  }(function (url, options) {
    return fetch(url, options).then(function (response) {
      if (response.ok) {
        return response.text().then(function (text) {
          try {
            return JSON.parse(text);
          } catch (e) {
            return _promise2["default"].reject(new Error('接口返回数据无法解析'));
          }
        });
      }
      return _promise2["default"].reject(new Error('请求失败'));
    }, function (error) {
      throw error;
    });
  }),
  options: function options() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'get';

    var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return _extends({
      method: method.toUpperCase(),
      // credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }, _options);
  }
};

function post(url) {
  var oriParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fetch = fetchTools.fetch,
      options = fetchTools.options;

  try {
    return fetch(url, options('post', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: (0, _stringify2["default"])(oriParams)
    }));
  } catch (e) {
    return _promise2["default"].reject(e);
  }
}

function get(url) {
  var oriParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var params = fetchTools.params,
      fetch = fetchTools.fetch,
      options = fetchTools.options;


  var data = params(oriParams);

  if (data) {
    return fetch(url + '?' + data, options());
  }
  return fetch(url, options());
}

function fetchJ(url) {
  var oriParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var params = fetchTools.params,
      fetch = fetchTools.fetch,
      options = fetchTools.options;


  var data = params(oriParams);

  return (0, _fetchJsonp2["default"])(url + '?' + data).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log('parsed json', json);
    return json;
  })["catch"](function (ex) {
    console.log('parsing failed', ex);
  });
}

exports["default"] = function (url, options) {
  return (0, _axios2["default"])({
    method: options.method,
    url: url,
    data: options.data,
    params: options.param
  })["catch"](function (err) {
    console.log(err);
  });
};

// var csrfDefense = function(){
// 	window.x_xsrf_token = "";
// 	window.random_num = Math.random();
// 	$.ajaxSetup({
// 		cache:false,
// 		beforeSend: function (xhr) {
// 			xhr.setRequestHeader('x-xsrf-token', x_xsrf_token);//added by yany head名称不能下划线
// 			xhr.setRequestHeader('random-num', random_num);
// 			var centerContent='<i class="uf uf-fluffycloudsilhouette u-loader-centerContent"></i>';
// 			var opt1={
// 				hasback:true,
// 				hasDesc:true,//是否含有加载内容描述
// 				centerContent:centerContent
// 			};
// 			u.showLoader(opt1);
// 		},
// 		complete: function (xhr, status) {
// 			setTimeout("u.hideLoader({hasback:true});",200 );
// 			var inner_x_xsrf_token = xhr.getResponseHeader('x-xsrf-token');//added by yany
// 			if(inner_x_xsrf_token && inner_x_xsrf_token != ""){
// 				window.x_xsrf_token = inner_x_xsrf_token;
// 			}
// 		}
// 	});
// }