<template>
	<view>
		<view v-show="step == '1'" style="padding-bottom: 100rpx;">
			<view-resource-store-info @getResourceStores="_getResourceStores" ref="viewresourcestoreinfo" :resOrderType="resOrderType" :shType="shType"></view-resource-store-info>
		</view>
		<view v-show="step == '2'">
			<add-purchase-apply-view @getApplyUserInfo="_getApplyUserInfo" ref="addpurchaseapplyview"></add-purchase-apply-view>
		</view>
		<view v-show="step == '3'">
			<purchase-approvers @getApproversInfo="_getApproversInfo" ref="purchaseapprovers" :flowType="flowType"></purchase-approvers>
		</view>
		<view class="footer-step-fixed">
			<view class="step-item" :class="{'text-grey':step==1}" @click="prevStep()">上一步</view>
			<view class="step-item" @click="$preventClick(nextStep)">{{step == 3 ? '提交' : '下一步'}}</view>
		</view>
	</view>
</template>

<script>
	import {
		saveItemOutApply
	} from '../../api/resource/resource.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	// 组件
	import viewResourceStoreInfo from '../../components/view-resource-store-info/view-resource-store-info.vue'
	import addPurchaseApplyView from '../../components/add-purchase-apply-view/add-purchase-apply-view.vue'
	import purchaseApprovers from '../../components/purchase-approvers/purchase-approvers.vue'
	import {getCurrentCommunity} from '../../api/community/community.js'
	
	export default {
		data() {
			return {
				onoff: true,
				step: 1,
				resOrderType: '20000',
				flowType: '40004',
				shType: '2807',
				resourceStores: [],
				endUserName: '',
				endUserTel: '',
				description: '',
				staffId: '',
				staffName: ''
			}
		},
		components:{
			viewResourceStoreInfo,
			addPurchaseApplyView,
			purchaseApprovers
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		methods: {
			
			prevStep: function(){
				if(this.step == 1){
					return;
				}
				this.step -= 1;
			},
			
			nextStep: function(){
				// uni.showLoading({
				// 	title:'请稍后...'
				// });
				let _that = this;
				if(this.step != 3){
					// 验证
					// step 1 物品选择
					this.$refs.viewresourcestoreinfo.getResourceStores();
					if(this.resourceStores.length < 1){
						this._showToast('请选择物品');
						_that.onoff = true;
						return;
					}
					let msg = '';
					this.resourceStores.forEach((item) => {
						if(!item.hasOwnProperty('quantity') || parseInt(item.quantity) < 1){
							msg = '请完善物品信息';
							_that.onoff = true;
							return;
						}
						item.quantity = parseInt(item.quantity);
						if (this.resOrderType == '20000' && (item.quantity > parseInt(item.stock))) {
							msg = item.resName + ",库存不足";
							_that.onoff = true;
							return;
						}
					})
					if(msg != ''){
						this._showToast(msg);
						_that.onoff = true;
						return;
					}
					// step 2 人员信息
					if(this.step == 2 && (this.endUserName == '' || this.endUserTel == '' || this.description == '')){
						this._showToast('请完善信息');
						_that.onoff = true;
						return;
					}
					this.step += 1;
					_that.onoff = true;
					return;
				}
				// step 3 审核人员
				if(this.step == 3 && (this.staffId == '' || this.staffName == '')){
					this._showToast('请完善信息');
					_that.onoff = true;
					return;
				}else{
					// 提交
					let _data = {
						description: this.description,
						endUserName: this.endUserName,
						endUserTel: this.endUserTel,
						resOrderType: this.resOrderType,
						resourceStores: this.resourceStores,
						staffId: this.staffId,
						staffName: this.staffName,
						communityId: getCurrentCommunity().communityId
					};
					saveItemOutApply(this, _data)
					.then(function(res) {
						if (res.code == 0) {
							_that.onoff = true;
							uni.navigateBack({
								delta:1
							})
							return;
						}
					});
				}
			},
			
			// step 1 数据传递
			_getResourceStores: function(list){
				this.resourceStores = list
			},
			
			// step 2 数据传递
			_getApplyUserInfo: function(userInfo){
				this.endUserName = userInfo.endUserName;
				this.endUserTel = userInfo.endUserTel;
				this.description = userInfo.description;
			},
			
			// step 3 数据传递
			_getApproversInfo: function(approverInfo){
				this.staffId = approverInfo.staffId;
				this.staffName = approverInfo.staffName;
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
		width: 300rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}
</style>
