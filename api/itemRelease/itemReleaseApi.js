import url from '../../constant/url.js';


import {
	request,
	requestNoAuth
} from '../../lib/java110/request.js'
/**
 * 查询下一处理人
 * /oaWorkflow/queryOaWorkflowFormData
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryUndoItemRelease(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryUndoItemRelease,
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

export function queryFinishItemRelease(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryFinishItemRelease,
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


 export function getItemRelease(_that,dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			_that.context.get({
 				url: url.listItemRelease,
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 export function getItemReleaseRes(_that,dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			_that.context.get({
 				url: url.listItemReleaseRes,
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 export function queryOaWorkflowUser(_that,dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			_that.context.get({
 				url: url.queryOaWorkflowUser,
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 export function queryNextDealUser(_that,dataObj) {
 	return new Promise(
 		(resolve, reject) => {
 			_that.context.get({
 				url: url.queryNextDealUser,
 				data: dataObj,
 				//动态数据
 				success: function(res) {
 					if (res.data.code == 0) {
 						let _data = res.data.data;
 						resolve(_data);
 						return ;
 					}
 					reject('未包含数据');
 				},
 				fail: function(e) {
 					reject(e);
 				}
 			});
 		})
 }
 
 /**
  * 审核
  * @param {Object} _that
  * @param {Object} _data
  */
 export function auditUndoItemRelease(_that,_data){
 	return new Promise(function(reslove,reject){
 		_that.context.post({
 			url: url.auditUndoItemRelease,
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
 