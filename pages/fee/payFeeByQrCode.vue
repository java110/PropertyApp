<template>
	<view>
		<view class="padding-xl margin-top">
			<canvas style="width: 450upx;height: 450upx;  margin: 0 auto;" canvas-id="oweFeeQrcode"></canvas>
		</view>
	
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="_closePayModal()">已支付</button>
		</view>
	</view>
</template>

<script>
	const qrCode = require('@/lib/weapp-qrcode.js')
	import {
		getRoomOweFees,
		toPayOweFee
	} from '../../api/fee/fee.js';
	export default {
		data() {
			return {
				communityId:'',
				roomId:'',
				feeIds:[]
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.roomId = options.roomId;
			this.communityId = options.communityId;
			this.feeIds = options.feeIds.split(',');
			this._payOweFee();
			
		},
		methods: {
			_closePayModal: function() {
				// this.context.navigateBack();
				uni.navigateBack({
					delta:1
				})
			},
			_payOweFee: function() {
				let _that = this;
				let _data = {
					roomId: this.roomId,
					communityId: this.communityId,
					business:'oweFee',
					feeIds:this.feeIds
				}
			
				toPayOweFee(this, _data)
					.then((res) => {
						let _data = res.data;
						if (_data.code != 0) {
							uni.showToast({
								icon: 'none',
								title: _data.msg
							});
							return;
						}
						new qrCode('oweFeeQrcode', {
							text: _data.data.codeUrl,
							//text:_data.msg,
							width: 220,
							height: 220,
							colorDark: "#333333",
							colorLight: "#FFFFFF",
							correctLevel: qrCode.CorrectLevel.L
						})	
					})
			
			}
		}
	}
</script>

<style>

</style>
