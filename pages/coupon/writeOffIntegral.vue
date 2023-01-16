<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					积分核销
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					核销记录
				</view>
			</view>
		</scroll-view>
		<view v-if="active == 0">
			<use-integral></use-integral>
		</view>
		<view v-show="active == 1">
			<use-integral-log ref="useIntegralLogRef"></use-integral-log>
		</view>
	
	</view>
</template>
<script>
	import useIntegral from '../../components/coupon/use-integral';
	import useIntegralLog from '../../components/coupon/use-integral-log.vue'
	export default {
		data() {
			return {
				active: 0,
			};
		},
		onLoad: function(options) {
			
		},
		components:{
			useIntegral,
			useIntegralLog
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {

		},

		methods: {
			tabSelect: function(_active) {
				this.active = _active;
				if(this.active == 1){
					this.$refs.useIntegralLogRef.loadIntegralUserDetail();
				}
			},
			

		}
	};
</script>
<style>
</style>
