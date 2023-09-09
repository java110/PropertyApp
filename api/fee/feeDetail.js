import url from '../../constant/url.js'

export function queryPayFeeDetail(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryPayFeeDetail,
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
