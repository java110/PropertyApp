import url from '../../constant/url.js';
import java110Config from '@/lib/java110/Java110Config.js';
import {isNull} from '@/lib/java110/utils/StringUtil.js';
import {desDecrypt} from '@/lib/java110/utils/DesUtil.js';

/**
 * 查询楼栋信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryStaffInfos(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryStaffInfos,
			data:_data,
			success: function(res) {
				reslove(res);
			},
			fail: function(e) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		})
	});
}
/**
 * 查询员工
 */
export function getStaff(){
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

export function getStaffId(){
	return getStaff().userId;
}

export function getStaffName(){
	return getStaff().userName;
}

export function getStaffTel(){
	return getStaff().tel;
}


/**
 * 查询员工考勤
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryAttendanceClassesTask(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryAttendanceClassesTask,
			data:_data,
			success: function(res) {
				reslove(res.data);
			},
			fail: function(e) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		})
	});
}