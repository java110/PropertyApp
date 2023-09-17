<template>
	<view>
		<view class="block__title">调拨申请</view>
		<view class="cu-form-group">
			<view class="title">仓库</view>
			<picker bindchange="PickerChange" :value="storehouseIndex" :range="storehouses" :range-key="'shName'"
				@change="_computeFlow">
				<view class="picker">
					{{storehouses[storehouseIndex].shName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group ">
			<textarea v-model="remark" placeholder="请输入申请说明"></textarea>
		</view>

		<view-resource-store-info-allocation @getResourceStores="_getResourceStores"
			ref="viewresourcestoreinfoallocation" :resOrderType="resOrderType" :shId="shId"></view-resource-store-info-allocation>

		<view class="margin-top">
			<select-audit-staff ref="selectAuditStaffRef" @getAuditInfo="_getAuditInfo"></select-audit-staff>
		</view>


		<view class="footer-step-fixed-bk"></view>

		<view class="footer-step-fixed flex justify-end">
			<view class="margin-right"></view>
			<view class="margin-right-sm">
				<button class="cu-btn round bg-blue" @tap="_toAddAllocationPage()">提交</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		saveAllocationStorehouse,
		listStoreHouses,
	} from '../../api/resource/resource.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
	import selectAuditStaff from '../../components/audit/select-audit-staff.vue';
	// 组件
	import viewResourceStoreInfoAllocation from '@/components/resource/view-resource-store-info-allocation.vue'

	export default {
		data() {
			return {
				resOrderType: '20000',
				resourceStores: [],
				remark: '',
				apply_type: 10000,
				audit: {
					assignee: '',
					staffId: '',
					staffName: '',
					taskId: ''
				},
				staffId: '',
				staffName: '',
				communityId: '',
				shId: '',
				storehouses: [],
				storehouseIndex: 0,
				flowId: '',
			}
		},
		components: {
			viewResourceStoreInfoAllocation,
			selectAuditStaff
		},
		onLoad() {
			this.java110Context.onLoad();
			this._listAllocationStorehouses();
		},
		methods: {
			// 验证物品来自同一仓库
			_resourcesFromSameHouse: function(resourcesList) {
				if (!resourcesList || resourcesList.length < 2) {
					return true;
				}
				let lastHouse = '';
				let sign = true;
				for (let i = 0; i < resourcesList.length; i++) {
					if (lastHouse == '') {
						lastHouse = resourcesList[i].shId;
						continue;
					}
					if (lastHouse == resourcesList[i].shId) {
						continue;
					} else {
						sign = false;
						break;
					}
				}
				return sign;
			},

			_toAddAllocationPage: function() {
				let _that = this;
				// 验证
				this.$refs.viewresourcestoreinfoallocation.getResourceStores();
				if (this.resourceStores.length < 1) {
					_that.onoff = true;
					this._showToast('请选择物品');
					return;
				}
				if (!this._resourcesFromSameHouse(this.resourceStores)) {
					_that.onoff = true;
					this._showToast('调拨商品需来自同一仓库！');
					return;
				}
				let msg = '';
				if (this.remark == '') {
					msg = '请输入申请说明';
				}
				this.resourceStores.forEach((item) => {
					if (!item.hasOwnProperty('curStock') || parseInt(item.curStock) < 1) {
						msg = '请填写数量';
						return;
					}
					item.curStock = parseInt(item.curStock);
					if (parseInt(item.curStock) > parseInt(item.stock)) {
						msg = item.resName + ",库存不足";
						return;
					}
					if (!item.hasOwnProperty('shzId') || item.shzId == '') {
						msg = '请选择仓库';
						return;
					}
					if (item.shId == item.shzId) {
						msg = item.resName + ',请选择其他仓库';
						return;
					}
				})
				if (msg != '') {
					_that.onoff = true;
					this._showToast(msg);
					return;
				}
				// 提交
				let _data = {
					resourceStores: this.resourceStores,
					remark: this.remark,
					apply_type: this.apply_type,
					communityId: getCurrentCommunity().communityId,
					audit: this.audit,
					flowId: this.flowId,
					shId:this.shId
				};
				saveAllocationStorehouse(this, _data)
					.then(function(res) {
						if (res.code == 0) {
							// uni.navigateTo({
							// 	url: '/pages/allocationStorehouseManage/allocationStorehouseManage'
							// });
							uni.navigateBack({
								delta: 1
							})
							return;
						}
					});
			},

			// 数据传递
			_getResourceStores: function(list) {
				this.resourceStores = list
			},

			_listAllocationStorehouses: function() {
				let _that = this;
				let param = {
					page: 1,
					row: 100,
					//communityId: this.getCommunityId(),
				};
				listStoreHouses(this, param).then(_data => {
					_that.storehouses = _data.data;
					_that.storehouses.unshift({
						shId: '',
						shName: '请选择'
					})
				})
			},
			_computeFlow: function(e) {
				this.storehouseIndex = e.target.value //取其下标
				let selected = this.storehouses[this.storehouseIndex] //获取选中的数组
				this.shId = selected.shId //选中的id
				console.log(selected)
				let _that = this;
				let _flowId = selected.allocationFlowId;
				_that.flowId = _flowId;
				if (!_flowId) {
					return;
				}
				//this._loadStaffOrg(_flowId);
				this.$refs.selectAuditStaffRef._loadStaffOrg(_flowId);
			},

			_getAuditInfo: function(_audit) {
				console.log('_that.audit', _audit)
				this.audit = _audit;
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
