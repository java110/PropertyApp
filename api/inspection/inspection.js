
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