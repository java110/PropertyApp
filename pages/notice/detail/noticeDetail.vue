<template>
	<view class="notice">
	    <view class="title"> {{notice.title}} </view>
		<view  class="content">
			<view ><text class="ad_au_text">{{notice.context}}</text></view>
		</view>
	    <view class="footer"> 时间: {{notice.timeStr}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice:{}
			}
		},
		onLoad: function(options) {
			let _that = this;
			let index = parseInt(options.index);
			// this.checkLoginStatus();
			let info = JSON.parse( uni.getStorageSync('notice-'+ (index)));
			if (info) {
			    // this.setData({
			    //     notice: info
			    // })
				_that.notice = info
			}
			uni.clearStorageSync('notice-'+index);
		}
	}
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
	.content{
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
