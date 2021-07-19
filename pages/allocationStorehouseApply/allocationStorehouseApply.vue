<template>
	<view>
		<view style="padding-bottom: 100rpx;">
			<view-resource-store-info-allocation @getResourceStores="_getResourceStores" ref="viewresourcestoreinfoallocation" :resOrderType="resOrderType"></view-resource-store-info-allocation>
			<view class="cu-form-group margin-top">
				<view class="title">申请说明</view>
				<input v-model="remark" placeholder="请输入申请说明"></input>
			</view>
		</view>
		<view class="footer-step-fixed">
			<view class="step-item" @click="$preventClick(save)">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		saveAllocationStorehouse
	} from '../../api/resource/resource.js'
	// 防止多次点击
	import {preventClick} from '../../utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	// 组件
	import viewResourceStoreInfoallocation from '../../components/view-resource-store-info-allocation/view-resource-store-info-allocation.vue'
	
	export default {
		data() {
			return {
				onoff: true,
				step: 1,
				resOrderType: '20000',
				resourceStores: [],
				remark: '',
				apply_type: 10000
			}
		},
		components:{
			viewResourceStoreInfoallocation
		},
		onLoad() {
			
		},
		methods: {
			
			save: function(){
				let _that = this;
				// 验证
				this.$refs.viewresourcestoreinfoallocation.getResourceStores();
				if(this.resourceStores.length < 1){
					_that.onoff = true;
					this._showToast('请选择物品');
					return;
				}
				let msg = '';
				if(this.remark == ''){
					msg = '请输入申请说明';
				}
				this.resourceStores.forEach((item) => {
					if(!item.hasOwnProperty('curStock') || item.curStock < 1){
						msg = '请完善物品信息';
						return;
					}
					if (parseInt(item.curStock) > parseInt(item.stock)) {
						msg = item.resName + ",库存不足";
						return;
					}
					if(!item.hasOwnProperty('shzId') || item.shzId == ''){
						msg = '请选择仓库';
						return;
					}
					if(item.shId == item.shzId){
						msg = item.resName + ',请选择其他仓库';
						return;
					}
				})
				if(msg != ''){
					_that.onoff = true;
					this._showToast(msg);
					return;
				}
				// 提交
				let _data = {
					resourceStores: this.resourceStores,
					remark: this.remark,
					apply_type: this.apply_type,
					communityId: this.java110Context.getCurrentCommunity().communityId
				};
				saveAllocationStorehouse(this, _data)
				.then(function(res) {
					if (res.code == 0) {
						uni.navigateTo({
							url: '/pages/allocationStorehouseManage/allocationStorehouseManage'
						});
						return;
					}
				});
		},
			
			// 数据传递
			_getResourceStores: function(list){
				this.resourceStores = list
			},
			
			_showToast: function(title, icon = 'none'){
				uni.showToast({
					title:title,
					icon:icon
				})
			}
		}
	}
</script>

<style>
	.footer-step-fixed{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		-moz-box-shadow: 0px -5px 5px #ccc;
		box-shadow: 0px -5px 5px #ccc;
		background-color: #fff;
	}
	.step-item{
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}
</style>
