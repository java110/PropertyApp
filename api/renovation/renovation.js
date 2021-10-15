import url from '../../constant/url.js'
/**
 * 查询装修房屋信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryRoomRenovation(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryRoomRenovation,
			data:_data,
			success: function(res) {
				_that.onoff = true;
				if(res.data.code == 0){
					reslove(res.data);
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
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
 * 提交审核操作
 */
export function updateRoomToExamine(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.updateRoomToExamine,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove();
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
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
 * 提交验收操作
 */
export function saveRoomRenovationDetail(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveRoomRenovationDetail,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove();
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
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
 * 查询装修房屋跟踪记录
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryRoomRenovationRecord(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryRoomRenovationRecord,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove(res.data);
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
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
 * 添加跟踪记录操作
 */
export function updateRoomDecorationRecord(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.updateRoomDecorationRecord,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove();
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
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
 * 跟踪记录
 * 视频上传操作
 */
export function uploadVideo(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.uploadVideo,
			data:_data,
			header:{
				'Content-Type':'multipart/form-data'
			},
			success: function(res) {
				if(res.data.code == 0){
					reslove();
				}else{
					wx.showToast({
						title: "服务器异常了1",
						icon: 'none',
						duration: 2000
					})
				}
			},
			fail: function(e) {
				console.log(e);
				wx.showToast({
					title: "服务器异常了2",
					icon: 'none',
					duration: 2000
				})
			}
		})
	});
}

/**
 * 查询装修房屋跟踪记录详情
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryRoomRenovationRecordDetail(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryRoomRenovationRecordDetail,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove(res.data.data);
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
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
 * 添加跟踪记录操作
 */
export function updateRoomRenovationState(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.updateRoomRenovationState,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove(res.data);
				}else{
					wx.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					})
				}
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
 * 删除跟踪记录操作
 */
export function deleteRoomRenovationRecord(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.deleteRoomRenovationRecord,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove();
				}else{
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
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