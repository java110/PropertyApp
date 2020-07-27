<template>
	<view>
		<view v-for="(item,index) in orders" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
			<view class="flex padding-bottom-xs solid-bottom justify-between">
				<view>{{item.complaintId}}</view>
				<view class="text-gray">{{item.tel}}</view>
			</view>
			<view class="flex margin-top justify-between">
				<view class="text-gray">投诉类型</view>
				<view class="text-gray">{{item.typeCdName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">投诉人</view>
				<view class="text-gray">{{item.complaintName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">房间</view>
				<view class="text-gray">{{item.floorNum}}栋{{item.unitNum}}单元{{item.roomNum}}室</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">投诉时间</view>
				<view class="text-gray">{{item.createTime }}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">投诉内容</view>
				<view class="text-gray">{{item.context}}</view>
			</view>
			<view class="solid-top flex justify-end margin-top padding-top-sm ">
				<button class="cu-btn sm line-gray" @click="repairDetail(item)">详情</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {loadTodoCompaint} from '../../api/complaint/complaint.js'
	export default {
		data() {
			return {
				state: '10001',
				orderImg:this.java110Constant.url.baseUrl + 'img/order.png',
				orders:[]
			}
		},
		onLoad() {
			//this._loadComplaintOrder();
		},
		onShow() {
			this._loadComplaintOrder();
		},
		methods: {
			_loadComplaintOrder:function(){
				//
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					communityId:_that.java110Context.getCurrentCommunity().communityId
				};
				
				loadTodoCompaint(this,_objData)
				.then(function(res){
					console.log("请求返回信息：", res);
					if (res.statusCode != 200) {
						uni.showToast({
							icon:'none',
							title:res.data
						});
						return;
					}
					let _data = res.data;
					_that.orders = _data.complaints;
					_that.orders.forEach(function(item){
						let dateStr = item.createTime;
						let _startTime = dateStr.replace(/\-/g, "/")
						let _date=new Date(_startTime);
						item.createTime = (_date.getMonth()+1) +'-'+_date.getDate();
					});
				})
			},
			_loadOrder:function(){
				//
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					process:'AUDIT',
					communityId:_that.java110Context.getCurrentCommunity().communityId
				};
				
				this.java110Context.request({
					url: _that.java110Constant.url.listAuditHistoryComplaints,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon:'none',
								title:res.data
							});
							return;
						}
						let _data = res.data;
						_data.complaints.forEach(function(item){
							let dateStr = item.createTime;
							let _startTime = dateStr.replace(/\-/g, "/")
							let _date=new Date(_startTime);
							item.createTime = (_date.getMonth()+1) +'-'+_date.getDate();
						});
						_that.orders = _data.complaints;
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			_toAuditComplaintOrder:function(_item){
				console.log('_item',_item);
				wx.setStorageSync("_auditComplaint_"+_item.complaintId, _item);
				uni.navigateTo({
					url:"/pages/auditComplaintOrder/auditComplaintOrder?complaintId="+_item.complaintId
				});	
			},
			_toAuditComplaintHistoryOrder:function(_item){
				console.log('_item',_item);
				uni.setStorageSync("_complaintOrderDetail_"+_item.complaintId, _item);
				uni.navigateTo({
					url:"/pages/complaintOrderDetail/complaintOrderDetail?complaintId="+_item.complaintId
				});	
			}
		}
	}
</script>

<style>

</style>
