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
			:canEdit="uploadImage.canEdit" :title="uploadImage.imgTitle" @sendImagesData="sendImagesData" >
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
	import {
		queryOwnerAndMembers,updateRoomOwner
	} from '../../api/owner/owner.js';
	

	export default {
		data() {
			return {
				memberId: '',
				ownerId:'',
				name: "",
				sexArr: ["男", "女"],
				index: 0,
				sex: "0",
				link: "",
				remark: "",
				idCard: "",
				address: "",
				ownerTypeCd:'',
				communityId: '',
				photos: '',
				uploadImage: {
					maxPhotoNum: 1,
					imgTitle: '图片上传',
					canEdit: true
				},
				imageLists:[]
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
			this.memberId = options.memberId;
			this._loadOwnerMember();
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
					sex: this.sex,
					"ownerPhoto": this.photos,
					memberId:this.memberId,
					ownerId:this.ownerId
				}

				let msg = "";
				if (obj.memberId == "") {
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
				updateRoomOwner(this, obj).then(_data => {
					if (_data.code != 0) {
						uni.showToast({
							icon: 'none',
							title: _data.msg
						});
						return;
					}
					uni.navigateBack()
				})
			},
			_loadOwnerMember: function() {
				let _that = this;
				_that.imageLists = [];
				queryOwnerAndMembers(this, {
					page: 1,
					row: 1,
					memberId: this.memberId,
					communityId: this.getCommunityId(),
				}).then(_data => {
					_that.memberId = _data.data[0].memberId;
					_that.ownerId = _data.data[0].ownerId;
					_that.name = _data.data[0].name;
					_that.index = _data.data[0].sex;
					_that.sex = _data.data[0].sex;
					_that.link = _data.data[0].link;
					_that.remark = _data.data[0].remark;
					_that.ownerTypeCd = _data.data[0].ownerTypeCd;
					_that.idCard = _data.data[0].idCard;
					_that.address = _data.data[0].address;
					_that.imageLists.push(_data.data[0].url);
					_that.$refs.vcUploadRef._initImageList(_that.imageLists);
				});

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
