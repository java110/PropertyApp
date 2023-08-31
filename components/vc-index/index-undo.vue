<template>
	<view class="index-undo">
		<view class="undo-title">
			<text class="text-bold">工作待办</text>
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
		name: "indexUndo",
		data() {
			return {
				undoMenus: [{
					icon: '/static/image/index_repair.png',
					name: '采购待办',
					url: '',
				}, {
					icon: '/static/image/index_repair.png',
					name: '领用待办',
					url: ''
				}, {
					icon: '/static/image/index_repair.png',
					name: '调拨待办',
					url: ''
				}, {
					icon: '/static/image/index_repair.png',
					name: '物品放行',
					url: ''
				}, {
					icon: '/static/image/index_repair.png',
					name: '合同起草',
					url: ''
				}, {
					icon: '/static/image/index_repair.png',
					name: '合同变更',
					url: ''
				}, {
					icon: '/static/image/index_repair.png',
					name: '访客待办',
					url: ''
				}]
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
			.menu-item:nth-child(n+7) {
				border-bottom: none;
			}
		}
	}
</style>
