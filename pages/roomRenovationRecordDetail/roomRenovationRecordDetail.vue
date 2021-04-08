<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">申请房间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{recordInfo.roomName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">跟踪备注</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{recordList.length>0 ? recordList[0].remark : ''}}</text>
				</view>
			</view>
			<view v-for="(item,index) in recordList" :key="index">
				<img class="record-img" v-if="item.relTypeCd == 19000" :src="item.url" alt="">
				<video class="record-video" object-fit="contain" v-if="item.relTypeCd == 21000" :src="hcBaseUrl + item.url" controls></video>
			</view>
		</view>
	</view>
</template>

<script>
	import {queryRoomRenovationRecordDetail} from '../../api/renovation/renovation.js'
	export default {
		data() {
			return {
				recordInfo: {},
				recordList: [],
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			_that.recordInfo = JSON.parse(options.apply);
			_that.hcBaseUrl = this.java110Constant.url.hcBaseUrl;
			this.loadRecordDetail();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		
		methods: {
			/**
			 * 加载数据
			 */
			loadRecordDetail: function(){
				let _that = this;
				let _objData = {
					page: 1,
					row: 10,
					communityId: this.recordInfo.communityId,
					recordId: this.recordInfo.recordId,
					roomName: this.recordInfo.roomName,
					roomId: this.recordInfo.roomId
				};
				queryRoomRenovationRecordDetail(this,_objData)
				.then(function(res){
					_that.recordList = res
				})
			},
		}
	};
</script>

<style>
	.record-img{
		width: 100%;
	}
	uni-video{
		width: 100%;
	}
</style>
