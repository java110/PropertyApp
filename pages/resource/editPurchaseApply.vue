<template>
	<view>
		<view class="block__title">采购人</view>
		<view class="cu-form-group">
			<view class="title">联系人</view>
			<input v-model="endUserName" placeholder="请输入联系人" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="endUserTel" placeholder="请输入手机号" class="text-right"></input>
		</view>
		<view class="cu-form-group ">
			<textarea v-model="description" placeholder="请输入申请说明"></textarea>
		</view>

		<view-resource-store-info @getResourceStores="_getResourceStores" ref="viewresourcestoreinfo"
			:resOrderType="resOrderType" :shId="shId"></view-resource-store-info>


		<view class="footer-step-fixed-bk"></view>

		<view class="footer-step-fixed flex justify-end">
			<view class="margin-right"></view>
			<view class="margin-right-sm">
				<button class="cu-btn round bg-blue" @tap="_toEditPurchaseApplyPage()">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listStoreHouses,
		updatePurchaseApply,
		queryPurchaseApplyList
	} from '../../api/resource/resource.js';
	import viewResourceStoreInfo from '../../components/resource/view-resource-store-info.vue';
	import selectAuditStaff from '../../components/audit/select-audit-staff.vue'

	export default {
		data() {
			return {
				resourceStores: [],
				resourceSuppliers: [],
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
				storehouseIndex: 0,
				resOrderType: '',
				applyOrderId: '',
				purchaseApplyDetailVo:[]
			}
		},
		components: {
			viewResourceStoreInfo,
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.applyOrderId = options.applyOrderId;
			this.resOrderType = options.resOrderType;

			this._listPurchaseApplys();
		},
		methods: {
			_listPurchaseApplys: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					communityId: this.getCommunityId(),
					resOrderType: this.resOrderType,
					applyOrderId: this.applyOrderId
				};
				queryPurchaseApplyList(this, _objData)
					.then(function(res) {
						let _app = res.purchaseApplys[0];
						_that.description = _app.description;
						_that.endUserName = _app.endUserName;
						_that.endUserTel = _app.endUserTel;
						_that.shId = _app.shId;
						_that.purchaseApplyDetailVo = _app.purchaseApplyDetailVo;
						_that.$refs.viewresourcestoreinfo._setResourceStore(_app.purchaseApplyDetailVo);
					})
			},
			_getResourceStores: function(list) {
				this.resourceStores = list
			},

			_toEditPurchaseApplyPage: function() {

				let _that = this;
				this.$refs.viewresourcestoreinfo.getResourceStores();
				let _resourceStores = _that.resourceStores;

				if (!_resourceStores || _resourceStores.length < 1) {
					uni.showToast({
						icon: 'none',
						title: "未选择采购物品"
					})
					return;
				}
				// 提交
				let _data = {
					description: this.description,
					endUserName: this.endUserName,
					endUserTel: this.endUserTel,
					resOrderType: this.resOrderType,
					shId: this.shId,
					resourceStores: this.resourceStores,
					communityId: this.getCommunityId(),
					applyOrderId: this.applyOrderId
				};
				updatePurchaseApply(this, _data)
					.then(function(res) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
						if (res.code == 0) {
							uni.navigateBack({
								delta: 1
							})
							return;
						}
					});
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

	.footer-step-fixed-bk {
		height: 200upx;
	}
</style>
