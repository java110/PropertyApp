<template>
	<view>
		<view class="cu-bar bg-white  solid-bottom" style="justify-content: space-around;">
			<view class="action" @click="changeListType(0)">
				<text class="text-blue" :class="{'cuIcon-roundcheckfill' : currentPage == 0, 'cuIcon-roundcheck' : currentPage == 1}"></text>待办
			</view>
			<view class="action" @click="changeListType(1)">
				<text class="text-blue" :class="{'cuIcon-roundcheckfill' : currentPage == 1, 'cuIcon-roundcheck' : currentPage == 0}"></text>已办
			</view>
		</view>
		<view class="margin-top" v-if="applyList.length > 0">
			<view class="cu-list menu-avatar " v-for="(item,index) in applyList" :key="index" @tap="_toApplyDetail(item)">
				<view class="bg-white">
					<view class="item-content">
						<view class="text-grey">
							<text class="cuIcon-goods text-cut text-green margin-right-xs"></text>
							<text class="ellipsis">{{item.applyId}}</text>
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
						<block v-if="currentPage == 0">
							<block v-if="procure == false">
								<view class="cu-btn round lg bg-green" v-if="item.state == 1200 || item.state == 1201" @tap.stop="showAuditModel(item)">审批</view>
								<view class="cu-btn round lg bg-red" v-else @tap.stop="$preventClick(finishAudit, item)">结束</view>
							</block>
							<block v-else>
								<view class="cu-btn round lg bg-green" v-if="item.state == 1201" @tap.stop="showAuditModel(item)">确认调拨</view>
								<view class="cu-btn round lg bg-red" v-else @tap.stop="$preventClick(finishAudit, item)">结束</view>
							</block>
						</block>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
		<audit ref="auditRef" @getInfo="getAuditInfo"></audit>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import auditComponent from '@/components/audit/audit.vue'
	import {listMyAllocationStoreAuditOrders,listAllocationStoreHisAuditOrders,saveAuditAllocationStoreOrder,listWorkflowStepStaffs} from '../../api/resource/resource.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				currentPage: 0,
				communityId: '',
				applyList: [],
				page: 1,
				userId: this.java110Context.getUserInfo().userId,
				orderInfo: '',
				procure: false,
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
			auditComponent
		},
		onLoad: function(options) {
			this.java110Context.onLoad();
		},
		onShow: function(){
			this.page = 1;
			this.applyList = [];
			this.communityId = getCurrentCommunity().communityId;
			this.userId = this.java110Context.getUserInfo().userId;
			this._loadStaff();
			this.loadApply();	
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			if(this.currentPage == 0){
				this.loadApply();
			}else{
				this.loadApplyDone();
			}
		},
		methods: {
			
			changeListType: function(e){
				this.currentPage = e;
				this.page = 1;
				this.applyList = [];
				this.loadingStatus = 'more';
				if(e == 0){
					this.loadApply();
				}else{
					this.loadApplyDone();
				}
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
				};
				listMyAllocationStoreAuditOrders(this,_objData)
				.then(function(res){
					_that.applyList = _that.applyList.concat(res.data)
					_that.page ++;
					if(_that.applyList.length == res.total){
						_that.loadingStatus = 'noMore';
						return;
					}
				})
			},
			
			/**
			 * 已办列表
			 */
			loadApplyDone: function(){
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
				};
				listAllocationStoreHisAuditOrders(this,_objData)
				.then(function(res){
					_that.applyList = _that.applyList.concat(res.data)
					_that.page ++;
					if(_that.applyList.length == res.total){
						_that.loadingStatus = 'noMore';
						return;
					}
				})
			},
			
			getAuditInfo: function(_auditInfo){
				let _that = this;
				_auditInfo.taskId = this.orderInfo.taskId;
				_auditInfo.applyId = this.orderInfo.applyId;
				_auditInfo.procure = this.procure;
				_auditInfo.communityId = this.communityId;
				// 新增通知状态字段，区别是否为仓管及对应状态
				if (_auditInfo.state == '1200') {
					_auditInfo.noticeState = '1203';
				} else if (this.procure) {
					_auditInfo.noticeState = '1204';
				} else {
					_auditInfo.noticeState = '1201';
				}
				saveAuditAllocationStoreOrder(this,_auditInfo)
				.then(function(res){
					uni.showToast({
						title:res.msg,
						icon: 'none'
					});
					_that.page = 1;
					_that.applyList = [];
					_that.loadApply();
				})
			},
			
			finishAudit: function(_auditOrder){
				let _that = this;
				 let _auditInfo = {
					taskId: _auditOrder.taskId,
					applyId: _auditOrder.applyId,
					state: '1200',
					remark: '处理结束',
					procure: _that.procure
				};
				saveAuditAllocationStoreOrder(this,_auditInfo)
				.then(function(res){
					uni.showToast({
						title:res.msg,
						icon: 'none'
					});
					_that.onoff = true;
					_that.page = 1;
					_that.applyList = [];
					_that.loadApply();
				})
			},
			
			/**
			 * 跳转详情页
			 */
			_toApplyDetail: function(_item){
				uni.navigateTo({
					url: '/pages/resource/allocationStorehouseApplyDetail?applyId=' + _item.applyId
				});
			},
			
			_loadStaff: function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					staffId: this.userId,
					staffRole: '3003',
					requestType: 'allocationHandle'
				};
				listWorkflowStepStaffs(this,_objData)
				.then(function(res){
					console.log(res);
					if(res.data.length>0){
						_that.procure = true;
					}
				})
			},
			
			showAuditModel: function(_item){
				this.orderInfo = _item;
				this.$refs.auditRef.switchShow();
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
	.bg-white{
		position: relative;
	}
	.cu-btn{
		position: absolute;
		right: 10rpx;
		top: 25rpx;
	}
</style>
