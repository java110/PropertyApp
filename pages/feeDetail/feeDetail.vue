<template>
	<view>
		<view class="block__title">费用信息</view>
		<view class="cu-form-group">
			<view class="title">费用名称</view>
			{{feeInfo.feeName}}
		</view>
		<view class="cu-form-group">
			<view class="title">费用类型</view>
			{{feeInfo.feeTypeCdName}}
		</view>
		<view class="cu-form-group">
			<view class="title">到期时间</view>
			{{feeInfo.deadlineTime}}
		</view>
		<view class="cu-form-group">
			<view class="title">费用标识</view>
			{{feeInfo.feeFlagName}}
		</view>
		<view class="cu-form-group">
			<view class="title">收费状态</view>
			{{feeInfo.stateName}}
		</view>
		<view v-if="noData == false">
			<view class="block__title">缴费历史</view>
			<view v-for="(item,index) in feeDetails" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>缴费金额</view>
					<view class="text-gray">{{item.receivedAmount}}元</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">缴费编码</view>
					<view class="text-gray">{{item.detailId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">缴费周期</view>
					<view class="text-gray">{{item.cycles}}个月</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">缴费时间</view>
					<view class="text-gray">{{item.createTime}}</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		loadFees,
		queryFeeDetail
	} from '../../api/fee/fee.js';
	import {getCurrentCommunity} from '../../api/community/community.js'
	import dateUtil from '../../lib/java110/utils/date.js'
	export default {
		data() {
			return {
				feeDetails: [],
				feeInfo: {},
				noData: false
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.java110Context.onLoad();
			this.feeId = options.feeId;
			this._loadFees();
			this._loadFeeDetail();
		},
		methods: {
			_loadFeeDetail: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 30,
					feeId: this.feeId,
					communityId: getCurrentCommunity().communityId
				}
				queryFeeDetail(this, _objData)
					.then(function(res) {
						if (res.statusCode == 200) {
							//成功情况下跳转
							let _feeDetails = res.data.feeDetails;
							if (_feeDetails == null || _feeDetails == undefined) {
								_feeDetails = [];
							} else {
								_feeDetails.forEach(function(_feeDetail) {
									let _tmpCreateTime = _feeDetail.createTime.replace(/\-/g, "/")
									//let _createTime = new Date(_tmpCreateTime);
									_feeDetail.createTime = _tmpCreateTime;
								});
							}

							if (_feeDetails.length < 1) {
								_that.noData = true;
							}
							console.log(_feeDetails, _feeDetails.length, _that.noData);
							_that.feeDetails = _feeDetails;
						}
					})
			},
			_loadFees: function() {
				let _that = this;
				let _data = {
					page: 1,
					row: 1,
					communityId: getCurrentCommunity().communityId,
					feeId: this.feeId
				}
				loadFees(this, _data)
					.then(function(res) {
						if (res.statusCode != 200) {
							return;
						}
						let _fees = res.data.fees;
						_that.feeInfo = _fees[0];
						// 周期费用 结束日期 -1 天； 其他不变
						if(_that.feeInfo.feeFlag == '1003006'){
							_that.feeInfo.deadlineTime = dateUtil.decSomeDays(_that.feeInfo.deadlineTime, 1);
						}else{
							_that.feeInfo.deadlineTime = dateUtil.formatDate(new Date(_that.feeInfo.deadlineTime.replace(/-/g, '/')));
						}
					})
			},
		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.ppf_item {
		padding: 0rpx 0rpx 0rpx 0rpx;
	}

	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.block__bottom {
		height: 180rpx;
	}
</style>
