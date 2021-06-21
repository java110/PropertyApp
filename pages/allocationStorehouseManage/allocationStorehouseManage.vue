<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_toAddAllocationStoreHouseApplyPage()">调拨申请</button>
			</view>
		</view>
		<view class="margin-top" v-if="applyList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in applyList" :key="index">
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
	import {listAllocationStorehouseApplys} from '../../api/resource/resource.js'
	export default {
		data() {
			return {
				communityId: '',
				applyList: [],
				page: 1,
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
			this.communityId = this.java110Context.getCurrentCommunity().communityId;
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
</style>
