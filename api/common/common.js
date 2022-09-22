import url from '../../constant/url.js'
/**
 * 查询组织信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryOrgInfo(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryOrgInfo,
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
 * 查询员工信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryStaffListInfo(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryStaffListInfo,
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

// 异步上传图片
export function uploadImageAsync(_objData,_that) {
	return new Promise( (resolve, reject) => {
		_that.context.post({
			url: url.uploadImage,
			data: _objData,
			//动态数据
			success: function(res) {
				if (res.statusCode == 200) {
					let imgInfo = res.data;
					resolve(imgInfo);
				}
			},
			fail: function(e) {
				uni.hideLoading();
				uni.showToast({
					title: "服务器异常了",
					icon: 'none'
				})
			}
		});
	})
}