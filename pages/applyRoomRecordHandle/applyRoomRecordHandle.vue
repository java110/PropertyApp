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

		<view class="flex flex-direction margin-top">
			<button  class="cu-btn bg-green margin-tb-sm lg" @click="_dispatchRecord()">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		saveApplyRoomDiscountRecord
	} from '../../api/apply/apply.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	import * as TanslateImage from '../../lib/java110/utils/translate-image.js';
	export default {
		data() {
			return {
				applyRoomInfo: [],
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
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			let _that = this;
			this.communityId = getCurrentCommunity().communityId;
			_that.applyRoomInfo = JSON.parse(options.apply);
		},
		methods: {
			
			violationChange: function(e){
				this.violationIndex = e.target.value;
				if (this.violationIndex == 0) {
					this.violation = '';
					return;
				}
				let selected = this.violations[this.violationIndex];
				this.violation = selected.value;
			},
			
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
					ardId: this.applyRoomInfo.ardId,
					roomId: this.applyRoomInfo.roomId,
					roomName: this.applyRoomInfo.roomName,
					state: this.applyRoomInfo.state,
					stateName: this.applyRoomInfo.stateName,
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
				saveApplyRoomDiscountRecord(this, params)
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
