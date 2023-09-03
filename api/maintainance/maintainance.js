import url from '../../constant/url.js'

/**
 * 流转
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function UpdateMaintainanceTask(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.post({
			url: url.UpdateMaintainanceTask,
			data: _data,
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
export function queryDictInfo(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: url.queryDictInfo,
			data: _data,
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
export function queryMaintainanceItemTitle(_that, _data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		_that.context.get({
			url: url.listMaintainanceItem,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					resolve(_data.data);
					return;
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
 * 查询保养任务
 * @param {Object} _data 评价内容
 */
export function queryMaintainanceTask(_that, _data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		_that.context.get({
			url: url.listMaintainanceTask,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					res.data.data.forEach(function(item, index) {
						item.timeStr = item.planInsTime.replace(/:\d{1,2}$/, ' ');
					});
					resolve(res.data.data);
					return;
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
 * 流转
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function updateMaintainanceTaskDetail(_that, _data) {

	let msg = "";
	if (_data.taskId == "") {
		msg = "数据异常，保养任务为空";
	} else if (_data.taskDetailId == "") {
		msg = "数据异常，保养任务详情为空";
	} else if (_data.machineId == "") {
		msg = "设备不能为空";
	} else if (_data.machineName == "") {
		msg = "设备名称不能为空";
	} else if (_data.patrolType == "") {
		msg = "保养情况不能为空";
	} else if (_data.description == "") {
		msg = "保养说明不能为空";
	} else if (_data.userId == "") {
		msg = "数据异常，保养人为空";
	} else if (_data.photos.length <= 0) {
		msg = "请上传保养图片";
	}
	if (msg != "") {
		wx.showToast({
			title: msg,
			icon: 'none',
			duration: 2000
		});
		return;
	}
	uni.showLoading({
		title: '请稍后...'
	});

	return new Promise(function(reslove, reject) {
		_that.context.post({
			url: url.updateMaintainanceTaskDetail,
			data: _data,
			success: function(res) {
				reslove(res.data);
				uni.hideLoading();
			},
			fail: function(e) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
				uni.hideLoading();
			}
		})
	});
}


/**
 * 查询保养任务明细
 * @param {Object} _data 评价内容
 */
export function queryMaintainanceTaskDetail(_that, _data) {
	return new Promise((resolve, reject) => {
		let moreRooms = [];
		_that.context.get({
			url: url.listMaintainanceTaskDetail,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				if (_data.code == 0) {
					_data.data.forEach(function(_item) {
						// if (_item.state == '20200407') {
						// 	_item.photos.forEach(function(_photoTmp) {
						// 		_photoTmp.url = url.hcBaseUrl + _photoTmp.url;
						// 	});
						// }
					})
					resolve(_data.data);
					return;
				}
				reject(_data.msg);
			},
			fail: function(e) {
				reject(e);
			}
		});
	})
}
