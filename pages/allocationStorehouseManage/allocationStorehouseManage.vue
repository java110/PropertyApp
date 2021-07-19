<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_toAddAllocationStoreHouseApplyPage()">调拨申请</button>
			</view>
		</view>
		<view class="margin-top" v-if="applyList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in applyList" :key="index" @tap="_toApplyDetail(item)">
				<view class="bg-white">
					<view class="item-content">
						<view class="text-grey">
							<text class="cuIcon-goods text-cut text-green margin-right-xs"></text>
							<text>{{item.applyId}}</text>
							-
							<text class="text-bold">{{item.stateName}}</text>
						</view>
						<view class="text-gray text-sm">
							<view class="text-cut">
								申请人：{{item.startUserName}}
							</view>
						</view>
						<view class="text-gray text-sm">
							<view class="text-cut">
								时间：{{item.createTime}}
							</view>
						</view>
						<view class="cu-btn round lg bg-green" v-if="item.state == 1200 && userId == item.startUserId" @tap.stop="cancelApply(item)">取消调拨</view>
					</view>
				</view>
			</view>
			<view class="load-more" @click="loadApply()">加载更多</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import {listAllocationStorehouseApplys,deleteAllocationStorehouse} from '../../api/resource/resource.js'
	export default {
		data() {
			return {
				communityId: this.java110Context.getCurrentCommunity().communityId,
				applyList: [],
				page: 1,
				userId: this.java110Context.getUserInfo().userId,
			}
		},
		components: {
			noDataPage
		},
		onLoad: function(options) {
		},
		onShow: function(){
			this.page = 1;
			this.applyList = [];
			this.loadApply();	
		},
		methods: {
			/**
			 * 加载数据
			 */
			loadApply: function(){
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
					communityId: this.communityId
				};
				listAllocationStorehouseApplys(this,_objData)
				.then(function(res){
					if(res.data.length <= 0){
						uni.showToast({
							title: '已全部加载'
						})
						return;
					}
					_that.applyList = _that.applyList.concat(res.data)
					_that.page ++;
				})
			},
			
			/**
			 * 跳转调拨申请
			 */
			_toAddAllocationStoreHouseApplyPage: function(){
				uni.navigateTo({
					url: '/pages/allocationStorehouseApply/allocationStorehouseApply'
				});
			},
			
			/**
			 * 跳转详情页
			 */
			_toApplyDetail: function(_item){
				uni.navigateTo({
					url: '/pages/allocationStorehouseApplyDetail/allocationStorehouseApplyDetail?applyId=' + _item.applyId
				});
			},
			
			/**
			 * 取消调拨
			 * @param {Object} item
			 */
			cancelApply: function(item){
				let _that = this;
				uni.showModal({
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认", // 确认按钮文字 
					title: '提示',
					content: '是否取消调拨?',
					confirmColor:'#3B8BFF',
					cancelColor:'#222222',
					success: res => {
						if (res.confirm) {
							deleteAllocationStorehouse(_that,item)
							.then(function(res){
								if(res.code == 0){
									uni.showToast({
										title: res.msg
									})
									_that.page = 1;
									_that.applyList = [];
									_that.loadApply();
								}
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

<style>
	.item-content{
		width: 100%;
		margin-left: 20rpx;
		line-height: 1.6em;
	}
	.bg-white{
		position: relative;
	}
	.cu-btn{
		position: absolute;
		right: 10rpx;
		top: 25rpx;
	}
</style>
