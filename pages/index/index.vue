<template>
	<view class="content">
		<view class="margin-bottom-xs">
			<uni-notice-bar showIcon="true" scrollable="true" single="true" speed="30" text="HC掌上物业是免费开源的HC小区管理系统的分支项目，欢迎访问官网http://homecommunity.cn了解"></uni-notice-bar>
		</view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="show">
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @tap="_toHref(item)">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- 轮播图 -->
			<view class="margin-top">
				<swiper class="screen-swiper swiper-height-index" :class="round-dot" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					小区文化
				</view>
				<view class="action" @tap="_moreActivity()">
					<text class="lg text-gray cuIcon-more"></text>
				</view>
			</view>
			<view class="noticesList">
				<block v-for="(item,index) in activitys" :key="index" wx:key="index">

					<view class="noticesList-list" @tap="_toDetail(item)">
						<view class="notices-info">
							<view class="notices-info-name">{{item.title}}</view>

							<view class="notice-bottom">
								<view>
									<text class="lg text-gray cuIcon-time"></text>
									<text class="notice-startTime">{{item.startTime}}</text>
								</view>
							</view>
						</view>
						<view class="notices-info-image">
							<image :src="item.src" />
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	/**
	 * {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '停车收费',
					pathUrl: '/notice/notice'
				},
	 */
	
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				gridCol: 4,
				currentCommunityId: '',
				currentCommunityName: '',
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 0,
					name: '维修录单',
					pathUrl: '/repairOrder/repairOrder'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					name: '维修受理',
					pathUrl: '/myModify/myModify'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '投诉录单',
					pathUrl: '/complaintOrder/complaintOrder'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 0,
					name: '投诉受理',
					pathUrl: '/complaintList/complaintList'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '巡检打卡',
					pathUrl: '/inspection/inspection'
				},{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '采购管理',
					pathUrl: '/purchase/purchase'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '公告',
					pathUrl: '/notice/notice'
				}],
				swiperList: [],
				activitys: []
			}
		},
		components: {
			uniNoticeBar
		},
		onLoad() {
			this._loadCommunity();
		},
		methods: {
			_loadCommunity: function() {
				let _that = this;
				//加载小区信息
				this.java110Context.getCommunity(function(_communitys) {
					let currentCommunity = _that.java110Context.getCurrentCommunity(_that.java110Constant.mapping.CURRENT_COMMUNITY_INFO);
					//随机放一个小区
					let _tmpCommunityInfo = _communitys[0];
					if (_that.java110Util.string.isNull(currentCommunity)) {
						uni.setStorageSync(_that.java110Constant.mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(_tmpCommunityInfo));
						_that.currentCommunityId = _tmpCommunityInfo.communityId;
						_that.currentCommunityName = _tmpCommunityInfo.name;
						_that._loadAd();
						return;
					}
					let communityId = '';
					_communitys.forEach(function(_item) {
						if (_item.communityId == currentCommunity.communityId) {
							communityId = _item.communityId;
						}
					});
					//说明当前小区 已经没有权限管理了
					if (_that.java110Util.string.isNull(communityId)) {
						uni.setStorageSync(_that.java110Constant.mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(_tmpCommunityInfo));
						_that.currentCommunityId = _tmpCommunityInfo.communityId;
						_that.currentCommunityName = _tmpCommunityInfo.name;
						_that._loadAd();
						return;
					}

					_that.currentCommunityId = currentCommunity.communityId;
					_that.currentCommunityName = currentCommunity.name;
					_that._loadAd();
				}, true);
			},
			_loadAd: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 5,
					communityId: this.currentCommunityId
				};
				this.java110Context.request({
					url: _that.java110Constant.url.listAdvertPhoto,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode == 200) {

							let _advertPhotos = res.data;
							let _aPhotos = [];
							_advertPhotos.forEach(function(_item) {
								_item.type = "image";
								_item.url = _that.java110Constant.url.hcBaseUrl + _item.url + "&time=" + new Date();
								_aPhotos.push(_item);
							});

							_that.swiperList = _aPhotos;

							console.log(_that.swiperList);
							_that._loadActivitys();
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			_loadActivitys: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 5,
					communityId: this.currentCommunityId
				};
				_that.java110Context.request({
					url: _that.java110Constant.url.listActivitiess,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode == 200) {
							let _activites = res.data.activitiess;
							let _acts = [];
							_activites.forEach(function(_item) {
								_item.src = _that.java110Constant.url.filePath + "?fileId=" + _item.headerImg + "&communityId=" + _that.currentCommunityId +
									"&time=" + new Date();
								_acts.push(_item);
							});


							_that.activitys = _acts;
							console.log('小区文化', _that.activitys);
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			_moreActivity: function() {
				uni.navigateTo({
					url: '/pages/activityes/activityes?currentCommunityId=' + this.currentCommunityId
				});
			},
			_toDetail: function(_item) {
				uni.navigateTo({
					url: '/pages/activityDetail/activityDetail?activitiesId=' + _item.activitiesId + "&currentCommunityId=" + this.currentCommunityId
				});
			},
			_toHref: function(_item) {
				uni.navigateTo({
					url: '/pages' + _item.pathUrl
				});
			}

		}
	}
</script>

<style>
	.swiper-height-index {
		height: 240upx;
		min-height: 240upx;
	}

	.noticesList {
		background-color: #FFFFFF;
	}

	.noticesList-list {
		font-size: 25rpx;
		display: flex;
		width: 100%;
		padding: 10rpx 0;
		border-bottom: 1rpx solid #ECECEC;
		color: #6D6D6D;
		justify-content: space-between;
	}

	.notices-info-name {
		margin-top: 10rpx;
		color: black;
		font-size: 30rpx;
		display: -webkit-box;
		/*设置为弹性盒子*/
		-webkit-line-clamp: 2;
		/*最多显示5行*/
		overflow: hidden;
		/*超出隐藏*/
		text-overflow: ellipsis;
		/*超出显示为省略号*/
		-webkit-box-orient: vertical;
		word-break: break-all;
		/*强制英文单词自动换行*/
	}

	.notices-info-image image {
		width: 200rpx;
		height: 150rpx;
		margin: 10rpx 20rpx 0rpx 20rpx;
		border-radius: 10rpx;
	}

	.notices-info {
		margin: 10rpx 0rpx 0rpx 20rpx;
		height: 150rpx;
		flex-direction: column;
		display: flex;
		justify-content: space-between;
	}

	.notice-bottom {
		display: flex;
		text-align: left;
	}

	.notice-bottom view {
		margin-right: 20rpx;
	}

	.notice-bottom icon {
		color: #8a8a8a;
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
	}

	.notice-bottom view text {
		font-size: 25rpx;
		line-height: 40rpx;
	}

	.notice-startTime {
		margin-left: 16upx;
	}
</style>
