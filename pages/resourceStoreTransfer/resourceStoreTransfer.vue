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
							<view class="text-grey flex-around">
								<text class="ellip">{{item.resName}}({{item.parentRstName}}>{{item.rstName}})</text>
								<text class="item-remove bg-red text-df" @click="_removeItem(index, item.resId)">移除</text>
							</view>
							<view class="text-gray flex-around text-df" style="margin: 10rpx 0;">
									<text>当前库存:</text>
									<text>{{item.miniStock}}{{item.miniUnitCodeName}}</text>
							</view>
							<view class="text-gray flex-around">
								<label>数量({{item.miniUnitCodeName}}):</label>
								<input class="use-number bg-gray" type="number" v-model="item.giveQuantity" value="" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white search margin-top">
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_openChooseStaffModel()">选择员工</button>
				</view>
			</view>
			<view class="cu-form-group margin-top" v-if="acceptUserId">
				<view class="title">员工</view>
				<input v-model="acceptUserName" disabled="disabled"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">转赠说明</view>
				<input v-model="description" placeholder="请输入转赠说明"></input>
			</view>
		</view>
		<view class="footer-step-fixed">
			<view class="step-item" @click="$preventClick(save)">提交</view>
		</view>
		<select-resource-staff @getResourceInfo="_getResourceInfo" ref="selectresourcestaff"></select-resource-staff>
		<select-staff @getStaffInfo="_getStaffInfo" ref="selectstaff"></select-staff>
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
	import selectStaff from '../../components/select-staff/select-staff.vue'
	
	import {getCurrentCommunity} from '../../api/community/community.js'
	
	export default {
		data() {
			return {
				onoff: true,
				description: '',
				resourceStores: [],
				apply_type: 20000,
				acceptUserId: '',
				acceptUserName: ''
			}
		},
		components:{
			selectResourceStaff,
			selectStaff
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		methods: {
			
			_openChooseResourceModel: function(){
				this.$refs.selectresourcestaff.switchShow();
			},
			
			_openChooseStaffModel: function(){
				this.$refs.selectstaff.switchShow();
			},
			
			_getStaffInfo: function(_staffInfo){
				this.acceptUserId = _staffInfo.userId;
				this.acceptUserName = _staffInfo.userName;
			},
			
			_getResourceInfo: function(list){
				this.resourceStores = list;
				this.resourceStores.forEach((item) => {
					item.giveQuantity = 0;
				})
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
				if(this.description == ''){
					msg = '请输入转赠说明';
				}
				if(this.acceptUserId == ''){
					msg = '请选择员工';
				}else{
					let userId = this.java110Context.getUserInfo().userId;
					if(userId == this.acceptUserId){
						msg = '不能转赠给自己';
					}
				}
				this.resourceStores.forEach((item) => {
					if(!item.hasOwnProperty('giveQuantity') || parseInt(item.giveQuantity) < 1){
						msg = '请填写数量';
						return;
					}
					item.giveQuantity = parseInt(item.giveQuantity);
					if (item.giveQuantity > parseInt(item.miniStock)) {
						msg = item.resName + ",库存不足";
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
					description: this.description,
					acceptUserId: this.acceptUserId,
					acceptUserName: this.acceptUserName,
					communityId: getCurrentCommunity().communityId
				};
				saveResourceStoreTransfer(this, _data)
				.then(function(res) {
					if (res.code == 0) {
						_that.onoff = true;
						uni.navigateBack({
							delta:1
						})
						return;
					}else{
						_that.onoff = true;
					}
				});
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
		left: 0;
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
