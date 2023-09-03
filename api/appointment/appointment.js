import url from '../../constant/url.js'

import dateObj from '../../lib/java110/utils/date.js'
/**
 * 核销订单
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveCommunitySpaceConfirmOrder(_that,_data){
	return new Promise(function(reslove,reject){
		// debugger
		_that.context.post({
			url: url.saveCommunitySpaceConfirmOrder,
			data:_data,
			success: function(res) {
				if (res.data.code == 0){
					// debugger
				reslove(res);
				}else {
					// debugger
					wx.showToast({
						title: "核销状态:" + res.data.msg,
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail: function(e) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 3000
				})
			}
		})
	});
}