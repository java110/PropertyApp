<template>
	<view>
		<view v-if="applyList.length > 0">
			<view class="bg-white padding-sm margin-sm radius-sm" v-for="(item,index) in applyList" :key="index" >
				<view class="apply-title flex justify-between">
					<view>
						<text class="cuIcon-goods text-cut text-green margin-right-xs"></text>
						<text class="text-bold">{{item.applyId}}</text>
						<text class="margin-left-sm">({{item.stateName}})</text>
					</view>
					<view class="flex justify-start">
						<button class="cu-btn round sm line-black margin-left-sm" v-if="item.startUserId == currentUserId"
							@tap="_openEditPurchaseModel(item)">修改</button>
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
						<text>调拨数量:</text>
						<text>{{item.applyCount}}</text>
					</view>
				</view>
				<view class="apply-btn flex justify-between">
					<view>
					</view>
					<view class="flex justify-start margin-top-sm">
						<button class="cu-btn round sm line-blue margin-left-sm" v-if="item.curTaskName == '仓库管理员'"
							@tap="_distributionOrder(item)">调拨出库</button>
						<button class="cu-btn round sm line-blue margin-left-sm" v-else
							@tap="_undoAudit(item)">审核</button>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" :contentText="contentText"/>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	import {listMyAllocationStoreAuditOrders,listAuditHistoryOrders,listWorkflowStepStaffs,saveMyAuditOrders} from '../../api/resource/resource.js';
	export default {
		name:"allocationAuditUndo",
		data() {
			return {
				applyList:[],
				loadingStatus:'',
				page:1,
				currentUserId:'',
				loadingContentText:'',
				contentText:{}
			};
		},
		mounted() {
				this.currentUserId = this.getStaffId();
		},
		methods:{
			/**
			 * 待办列表
			 */
			loadApply: function(){
				this.loadingStatus = 'more';
			
				let _that = this;
				let _objData = {
					page: 1,
					row: 50,
					communityId:this.getCommunityId()
				};
				listMyAllocationStoreAuditOrders(this,_objData)
				.then(function(res){
					//_that.applyList = _that.applyList.concat(res.data)
					_that.applyList = res.data;
					//_that.page ++;
					if(_that.applyList.length == res.total){
						_that.loadingStatus = 'noMore';
						return;
					}
				})
			},
			_openEditPurchaseModel:function(_item){
				uni.navigateTo({
					url:'/pages/resource/editPurchaseApply?applyId=' + _item.applyId + '&resOrderType=' + _item.resOrderType 
				})
			},
			/**
			 * 物品发放
			 */
			_distributionOrder: function(item){
				uni.navigateTo({
					url:'/pages/resource/allocationEnterDo?applyId=' + item.applyId + '&taskId=' + item.taskId
				})
			},
			_undoAudit:function(_purchaseApply){
				uni.navigateTo({
					url:'/pages/audit/undoAudit?business=allocation&id='+_purchaseApply.applyId
					+"&taskId="+_purchaseApply.taskId+"&startUserId="+_purchaseApply.startUserId
					+"&flowId="+_purchaseApply.flowId
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
		}
	}
</script>

<style lang="scss">
.apply-title{
		height: 60upx;
		line-height: 50upx;
		border-bottom: 1upx solid #F1F1F1;
	}
	.apply-content{
		margin-bottom: 20upx;
		.item{
			width: 50%;
			margin-top:20upx;
		}
	}
	.radius-sm{
		border-radius: 16upx;
	}
	.apply-btn{
		height: 60upx;
		border-top: 1upx solid #F1F1F1;
	}
</style>