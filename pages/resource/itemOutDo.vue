<template>
	<view class="select-single-resource">
		<view class="margin-top">
			<view class="resource-header flex justify-between bg-white">
				<view class="text-bold">出库物品</view>
				<view>
				</view>
			</view>
			<view class=" ">
				<view class="resource-item bg-white" v-for="(item,index) in itemOutOrderInfo.purchaseApplyDetailVo" :key="index">
					<view class=" " style="">
						<view class=" flex-around">
							<label class="text-df">物品:</label>
							<text class="ellip text-df">{{item.resName}}-{{item.rstName}}</text>
						</view>
						<view class=" flex-around">
							<label class="text-df">库存:</label>
							<text class="text-df">{{item.stock}}</text>
						</view>
						<view class=" flex-around">
							<label class="text-df">申请数量:</label>
							<text class="text-df">{{item.quantity}}</text>
						</view>
						<view class=" flex-around">
							<label class="text-df">发放数量:</label>
							<input class="  text-right" type="number" v-model="item.purchaseQuantity" placeholder="请输入发放数量"
								placeholder-class="text-grey text-df" value="" />
						</view>
						<view class=" flex-around">
							<label class="text-df">备注:</label>
							<input class="  text-right" type="text" placeholder="选填,请输入备注"
								placeholder-class="text-grey text-df" v-model="item.remark" value="" />
						</view>
					</view>
				</view>
			</view>
			<view class="margin-top text-right">
				<button class="cu-btn bg-blue  round" @tap="save()">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryPurchaseApplyList,
		saveResourceOut,
		saveMyAuditOrders
	} from '../../api/resource/resource.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	
	export default {
		components: {
		},
		data() {
			return {
				onoff: true,
				itemOutOrderInfo: '',
				applyOrderId: '',
				resOrderType: '',
				taskId: ''
			}
		},
		
		onLoad: function(options) {
			this.java110Context.onLoad()
			this.applyOrderId = options.applyOrderId;
			this.resOrderType = options.resOrderType;
			this.taskId = options.taskId;
			this._loadItemOutResources();
		},
		
		onShow: function(){
		},

		methods: {
			_loadItemOutResources: function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 100,
					applyOrderId: this.applyOrderId,
					resOrderType: this.resOrderType
				};
				queryPurchaseApplyList(this,_objData)
				.then(function(res){
					_that.itemOutOrderInfo = res.purchaseApplys[0];
					_that.itemOutOrderInfo.purchaseApplyDetailVo.forEach((item) => {
						item.purchaseQuantity = '';
						item.price = '';
						item.purchaseRemark = '';
					});
				})
			},
			
			/**
			 * 提交
			 */
			save: function(){
				let _that = this;
				let msg = '';
				this.itemOutOrderInfo.purchaseApplyDetailVo.forEach((item) => {
					if (!item.hasOwnProperty('purchaseQuantity') || item.purchaseQuantity == '' || parseInt(item.purchaseQuantity) < 1) {
						msg = '请填写发放数量';
						return;
					}
					item.purchaseQuantity = parseInt(item.purchaseQuantity);
					if (item.purchaseQuantity > parseInt(item.stock)) {
						msg = item.resName + '库存不足';
						return;
					}
				});
				if(msg != ''){
					uni.showToast({
						title:msg,
						icon: 'none'
					});
					_that.onoff = true;
					return;
				}
				this.itemOutOrderInfo.taskId =this.taskId;
				saveResourceOut(this,this.itemOutOrderInfo)
				.then(function(res){
					uni.showToast({
						title:res.msg,
						icon: 'none'
					});
					if(res.code == 0){
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.item-remove {
		border-radius: 15rpx;
		padding: 2rpx 10rpx;
	}
	.resource-header {
		margin-top: 30upx;
		padding: 20upx
	}

	.resource-item {
		margin-top: 2upx;
		padding:20upx;
		.flex-around {
			display: flex;
			justify-content: space-between;
			margin-top: 15upx;
		}
	}
</style>
