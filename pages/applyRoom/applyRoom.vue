<template>
	<view>
		<view class="margin-top" v-if="applyRoomList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in applyRoomList" :key="index" @tap="_toApplyRoomDetail(item)">
				<view class="cu-item arrow">
					<view class="content content-left">
						<view class="text-grey">
							<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						 {{item.stateName}}-{{item.applyTypeName}}
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								申请人：{{item.createUserName}}-{{item.createUserTel}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">
							<text class="lg text-gray cuIcon-right margin-left-xs"></text>
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
	import {loadApplyRooms} from '../../api/apply/apply.js'
	export default {
		data() {
			return {
				communityId: '',
				applyRoomList: [],
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
			this.applyRoomList = [];
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
				loadApplyRooms(this,_objData)
				.then(function(res){
					if(res.length <= 0){
						uni.showToast({
							title: '已全部加载'
						})
						return;
					}
					_that.applyRoomList = _that.applyRoomList.concat(res)
					_that.page ++;
				})
			},
			
			/**
			 * 跳转详情页
			 */
			_toApplyRoomDetail: function(_item){
				console.log(111);
				uni.navigateTo({
					url: '/pages/applyRoomDetail/applyRoomDetail?apply=' + JSON.stringify(_item)
				});
			}
		}
	}
</script>

<style>
	.load-more{
		width: 80%;
		margin: 30rpx auto;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background-color: #00AA00;
		border-radius: 15rpx;
		color: #fff;
		font-size: 32rpx;
	}
</style>
