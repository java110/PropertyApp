<template>
	<view class="content">
		<view class="margin-bottom-xs">
			<uni-notice-bar :showIcon="true" :scrollable="true" :single="true" :speed="30"
				text="HC掌上物业是免费开源的HC小区管理系统的分支项目，欢迎访问官网http://homecommunity.cn了解"></uni-notice-bar>
		</view>
		<scroll-view @scrolltolower="lower" class="scroll-restaurants-list" scroll-y="true" style="height:100%">
			<swiper class="categoryList padding-top-xs bg-white" indicator-dots="true"
				indicator-color="rgba(228,228,228,1)" indicator-active-color="#FECA49">
				<block v-for="(item, index) in categoryList" :key="index">
					<swiper-item>
						<block v-for="(item2, index2) in item" :key="index2">
							<view class="category-info">
								<navigator @tap="_toHref(item2)">
									<image :src="item2.src" class="category-image"></image>
									<view class="category-text">{{item2.name}}</view>
								</navigator>
							</view>
						</block>
					</swiper-item>
				</block>
			</swiper>
			<!-- 轮播图 -->
			<view class="margin-top-xs">
				<swiper class="screen-swiper swiper-height-index" :indicator-dots="true" :circular="true"
					:autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
							objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<view class="bock-icon "></view>
					<text class="margin-left-xs">小区文化</text>
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
		<view class="flex justify-center tec-height align-center">
			<text class="text-gray">java110团队提供技术支持,交流群827669685</text>
		</view>
	</view>
</template>

<script>
	// 后期开启 远程开门 和抄表
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {
		loadAdvert,
		loadCategory,
		loadActivitys,
		loadCategoryMenus,
		listStaffPrivileges
	} from '../../api/index/index.js'

	import {
		getCommunity,
		getCurrentCommunity
	} from '../../api/community/community.js'
	
	import mapping from '../../constant/mapping.js'
	
	import {isNull} from '../../lib/java110/utils/StringUtil.js'
	
	import {getUserInfo} from '../../lib/java110/api/Java110SessionApi.js'
	export default {
		data() {
			return {
				gridCol: 4,
				currentCommunityId: '',
				currentCommunityName: '',
				categoryList: [],
				swiperList: [],
				activitys: []
			}
		},
		components: {
			uniNoticeBar
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		onShow() {
			let _that = this;
			this._loadCommunity()
				.then(() => {
					return loadCategoryMenus(this, {
						userId: getUserInfo().userId,
						groupType: 'P_APP'
					})
				}).then((menus) => {
					_that.categoryList = menus;
				});

			listStaffPrivileges(this);
		},
		methods: {
			_loadCommunity: function() {
				let _that = this;
				return getCommunity(true)
					.then(function(_communitys) {
						_that._loadCurrentCommunity(_communitys);
					})
			},
			_loadAd: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 5,
					locationTypeCd: '4000'
				};
				loadAdvert(this, _objData)
					.then(function(res) {
						if (res.statusCode == 200) {
							let _advertPhotos = res.data;
							_that.swiperList = _advertPhotos;
							_that._loadActivitys();
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					})
			},
			_loadActivitys: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 5,
					communityId: this.currentCommunityId
				};
				loadActivitys(this, _objData)
					.then(function(res) {
						if (res.statusCode == 200) {
							let _activites = res.data.activitiess;
							let _acts = [];
							_activites.forEach(function(_item) {
								_item.src = _that.java110Constant.url.filePath + "?fileId=" + _item
									.headerImg + "&communityId=" + _that.currentCommunityId +
									"&time=" + new Date();
								_acts.push(_item);
							});
							_that.activitys = _acts;
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					})
			},
			_moreActivity: function() {
				this.context.navigateTo({
					url: '/pages/activityes/activityes?currentCommunityId=' + this.currentCommunityId
				});
			},
			_toDetail: function(_item) {
				this.context.navigateTo({
					url: '/pages/activityDetail/activityDetail?activitiesId=' + _item.activitiesId +
						"&currentCommunityId=" + this.currentCommunityId
				});
			},
			_toHref: function(_item) {
				this.context.navigateTo({
					url: _item.href
				});
			},
			_loadCurrentCommunity: function(_communitys) {
				let _that = this;
				let currentCommunity = getCurrentCommunity(mapping.CURRENT_COMMUNITY_INFO);
				//随机放一个小区
				let _tmpCommunityInfo = _communitys[0];
				if (isNull(currentCommunity)) {
					uni.setStorageSync(mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(
						_tmpCommunityInfo));
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
				if (_that.util.isNull(communityId)) {
					uni.setStorageSync(mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(
						_tmpCommunityInfo));
					_that.currentCommunityId = _tmpCommunityInfo.communityId;
					_that.currentCommunityName = _tmpCommunityInfo.name;
					_that._loadAd();
					return;
				}

				_that.currentCommunityId = currentCommunity.communityId;
				_that.currentCommunityName = currentCommunity.name;
				_that._loadAd();
			}

		}
	}
</script>

<style>
	@import "./index.css";

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

	.bock-icon {
		height: 34upx;
		width: 14upx;
		line-height: 100upx;
		background-color: #00AA00;
	}

	.tec-height {
		height: 120upx;
	}
</style>
