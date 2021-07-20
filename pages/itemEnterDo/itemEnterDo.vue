<template>
	<view class="select-single-resource">
		<view class="margin-top">
			<view class="cu-list menu-avatar " v-for="(item,index) in itemEnterOrderInfo.purchaseApplyDetailVo" :key="index">
				<view class="cu-item" style="height: 250rpx;">
					<view class="content content-left" style="width: 100%;">
						<view class="text-grey">
							<text class="ellip">{{item.resName}}-{{item.rstName}}</text>
						</view>
						<view class="text-grey">
							<text class="ellip">库存:{{item.stock}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请数量：{{item.quantity}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参考价格{{item.standardPrice}}</text>
						</view>
						<view class="text-gray flex">
							<view class="flex-item w50">
								<label>采购数量:</label>
								<input class="use-number bg-gray" type="number" v-model="item.purchaseQuantity" value="" />
							</view>
							<view class="flex-item w50">
								<label>采购价格:</label>
								<input class="use-number bg-gray" type="number" v-model="item.price" value="" />
							</view>
						</view>
						<view class="flex-item w50" v-show="resOrderType == '10000'">
							<label>供应商:</label>
							<picker :value="suppliersList[index]" :range="resourceSuppliers" :range-key="'supplierName'" @change="_resourceSuppliersChange(index,$event)">
								<view class="picker">
									{{resourceSuppliers[suppliersList[index]].supplierName}}
								</view>
							</picker>
						</view>
						<view class="text-gray flex" style="margin: 10rpx 0;">
								<label>备注:</label>
								<input class="remark bg-gray" type="text" v-model="item.purchaseRemark" value="" />
						</view>
					</view>
				</view>
			</view>
			<view class="cu-btn lg bg-blue fr margin-top margin-right" @click="save()">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryResourceSupplier,
		queryPurchaseApplyList,
		saveResourceEnter,
		saveMyAuditOrders
	} from '../../api/resource/resource.js'
	
	export default {
		components: {
		},
		data() {
			return {
				itemEnterOrderInfo: '',
				applyOrderId: '',
				resOrderType: '',
				taskId: '',
				supplierIndex: 0,
				resourceSuppliers: [
					{
						supplierName: '请选择'
					}
				],
				suppliersList: [],
			}
		},
		
		onLoad: function(options) {
			this.java110Context.onLoad();
			this.applyOrderId = options.applyOrderId;
			this.resOrderType = options.resOrderType;
			this.taskId = options.taskId;
			this._loadItemOutResources();
			this._loadResourceSuppliers();
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
					_that.itemEnterOrderInfo = res.purchaseApplys[0];
					_that.itemEnterOrderInfo.purchaseApplyDetailVo.forEach((item) => {
						item.purchaseQuantity = '';
						item.price = '';
						item.purchaseRemark = '';
						item.rsId = '';
						_that.suppliersList.push(0);
					});
				})
			},
			
			_loadResourceSuppliers: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 100
				};
				queryResourceSupplier(this, _data)
					.then(function(res) {
						_that.resourceSuppliers = _that.resourceSuppliers.concat(res.data);
					});
			},
			_resourceSuppliersChange: function(i, e) {
				this.$set(this.suppliersList, i, e.target.value)
				this.itemEnterOrderInfo.purchaseApplyDetailVo[i].rsId=this.resourceSuppliers[this.suppliersList[i]].rsId
			},
			
			/**
			 * 提交
			 */
			save: function(){
				let _that = this;
				let msg = '';
				this.itemEnterOrderInfo.purchaseApplyDetailVo.forEach((item) => {
					if (item.purchaseQuantity == '' || item.purchaseQuantity < 1) {
						msg = '采购数量未填写';
						return;
					}
					if (item.price == '' || !item.price) {
						msg = '单价未填写';
						return;
					}
				});
				if(msg != ''){
					uni.showToast({
						title:msg,
						icon: 'none'
					});
					return;
				}
				saveResourceEnter(this,this.itemEnterOrderInfo)
				.then(function(res){
					if(res.code == 0){
						_that._saveMyAuditOrders();
					}
				})
			},
			
			_saveMyAuditOrders: function(){
				let _auditInfo = {
					taskId: this.taskId,
					applyOrderId: this.applyOrderId,
					state: '1100',
					remark: '采购入库完成',
					noticeState: '1002'
				};
				saveMyAuditOrders(this,_auditInfo)
				.then(function(res){
					uni.showToast({
						title:res.msg,
						icon: 'none'
					});
					uni.navigateTo({
						url:'/pages/purchaseApplyAuditOrders/purchaseApplyAuditOrders'
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
