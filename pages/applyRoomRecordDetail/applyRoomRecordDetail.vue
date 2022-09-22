<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-deletefill text-green"></text>
					<text class="text-grey">操作</text>
				</view>
				<view class="action">
					<text class="cu-btn bg-red" @click="deleteRecord()">删除</text>
				</view>
			</view>
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
			<view v-if="imgRecordList.length>0">
				<view class="text-grey">图片</view>
				<view class="cu-item">
					<view class="grid text-center col-4 grid-square" >
						<view class="" v-for="(item,index) in imgRecordList" :key="index">
							<image mode="widthFix" :data-url="item.url" :data-index="index" :src="item.url" @tap="preview"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-if="videoRecordList.length>0">
			<view class="text-grey">视频</view>
				<view v-for="(item,index) in videoRecordList" :key="index">
					<video class="record-video" object-fit="contain" :src="commonBaseUrl + item.url" controls></video>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {queryApplyRoomRecordDetail,cutApplyRoomDiscountRecord} from '../../api/apply/apply.js'
	import conf from '../../conf/config.js'
	export default {
		data() {
			return {
				recordInfo: {},
				recordList: [],
				imgRecordList: [],
				videoRecordList: [],
				commonBaseUrl: '',
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.java110Context.onLoad();
			let _that = this;
			_that.recordInfo = JSON.parse(options.apply);
			_that.commonBaseUrl = conf.commonBaseUrl;
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
					ardrId: this.recordInfo.ardrId,
					roomName: this.recordInfo.roomName
				};
				queryApplyRoomRecordDetail(this,_objData)
				.then(function(res){
					_that.recordList = res
					res.forEach((item) => {
						if(item.relTypeCd == 19000){
							_that.imgRecordList.push(item);
						}else if(item.relTypeCd == 21000){
							_that.videoRecordList.push(item);
						}
					})
				})
			},
			
			preview: function(e){
				let index = e.target.dataset.index;
				let urls = [];
				this.imgRecordList.forEach((item) => {
					urls.push(item.url);
				})
				uni.previewImage({
					current: index,
					urls: urls
				})
			},
			
			deleteRecord: function(){
				uni.showModal({
					title: '提示',
					content: '是否确认删除？',
					success: (res) => {
						if(res.confirm) {  
							cutApplyRoomDiscountRecord(this,this.recordInfo)
							.then(function(res){
								uni.navigateBack({
									delta:1
								})
							})
						}
					} 
				})
			}
		}
	};
</script>

<style>
	uni-video{
		width: 100%;
	}
</style>
