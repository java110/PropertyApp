<template>
	<view>
		<view class="block__title">催缴登记</view>
		<view class="cu-form-group margin-bottom-sm">
			<view class="title">房屋</view>
			<input v-model="roomName" disabled="disabled" placeholder="请输入房屋" class="text-right"></input>
		</view>
		<checkbox-group class="text-right" @change="_changeFees">
			<view class="cu-form-group" v-for="(item,index) in fees" :key="index">
				<view class="title">{{item.feeName}}</view>
				<checkbox class=' ' :value="item.feeId"></checkbox>
			</view>
		</checkbox-group>
		<view class="cu-form-group margin-top-sm">
			<textarea v-model="remark" placeholder="请输入催缴说明"></textarea>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @tap="_writeOweFee()">登记</button>
		</view>
	</view>
</template>

<script>
	import {loadFees} from '../../api/fee/fee.js';
	import {writeOweFeeCallable} from '../../api/fee/callableFeeApi.js'
	export default {
		data() {
			return {
				roomId: '',
				roomName: '',
				remark: '',
				fees: [{
					feeName: '测试',
					feeId: '123'
				}],
				feeIds: []
			}
		},
		onLoad(options) {
			this.roomId = options.roomId;
			this.roomName = options.roomName;
			this._loadFees();
		},
		methods: {
			_loadFees:function(){
				let _that =this;
				loadFees(this,{
					payerObjId:this.roomId,
					page:1,
					row:50,
					communityId:this.getCommunityId(),
					state:'2008001'
				}).then(_data =>{
					_that.fees = _data.data.fees;
				})
			},
			_changeFees: function(e) {
				this.feeIds = e.detail.value;
			},
			_writeOweFee:function(){
				writeOweFeeCallable(this,{
					communityId:this.getCommunityId(),
					feeIds:this.feeIds,
					remark:this.remark,
					roomId:this.roomId,
					roomName:this.roomName
				}).then(_data=>{
					uni.showToast({
						icon:'none',
						title:_data.msg
					});
					if(_data.code != 0){
						return;
					}
					uni.navigateBack();
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
