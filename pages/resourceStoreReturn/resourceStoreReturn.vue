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
					<view class="cu-item" style="height: 220rpx;">
						<view class="content content-left" style="width: 100%;">
							<view class="text-grey flex-around">
								<text class="ellip">{{item.resName}}({{item.parentRstName}}>{{item.rstName}})</text>
								<text class="item-remove bg-red text-df" @click="_removeItem(index, item.resId)">移除</text>
							</view>
							<view class="text-gray flex-around text-df" style="margin: 10rpx 0;">
								<view>
									<text>当前库存:</text>
									<text>{{item.miniStock}}{{item.miniUnitCodeName}}</text>
								</view>
								<text class="item-remove bg-blue text-df" @click="_itemReturnAll(index, item.resId)">全部退还</text>
							</view>
							<view class="text-gray flex-around">
									<label>退还数量({{item.miniUnitCodeName}}):</label>
									<view class="flex">
										<text class="cuIcon-move" @click="_decItemCurstock(item.resId)"></text>
										<input class="use-number bg-gray" type="number" v-model="item.curStock" value="" />
										<text class="cuIcon-add" @click="_incItemCurstock(item.resId)"></text>
									</view>
							</view>
							<view class="text-gray flex-around">
									<label>退还仓库:</label>
									<picker :value="selectedStoreHousesList[index]" :range="storeHouses" :range-key="'shName'" @change="_storeHousesChange(index,$event)">
										<view class="picker">
											{{storeHouses[selectedStoreHousesList[index]].shName}}
										</view>
									</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">退还说明</view>
				<input v-model="remark" placeholder="请输入退还说明"></input>
			</view>
		</view>
		<view class="footer-step-fixed">
			<view class="step-item" @click="$preventClick(save)">提交</view>
		</view>
		<select-resource-staff @getResourceInfo="_getResourceInfo" ref="selectresourcestaff"></select-resource-staff>
	</view>
</template>

<script>
	import {
		saveAllocationStorehouse,listStoreHouses
	} from '../../api/resource/resource.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	// 组件
	import selectResourceStaff from '../../components/select-resource-staff/select-resource-staff.vue'
	
	import {getCurrentCommunity} from '../../api/community/community.js'
	
	export default {
		data() {
			return {
				onoff: true,
				remark: '',
				resourceStores: [],
				supplierIndex: 0,
				storeHouses: [
					{
						shId: '',
						shName: '请选择'
					}
				],
				selectedStoreHousesList: [],
				apply_type: 20000
			}
		},
		components:{
			selectResourceStaff
		},
		onLoad() {
			this.java110Context.onLoad();
			this._loadResourceStoreHouses();
		},
		methods: {
			
			_openChooseResourceModel: function(){
				this.$refs.selectresourcestaff.switchShow();
			},
			
			_loadResourceStoreHouses: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId,
					isShow: true
				};
				listStoreHouses(this, _data)
					.then(function(res) {
						_that.storeHouses = _that.storeHouses.concat(res.data);
					});
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
				if(this.remark == ''){
					msg = '请输入退还说明';
				}
				this.resourceStores.forEach((item) => {
					if(!item.hasOwnProperty('curStock') || parseInt(item.curStock) < 1){
						msg = '请填写数量';
						return;
					}
					item.curStock = parseInt(item.curStock);
					if (item.curStock > parseInt(item.miniStock)) {
						msg = item.resName + ",库存不足";
						return;
					}
					if(!item.hasOwnProperty('shzId') || item.shzId == ''){
						msg = '请选择仓库';
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
					communityId: getCurrentCommunity().communityId
				};
				saveAllocationStorehouse(this, _data)
				.then(function(res) {
					if (res.code == 0) {
						uni.navigateBack({
							delta:1
						})
						return;
					}
				});
			},
			
			
			_getResourceInfo: function(list){
				this.resourceStores = list;
				this.resourceStores.forEach((item)=>{
					item.curStock = 0;
					this.selectedStoreHousesList.push(0);
				})
			},
			
			_removeItem: function(index, resId){
				this.resourceStores.splice(index, 1);
				// 通知子组件 取消选中checkbox
				this.$refs.selectresourcestaff.removeSelectedItem(resId);
			},
			
			_itemReturnAll: function(index, resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId){
						item.curStock = item.miniStock;
					}
				})
				this.$forceUpdate();
			},
			
			_decItemCurstock: function(resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId && item.curStock > 1){
						item.curStock -= 1;
					}
				})
				this.$forceUpdate();
			},
			
			_incItemCurstock: function(resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId && item.miniStock > item.curStock){
						item.curStock += 1;
					}
				})
				this.$forceUpdate();
			},
			
			_storeHousesChange: function(i, e) {
				this.$set(this.selectedStoreHousesList, i, e.target.value)
				this.resourceStores[i].shzId=this.storeHouses[this.selectedStoreHousesList[i]].shId
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
		width: 250rpx;
	}
	.use-number{
		width: 200rpx;
		border-radius: 15rpx;
	}
	.remark{
		width: 80%;
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
	}
</style>
