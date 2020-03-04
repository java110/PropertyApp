<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="state=='10001'?'text-green cur':''" @tap="_tabSelect('10001')">
					待处理维修单
				</view>
				<view class="cu-item flex-sub" :class="state=='10002'?'text-green cur':''" @tap="_tabSelect('10002')">
					维修单历史
				</view>
			</view>
		</scroll-view>
		
		<view class="margin-top" v-if="state=='10001'">
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in myOrders" :key="index" @tap="_toAuditComplaintOrder(item)">
					<view class="cu-avatar round lg" :style="'background-image:url('+orderImg+');'">
					</view>
					<view class="content">
						<view class="text-grey">{{item.complaintId}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.complaintName}}
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:'10001',
				orderImg:this.java110Constant.url.baseUrl + 'img/order.png',
				myOrders:[]
			}
		},
		methods: {
			_tabSelect: function(_state) {
				this.state = _state;
				if(_state == '10002'){
					this._loadOrder();
				}else{
					this._loadMyOrders();
				}
			},
			_loadMyOrders:function(){
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
				this.java110Context.request({
					url: _that.java110Constant.url.listComplaints,
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
						_that.myOrders = _data.complaints;
						
						_data.complaints.forEach(function(item){
							let dateStr = item.createTime;
							console.log(dateStr);
							let _date=new Date(dateStr);
							item.createTime = (_date.getMonth()+1) +'-'+_date.getDate();
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
