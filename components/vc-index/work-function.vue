<template>
	<view>
		<view class="real_list" v-if="real_list && real_list.length>0">
			<view class="title">常用功能</view>
			<view class="list">
				<view class="item" v-for="(item,index) in real_list" :key="index" @tap="to(item)">
					<image :src="item.description"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="real_list" v-if="orders && orders.length>0">
			<view class="title">工单</view>
			<view class="list">
				<view class="item" v-for="(item,index) in orders" :key="index" @tap="to(item)">
					<image :src="item.description"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="real_list" v-if="cars && cars.length>0">
			<view class="title">停车</view>
			<view class="list">
				<view class="item" v-for="(item,index) in cars" :key="index" @tap="to(item)">
					<image :src="item.description"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="real_list" v-if="wirteOffs && wirteOffs.length>0">
			<view class="title">核销</view>
			<view class="list">
				<view class="item" v-for="(item,index) in wirteOffs" :key="index" @tap="to(item)">
					<image :src="item.description"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="real_list" v-if="reportMenus && reportMenus.length>0">
			<view class="title">报表</view>
			<view class="list">
				<view class="item" v-for="(item,index) in reportMenus" :key="index" @tap="to(item)">
					<image :src="item.description"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		loadCategoryMenus,
	} from '@/api/index/index.js';
	import {
		getUserInfo
	} from '@/lib/java110/api/Java110SessionApi.js'
	export default {
		name: "workFunction",
		data() {
			return {
				real_list: [],
				real_list_noshow:[
					'/pages/complaintList/complaintList',
					'/pages/repairDispatch/repairDispatch',
					'/pages/inspection/inspection',
					'/pages/maintainance/maintainance',
					'/pages/resource/purchaseApplyAuditOrders',
					'/pages/resource/itemOutAuditOrders',
					'/pages/resource/allocationStorehouseAuditOrders',
					'/pages/itemRelease/itemRelease',
					'/pages/visit/visit',
				],
				reportMenus:[],
				cars:[],
				wirteOffs:[],
				orders:[]
			};
		},
		created() {
			//this._loadMenu();
		},
		methods: {
			to: function(v) {
				
				uni.navigateTo({
					url: v.href
				});	
			},
			_loadMenu: function() {
				let _that =this;
				loadCategoryMenus(this, {
					userId: getUserInfo().userId,
					groupType: 'P_APP'
				}).then(_data=>{
					console.log(_data);
					_data.forEach(_menu=>{
						if(_menu.name == "物业手机版"){
							let _childs = [];
							_menu.childs.forEach(item=>{
								if(_that.real_list_noshow.indexOf(item.href) < 0){
									_childs.push(item);
								}
							})
							_that.real_list = _childs;
						}
						if(_menu.name == "手机工单"){
							_that.orders = _menu.childs;
						}
						if(_menu.name == "手机报表"){
							_that.reportMenus = _menu.childs;
						}
						if(_menu.name == "手机停车"){
							_that.cars = _menu.childs;
						}
						if(_menu.name == "手机核销"){
							_that.wirteOffs = _menu.childs;
						}
						
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.real_list,
	.live_list {
		background: #fff;
		padding: 0 40upx;
		margin-top: 20upx;

		.title {
			line-height: 32upx;
			background: #fff;
			font-size: 30upx;
			font-weight: 600;
			color: #333;
			padding: 40upx 0;
			margin-top: 10px;
		}

		.item {
			width: 25%;
			display: inline-block;
			text-align: center;
			margin-bottom: 40upx;
		}

		image {
			height: 68upx;
			width: 68upx;
			margin-bottom: 8upx;
		}

		.text {
			color: #333;
			font-size: 28upx;
		}
	}
</style>
