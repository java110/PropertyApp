<template>
	<view class="select-single-resource">
		<view class="margin-top">

			<view class="resource-header flex justify-between bg-white">
				<view class="text-bold">调拨物品</view>
				<view>
				</view>
			</view>
			<view class=" ">
				<view class="resource-item bg-white" v-for="(item,index) in resourceStores" :key="index">
					<view class=" " style="">
						<view class=" flex-around">
							<label class="text-df">物品:</label>
							<text class="ellip text-df">{{item.resName}}-{{item.rstName}}</text>
						</view>
						<view class=" flex-around">
							<label class="text-df">库存:</label>
							<text class="text-df">{{item.originalStock}}</text>
						</view>
						<view class=" flex-around">
							<label class="text-df">原仓库:</label>
							<text class="text-df">{{item.shaName}}</text>
						</view>
						<view class=" flex-around">
							<label class="text-df">目标仓库:</label>
							<text class="text-df">{{item.shzName}}</text>
						</view>
						<view class=" flex-around">
							<label class="text-df">调拨数量:</label>
							<text class="text-df">{{item.stock}}</text>
						</view>

						<view class=" flex-around">
							<label class="text-df">实际数量:</label>
							<input class="  text-right" type="number" v-model="item.quantity" placeholder="请输入数量"
								placeholder-class="text-grey text-df" value="" />
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
		listAllocationStorehouses,
		allocationStoreEnter,
		saveMyAuditOrders
	} from '../../api/resource/resource.js'
	// 防止多次点击
	import {
		preventClick
	} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;

	export default {
		components: {},
		data() {
			return {
				onoff: true,
				itemEnterOrderInfo: '',
				applyId: '',
				taskId: '',
				resourceStores: [],
			}
		},

		onLoad: function(options) {
			this.java110Context.onLoad();
			this.applyId = options.applyId;
			this.taskId = options.taskId;
			this._loadAllocationResources();
		},

		onShow: function() {},

		methods: {

			_loadAllocationResources: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 100,
					applyId: this.applyId,
				};
				listAllocationStorehouses(this, _objData)
					.then(function(res) {
						_that.resourceStores = res.data
					})
			},



			/**
			 * 提交
			 */
			save: function() {
				let _that = this;
				let msg = '';
				
				this.resourceStores.forEach(function(item) {
					if (!item.hasOwnProperty("quantity") || !item.quantity || parseInt(item.quantity) < 0) {
						msg = '数量未填写';
						return;
					}
					item.quantity = parseInt(item.quantity);
				});
				if (msg != '') {
					vc.toast(msg);
					uni.showToast({
						title: msg,
						icon: 'none'
					});
					return;
				}
				let _data = {
					applyId: this.applyId,
					taskId: this.taskId,
					resourceStores: this.resourceStores,
					communityId:this.getCommunityId()
				}
				allocationStoreEnter(this, _data)
					.then(function(res) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						if (res.code == 0) {
							uni.navigateBack({
								delta: 1
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
		padding: 20upx;

		.flex-around {
			display: flex;
			justify-content: space-between;
			margin-top: 15upx;
		}
	}
</style>
