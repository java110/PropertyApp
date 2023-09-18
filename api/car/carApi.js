import url from '../../constant/url.js'

import dateObj from '../../lib/java110/utils/date.js'


/**
 * 查询车辆信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryOwnerCars(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryOwnerCars,
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
 * 查询停车场
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryParkingAreas(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listParkingAreas,
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
 * 查询停车场摄像头
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function getParkingAreaMachines(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listParkingAreaMachines,
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


export function openDoor(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.openDoor,
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
export function closeDoor(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.closeDoor,
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
export function customCarInOut(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.customCarInOut,
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
 * 查询停车场摄像头
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function getCarInParkingArea(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listCarInParkingArea,
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

export function getParkingCouponCar(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listParkingCouponCar,
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
export function getTempCarFeeOrder(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.getTempCarFeeOrder,
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

export function getCarInoutDetail(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listCarInoutDetail,
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
export function getCarInoutPayment(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listCarInoutPayment,
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




