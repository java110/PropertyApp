<template>
	<view>
		<view class="block__title">
			保养任务
		</view>

		<view v-if="noData==false">
			<view v-for="(item,index) in tasks" :key="index"
				class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding-top padding-left padding-right">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>{{item.taskId}}</view>
					<view class="text-gray">{{item.stateName}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">保养计划</view>
					<view class="text-gray">{{item.planName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">计划编码</view>
					<view class="text-gray">{{item.planId}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">保养人</view>
					<view class="text-gray">{{item.planUserName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">保养时间</view>
					<view class="text-gray">{{item.planInsTime }}</view>
				</view>
				<!-- <view class="flex margin-top-xs justify-between">
					<view class="text-gray">保养方式</view>
					<view class="text-gray">{{item.signTypeName}}</view>
				</view> -->
				<view class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
					<button class="cu-btn sm bg-blue margin-left" @click="_transferMaintainance(item)">流转</button>
					<button class="cu-btn sm bg-green margin-left" @click="_startMaintainance(item)">去保养</button>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import dateUtil from '../../lib/java110/utils/date.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
	import url from '../../constant/url.js';

	import {
		queryMaintainanceTask
	} from '@/api/maintainance/maintainance.js'
	export default {
		data() {
			return {
				tasks: [],
				communityId: '',
				userId: '',
				userName: '',
				noData: false
			}
		},
		components: {
			noDataPage
		},
		onLoad: function() {
			this.java110Context.onLoad();
			this.communityId = getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			this._queryMaintainanceTasks();
		},

		onShow: function() {
			if (this.userId && this.communityId) {
				this._queryMaintainanceTasks();
			}
		},
		methods: {
			_startMaintainance: function(_item) {
				if (dateUtil.compareDate(_item.planInsTime.replace(/-/g, '/'), dateUtil.getCurrentDateTime().replace(
						/-/g, '/'))) {
					uni.showToast({
						title: "尚未开始",
						icon: "none"
					});
					return;
				}
				console.log('开始保养', _item);
				uni.navigateTo({
					url: '/pages/maintainance/excuteMaintainance?taskId=' + _item.taskId +
						'&planName=' + _item.planName
				});
			},
			_queryMaintainanceTasks: function() {
				let _that = this;
				queryMaintainanceTask(this, {
					communityId: _that.communityId,
					page: 1,
					row: 10,
					planUserId: _that.userId,
					moreState: '20200405,20200406',
				}).then(_data => {
					_that.tasks = _data;
					if (_that.tasks.length < 1) {
						_that.noData = true;
					}
				})
			},

			_transferMaintainance: function(_taskInfo) {
				uni.navigateTo({
					url: '/pages/maintainance/maintainanceTransfer?task=' + JSON.stringify(_taskInfo)
				})
			},

			/**
			 * 跳转保养补检
			 */
			_torReexamineMaintainance: function() {
				uni.navigateTo({
					url: '/pages/maintainanceReexamine/maintainanceReexamine'
				});
			},
		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}


	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}

	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}
</style>
