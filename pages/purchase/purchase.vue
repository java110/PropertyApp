<template>
	<view>
		
		<view class="cu-list grid" :class="'col-2'">
		<image src="../../static/image/componentBg.png" mode="widthFix" class="response"></image>
			<view class="cu-item" @click="clickHerf('purchaseRequest/purchaseRequest');">
				<view :class="['cuIcon-cart','text-red']"></view>
				<text>采购申请</text>
			</view>
			<view class="cu-item" @click="clickHerf('purchasingSchedule/purchasingSchedule');">
				<view :class="['cuIcon-search']"></view>
				<text>采购待办</text>
			</view>
			<view class="cu-item" @click="clickHerf('pOutOfStorageRequest/pOutOfStorageRequest');">
				<view :class="['cuIcon-light','text-red']"></view>
				<text>物品领用</text>
			</view>
			<view class="cu-item" @click="clickHerf('purchaseReview/purchaseReview');">
				<view :class="['cuIcon-command']"></view>
				<text>领用待办</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			clickHerf: function(pagUrl) {
				if(pagUrl == 'noPage'){
					uni.showToast({
						icon:'none',
						title:'正在开发中'
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/' + pagUrl
				});
			}
		}
	};
</script>
<style>
	@import "./purchase.css";
	text {
		text-align: center;
	}
</style>
