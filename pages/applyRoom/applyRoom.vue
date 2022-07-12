<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入房屋号" v-model="roomName" confirm-type="search"></input>
			</view>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<picker :value="applyStatesIndex" :range="applyStates" :range-key="'name'" @change="applyStatesChange">
					<view>{{applyStates[applyStatesIndex].name}}</view>
				</picker>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="$preventClick(_searchApply)">搜索</button>
			</view>
		</view>
		<view class="margin-top" v-if="applyRoomList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in applyRoomList" :key="index" @tap="_toApplyRoomDetail(item)">
				<view class="cu-item arrow">
					<view class="item-content">
						<view class="text-grey">
							<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						 {{item.stateName}}-{{item.roomName}}
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
	import {loadApplyRooms,queryDictInfo} from '../../api/apply/apply.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				communityId: '',
				applyRoomList: [],
				page: 1,
				loadingStatus : 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				applyStates: [{
					name: '请选择'
				}],
				applyStatesIndex: 0,
				applyState: '',
				roomName: ''
			}
		},
		components: {
			noDataPage,
			uniLoadMore
		},
		onLoad: function(options) {
			this.java110Context.onLoad();
			this.loadApplyState();
		},
		onShow: function(){
			this.page = 1;
			this.applyRoomList = [];
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
			_searchApply: function() {
				this.applyRoomList = [];
				this.page = 1;
				this.loadApply();
			},
			
			loadApplyState: function(){
				let _that = this;
				let _objData = {
					'name': "apply_room_discount",
					'type': "state",
				};
				queryDictInfo(this,_objData)
				.then(function(res){
					_that.applyStates = _that.applyStates.concat(res);
				})
			},
			
			applyStatesChange: function(e){
				this.applyStatesIndex = e.target.value;
				if (this.applyStatesIndex == 0) {
					this.applyState = '';
					return;
				}
				let selected = this.applyStates[this.applyStatesIndex];
				this.applyState = selected.statusCd;
			},
			
			/**
			 * 加载数据
			 */
			loadApply: function(){
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
					communityId: this.communityId,
					roomName: this.roomName,
					state: this.applyState
				};
				loadApplyRooms(this,_objData)
				.then(function(res){
					_that.applyRoomList = _that.applyRoomList.concat(res.data)
					_that.page ++;
					if(_that.applyRoomList.length == res.total){
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
					url: '/pages/applyRoomDetail/applyRoomDetail?ardId=' + _item.ardId + '&communityId=' + _item.communityId
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
