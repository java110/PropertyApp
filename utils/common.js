export function preventClick(fn) {
	let that = this;
	if (that.onoff) {
		that.onoff = false;
		fn();
		// setTimeout(function () {
		// 	that.onoff = true;
		// }, 3000)
	} else {
		uni.showToast({
			title:'操作过于频繁',
			icon: 'none'
		})
	}
}