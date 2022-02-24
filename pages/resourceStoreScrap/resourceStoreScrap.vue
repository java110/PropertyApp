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
					<view class="cu-item" style="height: 320rpx;">
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
							</view>
							<view class="text-gray flex-around" style="margin: 10rpx 0;">
								<label>损耗类型:</label>
								<picker :value="selectedScrapTypesList[index]" :range="scrapTypes" :range-key="'stateName'" @change="_scrapTypesChange(index,$event)">
									<view class="picker">
										{{scrapTypes[selectedScrapTypesList[index]].stateName}}
									</view>
								</picker>
							</view>
							<view class="text-gray flex-around" style="margin: 10rpx 0;">
								<label>损耗数量({{item.miniUnitCodeName}}):</label>
								<view class="flex">
									<text class="cuIcon-move" @click="_decItemCurstock(item.resId)"></text>
									<input class="use-number bg-gray" type="number" v-model="item.giveQuantity" value="" />
									<text class="cuIcon-add" @click="_incItemCurstock(item.resId)"></text>
								</view>
							</view>
							<view class="text-gray flex-around" style="margin: 10rpx 0;">
								<label class="text-df">备注:</label>
								<input class="remark bg-gray" type="text" v-model="item.purchaseRemark" value="" />
							</view>
						</view>
					</view>
				</view>
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
		saveResourceStoreTransfer
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
				resourceStores: [],
				scrapTypes: [
					{
						state: '',
						stateName: '请选择'
					},
					{
						state: '1001',
						stateName: '报废回收'
					},
					{
						state: '3003',
						stateName: '公用损耗'
					}
				],
				flag: 1,
				selectedScrapTypesList: []
			}
		},
		components:{
			selectResourceStaff
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		methods: {
			
			_openChooseResourceModel: function(){
				this.$refs.selectresourcestaff.switchShow();
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
				this.resourceStores.forEach((item) => {
					if(!item.hasOwnProperty('giveQuantity') || !item.giveQuantity || parseInt(item.giveQuantity) < 1){
						msg = '请填写数量';
						return;
					}
					item.giveQuantity = parseInt(item.giveQuantity);
					if (item.giveQuantity > parseInt(item.miniStock)) {
						msg = item.resName + ",库存不足";
						return;
					}
					if(!item.hasOwnProperty('state') || !item.state){
						msg = '请选择损耗类型';
						return;
					}
					if(!item.hasOwnProperty('purchaseRemark') || !item.purchaseRemark){
						msg = '请填写备注';
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
					flag: this.flag,
					communityId: getCurrentCommunity().communityId
				};
				saveResourceStoreTransfer(this, _data)
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
				let jsonStr = JSON.stringify(list);
				let getList = JSON.parse(jsonStr);
				getList.forEach((newItem) => {
					let isNew = true;
					this.resourceStores.forEach((oldItem)=>{
						if(newItem.resId == oldItem.resId){
							isNew = false;
						}
					})
					if(isNew){
						newItem.giveQuantity = 0;
						newItem.purchaseRemark = '';
						this.resourceStores.push(newItem);
						this.selectedScrapTypesList.push(0);
					}
				})
			},
			
			_removeItem: function(index, resId){
				this.resourceStores.splice(index, 1);
				this.selectedScrapTypesList.splice(index, 1);
				// 通知子组件 取消选中checkbox
				this.$refs.selectresourcestaff.removeSelectedItem(resId);
				console.log(this.resourceStores);
			},
			
			_itemReturnAll: function(index, resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId){
						item.giveQuantity = item.miniStock;
					}
				})
				this.$forceUpdate();
			},
			
			_decItemCurstock: function(resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId && item.giveQuantity > 1){
						item.giveQuantity -= 1;
					}
				})
				this.$forceUpdate();
			},
			
			_incItemCurstock: function(resId){
				this.resourceStores.forEach((item) => {
					if(item.resId == resId && item.miniStock > item.giveQuantity){
						item.giveQuantity += 1;
					}
				})
				this.$forceUpdate();
			},
			
			_scrapTypesChange: function(i, e) {
				this.$set(this.selectedScrapTypesList, i, e.target.value);
				console.log(this.scrapTypes[this.selectedScrapTypesList[i]].state);
				this.resourceStores[i].state=this.scrapTypes[this.selectedScrapTypesList[i]].state;
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
	.remark{
		width: 80%;
		border-radius: 15rpx;
	}
	.flex label, .flex-around label{
		width: 250rpx;
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
	}
</style>
