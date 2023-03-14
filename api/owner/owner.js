import url from '../../constant/url.js';
export function queryOwners(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryOwners,
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
export function queryOwnerAccount(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryOwnerAccount,
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