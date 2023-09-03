<template>
	<view class="user-container">
		<view class="flex-sub text-center bg-white">
			<view class="solid-bottom text-xl padding">
				<text class="text-black text-bold">{{notice.title}}</text>
			</view>
			<view class="footer">时间: {{notice.timeStr}}</view>
		</view>
		<view class="flex-sub bg-white">
			<view class="content">
				<rich-text class="solid-bottom text-df padding" :nodes="notice.context"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import {replaceImgSrc} from '../../../lib/java110/utils/ImageUtil.js'
	import conf from '../../../conf/config.js'
	import url from '../../../constant/url.js'
	export default {
		data() {
			return {
				notice: {},
				noticeId: ''
			};
		},

		onLoad: function(options) {
			this.java110Context.onLoad();
			let _noticeId = options.noticeId;
			this.noticeId = _noticeId;
			this._loadNoticeDetail();
		},
		onShow: function() {
			let that = this; // that.setData({
			//     userInfo: app.globalData.userInfo
			// });
		},
		methods: {
			_loadNoticeDetail: function() {
				let that = this;
				that.communityId = this.java110Context.getUserInfo().communityId;
				this.java110Context.request({
					header: that.java110Context.getHeaders(),
					url: url.GetNoticeListUrl,
					method: "GET",
					data: {
						communityId: that.communityId,
						page: 1,
						row: 10,
						noticeId: that.noticeId
					},
					success: function(res) {
						// TODO 判断
						console.log(res);
						let notice = res.data.notices[0]
						notice.timeStr = notice.startTime.replace(/:\d{1,2}$/, ' ');
						notice.context = replaceImgSrc(notice.context,conf.baseUrl);
						that.notice = notice;
					}
				});
			}
		}
	};
</script>
<style>
	.user-container {
		padding: 25rpx 10rpx;
		background-color: #F0F0F0;
		/*border: 1px solid black;*/
	}

	.notice {
		margin: 10rpx 7rpx;
		padding: 25rpx;
		background-color: #ffffff;
		border-radius: 7rpx;
	}

	.title {
		border-bottom: 1rpx solid #dedede;
		font-weight: 700;
		font-size: 34rpx;
		color: #00AA00;
	}

	.content {
		padding: 15rpx 0;
		font-size: 25rpx;
		color: #7B7B7B;
	}

	.footer {
		padding: 15rpx 0;
		font-size: 22rpx;
		color: #ADADAD;
	}
</style>
