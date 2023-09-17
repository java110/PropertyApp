<template>
	<view>
		<view class="block__title">基本信息</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input v-model="name" placeholder="必填,请输入成员名称"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<input v-model="idCard" placeholder="选填,请输入身份证"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">性别</view>
			<picker bindchange="PickerChange" :value="index" :range="sexArr" @change="sexChange">
				<view class="picker">
					{{sex == '0'? '男':'女'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">人员类型</view>
			<picker :value="typeCdIndex" :range="typeCds" range-key="name" @change="_changeTypeCd">
				<view class="picker">
					{{typeCdIndex == -1 ?'请选择':typeCds[typeCdIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">房屋</view>
			<input v-model="roomName" placeholder="必填,请输入房屋楼栋-单元-房屋"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">家庭住址</view>
			<input type="text" v-model="address" placeholder="选填,请输入家庭住址"></input>
		</view>

		<view class="block__title">联系信息</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input v-model="link" placeholder="必填,请输入手机号(没有手机号随便写一个)"></input>
		</view>

		<view class="block__title">相关图片</view>
		<uploadImageAsync ref="vcUploadRef" :communityId="communityId" :maxPhotoNum="uploadImage.maxPhotoNum"
			:canEdit="uploadImage.canEdit" :title="uploadImage.imgTitle" @sendImagesData="sendImagesData">
		</uploadImageAsync>


		<view class="cu-form-group margin-top">
			<textarea v-model="remark" placeholder="选填,请输入备注"></textarea>
		</view>

		<view class="flex flex-direction margin-top margin-bottom">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="_submitOwnerMember()">提交</button>
		</view>
	</view>
</template>

<script>
	// pages/enterCommunity/enterCommunity.js
	import {
		isIDCard,
		checkPhoneNumber,
		idCardInfoExt
	} from '../../lib/java110/utils/StringUtil.js'
	import uploadImageAsync from "../../components/vc-upload-async/vc-upload-async.vue";
	import {saveRoomOwner} from '../../api/owner/owner.js';
	
	export default {
		data() {
			return {
				name: "",
				sexArr: ["男", "女"],
				index: 0,
				sex: "0",
				link: "",
				remark: "",
				typeCds: [{
						value: '1001',
						name: '业主'
					},
					{
						value: '1002',
						name: '家庭成员'
					},
					{
						value: '1003',
						name: '租客'
					},
					{
						value: '1005',
						name: '其他'
					}
				],
				typeCdIndex: -1,
				ownerTypeCd: "",
				idCard: "",
				address: "",
				roomName: "",
				communityId:'',
				photos: [],
				uploadImage: {
					maxPhotoNum: 1,
					imgTitle: '图片上传',
					canEdit: true
				}
			};
		},
		components: {
			uploadImageAsync
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.communityId = this.getCommunityId();
		},
		methods: {
			sendImagesData: function(e) {
				this.photos = e[0].fileId
			},
			sexChange: function(e) {
				this.sex = e.detail.value;
			},
			_submitOwnerMember: function(e) {
				let obj = {
					"name": this.name,
					"link": this.link,
					"remark": this.remark,
					"ownerTypeCd": this.ownerTypeCd,
					"roomName": this.roomName,
					"communityId": this.getCommunityId(),
					"idCard": this.idCard,
					"address": this.address,
					sex:this.sex,
					"ownerPhoto": this.photos
				}

				let msg = "";
				if (obj.ownerId == "") {
					msg = "请填写业主";
				} else if (obj.name == "") {
					msg = "请填写姓名";
				} else if (obj.link == "") {
					msg = "请填写手机号";
				} else if (!checkPhoneNumber(obj.link)) {
					msg = "手机号有误";
				}
				if (msg != "") {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}
				saveRoomOwner(this,obj).then(_data=>{
					if(_data.code != 0){
						uni.showToast({
							icon:'none',
							title:_data.msg
						});
						return;
					}
					uni.navigateBack()
				})
			},
			_changeTypeCd: function(e) {
				this.typeCdIndex = e.detail.value;
				this.ownerTypeCd = this.typeCds[this.typeCdIndex].value;
			},
		}
	};
</script>
<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}
</style>
