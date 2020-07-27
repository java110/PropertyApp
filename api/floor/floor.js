
import url from '../../constant/url.js'
/**
 * 查询楼栋信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function loadFloors(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryFloors,
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