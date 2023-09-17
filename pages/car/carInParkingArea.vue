<template>
	<view>
		<view class="block__title">手工进场</view>
		<view class="cu-form-group margin-bottom-sm">
			<view class="title">车牌号</view>
			<input v-model="carNum"  placeholder="请输入车牌号" class="text-right"></input>
		</view>
		
		<view class="cu-form-group margin-top-sm">
			<textarea v-model="remark" placeholder="请输入说明"></textarea>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @tap="_carIn()">进场</button>
		</view>
	</view>
</template>

<script>
	import {customCarInOut} from '../../api/car/carApi.js'
	export default {
		data() {
			return {
				machineId:'',
				paId:'',
				boxId:'',
				machineCode:'',
				carNum:'',
				remark:'',
				
			}
		},
		onLoad(options) {
			this.machineCode = options.machineCode;
			this.machineId = options.machineId;
			this.paId = options.paId;
			this.boxId = options.boxId;
		},
		methods: {
			_carIn:function(){
				customCarInOut(this,{
					boxId: this.boxId,
					carNum: this.carNum,
					communityId:this.getCommunityId(),
					machineId:this.machineId,
					paId:this.paId,
					remark:this.remark,
					type:"1101"
				}).then(_data=>{
					uni.showToast({
						icon:'none',
						title:_data.msg
					});
					if(_data.code == 0){
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}
</style>