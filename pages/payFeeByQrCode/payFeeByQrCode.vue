<template>
	<view>
		<view class="padding-xl margin-top">
			<canvas style="width: 300upx;height: 300upx;  margin: 0 auto;" canvas-id="oweFeeQrcode"></canvas>
		</view>
	
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="_closePayModal()">已支付</button>
		</view>
	</view>
</template>

<script>
	const qrCode = require('@/lib/weapp-qrcode.js')
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			new qrCode('oweFeeQrcode', {
				text: options.url,
				width: 150,
				height: 150,
				colorDark: "#333333",
				colorLight: "#FFFFFF",
				correctLevel: qrCode.CorrectLevel.H
			})
		},
		methods: {
			_closePayModal: function() {
				this.context.navigateBack();
			},
		}
	}
</script>

<style>

</style>
