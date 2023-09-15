import url from '../../constant/url.js'

export function queryOweFeeCallable(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listOweFeeCallable,
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


export function writeOweFeeCallable(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.writeOweFeeCallable,
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