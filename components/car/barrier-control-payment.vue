<template>
	<view>
		<view class="" v-if="payments.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in payments" :key="index" >
				<view class="apply-title flex justify-between">
					<view>
						<text class="cuIcon-goods text-cut text-green margin-right-xs"></text>
						<text class="text-bold">{{item.carNum}}</text>
						<text class="margin-left-sm">({{item.stateName}})</text>
					</view>
					<view class="flex justify-start">
						<text>{{item.inoutId}}</text>
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>进场时间:</text>
						<text>{{item.inTime}}</text>
					</view>
					<view class="item">
						<text>支付时间:</text>
						<text>{{item.createTime}}</text>
					</view>
					<view class="item">
						<text>收费类型:</text>
						<text>{{item.payTypeName}}</text>
					</view>
					<view class="item">
						<text>应收:</text>
						<text>{{item.payCharge}}</text>
					</view>
					<view class="item">
						<text>实收:</text>
						<text>{{item.realCharge}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import {getCarInoutPayment} from '../../api/car/carApi.js';
	import noDataPage from '../no-data-page/no-data-page.vue';
	
	export default {
		name:"barrierControlPayment",
		data() {
			return {
				payments:[ ],
				paId:''
			};
		},
		methods:{
			_loadPayments:function(_paId){
				let _that =this;
				getCarInoutPayment(this,{
					page:1,
					row:50,
					communityId:this.getCommunityId(),
					paId:this.paId
				}).then(_data=>{
					_that.payments = _data.data;
				})
			}
		}
	}
</script>

<style lang="scss">
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