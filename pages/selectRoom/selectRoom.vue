<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchValue" data-name="searchValue" name="searchValue" @focus="onChange" @blur="onSearch"
				 :adjust-position="false" placeholder="请输入房屋编号" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="onSearch">搜索</button>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item" v-for="(room, idx) in rooms" :key="idx" :label="room.roomId">
				<view class="content padding-tb-sm" is-link @click="chooseRoom(room)">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> {{room.roomNum}}室</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{room.roomId}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {loadRooms} from '../../api/room/room.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				appUserName: '',
				areaCode: '',
				searchValue: '',
				unitName: "",
				rooms: [],
				floorId:'',
				unitId:''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.java110Context.onLoad();
			let _floorId = options.floorId;
			this.floorId = _floorId;
			this.unitId = options.unitId;
			this.loadRoom();
		},
		methods: {
			onSearch() {
				this.loadRoom();
			},
			
			onClick() {
				this.loadRoom();
			},
			chooseRoom: function(_room) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				uni.setStorageSync("_selectRoom", _room);
				//prevPage.roomName = _room.name;
				//console.log(e);
				wx.navigateBack({
					delta: 1
				});
			},
			loadRoom: function() {
				let _that = this;
				let dataObj = {
					page: 1,
					row: 15,
					communityId:  getCurrentCommunity().communityId,
					roomNum: this.searchValue,
					floorId: this.floorId,
					unitId: this.unitId
				};
				loadRooms(this,dataObj)
				.then(function(res){	
					if (res.statusCode == 200) {
						let _rooms = res.data.rooms;		
						_that.rooms = _rooms;
					}
				})
			}
		}
	}
</script>

<style>

</style>
