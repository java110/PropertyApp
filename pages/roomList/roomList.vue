<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入房屋编号" v-model="roomNum" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_searchRoom()">搜索</button>
			</view>
		</view>
		<view>
			<view class="padding">房屋信息</view>
			<view class="cu-list menu ">
				<view class="cu-item" v-for="(item,sub) in rooms" :key="sub" @tap="_doChangeRoom(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="lg  cuIcon-homefill text-blue margin-right-xs"></text> {{item.roomNum}}室</view>
						<view class="text-gray text-sm">
							<text class="lg text-gray cuIcon-location margin-right-xs"></text> {{item.roomId}}</view>
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
				roomNum:'',
				floorId:'',
				unitId:'',
				communityId:'',
				rooms:[]
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			
			this.floorId = options.floorId;
			this.unitId = options.unitId;
			this.communityId = options.communityId;
			this._loadRooms();
		},
		methods: {
			//加载楼栋信息
			_loadRooms:function(){
				let _communityId = this.communityId;
				
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					floorId: this.floorId,
					unitId:this.unitId,
					roomNum:this.roomNum,
					communityId:getCurrentCommunity().communityId
				};
				
				
				this.java110Context.request({
					url: url.queryRooms,
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
						let _data = res.data;
						_that.rooms = _data.rooms;
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
			_searchRoom:function(){
				this._loadRooms();
			},
			_doChangeRoom:function(_room){
				// let pages = getCurrentPages();
				// var prevPage = pages[pages.length - 2];
				// prevPage.roomId = _room.roomId;
				// prevPage.roomNum = _room.roomNum;
				this.java110Context.setParam("roomInfo",_room);
				uni.navigateBack({
					delta:1
				});
			}
		}
	}
</script>

<style>

</style>
