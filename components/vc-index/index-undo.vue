<template>
	<view class="index-undo">
		<view class="undo-title">
			<text class="text-bold">工作待办</text>
		</view>
		<view class="undo-menu flex justify-start flex-wrap">
			<view class="menu-item" v-for="(item,index) in undoMenus" :key="index" @click="_toPage(item)">
				<view style="position: relative;">
					<image :src="item.icon"></image>
					<view><text>{{item.name}}</text></view>
					<view class="cu-tag badge" v-if="item.undoCount>0">
						<block>{{item.undoCount>99?'99+':item.undoCount}}</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indexUndo",
		data() {
			return {
				undoMenus: []
			};
		},
		methods:{
			_initData:function(_data){
				this.undoMenus = [{
					icon: '/static/image/index_apply_audit.png',
					name: '采购待办',
					url: '/pages/resource/purchaseApplyAuditOrders',
					undoCount:_data.purchase
				}, {
					icon: '/static/image/index_itemout_audit.png',
					name: '领用待办',
					url: '/pages/resource/itemOutAuditOrders',
					undoCount:_data.collection
				}, {
					icon: '/static/image/index_allocation.png',
					name: '调拨待办',
					url: '/pages/resource/allocationStorehouseAuditOrders',
					undoCount:_data.allocation
				}, {
					icon: '/static/image/index_complaint.png',
					name: '物品放行',
					url: '/pages/itemRelease/itemRelease',
					undoCount:_data.itemReleaseCount
				}, {
					icon: '/static/image/index_repair.png',
					name: '访客待办',
					url: '/pages/visit/visit',
					undoCount:_data.visitUndoCount
				}]
			},
			_toPage: function(_item) {
				uni.navigateTo({
					url: _item.url
				})
			}
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
