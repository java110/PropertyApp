<template>
	<view>
		<view class="cu-card case no-card margin-top" v-for="(item,index) in activities" :key = "index">
			<view class="cu-item shadow " @tap="_toDetail(item)">
				<view class="image">
					<image :src="item.src"
					  class="act-cu-img" ></image>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">{{item.userName}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{item.startTime}}
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.readCount}}
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.likeCount}}
									<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.collectCount}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				activities:[],
				currentCommunityId:''
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.currentCommunityId = options.currentCommunityId;
			this._loadActivites();
		},
		methods: {
			 
			/**
			   * 加载活动
			   * 第一次加载是可能没有小区 则直接下载固定小区
			   * 
			   */
			  _loadActivites: function () {
			    let _that = this;
			    let _objData = {
			      page: 1,
			      row: 15,
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
			          let _acts = [];
			          _activites.forEach(function (_item) {
			            _item.src = url.filePath + "?fileId=" + _item.headerImg + "&communityId=" + _that.currentCommunityId + "&time=" + new Date();
			            let _startTime = _item.startTime.replace(/\-/g, "/")
			            let _tmpStartTime = new Date(_startTime);
			
			            // _item.startTime = _that.java110Util.date.formatDate(_tmpStartTime);
			            _acts.push(_item);
			          });
			          _that.activities= _acts;
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
			  _toDetail:function(_item){
				  uni.navigateTo({
				  	url:'/pages/activityDetail/activityDetail?activitiesId='+_item.activitiesId+"&currentCommunityId="+this.currentCommunityId
				  });
			  }
			
		}
	}
</script>

<style>
	.act-cu-img{
		height: 400upx;
	}

</style>
