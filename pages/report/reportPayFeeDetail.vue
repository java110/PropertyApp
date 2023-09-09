<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入房屋号" v-model="roomName"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入开始时间" v-model="startTime" ></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入结束时间" v-model="endTime"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="费用项" v-model="endTime"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="支付方式" v-model="endTime"></input>
			</view>
			<view class="q-item-btn">
				<button class="cu-btn  line-blue round q-input" @click="_loadFeeDetails">搜索</button>
			</view>
		</view>
		<view class="margin-top flex justify-between padding-lr-sm">
			<view><text>应收:</text><text>{{allReceivableAmount}}</text></view>
			<view><text>实收:</text><text>{{allReceivedAmount}}</text></view>
		</view>
		
		<view class="margin-top" v-if="feeDetails.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in feeDetails" :key="index" >
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{item.objName}}/{{item.ownerName}}</text>
						<text class="margin-left-sm">({{item.stateName}})</text>
					</view>
					<view class="flex justify-start">
						<!-- <button class="cu-btn round sm line-black margin-left-sm"
							@tap="_toApplyDetail(item)">详情</button> -->
							{{item.createTime}}
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>费用项:</text>
						<text>{{item.feeTypeCdName}}>{{item.feeName}}</text>
					</view>
					<view class="item">
						<text>支付方式:</text>
						<text>{{item.primeRate}}</text>
					</view>
					<view class="item">
						<text>时间段:</text>
						<text>{{item.startTime}}~{{item.endTime}}</text>
					</view>
					<view class="item">
						<text>收银员:</text>
						<text>{{item.cashierName}}</text>
					</view>
					<view class="item">
						<text>应收金额:</text>
						<text>{{item.receivableAmount}}</text>
					</view>
					<view class="item">
						<text>实收金额:</text>
						<text>{{item.receivedAmount}}</text>
					</view>
					<view class="item">
						<text>订单:</text>
						<text>{{item.oId}}</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {queryPayFeeDetail} from '@/api/fee/feeDetail.js' ;
	export default {
		data() {
			return {
				feeDetails:[],
				roomName:'',
				startTime:'',
				endTime:'',
				allReceivableAmount:'',
				allReceivedAmount:'',
				
			}
		},
		onLoad() {
			
			this._loadFeeDetails();
			
		},
		methods: {
			
			_loadFeeDetails:function(){
				let _that = this;
				queryPayFeeDetail(this,{
					communityId:this.getCommunityId(),
					page:1,
					row:100
				}).then(_data =>{
					_that.feeDetails = _data.data;
					_that.allReceivableAmount = _data.sumTotal.allReceivableAmount;
					_that.allReceivedAmount = _data.sumTotal.allReceivedAmount;
				})
			}

		}
	}
</script>

<style lang="scss">
	.q-query {
		background-color: #FFF;
		padding:15upx;

		.q-item{
			width: 30%;
			margin-left: 15upx;
			padding: 10upx 15upx;
			border-radius: 15upx;
			background-color: #f1f1f1;
			.q-input{
				height: 40upx;
			}
			margin-bottom: 15upx;
		}
		.q-item-btn{
			width: 30%;
			margin-left: 15upx;
			.q-input{
				height: 60upx;
			}
		}
	}
	.apply-title{
		height: 60upx;
		line-height: 50upx;
		border-bottom: 1upx solid #F1F1F1;
	}
	.apply-content{
		.item{
			width: 50%;
			margin-top:20upx;
		}
	}
	.radius-sm{
		border-radius: 16upx;
	}
</style>
