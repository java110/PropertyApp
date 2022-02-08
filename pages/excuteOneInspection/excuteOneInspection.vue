<template>
	<view>
		<view class="block__title">{{inspectionName}}巡检</view>
		<form>
			<view class="cu-form-group">
				<view class="title">巡检情况</view>
				<picker @change="patrolChange" :value="patrolIndex" :range-key="'name'" :range="patrolTypes">
					<view class="picker">
						{{patrolTypes[patrolIndex].name}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" v-model="description" placeholder="请输入巡检说明"></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					巡检图片
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(img,index) in imgList" :key= "index" bindtap="ViewImage" :data-url="imgList[index]">
						<image :src='imgList[index]' mode='aspectFill'></image>
						<view class="cu-tag bg-red" @tap="removePhoto(index)" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">当前位置</view>
				<input type="text" v-model="reverseGeocoderSimplify" disabled="disabled" />
			</view>
		</form>
				
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="$preventClick(_submitExcuteInspection)">提交</button>
		</view>
		
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import * as TanslateImage from '../../lib/java110/utils/translate-image.js';
	import {preventClick} from '../../lib/java110/utils/common.js';
	import {queryDictInfo} from '../../api/inspection/inspection.js';
	import {getCurrentCommunity} from '../../api/community/community.js'
	import url from '../../constant/url.js'
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				taskId:'',
				taskDetailId:'',
				inspectionId:'',
				inspectionName:'',
				pointStartTime: '',
				pointEndTime: '',
				patrolTypes:[{
					name: '请选择'
				}],
				patrolIndex:0,
				patrolType:'',
				patrolTypeName:'请选择',
				description:'',
				photos:[],
				imgList:[],
				communityId:'',
				userId:'',
				userName:'',
				latitude: '',
				longitude: '',
				location: '',
				reverseGeocoderSimplify: '正在获取...'
			}
		},
		onLoad(option) {
			this.java110Context.onLoad();
			
			let that = this;
			wx.getLocation({
				type: 'gcj02',
				success: (res) => {
					this.latitude = res.latitude;
					this.longitude = res.longitude;
					this.getCurrentLocation();
				}
			});
			this.taskDetailId = option.taskDetailId;
			this.taskId = option.taskId;
			this.inspectionId = option.inspectionId;
			this.inspectionName = option.inspectionName;
			
			this.communityId = getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			this._loadPatrolTypesList();
		},
		methods: {
			// 地址逆解析
			getCurrentLocation: function(){
				let locationObj = this.latitude + ',' + this.longitude;
				let url = 'https://apis.map.qq.com/ws/geocoder/v1?coord_type=5&get_poi=1&output=jsonp&poi_options=page_size=1;page_index=1';
				this.$jsonp(url, {
					key: conf.QQMapKey,
					location: locationObj
				})
				.then(res => {
					this.reverseGeocoderSimplify = res.result.address;
				})
				.catch(err => {
					console.log(err);
				});
			},
			// 查询字典表 信息
			_loadPatrolTypesList: function(){
				let _that = this;
				let _objData = {
					'name': "inspection_task_detail",
					'type': "patrol_type",
				};
				queryDictInfo(this,_objData)
				.then(function(res){
					_that.patrolTypes = _that.patrolTypes.concat(res);
				})
			},
			patrolChange:function(e){
				this.patrolIndex = e.target.value //取其下标
				
				if (this.patrolIndex == 0) {
					this.patrolTypeName = '';
					this.patrolType = '';
					return;
				}
				let selected = this.patrolTypes[this.patrolIndex]
				this.patrolTypeName = selected.name;
				this.patrolType = selected.statusCd;
			},
			removePhoto: function(e) {
				let _imgList = [];
				this.imgList.forEach(function(item, index) {
					if (index != e) {
						_imgList.push(item);
					}
				});
				let _photos = [];
				this.photos.forEach(function(item, index) {
					if (index != e) {
						_photos.push(item);
					}
				});
				this.photos = _photos;
				this.imgList = _imgList;
			},
			deleteImage: function(e) {
				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
				this.photos.splice(e, 1);
			},
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //手机拍照
					success: (res) => {
						that.$data.imgList.push(res.tempFilePaths[0]);
						var tempFilePaths = res.tempFilePaths[0]
				
						TanslateImage.translate(tempFilePaths, (url) => {
							that.photos.push(url);
						})
				
					}
				});
			},
			_submitExcuteInspection: function() {
				let _that = this;
				uni.showLoading({
					title:'请稍后...'
				})
				let obj = {
					"taskId": this.taskId,
					"taskDetailId": this.taskDetailId,
					"inspectionId": this.inspectionId,
					"inspectionName": this.inspectionName,
					"communityId": this.communityId,
					"patrolType":this.patrolType,
					"description":this.description,
					"photos": [],
					"userId": this.userId,
					"userName": this.userName,
					"latitude": this.latitude,
					"longitude": this.longitude
				}
			
				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});
			
				let msg = "";
				if (obj.taskId == "") {
					msg = "数据异常，巡检任务为空";
				} else if (obj.taskDetailId == "") {
					msg = "数据异常，巡检任务详情为空";
				} else if (obj.inspectionId == "") {
					msg = "巡检点不能为空";
				} else if (obj.inspectionName == "") {
					msg = "巡检点名称不能为空";
				} else if (obj.patrolType == "") {
					msg = "巡检情况不能为空";
				} else if (obj.description == "") {
					msg = "巡检说明不能为空";
				} else if (obj.userId == "") {
					msg = "数据异常，巡检人为空";
				} else if (obj.photos.length <= 0) {
					msg = "请上传巡检图片";
				}
				console.log(obj);
			
				if (msg != "") {
					_that.onoff = true;
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					uni.hideLoading();
				} else {
					this.java110Context.request({
						url: url.updateInspectionTaskDetail, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
						header: this.java110Context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							_that.onoff = true;
							if (res.statusCode == 200) {
								uni.navigateBack({
									delta:1
								})
								return;
							}
							uni.hideLoading();
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							})
						},
						fail: function(e) {
							_that.onoff = true;
							uni.hideLoading();
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							})
						}
					});
			
				}
			},
			
		}
	}
</script>

<style>
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	}

</style>
