<template>
	<view class="content">
		<scroll-view :scroll-y="modalName==null" class="page" :class="show">
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
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
				<view class="action">
					<text class="lg text-gray cuIcon-more"></text>
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="text-grey">凯尔</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">22:20</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridCol: 4,
				currentCommunityId:'',
				currentCommunityName:'',
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				swiperList: []
			}
		},
		onLoad() {
			this._loadCommunity();
			
		},
		methods: {
			_loadCommunity:function(){
				let _that = this;
				//加载小区信息
				this.java110Context.getCommunity(function(_communitys){
					let currentCommunity = uni.getStorageSync(_that.java110Constant.mapping.CURRENT_COMMUNITY_INFO);
					//随机放一个小区
					let _tmpCommunityInfo = _communitys[0];
					if(_that.java110Util.string.isNull(currentCommunity)){
						uni.setStorageSync(_that.java110Constant.mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(_tmpCommunityInfo));
						_that.currentCommunityId = _tmpCommunityInfo.communityId;
						_that.currentCommunityName = _tmpCommunityInfo.name;
						
						return;
					}
					let communityId = '';
					_communitys.forEach(function(_item){
						if(_item.communityId == currentCommunity.communityId){
							communityId = _item.communityId;
						}
					});
					//说明当前小区 已经没有权限管理了
					if(_that.java110Util.string.isNull(communityId)){
						uni.setStorageSync(_that.java110Constant.mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(_tmpCommunityInfo));
						_that.currentCommunityId = _tmpCommunityInfo.communityId;
						_that.currentCommunityName = _tmpCommunityInfo.name;
						return;
					}
					
					_that.currentCommunityId = currentCommunity.communityId;
					_that.currentCommunityName = currentCommunity.name;
					_that._loadAd();
				},true);
			},
			_loadAd:function(){
				let _that = this;
				    let _objData = {
				      page: 1,
				      row: 5,
				      communityId: this.data.communityId
				    };
				    context.request({
				      url: _that.java110Constant.url.listAdvertPhoto,
				      header: context.getHeaders(),
				      method: "GET",
				      data: _objData, //动态数据
				      success: function (res) {
				        console.log("请求返回信息：", res);
				        if (res.statusCode == 200) {
				
				          let _advertPhotos = res.data;
				          let _aPhotos = [];
				          _advertPhotos.forEach(function (_item) {
							_item.type= "type";
				            _item.url = constant.url.hcBaseUrl + _item.url + "&time=" + new Date();
				            _aPhotos.push(_item);
				          });
				
				          _that.swiperList =  _aPhotos;
				
				          return;
				        }
				        wx.showToast({
				          title: "服务器异常了",
				          icon: 'none',
				          duration: 2000
				        })
				      },
				      fail: function (e) {
				        wx.showToast({
				          title: "服务器异常了",
				          icon: 'none',
				          duration: 2000
				        })
				      }
				    });
				
			}

		}
	}
</script>

<style>
	.swiper-height-index{
		height: 240upx;
		min-height: 240upx;
	}

	

</style>
