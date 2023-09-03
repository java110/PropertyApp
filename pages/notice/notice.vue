<template>
	<view class="user-container">
		<view class="cu-list menu" v-if="notices.length > 0" v-for="(notice, idx) in notices" :key="idx" :data-item="notice"
		 @click="gotoDetail(notice)">
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						<view class="text-cut" style="width:85%;">{{notice.title}}</view>
					</view>
					<view class="text-gray text-sm">
						<text class="margin-right-xs">发布时间：</text> {{notice.timeStr}}</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu" v-if="notices.length === 0">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-notification text-grey"></text>
					<text class="text-grey">暂无公告信息</text>
				</view>
				<view class="action">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/** index.js **/
	import {getCurrentCommunity} from '../../api/community/community.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				communityId: "",
				notices: [],
				currPageIndex: 0,
				pageSize: 10
			};
		},
		onLoad: function() {
			let _that = this;
			this.java110Context.onLoad();
			_that.communityId = getCurrentCommunity().communityId;
			_that.java110Context.request({
				header: _that.java110Context.getHeaders(),
				url: url.GetNoticeListUrl,
				method: "GET",
				data: {
					communityId: _that.communityId,
					page: 1,
					row: 10,
					noticeTypeCd:1001
				},
				success: function(res) {
					// TODO 判断
					console.log(res);
					res.data.notices.forEach(function(item, index) {
						item.timeStr = item.startTime.replace(/:\d{1,2}$/, ' ');
					});
					_that.notices = res.data.notices;
				}
			});
		},
		onShow: function() {
			let that = this;
		},
		methods: {
			gotoDetail: function(_notice) {
				let that = this;
				
				//wx.setStorageSync('notice-' + index, JSON.stringify(that.notices[index]));
				uni.navigateTo({
					url: "/pages/notice/detail/noticeDetail?noticeId=" + _notice.noticeId
				});
			},
		}
	};
</script>
<style>
	.user-container {
	    padding: 25rpx 10rpx;
	    background-color: #F0F0F0;
		/*border: 1px solid black;*/
	}
	
	.notice {
	    margin: 10rpx 7rpx;
	    padding: 25rpx;
	    background-color: #ffffff;
	    border-radius: 7rpx;
	}
	.title {
	    border-bottom: 1rpx solid #dedede;
	    font-weight: 700;
	    font-size: 34rpx;
	    color: #00AA00;
	}
	.content{
	    padding: 15rpx 0;
	    font-size: 25rpx;
	    color: #7B7B7B;
	    /* overflow : hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2; 
	    -webkit-box-orient: vertical; */
	}
	.txt {
	    overflow : hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2; 
	    -webkit-box-orient: vertical;
	}
	.footer {
	    padding: 15rpx 0;
	    font-size: 22rpx;
	    color: #ADADAD;
	}
	.cu-list+.cu-list {
	    margin-top: 10px;
	}
</style>
