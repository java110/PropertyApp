<template>
	<view>
		<view class="block__title">采购人</view>
		<view class="cu-form-group">
			<view class="title">仓库</view>
			<picker bindchange="PickerChange" :value="storehouseIndex" :range="storehouses" :range-key="'shName'"
				@change="_computeFlow">
				<view class="picker">
					{{storehouseIndex == '-1'?'请选择':storehouses[storehouseIndex].shName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">联系人</view>
			<input v-model="endUserName" placeholder="请输入联系人" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="endUserTel" placeholder="请输入手机号" class="text-right"></input>
		</view>
		<view class="cu-form-group ">
			<textarea v-model="description" placeholder="请输入报修内容"></textarea>
		</view>

		<view-resource-store-info @getResourceStores="_getResourceStores" ref="viewresourcestoreinfo"
			:resOrderType="resOrderType" :shType="shType"></view-resource-store-info>

		<view class="footer-step-fixed-bk"></view>

		<view class="footer-step-fixed flex justify-end">
			<view class="margin-right">您选择了{{resourceStores.length}}中物品</view>
			<view class="margin-right-sm">
				<button class="cu-btn round bg-blue" @tap="_toAddPurchaseApplyPage()">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listStoreHouses,
		queryFirstAuditStaff
	} from '../../api/resource/resource.js';
	import viewResourceStoreInfo from '../../components/resource/view-resource-store-info.vue'
	
	export default {
		data() {
			return {
				resourceStores: [],
				resourceSuppliers: [],
				audit: {
					assignee: '',
					staffId: '',
					staffName: '',
					taskId: ''
				},
				description: '',
				endUserName: '',
				endUserTel: '',
				file: '',
				resOrderType: '10000',
				staffId: '',
				staffName: '',
				communityId: '',
				shId: '',
				storehouses: [],
				storehouseIndex: -1,
				flowId: '',
			}
		},
		components: {
			viewResourceStoreInfo
		},
		onLoad() {
			this.java110Context.onLoad();
			this.staffId = this.getStaffId();
			this.endUserName = this.getStaffName();
			this.endUserTel = this.getStaffTel();

			this._listPurchaseStorehouses();
		},
		methods: {
			_listPurchaseStorehouses: function() {
				let _that = this;
				let param = {
					page: 1,
					row: 100,
					communityId: this.getCommunityId(),
					allowPurchase: 'ON'
				};
				listStoreHouses(this, param).then(_data => {
					_that.storehouses = _data.data;
				})
			},
			_getResourceStores: function(list) {
				this.resourceStores = list
			},
			_computeFlow: function(e) {
				this.storehouseIndex = e.target.value //取其下标
				let selected = this.storehouses[this.storehouseIndex] //获取选中的数组
				this.shId = selected.shId //选中的id
				console.log(selected)
				let _that = this;
				let _flowId = selected.purchaseFlowId;
				_that.flowId = _flowId;
				if (!_flowId) {
					return;
				}
				this._loadStaffOrg(_flowId);
			},
			_loadStaffOrg: function(_flowId) {
				let _that = this;
				queryFirstAuditStaff(this, {
					communityId: this.getCommunityId(),
					flowId: _flowId
				}).then(_data => {
					_that.audit = _data.data
				})
			},

		}
	}
</script>

<style lang="scss">
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.footer-step-fixed {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		-moz-box-shadow: 0px -5px 5px #ccc;
		box-shadow: 0px -5px 5px #ccc;
		background-color: #fff;
	}
	.footer-step-fixed-bk{
		height: 200upx;
	}
</style>
