import {
	hasSession
} from './api/Java110SessionApi.js'

import java110Config from './Java110Config.js'

import {
	wxuuid
} from './utils/SeqUtil.js'

import {
	getDateYYYYMMDDHHMISS
} from './utils/DateUtil.js'

export default {
	/**
	 * 请求
	 * @param {Object} _reqObj 请求内容
	 */
	request: function(_reqObj) {
		//检查是否登录成功
		hasSession()
			.then((_data) => {
				//重写token
				// #ifndef H5
				_reqObj.header.cookie = '_java110_token_=' + uni.getStorageSync('token');
				// #endif
				//console.log(_reqObj);

				let _success = _reqObj.success;
				let _fail = _reqObj.fail;
				//todo 拦截成功
				_reqObj.success = function(_res) {
					if (_res.statusCode == 401) {
						uni.reLaunch({
							url: '/pages/login/login'
						});
						return;
					}
					if(!_success){
						return;
					}
					_success(_res);
				}
				//todo 拦截失败
				_reqObj.fail = function(_res) {
					if (_res.statusCode == 401) {
						uni.reLaunch({
							url: '/pages/login/login'
						});
						return;
					}
					if(!_fail){
						return;
					}
					_fail(_res);
				}

				uni.request(_reqObj);
			}, err => {
				//跳转至登录页面
				uni.reLaunch({
					url: '/pages/login/login'
				});
			})

	}
}

/**
 * 获取 header 
 */
export function getHeaders() {
	return {
		'app-id': java110Config.AppId,
		'transaction-id': wxuuid(),
		'req-time': getDateYYYYMMDDHHMISS(),
		'sign': '1234567',
		'user-id': '-1',
		'X-Requested-With': 'XMLHttpRequest',
		// #ifndef H5
		cookie: '_java110_token_=' + uni.getStorageSync('token')
		// #endif
	};
};

export function requestNoAuth(_reqObj) {
	//这里判断只有在 post 方式时 放加载框
	if (_reqObj.hasOwnProperty("method") && "POST" == _reqObj.method) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		_reqObj.complete = function() {
			uni.hideLoading();
		}
	}
	let _headers = getHeaders();
	if (_reqObj.hasOwnProperty('header')) {
		let _header = _reqObj.header;
		for (let key in _headers) {
			_header.key = _headers[key];
		}
	} else {
		_reqObj.header = _headers;
	}
	// #ifndef H5
	_reqObj.header.cookie = '_java110_token_=' + wx.getStorageSync('token');
	// #endif
	uni.request(_reqObj);
}