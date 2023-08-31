<template>
	<view class="index-undo">
		<view class="undo-title">
			<text class="text-bold">OA待办</text>
		</view>
		<view class="undo-menu flex justify-start flex-wrap">
			<view class="menu-item" v-for="(item,index) in undoMenus" :key="index">
				<image :src="item.icon"></image>
				<view><text>{{item.name}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indexUndoOa",
		data() {
			return {
				undoMenus: [{
					icon: '/static/image/index_repair.png',
					name: '请假流程',
					url: '',
				}, {
					icon: '/static/image/index_repair.png',
					name: '请假流程',
					url: ''
				}, {
					icon: '/static/image/index_repair.png',
					name: '请假流程',
					url: ''
				}, ]
			};
		}
	}
</script>

<style lang="scss">
	.index-undo {
		background-color: #ffffff;

		.undo-title {
			padding: 20upx;
			border-bottom: 1upx solid #F1F1F1;
		}
		
		.undo-menu{
			padding:20upx;
			.menu-item{
				width: 33.33%;
				padding: 30upx;
				text-align: center;
				image{
					width: 80upx;
					height: 80upx;
				}
				border-bottom: 1upx solid #F1F1F1;
				border-right: 1upx solid #F1F1F1;
			}
			.menu-item:nth-child(3n+3) {
			    border-right: none;
			}
			.menu-item:nth-child(n+4) {
				border-bottom: none;
			}
		}
	}
</style>
