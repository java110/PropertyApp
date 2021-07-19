import request from './request.js';
import util from './utils/util.js';
import date from './utils/date.js';
import {hasSession} from './api/Java110SessionApi.js'

import {getHeaders} from './api/SystemApi.js'

export default { 
	getHeaders : getHeaders,
	//检查是否登录
	checkLogin:function(){
		return hasSession();
	},
	/**
	 * 清理所有缓存
	 */
	clearAll:function(){
		uni.clearStorage();
	},
	/**
	 * 从磁盘中获取json 
	 * @param {Object} _key 键值
	 */
	getJson:function(_key){
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return JSON.parse(value);
			}
		} catch (e) {
			// error
			return null;
		}
	},
	/**
	 * 磁盘中存储
	 * @param {Object} key 键
	 * @param {Object} value 值
	 */
	setData:function(key, value) {
		try {
			uni.setStorageSync(key, value);
		} catch (e) {
			// error
		}
	},
	/**
	 * 存磁盘中获取数据
	 * @param {Object} key 键
	 */
	getData : function(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return value;
			}
		} catch (e) {
			// error
			return null;
		}
	},
	/**
	 * 设置json 数据
	 * @param {Object} key 键
	 * @param {Object} value json 对象
	 */
	setJson : function(key, value) {
		let jsonString = JSON.stringify(value);
		try {
			uni.setStorageSync(key, jsonString);
		} catch (e) {
			// error
		}
	},
	
	/**
	 * 发起请求
	 * @param {Object} _reqObj 请求内容
	 */
	request:function(_reqObj){
		if(!_reqObj.hasOwnProperty("header")){
			_reqObj.header = this.getHeaders()
		}
		//检查是否登录成功
		request.request(_reqObj);
	},
	/**
	 * get 请求
	 * @param {Object} _reqObj 请求内容
	 */
	get:function(_reqObj){
		_reqObj.method = 'GET';
		this.request(_reqObj);	
	},
	/**
	 * post 请求
	 * @param {Object} _reqObj 请求内容
	 */
	post:function(_reqObj){
		_reqObj.method = 'POST';
		this.request(_reqObj);
	},
	/**
	 * 页面跳转
	 * @param {Object} _urlInfo 页面信息
	 */
	navigateTo:function(_urlInfo){
		uni.navigateTo(_urlInfo);
	}
}