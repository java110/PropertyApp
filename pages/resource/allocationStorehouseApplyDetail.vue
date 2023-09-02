<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">申请人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.startUserName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">申请时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.createTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">审批状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.stateName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">说明</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.remark}}</text>
				</view>
			</view>
		</view>
		<view class="margin-top">
			<view class="row">
				<view class="item-t text-bold">商品</view>
				<view class="item-t text-bold">数量</view>
				<view class="item-t text-bold">源仓库</view>
				<view class="item-t text-bold">目标仓库</view>
			</view>
			<view class="resource-item text-grey" v-for="(item, index) in resourceInfo">
				<view class="row">
					<view class="item-t">{{item.resName}}</view>
					<view class="item-t">{{item.stock}}{{item.unitCodeName}}</view>
					<view class="item-t">{{item.shaName}}</view>
					<view class="item-t">{{item.shzName}}</view>
				</view>
			</view>
		</view>
		<view class="cu-timeline margin-top">
			<view class="cu-time">工单</view>
			<view class="cu-item " v-for="(item,index) in staffs" :key="index">
				<view class="bg-cyan content">
					<text>{{item.startTime || ''}} </text> 到达 {{item.userName ||item.auditName}} 工位
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>{{item.endTime}} </text> 处理完成
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>处理意见：</text> {{item.context}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {listAllocationStorehouseApplys,listWorkflowAuditInfo,listAllocationStorehouses} from '../../api/resource/resource.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				applyId: '',
				communityId: '',
				applyInfo: [],
				resourceInfo: [],
				staffs: []
			}
		},
		components: {
		},
		onLoad: function(options) {
			this.java110Context.onLoad();
			this.applyId = options.applyId;
			this.communityId = getCurrentCommunity().communityId;
			this._loadAuditInfo();
			this._loadAuditResource();
			this._loadAuditUser();
		},
		onShow: function(){
		},
		methods: {
			/**
			 * 加载数据
			 */
			_loadAuditInfo: function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 10,
					applyId: this.applyId,
				};
				listAllocationStorehouseApplys(this,_objData)
				.then(function(res){
					_that.applyInfo = res.data[0]
				})
			},
			
			_loadAuditResource: function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 10,
					applyId: this.applyId,
				};
				listAllocationStorehouses(this,_objData)
				.then(function(res){
					_that.resourceInfo = res.data
				})
			},
			
			/**
			 * 加载数据
			 */
			_loadAuditUser: function(){
				let _that = this;
				let _objData = {
					businessKey: this.applyId,
					communityId: this.communityId,
				};
				listWorkflowAuditInfo(this,_objData)
				.then(function(res){
					_that.staffs = res.data
				})
			},
		}
	}
</script>

<style>
	.row{
		width: 95%;
		margin: 0 auto;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.item-t{
		width: 20%;
		overflow: hidden;
		display: inline-block;
		text-align: center;
	}
</style>
