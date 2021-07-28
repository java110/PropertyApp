import java110Config from '../../lib/java110/Java110Config.js'

import url from '../../constant/url.js'
import {getHeaders} from '../../lib/java110/api/SystemApi.js'
export function _loadArea(_level, _parentAreaCode, callBack = _areaList => {}) {
	let areaList = uni.getStorageSync(java110Config.AREA_INFO);

	if (areaList) {
		callBack(areaList);
		return;
	}

	request({
		url: url.areaUrl,
		header: getHeaders(),
		data: {
			areaLevel: _level,
			// 临时登录凭证
			parentAreaCode: _parentAreaCode
		},
		success: function(res) {
			console.log('login success');
			res = res.data;
			var province = [],
				city = [],
				area = [];
			var _currentArea = [];
			province = res.areas.filter(item => {
				return item.areaLevel == '101';
			});
			city = res.areas.filter(item => {
				return item.areaLevel == '202';
			});
			area = res.areas.filter(item => {
				return item.areaLevel == '303';
			});
			var provinceList = {};
			province.forEach(function(item) {
				provinceList[item.areaCode] = item.areaName;
			});
			var cityList = {};
			city.forEach(function(item) {
				cityList[item.areaCode] = item.areaName;
			});
			var quyuList = {};
			area.forEach(function(item) {
				quyuList[item.areaCode] = item.areaName;
			});
			let areaList = {
				province_list: provinceList,
				city_list: cityList,
				county_list: quyuList
			};
			callBack(areaList); //将 地区信息存储起来

			uni.setStorageSync(java110Config.AREA_INFO, areaList);
		},
		fail: function(error) {
			// 调用服务端登录接口失败
			uni.showToast({
				title: '调用接口失败'
			});
			console.log(error);
		}
	});
};