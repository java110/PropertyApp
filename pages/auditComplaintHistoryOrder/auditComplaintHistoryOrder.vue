<template>
	<view>
		<view class="padding margin-top">
			<text>订单信息</text>
		</view>
		<view class="cu-list menu" >
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-edit text-green"></text>
					<text class="text-grey">投诉编码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditHistoryOrder.complaintId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">房屋编码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditHistoryOrder.floorNum}}号楼{{auditHistoryOrder.unitNum}}单元{{auditHistoryOrder.roomNum}}室</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">单类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditHistoryOrder.typeCdName}}单</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">投诉人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditHistoryOrder.complaintName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">投诉电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditHistoryOrder.tel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">投诉时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditHistoryOrder.createTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-comment text-blue margin-right-xs"></text>投诉内容</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text>{{auditHistoryOrder.context}}</view>
				</view>
			</view>
		</view>
		<view class="padding margin-top">
			<text>审核信息</text>
		</view>
		<view class="cu-list menu" >
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-info text-green"></text>
					<text class="text-grey">审核结果</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditHistoryOrder.stateName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complaintId:'',
				auditHistoryOrder:{}
			}
		},
		onLoad(options) {
			let _complaintId = options.complaintId;
			
			console.log('options',options);
			this.complaintId = _complaintId;
			this._loadComplaintHistoryOrder();
		},
		methods: {
			_loadComplaintHistoryOrder:function(){
				//
				this.auditHistoryOrder = wx.getStorageSync("_auditComplaintHistory_"+this.complaintId);
				
			},
		}
	}
</script>

<style>

</style>
