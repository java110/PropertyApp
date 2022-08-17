<script>
	import Vue from 'vue'
	import {
		hasSession
	} from './lib/java110/api/Java110SessionApi.js';
	import {
		requestNoAuth
	} from './lib/java110/request.js';
	
	import url from './constant/url.js'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});

			requestNoAuth({
				url: url.listSystemInfo,
				method: "GET",
				data: {
					page:1,
					row:1
				},
				success: function(res) {
					console.log(res.data);
					if(res.data.data && res.data.data.length >0){
						uni.setStorageSync('java110SystemConfig',res.data.data[0])
					}
					//reslove(res);
				},
				fail: function(e) {}

			});


		},
		onShow: function() {
			//判断用户是否登录
			hasSession();
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "lib/colorui/main.css";
	@import "lib/colorui/icon.css";

	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}

	/* #endif */
</style>
