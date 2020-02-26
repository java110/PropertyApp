<template>
	<view class="user-container">
	    <block v-for="(item,index) in notices" :key="index" wx:key="index" >	      
	        <view class="noticesList-list" @tap="_toDetailHref(item,index)">	         
	            <view class="title"> {{item.title}} </view>
	            <view  class="content">
					<view ><text class="ad_au_text">{{item.context}}</text></view>
	            </view>
	            <view class="footer"> 时间: {{item.timeStr}}</view>
	        </view>
	    </block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notices:[]
			}
		},
		onLoad() {
			this._loadNotice();			
		},
		methods: {
			_loadNotice:function(){
				let _that = this;
				    let _objData = {
				      page:0,
				      row:10,
				    };
				    _that.java110Context.request({
				      url: _that.java110Constant.url.GetNoticeListUrl,
				      header: _that.java110Context.getHeaders(),
				      method: "GET",
				      data: _objData, //动态数据					  
				      success: function (res) {
						res.data.notices.forEach(function(item, index) {
						    item.timeStr = (new Date(parseInt(item.startTime) ).toLocaleString().replace(/:\d{1,2}$/,' '));  
						});						
				        console.log("请求返回信息：", res);
				        if (res.statusCode == 200) {
				          _that.notices = res.data.notices;		
						  console.log('notices',_that.notices);
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
			_toDetailHref:function(_item,_index){
				let that= this;
				console.log("_index",_index);
				let index = _index;
				console.log("json==>",JSON.stringify(_item));
				uni.setStorageSync('notice-'+ index, JSON.stringify(_item));
				
				uni.navigateTo({
					url:'/pages/notice/detail/noticeDetail?index=' + index
				});
			}
		}
	}
</script>

<style>
	.user-container {
		padding: 25rpx 10rpx;
		background-color: #F0F0F0;
		/*border: 1px solid black;*/
	}
	.noticesList-list{
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
</style>
