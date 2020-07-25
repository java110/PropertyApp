<template>
	<view>
		<view class="cu-form-group margin-top" v-if="action == 'BACK'">
			<view class="title">维修师傅</view>
			<input v-model="staffName" disabled="disabled" placeholder="请输入报修人"></input>
		</view>
		<view class="cu-form-group margin-top" v-else>
			<view class="title">维修师傅</view>
			<picker bindchange="PickerChange" :value="repairStaffIndex" :range="staffCloums" :range-key="'staffName'" @change="staffChange">
				<view class="picker">
					{{staffCloums[repairStaffIndex].staffName}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group margin-top">
			<textarea v-model="context" placeholder="请输入处理意见"></textarea>
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
			<button class="cu-btn bg-green margin-tb-sm lg" @click="_dispatchRepair()">提交</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffCloums: [{
					staffName: '请选择员工'
				}],
				action: '',
				repairId: '',
				repairType: '',
				imgList: [],
				photos: [],
				repairStaffIndex: 0,
				staffId: '',
				staffName: '',
				context: '',
				userId:'',
				userName:''
			}
		},
		onLoad(options) {
			this.action = options.action;
			this.repairId = options.repairId;
			this.repairType = options.repairType;
			let _userInfo = this.java110Context.getUserInfo();
			this.userId = _userInfo.userId;
			this.userName = _userInfo.userName;
			if(this.action == 'BACK'){
				this.staffId = options.preStaffId
				this.staffName = options.preStaffName
			}
			this._loadRepairStaff();
		},
		methods: {

			_loadRepairStaff: function() {
				let _that = this;
				let _data = {
					repairType: this.repairType,
					communtiyId: this.java110Context.getCurrentCommunity().communityId,
					page: 1,
					row: 50,
					state: '9999'
				}
				this.java110Context.request({
					url: _that.java110Constant.url.listRepairTypeUsers,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _data, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						let _json = res.data;
						if (_json.code != 0) {
							uni.showToast({
								icon: 'none',
								title: _json.msg
							});
							return;
						}
						let _data = _json.data;
						_that.staffCloums = _that.staffCloums.concat(_data);
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			staffChange: function(e) {

				this.repairStaffIndex = e.target.value //取其下标
				if (this.repairStaffIndex == 0) {
					this.staffId = '' //选中的id
					this.staffName = ''
					return;
				}
				let selected = this.staffCloums[this.repairStaffIndex] //获取选中的数组

				this.staffId = selected.staffId //选中的id
				this.staffName = selected.staffName
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
						console.log(res);
						that.imgList.push(res.tempFilePaths[0]);
						let _base64Photo = '';
						this.java110Factory.base64.urlTobase64(res.tempFilePaths[0]).then(function(_res) {
							_base64Photo = _res;
							console.log('base64', _base64Photo);
							that.photos.push(_base64Photo);
						});
					}
				});
			},

			_dispatchRepair: function(e) {
				let obj = {
					"staffId": this.staffId,
					"staffName": this.staffName,
					"context": this.context,
					"repairId": this.repairId,
					"repairType": this.repairType,
					"action": this.action,
					"communityId":this.java110Context.getCurrentCommunity().communityId,
					"photos":[],
					"userId":this.userId,
					"userName":this.userName
				}
				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});

				let msg = "";
				if (obj.context == "") {
					msg = "请填写处理意见";
				} else if (obj.staffId == "") {
					msg = "请填写师傅";
				} else if (obj.staffName == "") {
					msg = "请填写师傅";
				} else if (obj.repairId == "") {
					msg = "数据错误";
				}

				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.java110Context.request({
					url: this.java110Constant.url.repairDispatch, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
					header: this.java110Context.getHeaders(),
					method: "POST",
					data: obj, //动态数据
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							uni.navigateBack({
								delta: 1
							})
							return;
						}
						wx.showToast({
							title: _json.msg,
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


			},

		}
	}
</script>

<style>

</style>
