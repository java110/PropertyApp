import url from '../../constant/url.js'
/**
 * 查询空置房信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function loadApplyRooms(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listApplyRoom,
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
 * 根据优惠类型查询优惠列表
 */
export function loadFeeDiscount(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryFeeDiscount,
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
 * 提交验房操作
 */
export function uploadCheckUpdate(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.updateApplyRoomDiscount,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove();
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
 * 提交审核操作
 */
export function uploadReviewUpdate(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.updateReviewApplyRoomDiscount,
			data:_data,
			success: function(res) {
				if(res.data.code == 0){
					reslove();
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