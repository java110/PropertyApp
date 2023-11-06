<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchValue" data-name="searchValue" name="searchValue" @focus="onChange" @blur="onSearch"
				 :adjust-position="false" placeholder="请输入楼栋编号" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="onSearch">搜索</button>
			</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item" v-for="(floor, idx) in floors" :key="idx" :label="floor.floorId">
				<view class="content padding-tb-sm" is-link @click="chooseFloor(floor)">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> {{floor.floorName}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> {{floor.floorId}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {loadFloors} from "../../api/floor/floor.js"
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		
		data() {
			return {
				appUserName: '',
				areaCode: '',
				searchValue: '',
				FloorName: "",
				floors: []
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.java110Context.onLoad();
			this.loadFloor();
		},
		methods: {
			onSearch() {
				this.loadFloor();
			},

			onClick() {
				this.loadFloor();
			},

			chooseFloor: function(_Floor) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				uni.setStorageSync("_selectFloor", _Floor);
				prevPage.FloorName = _Floor.name;
				//console.log(e);
				wx.navigateBack({
					delta: 1
				});
			},
			loadFloor: function() {
				let _that = this;
				let dataObj = {
					page: 1,
					row: 50,
					communityId: getCurrentCommunity().communityId,
					floorNum: this.searchValue
				};
				loadFloors(this,dataObj)
				.then(function(res){
					if (res.statusCode == 200) {
						let _floors = res.data.apiFloorDataVoList;
						_that.floors = _floors;
					}
				})
			}
		}
	}
</script>

<style>

</style>
