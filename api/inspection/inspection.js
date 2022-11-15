
import url from '../../constant/url.js'

/**
 * 流转
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function UpdateInspectionTask(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.UpdateInspectionTask,
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

/**
 * 查询字典表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryDictInfo(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryDictInfo,
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

/**
 * 投票问卷
 * @param {Object} _data 评价内容
 */
export function queryInspectionItemTitle(_that,_data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		_that.context.get({
			url: url.listInspectionItemTitle,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data);
					return ;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

export function queryReportStaffInspection(_that,_data){
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		_that.context.get({
			url: url.queryReportStaffInspection,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data);
					return ;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}

/**
 * 查询巡检明细
 * @param {} _that 
 * @param {*} _data 
 */
export function listInspectionTaskDetails(_that,_data){
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		_that.context.get({
			url: url.listInspectionTaskDetails,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data);
					return ;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}