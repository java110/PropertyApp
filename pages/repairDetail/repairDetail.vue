<template>
	<view>
		<view class="padding margin-top">
			<text>报修单详情</text>
		</view>
		<view class="cu-list menu" >
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-edit text-green"></text>
					<text class="text-grey">报修ID</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.repairId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">报修类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.repairTypeName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">报修人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.userName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">联系方式</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.tel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">房屋编号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.roomId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">预约时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.appointmentTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">维修师傅</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.repairName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.stateName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">报修内容</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.context}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				repairDetailInfo:{},
				storeId:'',
				repairId:''
			}
		},
		onLoad(options) {
			let _complaintId = options.complaintId;
			this.storeId = options.storeId;
			this.repairId = options.repairId;
			
			console.log('options',options);
			this._queryRepairDetail();
		},
		methods: {
			_loadModfiyHistoryOrder:function(){
				//
				this.modifyComplaint = wx.getStorageSync("_toModifyComplaint_"+this.complaintId);
				
			},
			_queryRepairDetail:function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					storeId: _that.storeId,
					communityId:_that.java110Context.getCurrentCommunity().communityId,
					repairId:_that.repairId
				};
				this.java110Context.request({
					url: _that.java110Constant.url.listOwnerRepairs,
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
						_that.repairDetailInfo = _data.ownerRepairs[0];
						
						_data.ownerRepairs.forEach(function(item){
							let dateStr = item.appointmentTime;
							console.log(dateStr);
							let _date=new Date(dateStr);
							item.appointmentTime = (_date.getMonth()+1) +'-'+_date.getDate();
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
