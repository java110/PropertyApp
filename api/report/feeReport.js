
/**
 * 查询首页 目录
 */
/**
 * 查询数据统计
 * @param {Object} _that
 * @param {Object} _data
 */
export function queryFeeDataReport(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.queryFeeDataReport,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				reslove(_data);
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
export function queryOrderDataReport(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.queryOrderDataReport,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				reslove(_data);
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

export function queryInoutDataReport(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.queryInoutDataReport,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				reslove(_data);
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

export function queryOthersDataReport(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.queryOthersDataReport,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				reslove(_data);
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

export function queryReportFeeDetailRoom(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.queryReportFeeDetailRoom,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				reslove(_data);
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

export function queryReportFeeSummary(_that, _data) {
	return new Promise(function(reslove, reject) {
		_that.context.get({
			url: _that.url.queryReportFeeSummary,
			data: _data, //动态数据
			success: function(res) {
				let _data = res.data;
				reslove(_data);
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






