<template>
	<view>
		<view class="padding margin-top">
			<text>保修详情</text>
		</view>
		<view class="cu-list menu" >
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-edit text-green"></text>
					<text class="text-grey">报修ID</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.repairId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">报修类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.repairTypeName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">报修人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.userName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">联系方式</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.tel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">房屋编号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.roomId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">预约时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.appointmentTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">维修师傅</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.repairName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.stateName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">报修内容</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{modifyComplaint.context}}</text>
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
				modifyComplaint:{}
			}
		},
		onLoad(options) {
			let _complaintId = options.complaintId;
			
			console.log('options',options);
			this.complaintId = _complaintId;
			this._loadModfiyHistoryOrder();
		},
		methods: {
			_loadModfiyHistoryOrder:function(){
				//
				this.modifyComplaint = wx.getStorageSync("_toModifyComplaint_"+this.complaintId);
				
			},
		}
	}
</script>

<style>

</style>
