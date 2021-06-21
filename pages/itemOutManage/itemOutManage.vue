<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_toAddItemOutPage()">领用申请</button>
			</view>
		</view>
		<view class="margin-top" v-if="applyList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in applyList" :key="index" @tap="_toApplyDetail(item)">
				<view class="bg-white">
					<view class="item-content">
						<view class="text-grey">
							<text class="cuIcon-goods text-cut text-green margin-right-xs"></text>
							<text class="ellipsis">{{item.resourceNames}}</text>
							-
							<text class="text-bold">{{item.stateName}}</text>
						</view>
						<view class="text-gray text-sm">
							<view class="text-cut">
								申请人：{{item.createUserName}}
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
	import {queryPurchaseApplyList} from '../../api/resource/resource.js'
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
					communityId: this.communityId,
					resOrderType: 20000
				};
				queryPurchaseApplyList(this,_objData)
				.then(function(res){
					console.log(res);
					if(res.purchaseApplys.length <= 0){
						uni.showToast({
							title: '已全部加载'
						})
						return;
					}
					_that.applyList = _that.applyList.concat(res.purchaseApplys)
					_that.page ++;
				})
			},
			
			/**
			 * 跳转详情页
			 */
			_toApplyDetail: function(_item){
				uni.navigateTo({
					url: '/pages/purchaseApplyDetail/purchaseApplyDetail?apply=' + JSON.stringify(_item)
				});
			},
			
			/**
			 * 跳转申请页
			 */
			_toAddItemOutPage: function(_item){
				uni.navigateTo({
					url: '/pages/addItemOutStep/addItemOutStep'
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
	.ellipsis{
		display: inline-block;
		max-width: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		vertical-align: middle
	}
</style>
