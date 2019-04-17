import fetchJsonp from 'fetch-jsonp';
import axios from "axios";

const fetchTools = {
  params(params) {
    try {
      return Object.keys(params).map((key) => {
        let param = params[key];
        switch (typeof param) {
          case 'object':
            param = escape(JSON.stringify(param));
            break;
          case 'undefined':
            param = '';
            break;
          default:
            break;
        }
        return `${key}=${param}`;
      }).join('&');
    } catch (e) {
      // console.log('error in urlParams');
      return '';
    }
  },
  fetch(url, options) {
    return fetch(url, options).then(
      (response) => {
        if (response.ok) {
          return response.text().then((text) => {
            try {
              return JSON.parse(text);
            } catch (e) {
              return Promise.reject(new Error('接口返回数据无法解析'));
            }
          });
        }
        return Promise.reject(new Error('请求失败'));
      },
      (error) => {
        throw error;
      },
    );
  },
  options(method = 'get', options = {}) {
    return {
      method: method.toUpperCase(),
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      ...options,
    };
  },
};

export function post(url, oriParams = {}) {
  const {
    fetch,
    options,
  } = fetchTools;
  try {
    return fetch(
      url,
      options(
        'post',
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(oriParams),
        },
      ),
    );
  } catch (e) {
    return Promise.reject(e);
  }
}

export function get(url, oriParams = {}) {
  const {
    params,
    fetch,
    options,
  } = fetchTools;

  const data = params(oriParams);

  if (data) {
    return fetch(`${url}?${data}`, options());
  }
  return fetch(url, options());
}

export function fetchJ(url, oriParams = {}) {
  const {
    params,
    fetch,
    options,
  } = fetchTools;

  const data = params(oriParams);
  
  return fetchJsonp(`${url}?${data}`)
  .then((response)  =>{
    return response.json()
  }).then((json)=> {
    console.log('parsed json', json)
    return json
  }).catch((ex) =>{
    console.log('parsing failed', ex)
  })
}
export default (url, options) => {
  return axios({
      method: options.method,
      url: url,
      data: options.data,
      params: options.param
  }).catch(function (err) {
      console.log(err);
  });
}


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