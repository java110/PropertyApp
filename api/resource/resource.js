
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
 * 查询采购申请列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryPurchaseApplyList(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryPurchaseApplyList,
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
 * 查询物品列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryResourceStoreList(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryResourceStoreList,
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
 * 查询物品列表(价格)
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryResourceStoreAndTimes(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listResourceStoresAndTimes,
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
 * 查询供应商列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryResourceSupplier(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryResourceSupplier,
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
 * 查询采购/出库审核人员
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryFirstStaff(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryFirstStaff,
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
 * 采购申请提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function savePurchaseApply(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.savePurchaseApply,
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
				_that.onoff = true;
			}
		})
	});
}

/**
 * 领用申请提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveItemOutApply(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveItemOutApply,
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
				_that.onoff = true;
			}
		})
	});
}

/**
 * 查询调拨列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listAllocationStorehouseApplys(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listAllocationStorehouseApplys,
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
 * 查询仓库列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listStoreHouses(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listStoreHouses,
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
 * 调拨申请提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveAllocationStorehouse(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveAllocationStorehouse,
			data:_data,
			success: function(res) {
				_that.onoff = true;
				reslove(res.data);
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

/**
 * 查询工单流转列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listWorkflowAuditInfo(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listWorkflowAuditInfo,
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
 * 查询采购待办列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listMyAuditOrders(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listMyAuditOrders,
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
 * 查询领用待办列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listMyItemOutOrders(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listMyItemOutOrders,
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
 * 查询调拨待办列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listMyAllocationStoreAuditOrders(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listMyAllocationStoreAuditOrders,
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
 * 查询调拨物品列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listAllocationStorehouses(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listAllocationStorehouses,
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
 * 调拨审核提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveAuditAllocationStoreOrder(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveAuditAllocationStoreOrder,
			data:_data,
			success: function(res) {
				reslove(res.data);
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

/**
 * 查询调拨物品列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listWorkflowStepStaffs(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listWorkflowStepStaffs,
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
 * 出入库审核提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveMyAuditOrders(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveMyAuditOrders,
			data:_data,
			success: function(res) {
				reslove(res.data);
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

/**
 * 出库提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveResourceOut(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveResourceOut,
			data:_data,
			success: function(res) {
				reslove(res.data);
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

/**
 * 入库提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveResourceEnter(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveResourceEnter,
			data:_data,
			success: function(res) {
				reslove(res.data);
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



/**
 * 调拨提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function allocationStoreEnter(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.allocationStoreEnter,
			data:_data,
			success: function(res) {
				reslove(res.data);
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


/**
 * 修改采购
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function updatePurchaseApply(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.updatePurchaseApply,
			data:_data,
			success: function(res) {
				reslove(res.data);
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


/**
 * 查询采购已办列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listAuditHistoryOrders(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listAuditHistoryOrders,
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
 * 查询领用已办列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listItemOutAuditHistoryOrders(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listItemOutAuditHistoryOrders,
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
 * 查询调拨已办列表
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function getAllocationHisAudit(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listAllocationStoreHisAuditOrders,
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
 * 查询我物品类型
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function listResourceStoreTypes(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.listResourceStoreTypes,
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
 * 物品转赠提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveResourceStoreTransfer(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveResourceStoreTransfer,
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
 * 紧急采购提交
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function saveUrgentPurchaseApply(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.saveUrgentPurchaseApply,
			data:_data,
			success: function(res) {
				reslove(res.data);
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

/**
 * 取消调拨
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function deleteAllocationStorehouse(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.deleteAllocationStorehouse,
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
 * 取消申请
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function deletePurchaseApply(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.post({
			url: url.deletePurchaseApply,
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
 * 查询第一个需要审核员工
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求报文
 */
export function queryFirstAuditStaff(_that,_data){
	return new Promise(function(reslove,reject){
		_that.context.get({
			url: url.queryFirstAuditStaff,
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