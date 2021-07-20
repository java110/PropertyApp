<template>
	<view>
		<view>

			<view class="padding">商户信息</view>
			<view class="cu-list menu ">
				<view class="cu-item">
					<view class="content">
						<text class="lg cuIcon-service text-blue margin-right-xs"></text>
						<text class="text-grey">商户名称</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{storeName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="lg cuIcon-new text-blue margin-right-xs"></text>
						<text class="text-grey">商户类型</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">物业</text>
					</view>
				
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="lg cuIcon-cascades text-blue margin-right-xs"></text>
						<text class="text-grey">商户编码</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{storeId}}</text>
					</view>
					
				</view>
			</view>

			<view class="padding">员工信息</view>
			<view class="cu-list menu ">
				<view class="cu-item">
					<view class="content">
						<text class="lg cuIcon-profile text-blue margin-right-xs"></text>
						<text class="text-grey">员工名称</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{userName}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="lg cuIcon-cascades text-blue margin-right-xs"></text>
						<text class="text-grey">员工编号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{userId}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeName: '',
				storeId:'',
				userName:'',
				userId:'',
				
			}
		},
		onLoad() {
			this.java110Context.onLoad();
			let _userInfo = this.java110Context.getUserInfo();

			console.log('_userInfo', _userInfo);
			
			this.storeName = _userInfo.storeName;
			this.storeId = _userInfo.storeId;
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			
		},
		methods: {

		}
	}
</script>

<style>

</style>
