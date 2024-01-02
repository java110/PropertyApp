<template>
	<view class="index-undo">
		<view class="undo-title">
			<text class="text-bold">工作单</text>
		</view>
		<view class="undo-menu flex justify-start flex-wrap">
			<view class="menu-item" v-for="(item,index) in undoMenus" :key="index" @click="_toPage(item)">
				<view style="position: relative;">
					<view class="work-icon">{{item.name}}</view>
					<view class="margin-top-sm" v-if="item.name=='抄'"><text>送我</text></view>
					<view class="margin-top-sm" v-else><text>工作单</text></view>
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
		name: "indexUndoWork",
		data() {
			return {
				undoMenus: []
			};
		},
		methods:{
			_initData:function(_data){
				this.undoMenus = [{
					name: '发',
					url: '/pages/work/startWork',
					undoCount:_data.workSendCount,
					pri:'502021052747070004'
				}, {
					name: '办',
					url: '/pages/work/doWork',
					undoCount:_data.workUndDoCount,
					pri:'502021052762260006'
				}, {
					name: '抄',
					url: '/pages/work/copyWork',
					undoCount:_data.workUndoCopyCount,
					pri:'502021052707250008'
				}]
			},
			_toPage: function(_item) {
				// if(!this.java110Context.hasPrivilege(_item.pri)){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'无权限，联系管理员'
				// 	});
				// 	return ;
				// }
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
				//border-bottom: 1upx solid #F1F1F1;
				border-right: 1upx solid #F1F1F1;
				.work-icon{
					font-size: 64upx;
					color: #368CFE;
				}
			}
			.menu-item:nth-child(3n+3) {
			    border-right: none;
			}
			.menu-item:nth-child(n+3) {
				border-bottom: none;
			}
		}
	}
</style>
