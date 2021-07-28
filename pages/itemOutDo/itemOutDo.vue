<template>
	<view class="select-single-resource">
		<view class="margin-top">
			<view class="cu-list menu-avatar " v-for="(item,index) in itemOutOrderInfo.purchaseApplyDetailVo" :key="index">
				<view class="cu-item" style="height: 200rpx;">
					<view class="content content-left" style="width: 100%;">
						<view class="text-grey">
							<text class="ellip">{{item.resName}}-{{item.rstName}}</text>
						</view>
						<view class="text-grey">
							<text class="ellip">库存:{{item.stock}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请数量：{{item.quantity}}</text>
						</view>
						<view class="text-gray flex">
							<view class="flex-item w50">
								<label>发放数量:</label>
								<input class="use-number bg-gray" type="number" v-model="item.purchaseQuantity" value="" />
							</view>
						</view>
						<view class="text-gray flex" style="margin: 10rpx 0;">
								<label>备注:</label>
								<input class="remark bg-gray" type="text" v-model="item.purchaseRemark" value="" />
						</view>
					</view>
				</view>
			</view>
			<view class="cu-btn lg bg-blue fr margin-top margin-right" @click="$preventClick(save)">
				提交
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
				saveResourceOut(this,this.itemOutOrderInfo)
				.then(function(res){
					if(res.code == 0){
						_that._saveMyAuditOrders();
					}
				})
			},
			
			_saveMyAuditOrders: function(){
				let _that = this;
				let _auditInfo = {
					taskId: this.taskId,
					applyOrderId: this.applyOrderId,
					state: '1100',
					remark: '出库完成'
				};
				saveMyAuditOrders(this,_auditInfo)
				.then(function(res){
					_that.onoff = true;
					uni.showToast({
						title:res.msg,
						icon: 'none',
						noticeState: '1002'
					});
					uni.navigateBack({
						delta:1
					})
				})
			}
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
	
	.flex-item{
		display: flex;
		flex-direction: row;
	}
	.w50{
		width: 50%;
	}
	.flex label, .flex-item label{
		width: 130rpx;
	}
	.use-number{
		width: 200rpx;
		border-radius: 15rpx;
	}
	.remark{
		width: 75%;
		border-radius: 15rpx;
	}
</style>
