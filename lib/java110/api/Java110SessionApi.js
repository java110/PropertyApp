/**
 * 回话管理 接口类
 */

import conf from '../../../conf/config.js'

import {
	getHeaders
} from './SystemApi.js'

import {
	desDecrypt,
	desEncrypt
} from '../utils/DesUtil.js'

import java110Config from '../Java110Config.js'

import date from '../utils/date.js'

import {isNull} from '../utils/StringUtil.js'

const loginUrl = conf.baseUrl + 'app/loginProperty'


/**
 * 登录处理
 */
export function login(userName, passwd) {

	let userInfo = {
		username: userName,
		password: passwd
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: loginUrl,
			header: getHeaders(),
			method: "POST",
			data: userInfo,
			success: function(res) {
				let data = res.data;
				if (data.code != 0) {
					uni.showToast({
						icon:'none',
						title:data.msg
					})
					reject(data.msg);
					return;
				}
				
				let _tmpUserInfo = data.userInfo;
				_tmpUserInfo['password'] = passwd;
				_tmpUserInfo['username'] = userName;
				let _userInfo = desEncrypt(JSON.stringify(_tmpUserInfo));
				uni.setStorageSync(java110Config.USER_INFO, _userInfo);
				uni.setStorageSync(java110Config.TOKEN, data.token);
				let afterOneHourDate = date.addHour(new Date(), 1);
				//let afterOneHourDate = date.addMinutes(new Date(), 1);
				wx.setStorageSync(java110Config.LOGIN_FLAG, {
					sessionKey: _tmpUserInfo.userName,
					expireTime: afterOneHourDate.getTime(),
					createTime: new Date().getTime()
				});
				resolve();
			},
			fail: function(error) {
				// 调用服务端登录接口失败
				reject(error);
			}
		});
	});
}

export function reLogin(){
	let userInfo = uni.getStorageSync(java110Config.USER_INFO);
	
	if (isNull(userInfo)) {
		return;
	}
	let _userInfo = JSON.parse(desDecrypt(userInfo));
	//重新登录
	login(_userInfo.username, _userInfo.password)
		.then((res) => {
			uni.reLaunch({
				url:'/pages/index/index'
			})
		}, err => {
			return;
		})
}

export function hasSession() {
	return new Promise((resolve, reject) => {
		let loginFlag = uni.getStorageSync(java110Config.LOGIN_FLAG);
		let nowDate = new Date();
		if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
			resolve();
			return;
		}
		reject('回话已失效');
	})

}

export function getLoginFlag() {
	return uni.getStorageSync(java110Config.LOGIN_FLAG);
}

/**
 * 查询用户信息
 */
export function getUserInfo() {
	let userInfo = uni.getStorageSync(java110Config.USER_INFO);
	if (isNull(userInfo)) {
		uni.redirectTo({
			url: "/pages/login/login"
		});
		return;
	}
	let _userInfo = JSON.parse(desDecrypt(userInfo));
	if (isNull(userInfo)) {
		uni.redirectTo({
			url: "/pages/login/login"
		});
		return;
	}
	return _userInfo;
}
