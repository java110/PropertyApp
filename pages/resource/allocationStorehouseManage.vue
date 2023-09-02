<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="action">
				<button class="cu-btn round line-blue" @tap="_toAddAllocationStoreHouseApplyPage()">调拨申请</button>
			</view>
			<view class="action">

			</view>
		</view>
		<view class="margin-top" v-if="applyList.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in applyList"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="cuIcon-goods text-cut text-green margin-right-xs"></text>
						<text class="text-bold">{{item.applyId}}</text>
						<text class="margin-left-sm">({{item.stateName}})</text>
					</view>
					<view class="flex justify-start">
						<button class="cu-btn round sm line-red"
							v-if="item.state == 1200 && userId == item.createUserId"
							@tap="cancelApply(item)">取消</button>
						<button class="cu-btn round sm line-black margin-left-sm"
							@tap="_toApplyDetail(item)">详情</button>
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>申请人:</text>
						<text>{{item.startUserName}}</text>
					</view>
					<view class="item">
						<text>时间:</text>
						<text>{{item.createTime}}</text>
					</view>
					<view class="item">
						<text>类型:</text>
						<text>{{item.applyTypeName}}</text>
					</view>
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
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		listAllocationStorehouseApplys,
		deleteAllocationStorehouse
	} from '../../api/resource/resource.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
	export default {
		data() {
			return {
				communityId: '',
				applyList: [],
				page: 1,
				userId: this.java110Context.getUserInfo().userId,
				loadingStatus: 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		components: {
			noDataPage,
			uniLoadMore
		},
		onLoad: function(options) {
			this.java110Context.onLoad();
		},
		onShow: function() {
			this.page = 1;
			this.applyList = [];
			this.communityId = getCurrentCommunity().communityId;
			this.loadApply();
		},
		onReachBottom: function() {
			if (this.loadingStatus == 'noMore') {
				return;
			}
			this.loadApply();
		},
		methods: {
			/**
			 * 加载数据
			 */
			loadApply: function() {
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
					communityId: this.communityId
				};
				listAllocationStorehouseApplys(this, _objData)
					.then(function(res) {
						_that.applyList = _that.applyList.concat(res.data)
						_that.page++;
						if (_that.applyList.length == res.total) {
							_that.loadingStatus = 'noMore';
							return;
						}
					})
			},

			/**
			 * 跳转调拨申请
			 */
			_toAddAllocationStoreHouseApplyPage: function() {
				uni.navigateTo({
					url: '/pages/resource/allocationStorehouseApply'
				});
			},

			/**
			 * 跳转详情页
			 */
			_toApplyDetail: function(_item) {
				uni.navigateTo({
					url: '/pages/resource/allocationStorehouseApplyDetail?applyId=' +
						_item.applyId
				});
			},

			/**
			 * 取消调拨
			 * @param {Object} item
			 */
			cancelApply: function(item) {
				let _that = this;
				uni.showModal({
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认", // 确认按钮文字 
					title: '提示',
					content: '是否取消调拨?',
					confirmColor: '#3B8BFF',
					cancelColor: '#222222',
					success: res => {
						if (res.confirm) {
							deleteAllocationStorehouse(_that, item)
								.then(function(res) {
									uni.showToast({
										title: res.msg
									})
									_that.page = 1;
									_that.applyList = [];
									_that.loadApply();
								})
						} else if (res.cancel) {
							console.log('cancel')
						}
					}
				});
			}
		}
	}
</script>


<style lang="scss">
	.item-content {
		width: 100%;
		margin-left: 20rpx;
		line-height: 1.6em;
	}

	.ellipsis {
		display: inline-block;
		max-width: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		vertical-align: middle
	}

	.bg-white {
		position: relative;
	}

	.btn-cancel {
		position: absolute;
		right: 10rpx;
		top: 25rpx;
	}

	.apply-title {
		height: 60upx;
		line-height: 50upx;
		border-bottom: 1upx solid #F1F1F1;
	}

	.apply-content {
		.item {
			width: 50%;
			margin-top: 20upx;
		}
	}

	.radius-sm {
		border-radius: 16upx;
	}
</style>
