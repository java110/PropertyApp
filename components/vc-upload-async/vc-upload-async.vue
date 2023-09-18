<template>
	<view>
		<view class="cu-bar bg-white ">
			<view class="action">
				{{title}}
			</view>
			<view class="action" v-if="canEdit">
				{{imgList.length}}/{{maxPhotoNum}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in imgList" @click.stop="preview(index)">
					<image :src="img" mode='aspectFill'></image>
					<view class="cu-tag bg-red" v-if="canEdit" @tap.stop="deleteImage(index)">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="canEdit && imgList.length < maxPhotoNum">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as TanslateImage from '../../lib/java110/utils/translate-image.js';
	import conf from '../../conf/config.js'
	import {
		uploadImageAsync
	} from '../../api/common/common.js'
	const context = require("../../lib/java110/Java110Context.js");
	const factory = context.factory;
	export default {
		name: "vc-upload",
		data() {
			return {
				photos: [],
				imgList: [],
				photoUrl: conf.commonBaseUrl + '/callComponent/download/getFile/file',
				sendImgList: []
			};
		},
		props: {
			communityId: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '图片上传'
			},
			maxPhotoNum: {
				type: Number,
				default: 1
			},
			count: {
				type: Number,
				default: 1
			},
			sizeType: {
				type: Array,
				default () {
					return ['original', 'compressed']
				}
			},
			sourceType: {
				type: Array,
				default () {
					return ['album', 'camera']
				}
			},
			canEdit: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			photos: function(val) {
				this.sendData();
			},
			deep: true
		},
		mounted() {
			this._initImageList(this.sendImgList);
		},
		methods: {
			_initImageList: function(_imageLists) {
				this.sendImgList = _imageLists;
				
				this.sendImgList.forEach((item, index) => {
					if (item.indexOf('base64,') > -1) {
						this.imgList.push(_photo);
					}
					if (item.indexOf("https") > -1 || item.indexOf("http") > -1 || item.indexOf(this
						.photoUrl) > -1) {
						this.imgList.push(item);
						let urlParams = this._getUrlParams(item);
						if (urlParams['fileId']) {
							this.photos.push({
								fileId: urlParams['fileId'],
								url: item
							});
						}
					} else {
						let url = this.photoUrl + "?fileId=" + item + "&communityId=-1&time=" + new Date();
						this.imgList.push(url);
						this.photos.push({
							fileId: item,
							url: url
						});
					}
				})
				
				console.log(this.imgList);
			},
			// 向父组件传递base64数据
			sendData() {
				this.$emit('sendImagesData', this.photos)
			},
			_getUrlParams: function(url) {
				if (url.indexOf('?') < 0) {
					return {
						fileId: url.substring(url.indexOf('img')),
					};
				}
				let urlStr = url.split('?')[1]
				let obj = {};
				let paramsArr = urlStr.split('&')
				for (let i = 0, len = paramsArr.length; i < len; i++) {
					let arr = paramsArr[i].split('=')
					obj[arr[0]] = arr[1];
				}
				return obj
			},
			// 删除
			deleteImage: function(index) {
				this.imgList.splice(index, 1);
				this.photos.splice(index, 1);
			},
			// 添加
			ChooseImage: function() {
				let that = this;
				wx.chooseImage({
					count: this.count, // 选择数量
					sizeType: this.sizeType, //原图或压缩图
					sourceType: this.sourceType, // 相册或拍摄
					success: (upImgRes) => {
						var tempFilePaths = upImgRes.tempFilePaths[0]
						that.imgList.push(tempFilePaths);
						that.$forceUpdate();

						TanslateImage.translate(tempFilePaths, (base64) => {
							let _objData = {
								uploadFile: base64,
								communityId: that.communityId
							}
							uploadImageAsync(_objData, that).then((res) => {
								that.photos.push(res);
							})
						})
					}
				});
			},
			// 预览
			preview: function(index) {
				let urls = this.imgList;
				// 空集合 return
				if (urls.length < 1) {
					return;
				}
				// domain拼接
				urls.forEach((item, index) => {
					let start = item.indexOf("/callComponent");
					if (start == 0) {
						urls[index] = conf.commonBaseUrl + item;
					}
				})
				uni.previewImage({
					current: index,
					urls: urls
				})
			},
		}
	}
</script>

<style>
</style>
