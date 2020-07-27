import url from '../../constant/url.js'
/**
 * 查询费用信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function loadFees(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listFee,
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
 * 查询缴费历史
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryFeeDetail(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryFeeDetail,
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

