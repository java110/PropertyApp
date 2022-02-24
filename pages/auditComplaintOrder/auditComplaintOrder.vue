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
					<text class="text-grey text-sm">{{auditOrder.complaintId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">房屋编码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.floorNum}}号楼{{auditOrder.unitNum}}单元{{auditOrder.roomNum}}室</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">单类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.typeCdName}}单</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">投诉人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.complaintName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">投诉电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.tel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">投诉时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{auditOrder.createTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-comment text-blue margin-right-xs"></text>投诉内容</view>
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
						{{stateIndex>-1?states[stateIndex]:'未处理'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" v-model="remark" placeholder="请输入处理意见"></textarea>
			</view>
		</form>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="_auditOrder()">提交</button>
		</view>
		
		
		
	</view>
</template>

<script>
	import url from '../../constant/url.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	
	export default {
		data() {
			return {
				complaintId:'',
				auditOrder:{},
				states: ['已处理', '无法处理'],
				stateIndex:-1,
				remark:''
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			let _complaintId = options.complaintId;
			this.complaintId = _complaintId;
			console.log('_complaintId',_complaintId);
			this._loadComplaintOrder();
		},
		methods: {
			_loadComplaintOrder:function(){
				
				this.auditOrder = uni.getStorageSync("_auditComplaint_"+this.complaintId);
			},
			_changeResult:function(e){
				this.stateIndex = e.detail.value;
				console.log(e,this.stateIndex);
			},
			_auditOrder:function(){
				if(this.stateIndex == '-1'){
					uni.showToast({
						icon:'none',
						title:'请选择结果'
					});
					return ;
				}
				
				if(this.remark == ''){
					uni.showToast({
						icon:'none',
						title:'请填写处理意见'
					});
					return ;
				}
				
				if(this.remark.length >200){
					uni.showToast({
						icon:'none',
						title:'请填写处理意见超过200个'
					});
					return ;
				}
				let _state = "1200"
				if(this.stateIndex == '1'){
					_state = "1100"
				}
				let _objData = {
					state:_state,
					remark:this.remark,
					taskId:this.auditOrder.taskId,
					complaintId:this.auditOrder.complaintId,
					communityId:getCurrentCommunity().communityId,
					storeId:this.java110Context.getUserInfo().storeId,
					userId:this.java110Context.getUserInfo().userId
				};
				this.java110Context.request({
					url: url.auditComplaint,
					header: this.java110Context.getHeaders(),
					method: "POST",
					data: _objData,
					success: function(res) {
						if(res.statusCode != 200){
							// uni.showToast({
							// 	icon:"none",
							// 	title: res.data
							// });
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return ;
						}
						
						uni.navigateBack({
							delta:1
						});
					},
					fail: function(error) {
						// 调用服务端登录接口失败
						uni.showToast({
							title: '调用接口失败'
						});
						console.log(error);
					}
				});
			}
		}
	}
</script>

<style>

</style>
