<template>
	<view>
		<view class="detailContainer">
		  <image class="headImg" :src="src"></image>
		  <view class="ad_titile">
		    <text class="company">{{title}}</text>
		  </view>
		  <view>
		    <view span="8" offset="4"><text class="ad_au_text">{{userName}}</text></view>
		    <view span="8" offset="2"><text class="ad_au_text">{{startTime}}</text></view>
		  </view>
		  
		  <view class="ad_context">
		    <van-divider />
		    <rich-text :nodes="context"/>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity:{
					
				}
			}
		},
		onLoad(options) {
			this.activity = JSON.parse(options.item);
			console.log('文化详情',JSON.parse(options.item));
		},
		methods: {
			
		}
	}
</script>

<style>
	
	.detailContainer{ 
	  background-color: #fff;
	}
	.detailContainer .headImg{
	  width: 100%;
	  height: 400rpx;
	}
	
	.detailContainer .ad_titile{
	  text-align: center;
	  margin-top: 30rpx;
	  margin-bottom: 30rpx;
	  font-size: 44rpx;
	}
	
	.detailContainer .ad_au_text{
	  font-size: 32rpx;
	  color: #8e8e8e
	}
	.detailContainer .ad_context{
	  padding: 0rpx 40rpx 40rpx 40rpx;
	}

</style>
