<template>
	<view>
		<view class="padding margin-top">
			<text>订单信息</text>
		</view>
		<view class="cu-list menu" >
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">投诉编码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.complaintId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">房屋编码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.floorNum}}号楼{{auditOrder.unitNum}}单元{{auditOrder.roomNum}}室</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">单类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.typeCdName}}单</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">投诉人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.complaintName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">投诉电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.tel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">投诉时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.createTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text>投诉内容</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text>{{auditOrder.context}}</view>
				</view>
			</view>
		</view>
		
		<view class="padding margin-top">
			<text>审核信息</text>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">结果</view>
				<picker @change="_changeResult" :value="stateIndex" :range="states">
					<view class="picker">
						{{stateIndex>-1?states[stateIndex]:'已处理'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框"></textarea>
			</view>
		</form>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="_auditOrder()">提交</button>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				complaintId:'',
				auditOrder:{},
				states: ['已处理', '无法处理'],
				stateIndex:-1
			}
		},
		onLoad(options) {
			let _complaintId = options.complaintId;
			this.complaintId = _complaintId;
			console.log('_complaintId',_complaintId);
			this._loadComplaintOrder();
		},
		methods: {
			_loadComplaintOrder:function(){
				
				this.auditOrder = uni.getStorageSync("_auditComplaint_"+this.complaintId);
				//
				/* let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 1,
					storeId: storeId,
					userId: _userInfo.userId,
					complaintId:this.complaintId,
					communityId:_that.java110Context.getCurrentCommunity().communityId
				};
				
				this.java110Context.request({
					url: _that.java110Constant.url.listAuditComplaints,
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
						_that.auditOrder = _data.complaints[0];
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				}); */
			},
			_changeResult:function(e){
				this.stateIndex = e.detail.value;
				console.log(e,this.stateIndex);
			},
			_auditOrder:function(){
				
			}
		}
	}
</script>

<style>

</style>
