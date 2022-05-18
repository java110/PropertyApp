<template>
	<view>
		<view class="detailContainer">
		  <image class="headImg" v-if="showHeadImage" :src="activity.src" @error="hideHeadImage()"></image>
		  <view class="ad_titile">
		    <text class="company">{{activity.title}}</text>
		  </view>
		  <view class="flex justify-around border solid-bottom act-height">
		    <view ><text class="ad_au_text">{{activity.userName}}</text></view>
		    <view ><text class="ad_au_text">{{activity.startTime}}</text></view>
		  </view>
		  
		  <view class="ad_context margin-top" >
		    <rich-text :nodes="activity.context"/>
		  </view>
		</view>
	</view>
</template>

<script>
	import stringUtil from '../../lib/java110/utils/StringUtil.js';
	import conf from '../../conf/config.js'
	import {replaceImgSrc} from '../../lib/java110/utils/ImageUtil.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				activitiesId:'',
				currentCommunityId:'',
				showHeadImage:true,
				activity:{
					src:'',
					title:'',
					userName:'',
					startTime:'',
					context:''
				}
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.activitiesId = options.activitiesId;
			this.currentCommunityId = options.currentCommunityId;
			this._loadActivites();
		},
		methods: {
			hideHeadImage:function(){
				console.log('加载图片失败')
				this.showHeadImage = false;
			},
			
			/**
			   * 加载活动
			   * 第一次加载是可能没有小区 则直接下载固定小区
			   * 
			   */
			  _loadActivites: function () {
			    let _that = this;
			    let _objData = {
			      page: 1,
			      row: 1,
				  activitiesId:this.activitiesId,
			      communityId: this.currentCommunityId
			    };
			    _that.java110Context.request({
			      url: url.listActivitiess,
			      header: _that.java110Context.getHeaders(),
			      method: "GET",
			      data: _objData, //动态数据
			      success: function (res) {
			        console.log("请求返回信息：", res);
			        if (res.statusCode == 200) {
			          let _activites = res.data.activitiess;
			          _activites.forEach(function (_item) {
			            _item.src = url.filePath + "?fileId=" + _item.headerImg + "&communityId=" + _that.currentCommunityId + "&time=" + new Date();
			            let _startTime = _item.startTime.replace(/\-/g, "/")
			            let _tmpStartTime = new Date(_startTime);

			            // _item.startTime = _that.java110Util.date.formatDate(_tmpStartTime);
						      _item.context = replaceImgSrc(_item.context,conf.commonBaseUrl);
			            _that.activity = _item;
					   
			          });
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
			  },
			
		}
	}
</script>

<style>
	
	.detailContainer{ 
	  background-color: #fff;
	  overflow: hidden;
	}
	.detailContainer .headImg{
	  width: 100%;
	  height: 400rpx;
	}
	
	.detailContainer .ad_titile{
	  text-align: center;
	  padding-top: 30rpx;
	  margin-bottom: 30rpx;
	  font-size: 44rpx;
	}
	
	.detailContainer .ad_au_text{
	  font-size: 32rpx;
	  color: #8e8e8e
	}
	.detailContainer .ad_context{
	  padding: 0rpx 40rpx 40rpx 40rpx;
	}
	.act-height{
		height: 60upx;
	}

</style>
