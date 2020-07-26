/**
 * 查询 广告信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求内容
 */
export function loadAdvert(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: _that.url.listAdvertPhoto,
			data: _data, //动态数据
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
		});
	})	
}

/**
 * 查询首页 目录
 */
export function loadCategory(){
	return {
		pageone: [{
			name: "维修工单",
			src: "/static/image/index_repair.png",
			href: "/pages/repairOrder/repairOrder"
		}, {
			name: "维修待办",
			src: "/static/image/index_dealRepair.png",
			href: "/pages/repairDispatch/repairDispatch"
		}, {
			name: "巡检打卡",
			src: "/static/image/index_inspection.png",
			href: "/pages/inspection/inspection"
		}, {
			name: "采购",
			src: "/static/image/index_purchase.png",
			href: "/pages/purchase/purchase"
		}, {
			name: "投诉待办",
			src: "/static/image/index_complaint.png",
			href: "/pages/complaintList/complaintList"
		}, {
			name: "公告",
			src: "/static/image/index_notice.png",
			href: "/pages/notice/notice"
		}, {
			name: "费用账单",
			src: "/static/image/index_bill.png",
			href: "/pages/notice/notice"
		}]
	};
}

/**
 * 查询文化
 * @param {Object} _that 上下文 对象
 * @param {Object} _data 查询内容
 */
export function loadActivitys(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: _that.url.listActivitiess,
			data: _data, //动态数据
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
		});
	});
}