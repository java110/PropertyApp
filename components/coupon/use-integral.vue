<template>
	<view>
		<view class="cu-form-group margin-top-sm">
			<view class="title">手机号</view>
			<input placeholder="请输入手机号" class="text-right" @blur="_changeTel()" v-model="tel"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">业主</view>
			<picker @change="ownerIndexChange" :value="ownerIndex" :range="owners" :range-key="'name'">
				<view class="picker">
					{{ownerIndex > -1 ? ownerName:'请选择业主'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top-sm">
			<view class="title">积分账号</view>
			<text>{{acctName}}</text>
		</view>
		<view class="cu-form-group margin-top-sm">
			<view class="title">积分数</view>
			<text>{{quantity}}</text>
		</view>
		<view class="cu-form-group margin-top-sm">
			<view class="title">核销金额</view>
			<input placeholder="请输入核销金额" class="text-right" @blur="_computeUseQuantity()" v-model="useMoney"></input>
		</view>
		<view class="cu-form-group margin-top-sm">
			<view class="title">核销积分</view>
			<text>{{useQuantity}}</text>
		</view>
		<view class="cu-form-group margin-top-sm">
			<view class="title">核销说明</view>
			<textarea placeholder="请输入核销说明" v-model="remark"></textarea>
		</view>
		<view class="padding">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @click="_useIntegralOrder()" type="">核销</button>
		</view>
	</view>
</template>

<script>
	import {
		getIntegralSetting,
		useIntegral
	} from '../../api/coupon/coupon.js';
	import {
		getCurrentCommunity
	} from '../../api/community/community.js';
	import {
		queryOwners,
		queryOwnerAccount
	} from '../../api/owner/owner.js'
	export default {
		name: "useIntegral",
		data() {
			return {
				tel: '',
				ownerId: '',
				ownerName: '',
				acctId: '',
				acctName: '',
				quantity: 0,
				useMoney: '',
				useQuantity: '',
				remark: '',
				owners: [],
				money: 0,
				ownerIndex: -1,
			};
		},
		created() {
			this._loadIntegralSetting();
		},
		methods: {
			ownerIndexChange: function(e) {
				this.ownerIndex = e.detail.value;
				this.ownerName = this.owners[this.ownerIndex].name;
				this.ownerId = this.owners[this.ownerIndex].ownerId;
				if (this.ownerId) {
					this._loadAccount();
				}
			},
			_loadIntegralSetting: function() {
				let _that = this;
				getIntegralSetting(this, {
					page: 1,
					row: 1,
					communityId: getCurrentCommunity().communityId
				}).then(_data => {
					_that.money = _data.data[0].money;
				})
			},
			_changeTel: function() {
				if (!this.tel) {
					return;
				}
				let _that = this;
				queryOwners(this, {
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId,
					link: this.tel,
					ownerTypeCd: '1001'
				}).then(_data => {
					_that.owners = _data.owners;
				})
			},
			_loadAccount: function() {
				let _that = this;
				queryOwnerAccount(this, {
					page: 1,
					row: 1,
					communityId: getCurrentCommunity().communityId,
					objId: this.ownerId,
					acctType: '2004'
				}).then(_data => {
					_that.acctId = _data.data[0].acctId;
					_that.acctName = _data.data[0].acctName;
					_that.quantity = _data.data[0].amount;
				})
			},
			_computeUseQuantity: function() {
				let _quantity = parseFloat(this.useMoney) / parseFloat(this.money);
				this.useQuantity = Math.ceil(_quantity);
			},
			_useIntegralOrder: function() {
				useIntegral(this, {
					acctId: this.acctId,
					useMoney: this.useMoney,
					remark: this.remark,
					communityId: getCurrentCommunity().communityId,
				}).then(_data => {
					uni.showToast({
						icon: 'none',
						title: '核销成功'
					});
					this.tel = '';
					this.ownerId = '';
					this.ownerName = '';
					this.acctId = '';
					this.acctName = '';
					this.quantity = 0;
					this.useMoney = '';
					this.useQuantity = '';
					this.remark = '';
					this.owners = [];
					this.ownerIndex = -1;
				})
			}
		}
	}
</script>

<style>

</style>
