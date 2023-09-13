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
				<view class="cu-item arrow" @tap="_repairFinish()">
					<view class="content">
						<text class="lg text-gray cuIcon-order"></text>
						<text class="text-grey">维修已办</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="_complaintFinish()">
					<view class="content">
						<text class="lg text-gray cuIcon-favor"></text>
						<text class="text-grey">投诉已办</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="_myAttendance()">
					<view class="content">
						<text class="lg text-gray cuIcon-favor"></text>
						<text class="text-grey">我的考勤</text>
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
						<text class="text-grey text-sm">V1.6</text>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="margin-top">
			<view class="cu-list menu">
				<view class="cu-item " @tap="_logout()">
					<view class="content text-center">
						<text class="text-red">退 出</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="logoutUser==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">退出系统</view>
					<view class="action" @tap="_cancleLogout()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认退出系统吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleLogout()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doLogoutUser()">确定</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {getCurrentCommunity} from '../../api/community/community.js'
	import conf from '../../conf/config.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				staffInfo: {
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					name: '一纸荒年',
				},
				currentCommunityName:'',
				logoutUser:false

			}
		},
		onLoad() {
			this.java110Context.onLoad();
		
			//加载员工名称
			let _userInfo = this.java110Context.getUserInfo();
			console.log("_userInfo",_userInfo);
			this.staffInfo.name = _userInfo.userName;
			this.staffInfo.img = conf.baseUrl + 'logo.png';
		},
		onShow() {
			let _communityInfo = getCurrentCommunity();
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
			_repairFinish:function(){
				uni.navigateTo({
					url:"/pages/repairDispatchFinish/repairDispatchFinish"
				})
			},
			//投诉已办
			_complaintFinish:function(){
				this.context.navigateTo({
					url:'/pages/complaintFinish/complaintFinish'
				})
			},
			_myAttendance:function(){
				this.context.navigateTo({
					url:'/pages/my/staffDetailAttendance'
				})
			},
			//修改密码
			_changePwd:function(){
				uni.navigateTo({
					url:"/pages/changePwd/changePwd"
				});
			},
			//退出系统
			_logout:function(){
				this.logoutUser = true;
			},
			_cancleLogout:function(){
				this.logoutUser = false;
			},
			_doLogoutUser:function(){
				let token = wx.getStorageSync('token');
				if(!token || token == ''){
					uni.clearStorageSync();
					uni.navigateTo({
						url:"/pages/login/login"
					});
					return;
				}
				let _data = {
					token:token
				}
				this.java110Context.request({
					url: url.userLogout,
					header: this.java110Context.getHeaders(),
					method: "POST",
					data: _data,
					success: function(res) {
						if(res.statusCode != 200){
							// uni.showToast({
							// 	icon:"none",
							// 	title: res.data
							// });
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return ;
						}
						uni.clearStorageSync();
						uni.navigateTo({
							url:"/pages/login/login"
						});
					},
					fail: function(error) {
						// 调用服务端登录接口失败
						uni.showToast({
							title: '调用接口失败'
						});
						console.log(error);
					}
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
