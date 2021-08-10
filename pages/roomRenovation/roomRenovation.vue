<template>
	<view>
		<view class="margin-top" v-if="renovationRoomList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in renovationRoomList" :key="index" @tap="_toApplyRoomDetail(item)">
				<view class="cu-item arrow">
					<view class="content content-left">
						<view class="text-grey">
							<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						 {{item.stateName}}-{{item.roomName}}
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								申请人：{{item.personName}}-{{item.personTel}}
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
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {queryRoomRenovation} from '../../api/renovation/renovation.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				communityId: '',
				renovationRoomList: [],
				page: 1,
				loadingStatus : 'loading',
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
		onShow: function(){
			this.page = 1;
			this.renovationRoomList = [];
			this.communityId = getCurrentCommunity().communityId;
			this.loadApply();	
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this.loadApply();
		},
		methods: {
			/**
			 * 加载数据
			 */
			loadApply: function(){
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
					communityId: this.communityId
				};
				queryRoomRenovation(this,_objData)
				.then(function(res){
					_that.renovationRoomList = _that.renovationRoomList.concat(res.data)
					_that.page ++;
					if(_that.renovationRoomList.length == res.total){
						_that.loadingStatus = 'noMore';
						return;
					}
				})
			},
			
			/**
			 * 跳转详情页
			 */
			_toApplyRoomDetail: function(_item){
				uni.navigateTo({
					url: '/pages/roomRenovationDetail/roomRenovationDetail?apply=' + JSON.stringify(_item)
				});
			}
		}
	}
</script>

<style>
	
</style>
