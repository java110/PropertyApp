<template>
	<view>
		<view style="padding-bottom: 100rpx;">
			<view class="cu-bar bg-white search ">
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_openChooseResourceModel()">选择物品</button>
				</view>
			</view>
			<view class="margin-top">
				<view class="cu-list menu-avatar " v-for="(item,index) in resourceStores" :key="index">
					<view class="cu-item" style="height: 250rpx;">
						<view class="content content-left" style="width: 100%;">
							<view class="text-grey flex-around">
								<text class="ellip text-df">{{item.resName}}({{item.parentRstName}}>{{item.rstName}})</text>
								<text class="item-remove bg-red text-df" @click="_removeItem(index, item.resId)">移除</text>
							</view>
							<view class="text-gray flex-around">
									<label class="text-df">申请数量:</label>
									<view class="flex">
										<text class="cuIcon-move" @click="_decItemCurstock(item.resId)"></text>
										<input class="use-number bg-gray" type="number" v-model="item.quantity" value="" />
										<text class="cuIcon-add" @click="_incItemCurstock(item.resId)"></text>
									</view>
							</view>
							<view class="text-gray flex-around">
									<label class="text-df">采购单价:</label>
									<view class="flex">
										<input class="use-number bg-gray" type="number" v-model="item.urgentPrice" value="" />
									</view>
							</view>
							<view class="text-gray flex-around">
									<label class="text-df">备注:</label>
									<view class="flex">
										<input class="use-number bg-gray" type="text" v-model="item.remark" value="" />
									</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">使用人</view>
				<input v-model="endUserName" placeholder="请输入使用人"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">联系电话</view>
				<input v-model="endUserTel" placeholder="请输入联系电话"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">申请说明</view>
				<input v-model="description" placeholder="请输入申请说明"></input>
			</view>
		</view>
		<view class="footer-step-fixed">
			<view class="step-item" @click="$preventClick(save)">提交</view>
		</view>
		<select-resource @getResourceInfo="_getResourceInfo" ref="selectresource" :resOrderType="resOrderType" :shType="shType"></select-resource>
	</view>
</template>

<script>
	import {
		saveUrgentPurchaseApply
	} from '../../api/resource/resource.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	// 组件
	import selectResource from '../../components/resource/select-resource.vue'
	
	export default {
		data() {
			return {
				onoff: true,
				description: '',
				endUserName: '',
				endUserTel: '',
				resourceStores: [],
				resOrderType: '10000',
				shType: '2806'
			}
		},
		components:{
			selectResource
		},
		onLoad() {
		},
		methods: {
			
			_openChooseResourceModel: function(){
				this.$refs.selectresource.switchShow();
			},
			
			save: function(){
				let _that = this;
				// 验证
				if(this.resourceStores.length < 1){
					_that.onoff = true;
					this._showToast('请选择物品');
					return;
				}
				let msg = '';
				if(this.endUserName == ''){
					msg = '请输入使用人';
				}else if(this.endUserTel == ''){
					msg = '请输入联系电话';
				}else if(this.description == ''){
					msg = '请输入申请说明';
				}
				this.resourceStores.forEach((item) => {
					if(!item.hasOwnProperty('quantity') || parseInt(item.quantity) < 1){
						msg = '请完善数量信息';
						return;
					}
					item.quantity = parseInt(item.quantity);
					if(!item.hasOwnProperty('urgentPrice') || parseFloat(item.urgentPrice) <= 0){
						msg = '请完善价格信息';
						return;
					}
					item.urgentPrice = parseFloat(item.urgentPrice);
				})
				if(msg != ''){
					_that.onoff = true;
					this._showToast(msg);
					return;
				}
				// 提交
				let _data = {
					resourceStores: this.resourceStores,
					description: this.description,
					resOrderType: this.resOrderType,
					endUserName: this.endUserName,
					endUserTel: this.endUserTel,
					communityId: getCurrentCommunity().communityId
				};
				saveUrgentPurchaseApply(this, _data)
				.then(function(res) {
					_that.onoff = true;
					if (res.code == 0) {
						// uni.navigateTo({
						// 	url: '/pages/purchaseApplyManage/purchaseApplyManage'
						// });
						uni.navigateBack({
							delta:1
						})
						return;
					}else{
						_that._showToast(res.msg);
					}
				});
			},
			
			_getResourceInfo: function(list){
				this.resourceStores = list;
				this.resourceStores.forEach((item)=>{
					item.quantity = 0;
					item.remark = '';
					item.urgentPrice = '';
				})
			},
			
			_removeItem: function(index, resId){
				this.resourceStores.splice(index, 1);
				// 通知子组件 取消选中checkbox
				this.$refs.selectresource.removeSelectedItem(resId);
			},
			
			_decItemCurstock: function(resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId && item.quantity > 1){
						item.quantity -= 1;
					}
				})
				this.$forceUpdate();
			},
			
			_incItemCurstock: function(resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId){
						item.quantity += 1;
					}
				})
				this.$forceUpdate();
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
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 0;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
	
	.flex label, .flex-around label{
		width: 150rpx;
	}
	.use-number{
		width: 200rpx;
		border-radius: 15rpx;
	}
	.item-remove{
		border-radius: 15rpx;
		padding: 2rpx 10rpx;
	}
	.flex-around{
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		margin: 10rpx 0;
	}
</style>
