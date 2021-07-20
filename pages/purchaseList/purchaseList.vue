<template>
	<view>
		<view>
			<view class="padding">商品信息</view>
			<view class="cu-list menu ">
				<view class="cu-item" v-for="(item,sub) in puchaseAll" :key="sub" @tap="_doChangeFloor(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="lg  cuIcon-list text-blue margin-right-xs"></text> 名称:{{item.resName}}</view>
						<view class="text-gray text-sm">
							<text class="lg text-gray cuIcon-edit margin-right-xs"></text> 库存:{{item.stock}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getCurrentCommunity} from '../../api/community/community.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				puchaseAll:'',
				floorNum:'',
				communityId:'',
				floors:[]
			}
		},
		
		onLoad(options) {
			this.java110Context.onLoad()
			this.communityId = options.communityId;
			this._loadPurchase();
		},
		methods: {
			
			//加载楼栋信息
			_loadPurchase:function(){
				let _communityId = this.communityId;
				
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					communityId:getCurrentCommunity().communityId
				};
				this.java110Context.request({
					url: url.listResourceStores,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon:'none',
								title:res.data
							});
							return;
						}
						_that.puchaseAll = res.data.resourceStores;
						console.log(_that.puchaseAll)
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
				
			},
			_doChangeFloor:function(_floor){
				// let pages = getCurrentPages();
				// var prevPage = pages[pages.length - 2];
				// prevPage.floorId = _floor.floorId;
				// prevPage.floorNum = _floor.floorNum;
				console.log(_floor)
				this.java110Context.setParam("floorInfo",_floor);
			
				uni.navigateBack({
					delta:1
				});
			}
			
		}
	}
</script>

<style>

</style>
