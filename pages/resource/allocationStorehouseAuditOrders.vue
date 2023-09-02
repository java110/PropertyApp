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
		<view class="margin-top" v-show="currentPage == 0">
			<allocation-audit-undo ref="allocationAuditUndoRef"></allocation-audit-undo>
		</view>
		<view class="margin-top" v-show="currentPage == 1">
			<allocation-audit-his ref="allocationAuditHisRef"></allocation-audit-his>
		</view>
		
	</view>
</template>

<script>
	import allocationAuditHis from '../../components/resource/allocation-audit-his.vue'
	import allocationAuditUndo from '../../components/resource/allocation-audit-undo.vue'
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
			allocationAuditHis,
			allocationAuditUndo
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
