<template>
	<view>

		<view class="cu-form-group margin-top">
			<textarea v-model="content" placeholder="请输入处理意见"></textarea>
		</view>
		<view class="cu-form-group margin-top">
			<picker :value="violationIndex" :range="violations" :range-key="'name'" @change="violationChange">
				<view>{{violations[violationIndex].name}}</view>
			</picker>
		</view>
		
		<view class="block__title">相关图片</view>
		<uploadImageAsync ref="vcUploadRef" :communityId="communityId" :maxPhotoNum="uploadImage.maxPhotoNum" :canEdit="uploadImage.canEdit" :title="uploadImage.imgTitle" @sendImagesData="sendImagesData"></uploadImageAsync>
		
		<view class="flex flex-direction margin-top">
			<button  class="cu-btn bg-green margin-tb-sm lg" @click="_dispatchRecord()">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		updateRoomDecorationRecord,uploadVideo
	} from '../../api/renovation/renovation.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	import uploadImageAsync from "../../components/vc-upload-async/vc-upload-async.vue";
	export default {
		data() {
			return {
				renovationInfo: [],
				imgList: [],
				photos: [],
				videoName: '',
				tempFilePath: '',
				content: '',
				communityId: '',
				violations: [
					{
						name: '请选择是否违规'
					},
					{
						name: '是',
						value: "true"
					},
					{
						name: '否',
						value: "false"
					},
				],
				violationIndex: 0,
				violation: '',
				uploadImage: {
					maxPhotoNum: 4,
					imgTitle: '图片上传',
					canEdit: true
				}
			}
		},
		
		components: {
			uploadImageAsync
		},
		
		onLoad(options) {
			this.java110Context.onLoad();
			let _that = this;
			this.communityId = getCurrentCommunity().communityId;
			_that.renovationInfo = JSON.parse(options.apply);
		},
		methods: {
			sendImagesData: function(e){
				this.photos = [];
				if(e.length > 0){
					e.forEach((img) => {
						this.photos.push(img.fileId);
					})
				}
			},
			violationChange: function(e){
				this.violationIndex = e.target.value;
				if (this.violationIndex == 0) {
					this.violation = '';
					return;
				}
				let selected = this.violations[this.violationIndex];
				this.violation = selected.value;
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
					communityId: this.communityId,
					examineRemark: '',
					isTrue: this.violation
				};
				let msg = '';
				if(params.remark == ''){
					msg = "请填写处理意见";
				}else if(params.isTrue == ''){
					msg = "请选择是否违规";
				}
				if(msg != ''){
					uni.showToast({
						title: msg,
						icon: 'none'
					});
					return;
				}
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
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}
</style>
