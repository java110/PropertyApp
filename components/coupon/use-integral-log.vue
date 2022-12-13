<template>
	<view>
		<view v-if="orders && orders.length>0">
			<view v-for="(item,index) in orders" :key="index"
				class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view style="font-size: 14px;">单号<span style="margin-left: 10px;"
							class="text-gray">{{item.uoId}}</span></view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">账户</view>
					<view class="text-gray">{{item.acctName}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">抵扣积分/金额</view>
					<view class="text-gray">{{item.useQuantity}}个积分/{{item.money}}元</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">核销人</view>
					<view class="text-gray">{{item.userName}}({{item.tel}})</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">核销时间</view>
					<view class="text-gray">{{item.createTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">说明</view>
					<view class="text-gray">{{item.remark }}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	import {
		getCurrentCommunity
	} from '../../api/community/community.js';
	import {getIntegralUserDetail} 
	from '../../api/coupon/coupon.js'
	export default {
		name:"useIntegralLog",
		data() {
			return {
				orders:[]
			};
		},
		created() {
			//this.loadUseIntegral();
		},
		methods:{
			loadIntegralUserDetail:function(){
				let _that = this;
				getIntegralUserDetail(this,{
					page:1,
					row:100,
					communityId: getCurrentCommunity().communityId
				}).then(_data=>{
					_that.orders = _data.data;
				})
			}
		}
	}
</script>

<style>

</style>