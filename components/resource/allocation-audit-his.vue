<template>
	<view>
		<view v-if="applyList.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in applyList" :key="index" >
				<view class="apply-title flex justify-between">
					<view>
						<text class="cuIcon-goods text-cut text-green margin-right-xs"></text>
						<text class="text-bold">{{item.applyId}}</text>
						<text class="margin-left-sm">({{item.stateName}})</text>
					</view>
					<view class="flex justify-start">
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
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	import {listMyAuditOrders,getAllocationHisAudit,listWorkflowStepStaffs,saveMyAuditOrders} from '../../api/resource/resource.js'
	export default {
		name:"allocationAuditHis",
		data() {
			return {
				applyList:[],
				loadingStatus:'',
				page:1,
			};
		},
		methods:{
			/**
			 * 已办列表
			 */
			loadApplyDone: function(){
				this.loadingStatus = 'more';
				let _that = this;
				let _objData = {
					page: this.page,
					row: 10,
					communityId:this.getCommunityId()
				};
				getAllocationHisAudit(this,_objData)
				.then(function(res){
					_that.applyList = res.data;
					//_that.page ++;
					if(_that.applyList.length == res.total){
						_that.loadingStatus = 'noMore';
						return;
					}
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
		.item{
			width: 50%;
			margin-top:20upx;
		}
	}
	.radius-sm{
		border-radius: 16upx;
	}
</style>