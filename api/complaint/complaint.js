import url from '../../constant/url.js';

/**
 * 查询投诉待办
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function loadTodoCompaint(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listAuditComplaints,
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
 * 投诉处理
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function auditComplaint(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.auditComplaint,
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
 * 查询投诉待办
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function loadCompaintFinish(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listAuditHistoryComplaints,
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