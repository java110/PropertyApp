<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-edit text-green"></text>
					<text class="text-grey">申请ID</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.applyOrderId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">申请人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.userName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">使用人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.endUserName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">联系方式</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.endUserTel}}</text>
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
			<view class="cu-item" v-show="applyInfo.resOrderType==10000 && applyInfo.warehousingWay!=10000">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">参考总价格</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.totalPrice}}</text>
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
					<text class="text-grey">{{applyInfo.resOrderType==10000 ? '入库方式' : '出库方式'}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.resOrderType==10000 ? (applyInfo.warehousingWay==10000 ? '直接入库' : '采购入库') : (applyInfo.warehousingWay==10000 ? '直接出库' : '审核出库')}}</text>
				</view>
			</view>
			<view class="cu-item" v-show="applyInfo.resOrderType==10000">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">采购总价格</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.purchaseTotalPrice > 0 ? '￥' + applyInfo.purchaseTotalPrice : '-'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">说明</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyInfo.description}}</text>
				</view>
			</view>
		</view>
		<view class="margin-top">
			<view class="row">
				<view class="item-t text-bold">商品</view>
				<view class="item-t text-bold">参考价格</view>
				<view class="item-t text-bold">申请数量</view>
				<view class="item-t text-bold" v-if="applyInfo.resOrderType==10000">采购价格</view>
				<view class="item-t text-bold">{{applyInfo.resOrderType==10000 ? '采购数量' : '领用数量'}}</view>
			</view>
			<view class="resource-item text-grey" v-for="(item, index) in applyInfo.purchaseApplyDetailVo">
				<view class="row">
					<view class="item-t">{{item.resName}}</view>
					<view class="item-t">{{item.price}}元/{{item.unitCodeName}}</view>
					<view class="item-t">{{item.quantity}}{{item.unitCodeName}}</view>
					<view class="item-t" v-if="applyInfo.resOrderType==10000">{{item.purchasePrice ? item.purchasePrice : '-'}}</view>
					<view class="item-t">{{item.purchaseQuantity ? item.purchaseQuantity + item.unitCodeName : '-'}}</view>
				</view>
			</view>
		</view>
		<view class="cu-timeline margin-top" v-show="applyInfo.warehousingWay != 10000">
			<view class="cu-time">工单</view>
			<view class="cu-item " v-for="(item,index) in staffs" :key="index">
				<view class="bg-cyan content">
					<text>{{item.auditTime || ''}} </text> 到达 {{item.userName || item.auditName}} 工位
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
	import {listWorkflowAuditInfo,queryPurchaseApplyList} from '../../api/resource/resource.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				communityId: '',
				applyInfo: [],
				staffs: []
			}
		},
		components: {
		},
		onLoad: function(options) {
			this.java110Context.onLoad();
			let applyInfo = JSON.parse(options.apply);
			this.communityId = getCurrentCommunity().communityId;
			this._loadAuditInfo(applyInfo.resOrderType, applyInfo.applyOrderId);
		},
		onShow: function(){
		},
		methods: {
			/**
			 * 加载数据
			 */
			_loadAuditInfo: function(resOrderType, applyOrderId){
				let _that = this;
				let _objData = {
					page: 1,
					row: 10,
					communityId: this.communityId,
					resOrderType: resOrderType,
					applyOrderId: applyOrderId
				};
				queryPurchaseApplyList(this,_objData)
				.then(function(res){
					_that.applyInfo = res.purchaseApplys[0]
					if (_that.applyInfo.warehousingWay != 10000){
						_that._loadAuditUser();
					}
				})
			},
			
			/**
			 * 加载数据
			 */
			_loadAuditUser: function(){
				let _that = this;
				let _objData = {
					businessKey: this.applyInfo.applyOrderId,
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
		line-height: 30rpx;
	}
</style>
