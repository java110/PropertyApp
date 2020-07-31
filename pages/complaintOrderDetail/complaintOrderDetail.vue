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
			<view class="cu-item" v-if="auditHistoryOrder.photos.length > 0">
				<view class="margin-top grid text-center col-3 grid-square" >
					<view class="" v-for="(_item,index) in auditHistoryOrder.photos" :key="index">
						<image mode="scaleToFill" :data-url="srcPath+_item.url" :src="srcPath+_item.url" @tap="preview"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-timeline margin-top">
			<view class="cu-time">工单</view>
			<view class="cu-item " v-for="(item,index) in audits" :key="index">
				<view class="bg-cyan content"  v-if="item.state == '1001'">
					<text>{{item.auditName}} 于</text> {{item.auditTime}} 处理完成
				</view>
				<view class="bg-cyan content" v-if="item.state == '2002'">
					<text>{{item.auditName}} </text> 正在处理
				</view>
				<view class="bg-cyan content" v-if="item.state == '1001'">
					<text>处理意见：</text> {{item.message}}
				</view>
			</view>
			
		</view>
		
		<view class="cu-modal" :class="viewImage?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="'background-image: url('+ viewImageSrc +');height:800rpx;'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="closeViewImage()">
							<text class="cuIcon-close "></text>
						</view>
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
				complaintId:'',
				auditHistoryOrder:{},
				audits:[],
				srcPath:'',
				viewImage: false,
				viewImageSrc: '',
			}
		},
		onLoad(options) {
			let _complaintId = options.complaintId;
			
			console.log('options',options);
			this.complaintId = _complaintId;
			this.srcPath=this.url.hcBaseUrl;
			
			this._loadComplaintHistoryOrder();
			
			
			this._listWorkflowAuditInfo();
		},
		methods: {
			_loadComplaintHistoryOrder:function(){
				//
				this.auditHistoryOrder = wx.getStorageSync("_complaintOrderDetail_"+this.complaintId);
				
			},
			_listWorkflowAuditInfo: function(_active) {
				let that = this;
				let _paramIn = {
					businessKey: that.complaintId,
					communityId: that.auditHistoryOrder.communityId
				};
				this.context.request({
					url: this.url.listWorkflowAuditInfo,
					header: this.context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						let _json = res.data;
						
						if (_json.code == 0) {
							let _audits = _json.data;
											
							that.audits = _audits;
				
							return;
						}
			
						wx.showToast({
							title: _json.msg,
							icon: 'none',
							duration: 2000
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			preview: function(e) {
				console.log('图片地址', e);
				let _url = e.target.dataset.url;
				this.viewImageSrc = _url;
				this.viewImage = true;
			},
			closeViewImage: function() {
				this.viewImage = false;
			},
		}
	}
</script>

<style>

</style>
