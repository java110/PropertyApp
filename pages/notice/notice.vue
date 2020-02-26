<template>
	<view class="user-container">
	    <block v-for="(item,index) in notices" :key="index" wx:key="index" >	      
	        <view class="noticesList-list">	          
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
				        console.log("请求返回信息：", res);
				        if (res.statusCode == 200) {
				          notices = res.data.notices;				         
				          console.log('小区文化',_that._notices);
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

<style lang="stylus">

</style>
