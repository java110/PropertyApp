<template>
	<view>
		<view class="header flex justify-around">
			<view class="header-item " v-for="(item,index) in headerMenus" :key="index" @click="_toPage(item)">
				<image :src="item.icon" ></image>
				<view><text>{{item.name}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indexHeader",
		data() {
			return {
				headerMenus:[{
					icon:'/static/image/index/i_complaint.png',
					name:'投诉待办',
					url:'',
				},{
					icon:'/static/image/index/i_repair.png',
					name:'报修待办',
					url:''
				},{
					icon:'/static/image/index/i_inspection.png',
					name:'待巡检',
					url:''
				},{
					icon:'/static/image/index/i_machine.png',
					name:'设备保养',
					url:''
				}]
			};
		},
		methods:{
			_toPage:function(_item){
				uni.navigateTo({
					url:item.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		height: 220upx;
		background-color: #368CFE;
		color: #FFFFFF;

		.header-item {
			margin-top: 50upx;
			text-align: center;
			image {
				height: 80upx;
				width: 80upx;
			}
		}
	}
</style>
