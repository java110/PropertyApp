import mapping from '../../constant/mapping.js'
import util from '../../lib/java110/utils/util.js'

import {getUserInfo} from '../../lib/java110/api/Java110SessionApi.js'

import request from '../../lib/java110/request.js'

import url from '../../constant/url.js'

import {getHeaders} from '../../lib/java110/api/SystemApi.js'

/**
 * 获取小区信息
 * @param {Object} reload 是否重新加载 小区信息
 * @param {Object} _condition 查询小区条件
 */
export function getCommunity(reload, _condition) {
	let _communityInfo = uni.getStorageSync(mapping.COMMUNITY_INFO);
	let _that = this;
	return new Promise(function(reslove, reject) {
		//小区没有就去登录
		if (util.isNotNull(_communityInfo) && reload != true) {
			_communityInfo = JSON.parse(_communityInfo);
			reslove(_communityInfo);
			return;
		}

		let _userInfo = getUserInfo();
	
		if (util.isNull(_condition)) {
			_condition = {
				userId: '',
				storeId: '',
				page: 1,
				row: 50
			};
		}

		if (!_condition.hasOwnProperty("page")) {
			_condition.page = 1;
			_condition.row = 50;
		}
		_condition.userId = _userInfo.userId;
		_condition.storeId = _userInfo.storeId;
		request.request({
			url: url.listMyEnteredCommunitys,
			header: getHeaders(),
			data: _condition,
			success: function(res) {
				if (res.statusCode != 200) {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: res.data
					// });
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return;
				}
				let data = res.data;
				if (data.total < 1) {
					uni.showToast({
						icon: none,
						title: '当前员工还没有隶属小区,请先去后台添加'
					});
					return;
				}
				let _communitys = data.communitys;
				uni.setStorageSync(mapping.COMMUNITY_INFO, JSON.stringify(_communitys));
				reslove(_communitys)
			},
			fail: function(error) {
				// 调用服务端登录接口失败
				uni.showToast({
					title: '调用接口失败'
				});
			}
		});
	});
}
export function getCurrentCommunity() {
	let currentCommunity = uni.getStorageSync(mapping.CURRENT_COMMUNITY_INFO);
	if (util.isNull(currentCommunity)) {
		return {};
	}
	if (currentCommunity instanceof Object) {
		return currentCommunity;
	}
	return JSON.parse(currentCommunity);
}

/**
 * 获取小区ID
 */
export function getCommunityId(){
	return getCurrentCommunity().communityId
}

/**
 * 获取小区ID
 */
export function getCommunityName(){
	return getCurrentCommunity().communityId
}

