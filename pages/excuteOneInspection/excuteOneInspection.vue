<template>
	<view>
		<view class="block__title">{{inspectionName}}巡检</view>
		<form>
			<view class="cu-form-group">
				<view class="title">巡检情况</view>
				<picker @change="patrolChange" :value="patrolIndex" :range="patrols">
					<view class="picker">
						{{patrolTypeName?patrolTypeName:'请选择'}}
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
		</form>
				
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="_submitExcuteInspection()">提交</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskId:'',
				taskDetailId:'',
				inspectionId:'',
				inspectionName:'',
				patrols:['正常','异常'],
				patrolTypes:['10001','20002'],
				patrolType:'',
				patrolTypeName:'请选择',
				description:'',
				photos:[],
				imgList:[],
				patrolIndex:0,
				communityId:'',
				userId:'',
				userName:''
			}
		},
		onLoad(option) {
			this.taskDetailId = option.taskDetailId;
			this.taskId = option.taskId;
			this.inspectionId = option.inspectionId;
			this.inspectionName = option.inspectionName;
			
			this.communityId = this.java110Context.getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
		},
		methods: {
			patrolChange:function(e){
				this.patrolTypeName = this.patrols[e.detail.value];
				this.patrolType = this.patrolTypes[e.detail.value];
			},
			removePhoto: function(e) {
				console.log(e);
				let _imgList = [];
				this.imgList.forEach(function(item, index) {
					if (index != e.detail.index) {
						_imgList.push(item);
					}
				});
				let _photos = [];
				this.photos.forEach(function(item, index) {
					if (index != e.detail.index) {
						_photos.push(item);
					}
				});
				this.photos = _photos;
				this.imgList = _imgList;
			},
			deleteImage: function(e) {
				console.log(e);
				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
			},
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						that.$data.imgList.push(res.tempFilePaths[0]);
						let _base64Photo = '';
						that.java110Factory.base64.urlTobase64(res.tempFilePaths[0]).then(function(_res) {
							_base64Photo = _res;
							console.log('base64', _base64Photo);
							that.photos.push(_base64Photo);
						});
					}
				});
			},
			_submitExcuteInspection: function() {
				/**
				 * taskId:'',
				taskDetailId:'',
				inspectionId:'',
				inspectionName:'',
				 */
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
					"userName": this.userName
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
				}
				console.log(obj);
			
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					this.java110Context.request({
						url: this.java110Constant.url.updateInspectionTaskDetail, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
						header: this.java110Context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							if (res.statusCode == 200) {
								uni.navigateBack({
									delta:1
								})
								return;
							}
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							})
						},
						fail: function(e) {
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
