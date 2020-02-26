<template>
	<view>
		<view class="user-container bg-white flex flex-direction align-center">
			<view class="cu-avatar xl round margin-left lage-avatar" :style="'background-image:url('+staffInfo.img+');'"></view>
			<view class="margin-top">
				<text>{{staffInfo.name}}</text>
			</view>
		</view>

		<view class="margin-top">
			<view class="cu-list menu">
				<view class="cu-item arrow" @tap="_changeCommunity()">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">切换小区</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{currentCommunityName}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="_userInfo()">
					<view class="content">
						<text class="lg text-gray cuIcon-friendaddfill"></text>
						<text class="text-grey">个人信息</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="_changePwd()">
					<view class="content">
						<text class="lg text-gray cuIcon-lock"></text>
						<text class="text-grey">修改密码</text>
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="lg text-gray cuIcon-warnfill"></text>
						<text class="text-grey">系统版本</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">V0.01</text>
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
				staffInfo: {
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					name: '一纸荒年',
				},
				currentCommunityName:''

			}
		},
		onLoad() {
			//加载员工名称
			let _userInfo = this.java110Context.getUserInfo();
			console.log("_userInfo",_userInfo);
			this.staffInfo.name = _userInfo.userName;
			this.staffInfo.img = this.java110Constant.url.baseUrl + 'logo.png';
		},
		onShow() {
			let _communityInfo = this.java110Context.getCurrentCommunity();
			console.log('_communityInfo',_communityInfo);
			this.currentCommunityName = _communityInfo.name;
		},
		methods: {
			
			//切换小区
			_changeCommunity:function(){
				uni.navigateTo({
					url:"/pages/changeCommunity/changeCommunity"
				});
			},
			//用户信息
			_userInfo:function(){
				uni.navigateTo({
					url:"/pages/userInfo/userInfo"
				});
			},
			//修改密码
			_changePwd:function(){
				uni.navigateTo({
					url:"/pages/changePwd/changePwd"
				});
			}

		}
	}
</script>

<style>
	.user-container {
		padding: 60upx 0 40upx 0;
	}

	.lage-avatar {
		width: 200upx;
		height: 200upx;
	}
</style>
