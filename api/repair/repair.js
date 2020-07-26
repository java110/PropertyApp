
import url from '../../constant/url.js'
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
		let obj = {
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
			obj.photos.push({
				"photo": _item
			});
		});
		let msg = "";
		if (obj.context == "") {
			msg = "请填写处理意见";
		} else if (obj.staffId == "") {
			msg = "请填写师傅";
		} else if (obj.staffName == "") {
			msg = "请填写师傅";
		} else if (obj.repairId == "") {
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