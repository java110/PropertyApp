<template>
	<view>
		<view class="real_list">
			<view class="title">常用功能</view>
			<view class="list">
				<view class="item" v-for="(item,index) in real_list" :key="index" @tap="to(item)">
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
				loadCategoryMenus(this, {
					userId: getUserInfo().userId,
					groupType: 'P_APP'
				}).then(_data=>{
					console.log(_data);
					this.real_list = _data;
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
			height: 44upx;
			width: 44upx;
			margin-bottom: 10upx;
		}

		.text {
			color: #333;
			font-size: 28upx;
		}
	}
</style>
