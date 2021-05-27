
import url from '../../constant/url.js'

/**
 * 查询我的物品列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryMyResourceStoreInfo(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryResourceStoreResName,
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

/**
 * 查询商品类型下的商品列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
// export function queryResourceStoreResName(_that,_data){
// 	return new Promise(function(reslove,reject){
// 		_that.context.get({
// 			url: url.queryResourceStoreResName,
// 			data:_data,
// 			success: function(res) {
// 				reslove(res);
// 			},
// 			fail: function(e) {
// 				wx.showToast({
// 					title: "服务器异常了",
// 					icon: 'none',
// 					duration: 2000
// 				})
// 			}
// 		})
// 	});
// }
