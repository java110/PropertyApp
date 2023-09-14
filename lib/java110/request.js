
import {hasSession} from './api/Java110SessionApi.js'

import java110Config from './Java110Config.js'

import {wxuuid} from './utils/SeqUtil.js'

import {getDateYYYYMMDDHHMISS} from './utils/DateUtil.js'

export default{
	/**
	 * 请求
	 * @param {Object} _reqObj 请求内容
	 */
	request:function(_reqObj) {
		//检查是否登录成功
		hasSession()
		.then((_data)=>{
			//重写token
			// #ifndef H5
			_reqObj.header.cookie = '_java110_token_=' + uni.getStorageSync('token'); 
			// #endif
			//console.log(_reqObj);
			uni.request(_reqObj);
		})
		
	}
}

/**
 * 获取 header 
 */
export function getHeaders(){
	return {
		'app-id': java110Config.AppId,
		'transaction-id': wxuuid(),
		'req-time': getDateYYYYMMDDHHMISS(),
		'sign': '1234567',
		'user-id': '-1',
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