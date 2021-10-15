import url from '../../constant/url.js'
/**
 * 查询水电收费项列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryFeeTypesItems(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryFeeTypesItems,
			data:_data,
			success: function(res) {
				if(res.statusCode == 200){
					reslove(res.data.feeConfigs);
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
 * 查询上期水电缴费信息
 */
export function listMeterType(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listMeterType,
			data:_data,
			success: function(res) {
				if(res.statusCode == 200){
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
 * 查询上期水电缴费信息
 */
export function queryPreMeterWater(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryPreMeterWater,
			data:_data,
			success: function(res) {
				if(res.statusCode == 200){
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
 * 提交抄表
 */
export function saveMeterWater(_that, _data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveMeterWater,
			data:_data,
			success: function(res) {
				if(res.statusCode == 200){
					reslove(res.data);
				}else{
					_that.onoff = true;
					wx.showToast({
						title: "服务器异常了",
						icon: 'none',
						duration: 2000
					})
				}
			},
			fail: function(e) {
				_that.onoff = true;
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		})
	});
}