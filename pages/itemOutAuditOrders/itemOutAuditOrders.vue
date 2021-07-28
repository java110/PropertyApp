<template>
	<view>
		<view class="cu-bar bg-white margin-top solid-bottom" style="justify-content: space-around;">
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
							<text class="ellipsis">{{item.applyOrderId}}</text>
							-
							<text class="text-bold">{{item.stateName}}</text>
						</view>
						<view class="text-gray text-sm">
							<view class="text-cut">
								申请人：{{item.userName}}
							</view>
						</view>
						<view class="text-gray text-sm">
							<view class="text-cut">
								时间：{{item.createTime}}
							</view>
						</view>			
						<block v-if="currentPage == 0">	
							<block v-if="procure == false">
								<view class="cu-btn round lg bg-green" v-if="item.state == '1000' || item.state == '1001'" @tap.stop="showAuditModel(item)">审核</view>
								<view class="cu-btn round lg bg-red" v-else @tap.stop="finishAudit(item)">结束</view>
							</block>
							<block v-else>
								<view class="cu-btn round lg bg-green" v-if="item.state == '1001'" @tap.stop="_distributionOrder(item)">物品发放</view>
								<view class="cu-btn round lg bg-red" v-else @tap.stop="finishAudit(item)">结束</view>
							</block>
						</block>
					</view>
				</view>
			</view>
			<view class="load-more" @click="loadMore()">加载更多</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
		<audit ref="auditRef" @getInfo="getAuditInfo"></audit>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import auditComponent from '@/components/audit/audit.vue'
	import {listMyItemOutOrders,listItemOutAuditHistoryOrders,listWorkflowStepStaffs,saveMyAuditOrders} from '../../api/resource/resource.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				currentPage: 0,
				communityId: '',
				applyList: [],
				page: 1,
				userId: '',
				procure: false,
				orderInfo: ''
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
		methods: {
			
			changeListType: function(e){
				this.currentPage = e;
				this.page = 1;
				this.applyList = [];
				if(e == 0){
					this.loadApply();
				}else{
					this.loadApplyDone();
				}
			},
			
			loadMore: function(){
				if(this.currentPage == 0){
					this.loadApply();
				}else{
					this.loadApplyDone();
				}
			},
			
			/**
			 * 加载数据
			 */ 
			loadApply: function(){
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
				};
				listMyItemOutOrders(this,_objData)
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
			 * 已办列表
			 */
			loadApplyDone: function(){
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
				};
				listItemOutAuditHistoryOrders(this,_objData)
				.then(function(res){
					console.log(res);
					if(res.resourceOrders.length <= 0){
						uni.showToast({
							title: '已全部加载'
						})
						return;
					}
					_that.applyList = _that.applyList.concat(res.resourceOrders)
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
			 * 审核
			 * @param {Object} _item
			 */
			showAuditModel: function(_item){
				this.orderInfo = _item;
				this.$refs.auditRef.switchShow();
			},
			getAuditInfo: function(_auditInfo){
				let _that = this;
				_auditInfo.taskId = this.orderInfo.taskId;
				_auditInfo.applyOrderId = this.orderInfo.applyOrderId;
				// 新增通知状态字段，区别是否为仓管及对应状态
				if(_auditInfo.state == '1200'){
					_auditInfo.noticeState = '1004';
				} else if (this.procure){
					_auditInfo.noticeState = '1002';
				} else {
					_auditInfo.noticeState = '1001';
				}
				saveMyAuditOrders(this,_auditInfo)
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
			
			/**
			 * 结束操作
			 * @param {Object} _auditOrder
			 */
			finishAudit: function(_auditOrder){
				let _that = this;
				 let _auditInfo = {
					taskId: _auditOrder.taskId,
					applyOrderId: _auditOrder.applyOrderId,
					state: '1200',
					remark: '处理结束'
				};
				saveMyAuditOrders(this,_auditInfo)
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
			
			/**
			 * 物品发放
			 */
			_distributionOrder: function(item){
				uni.navigateTo({
					url:'/pages/itemOutDo/itemOutDo?applyOrderId=' + item.applyOrderId + '&resOrderType=' + item.resOrderType + '&taskId=' + item.taskId
				})
			},
			
			_loadStaff: function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					staffId: this.userId,
					staffRole: '3003'
				};
				listWorkflowStepStaffs(this,_objData)
				.then(function(res){
					console.log(res);
					if(res.data.length>0){
						_that.procure = true;
					}
				})
			},
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
