<template>
	<view>
		<view class="cu-bar bg-white search " >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" v-model="name" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap = "_searchStaff()">搜索</button>
			</view>
		</view>
		
		<scroll-view scroll-y class="indexes" scroll-into-view="indexes-1" style="height:calc(100px - 50px)"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.nameIndex" :id="'indexes-' + item.nameIndex" :data-index="item.nameIndex">
					<view class="padding">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in 2" :key="sub">
							<view class="cu-avatar round lg">{{item.name}}</view>
							<view class="content">
								<view class="text-grey">{{item.name}}<text class="text-abc">{{list[sub].name}}</text>君</view>
								<view class="text-gray text-sm">
									{{item.orgName}}-{{item.tel}}
								</view>
							</view>
							<view class="action">
								<text class="lg text-gray cuIcon-dianhua photo_icon" @tap="_callPhoto(item.tel)"></text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				name:''
				
			}
		},
		onLoad() {
			//let list = [{}];
			
			// for (let i = 0; i < 5; i++) {
			// 	list[i] = {};
			// 	list[i].name = String.fromCharCode(65 + i);
			// }
			//this.list = list;
			this._loadStaffInfo();
			
		},
		methods: {
			_loadStaffInfo:function(){
				//获取商户ID
				let _that =this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page:1,
					row:15,
					storeId:storeId,
					name:this.name
				};
				this.java110Context.request({
				  url: _that.java110Constant.url.queryStaffInfos,
				  header: _that.java110Context.getHeaders(),
				  method: "GET",
				  data: _objData, //动态数据
				  success: function (res) {
				    console.log("请求返回信息：", res);
				    if (res.statusCode == 200) {
					  let _data = res.data;
					  _data.staffs.forEach(function(_ite){
						  _ite.nameIndex = 'a';
					  });
					  _that.list = _data.staffs;				
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
			_callPhoto:function(_photo){
				uni.makePhoneCall({	
				 	// 手机号
				    phoneNumber: _photo, 
				
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},
				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
					
				  });
			},
			_searchStaff:function(){
				this._loadStaffInfo();
			}
			
		}
	}
</script>

<style>
	
	.photo_icon{
		font-size: 48upx;
		color:#0081FF;
	}

</style>
