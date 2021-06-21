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
					<view class="cu-item" style="height: 180rpx;">
						<view class="content content-left" style="width: 100%;">
							<view class="text-grey">
								<text class="ellip">{{item.resName}}-{{item.rstName}}</text>
								<text class="item-remove bg-red text-df" @click="_removeItem(index, item.resId)">移除</text>
							</view>
							<view class="text-gray flex text-df" style="margin: 10rpx 0;">
									<text>当前库存:</text>
									<text>{{item.stock}}</text>
							</view>
							<view class="text-gray flex">
								<view class="flex-item w50">
									<label>数量:</label>
									<input class="use-number bg-gray" type="text" v-model="item.curStock" value="" />
								</view>
								<view class="flex-item w50">
									<label>仓库:</label>
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
	import {preventClick} from '../../utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	// 组件
	import selectResourceStaff from '../../components/select-resource-staff/select-resource-staff.vue'
	
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
					communityId: this.java110Context.getCurrentCommunity().communityId
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
							url: '/pages/resourceStoreManage/resourceStoreManage'
						});
						return;
					}
				});
			},
			
			
			_getResourceInfo: function(list){
				this.resourceStores = list;
				this.resourceStores.forEach((item)=>{
					this.selectedStoreHousesList.push(0);
				})
			},
			
			_removeItem: function(index, resId){
				this.resourceStores.splice(index, 1);
				// 通知子组件 取消选中checkbox
				this.$refs.selectresourcestaff.removeSelectedItem(resId);
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
		width: 100rpx;
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
</style>
