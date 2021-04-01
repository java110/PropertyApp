<template>
	<view>

		<view class="cu-form-group margin-top">
			<textarea v-model="content" placeholder="请输入处理意见"></textarea>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group ">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in imgList" bindtap="ViewImage" :key="index" :data-url="imgList[index]">
					<image :src='imgList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" @tap="_deleteImage(index)" :data-index="index">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="_chooseImage" v-if="imgList.length<4">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
		<!-- <view class="cu-bar bg-white margin-top">
			<view class="action">
				视频上传
			</view>
		</view>
		<view class="cu-form-group ">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-if="tempFilePath">
					<video :src="tempFilePath"></video>
					<view class="cu-tag bg-red" @tap="_deleteVideo()">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="_chooseVideo" v-if="tempFilePath==''">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view> -->

		<view class="flex flex-direction margin-top">
			<button  class="cu-btn bg-green margin-tb-sm lg" @click="_dispatchRecord()">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		updateRoomDecorationRecord,uploadVideo
	} from '../../api/renovation/renovation.js'
	import * as TanslateImage from '../../utils/translate-image.js';
	export default {
		data() {
			return {
				renovationInfo: [],
				imgList: [],
				photos: [],
				videoName: '',
				tempFilePath: '',
				content: '',
			}
		},
		onLoad(options) {
			let _that = this;
			_that.renovationInfo = JSON.parse(options.apply);
			console.log(_that.renovationInfo);
		},
		methods: {
			// _chooseVideo: function () {
			// 	var _that = this;
			// 	uni.chooseVideo({
			// 		count: 1,
			// 		sourceType: ['camera', 'album'],
			// 		success: function (res) {
			// 			console.log("选择视频成功",res)
			// 			_that.tempFilePath = res.tempFilePath;
			// 			let _objData = new FormData();
			// 			_objData.append("uploadFile", res.tempFile);
			// 			_objData.append('communityId', _that.renovationInfo.communityId);
			// 			uploadVideo(_that,_objData)
			// 				.then(function(result){
			// 					console.log('upload result:', result);
			// 				})
			// 		}
			// 	});
			// },
			
			_deleteImage: function(e) {
				let imageArr = this.imgList;
				imageArr.splice(e, 1);
				this.photos.splice(e, 1);
			},
			_chooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.imgList.push(res.tempFilePaths[0]);
						var tempFilePaths = res.tempFilePaths[0]
						//#ifdef H5
						TanslateImage.translate(tempFilePaths, (url) => {
							that.photos.push(url);
						})
						//#endif
					}
				});
			},
			
			_dispatchRecord: function() {
				uni.showLoading({
					title:"上传中..."
				})
				let params={
					rId: this.renovationInfo.rId,
					roomId: this.renovationInfo.roomId,
					roomName: this.renovationInfo.roomName,
					state: this.renovationInfo.state,
					stateName: this.renovationInfo.stateName,
					photos: this.photos,
					videoName: '',
					remark: this.content,
					detailType: '1001',
				};
				updateRoomDecorationRecord(this, params)
					.then(function() {
						uni.showToast({
							title:"保存成功"
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					});
			}

		}
	}
</script>

<style>

</style>
