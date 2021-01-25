/**
 * 查询 广告信息
 * @param {Object} _that 上下文对象
 * @param {Object} _data 请求内容
 */
export function loadAdvert(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.listAdvertPhoto,
			data: _data, //动态数据
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
		});
	})
}

/**
 * 查询 权限
 * @param {Object} _that 上下文对象
 */
export function listStaffPrivileges(_that) {

	_that.context.get({
		url: _that.url.listStaffPrivileges,
		data: {
			a: '123'
		}, //动态数据
		success: function(res) {
			let _data = res.data;
			let _privilege = [];
			_data.datas.forEach(item => {
				_privilege.push(item.pId);
			});
			uni.setStorageSync('hc_staff_privilege', JSON.stringify(_privilege));
		},
		fail: function(e) {

		}
	});

}

/**
 * 查询首页 目录
 */
export function loadCategoryMenus(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.queryMenus,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;

				if (_data == null || _data == undefined || _data.length < 1) {
					reslove(_data);
					return;
				}

				let _menus = _data[0].childs;
				_menus = _menus.sort(function(a, b) {
					return a.seq - b.seq;
				});

				let _tempMenuData = {};
				let _menuPage = [];
				let _curMenu = {};
				for (let _menuIndex = 0; _menuIndex < _menus.length; _menuIndex++) {
					_curMenu = _menus[_menuIndex];
					if (_curMenu.isShow != 'Y') {
						continue;
					}
					_menuPage.push({
						name: _curMenu.name,
						src: _curMenu.description,
						href: _curMenu.href
					});
					if ((_menuIndex + 1) % 8 == 0 && _menuIndex != 0) {
						_tempMenuData[_menuIndex] = _menuPage;
						_menuPage = [];
					}
				}

				if (_menuPage.length > 0) {
					_tempMenuData[_menus.length] = _menuPage;
				}

				console.log('_tempMenuData', _tempMenuData)
				reslove(_tempMenuData);
			},
			fail: function(e) {
				wx.showToast({
					title: "服务器异常了",
					icon: 'none',
					duration: 2000
				})
			}
		});
	})
}

/**
 * 查询首页 目录
 */
export function loadCategory() {
	return {
		pageone: [{
				name: "维修工单",
				src: "/static/image/index_repair.png",
				href: "/pages/repairOrder/repairOrder"
			}, {
				name: "维修待办",
				src: "/static/image/index_dealRepair.png",
				href: "/pages/repairDispatch/repairDispatch"
			}, {
				name: "巡检打卡",
				src: "/static/image/index_inspection.png",
				href: "/pages/inspection/inspection"
			}, {
				name: "投诉待办",
				src: "/static/image/index_complaint.png",
				href: "/pages/complaintList/complaintList"
			}, {
				name: "公告",
				src: "/static/image/index_notice.png",
				href: "/pages/notice/notice"
			}, {
				name: "房产查询",
				src: "/static/image/index_bill.png",
				href: "/pages/roomDetail/roomDetail"
			}, {
				name: "收银台",
				src: "/static/image/payOweFee.png",
				href: "/pages/roomPayFee/roomPayFee"
			},
			{
				name: "水电抄表",
				src: "/static/image/index_meter.png",
				href: "/pages/meterReading/meterReading"
			}
		],
		pagetwo: [{
			name: "空置房",
			src: "/static/image/index_complaint.png",
			href: "/pages/applyRoom/applyRoom"
		}]
	};
}

/**
 * 查询文化
 * @param {Object} _that 上下文 对象
 * @param {Object} _data 查询内容
 */
export function loadActivitys(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.listActivitiess,
			data: _data, //动态数据
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
		});
	});
}
