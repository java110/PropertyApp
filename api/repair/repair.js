
import url from '../../constant/url.js'

/**
 * 查询报修信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryRepairInfo(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryRepairInfo,
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
export function queryResourceStoreResName(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryResourceStoreResName,
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
 * 查询报修师傅
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function loadRepairStaff(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listRepairTypeUsers,
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
 * 转单和退单
 * @param {Object} _that 上下文对象
 * @param {Object} _data 数据处理
 */
export function dispatchRepair(_that){
	return new Promise(function(reslove,reject){
		let _data = {
			"staffId": _that.staffId,
			"staffName": _that.staffName,
			"context": _that.content,
			"repairId": _that.repairId,
			"repairType": _that.repairType,
			"action": _that.action,
			"communityId":_that.java110Context.getCurrentCommunity().communityId,
			"photos":[],
			"userId":_that.userId,
			"userName":_that.userName
		}
		let _photos = _that.photos;
		_photos.forEach(function(_item) {
			_data.photos.push({
				"photo": _item
			});
		});
		let msg = "";
		if (_data.context == "") {
			msg = "请填写处理意见";
		} else if (_data.staffId == "") {
			msg = "请填写师傅";
		} else if (_data.staffName == "") {
			msg = "请填写师傅";
		} else if (_data.repairId == "") {
			msg = "数据错误";
		}
		if (msg != "") {
			wx.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			});
			return;
		}
		_that.context.post({
			url: url.repairDispatch,
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
 * 办结
 * @param {Object} _that 上下文对象
 * @param {Object} _data 数据处理
 */
export function finishRepair(_that){
	
	
	return new Promise(function(reslove,reject){
		let _data = {
			// "amount": _that.singlePrice ? _that.singlePrice : 0,
			// "price": _that.singlePrice,
			"feeFlag": _that.feeFlag,
			"context": _that.content,
			"repairId": _that.repairId,
			"repairChannel": _that.repairChannel,
			"publicArea": _that.publicArea,
			"maintenanceType": _that.feeFlag,
			// "outLowPrice": _that.goods.outLowPrice,
			// "outHighPrice": _that.goods.outHighPrice,
			"repairType": _that.repairType,
			"action": _that.action,
			"communityId":_that.java110Context.getCurrentCommunity().communityId,
			"beforeRepairPhotos":[],
			"afterRepairPhotos":[],
			"repairObjType":_that.repairObjType,
			"userId":_that.userId,
			"userName":_that.userName,
			"storeId":_that.storeId,
			"choosedGoodsList": _that.resourceStoreInfo,
			"totalPrice": _that.amount
			// "conditions": {
			// 	"goodsType": _that.goodsType,
			// 	"resId": _that.goods.resId,
			// },
			// "resId": _that.goods.resId,
			// "useNumber": _that.useNumber,
			// "isCustom": _that.isCustom,
			// "customGoodsName": _that.customGoodsName,
		}
		let _beforeRepairPhotos = _that.beforeRepairPhotos;
		_beforeRepairPhotos.forEach(function(_item) {
			_data.beforeRepairPhotos.push({
				"photo": _item
			});
		});
		let _afterRepairPhotos = _that.afterRepairPhotos;
		_afterRepairPhotos.forEach(function(_item) {
			_data.afterRepairPhotos.push({
				"photo": _item
			});
		});
		let msg = "";
		if (_data.context == "") {
			msg = "请填写处理意见";
		}else if (_data.repairId == "") {
			msg = "数据错误";
		}
		if(!_data.feeFlag){
			msg = "请选择类型";
		}
		if (msg != "") {
			wx.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			});
			return;
		}
		// 无偿/不用料 商品数量为零
		if(_data.maintenanceType == '1002' || _data.maintenanceType == '1004'){
			_data.useNumber = 0;
		}
		_that.context.post({
			url: url.repairFinish,
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
 * 办结
 * @param {Object} _that 上下文对象
 * @param {Object} _data 数据处理
 */
export function appraiseRepair(_that){
	return new Promise(function(reslove,reject){
		if (_that.remark == '') {
			uni.showToast({
				title: '请填写评价内容',
				icon: 'none'
			});
			return;
		}
		if (_that.repairId == '') {
			uni.showToast({
				title: '未包含报修信息',
				icon: 'none'
			});
			return;
		}
		
		let _data = {
			// "appraiseScore": _that.curAppraise,
			// "appraiseType": "10001",
			// "appraiseUserId": _that.userId,
			// "appraiseUserName": _that.userName,
			// "objType": "10001",
			"repairId": _that.repairId,
			"repairType": _that.repairType,
			"repairChannel": _that.repairChannel,
			"publicArea": _that.publicArea,
			"communityId": _that.communityId,
			"context": _that.remark,
		};
		
		_that.context.post({
			url: url.appraiseRepairNew,
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

