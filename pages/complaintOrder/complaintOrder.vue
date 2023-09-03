<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">

				<view class="cu-item flex-sub" :class="state=='10002'?'text-green cur':''" @tap="_tabSelect('10002')">
					发起投诉
				</view>
				<view class="cu-item flex-sub" :class="state=='10001'?'text-green cur':''" @tap="_tabSelect('10001')">
					投诉历史
				</view>
			</view>
		</scroll-view>

		<view class="margin-top" v-if="state=='10001'">
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in myOrders" :key="index"
					@tap="_toComplaintOrderDetail(item)">
					<view class="cu-avatar round lg" :style="'background-image:url('+orderImg+');'">
					</view>
					<view class="content">
						<view class="text-grey">{{item.complaintId}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.complaintName}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="margin-top" v-if="state=='10002'">
			<view class="padding ">
				<text>房屋信息</text>
			</view>
			<view class="cu-list menu ">
				<view class="cu-item arrow" @tap="_selectFloor()">
					<view class="content">
						<text class="text-grey">楼栋</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{floorNum != ''?floorNum+'号楼':'请选择'}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="_selectUnit()">
					<view class="content">
						<text class="text-grey">单元</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{unitNum != ''?unitNum+'单元':'请选择'}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="_selectRoom()">
					<view class="content">
						<text class="text-grey">房屋</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{roomNum != ''?roomNum+'室':'请选择'}}</text>
					</view>
				</view>
			</view>

			<view class="padding margin-top">
				<text>投诉信息</text>
			</view>

			<form>
				<view class="cu-form-group">
					<view class="title">投诉类型</view>
					<picker @change="_changeResult" :value="typeCdIndex" :range="typeCds">
						<view class="picker">
							{{typeCdIndex>-1?typeCds[typeCdIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">投诉人</view>
					<input placeholder="请输入投诉人" v-model="complaintName" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="输入手机号码" v-model="tel" name="input"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<textarea maxlength="-1" v-model="context" placeholder="请输入投诉内容"></textarea>
				</view>
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						图片上传
					</view>
					<view class="action">
						{{imgList.length}}/4
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="_delImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="_chooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</form>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" @tap="_submitOrder()">提交</button>
			</view>

		</view>
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				state: '10002',
				orderImg: conf.baseUrl + 'img/order.png',
				myOrders: [],
				imgList: [],
				photos: [],
				floorId: '',
				floorNum: '',
				unitId: '',
				unitNum: '',
				roomId: '',
				roomNum: '',
				typeCd: '',
				typeCds: ['投诉', '建议'],
				typeCdIndex: -1,
				complaintName: '',
				tel: '',
				context: ''
			}
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		onShow() {
			//this._loadMyOrders();

			let _floorInfo = this.java110Context.getParam("floorInfo");
			if (_floorInfo) {
				this.floorId = _floorInfo.floorId;
				this.floorNum = _floorInfo.floorNum;
			}

			let _unitInfo = this.java110Context.getParam("unitInfo");
			if (_unitInfo) {
				this.unitId = _unitInfo.unitId;
				this.unitNum = _unitInfo.unitNum;
			}

			let _roomInfo = this.java110Context.getParam("roomInfo");
			if (_roomInfo) {
				this.roomId = _roomInfo.roomId;
				this.roomNum = _roomInfo.roomNum;
			}
		},
		methods: {
			_tabSelect: function(_state) {
				this.state = _state;
				console.log('_tabSelect_this.state', this.state)
				if (_state == '10002') {
					//this._loadOrder();
				} else {
					this._loadMyOrders();
				}
			},

			_loadMyOrders: function() {
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					process: 'START',
					communityId: getCurrentCommunity().communityId

				};
				this.java110Context.request({
					url: url.listAuditHistoryComplaints,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							// uni.showToast({
							// 	icon: 'none',
							// 	title: res.data
							// });
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return;
						}
						let _data = res.data;
						_that.myOrders = _data.complaints;

						_data.complaints.forEach(function(item) {
							let dateStr = item.createTime.replace(/-/g, "/");
							console.log('_data.complaints_dateStr', dateStr);
							let _date = new Date(dateStr);
							item.createTime = (_date.getMonth() + 1) + '-' + _date.getDate();
						});
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
			_toComplaintOrderDetail: function(_item) {
				console.log('_item', _item);
				uni.setStorageSync("_complaintOrderDetail_" + _item.complaintId, _item);
				uni.navigateTo({
					url: "/pages/complaintOrderDetail/complaintOrderDetail?complaintId=" + _item.complaintId
				});
			},
			_submitOrder: function() {
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let _storeId = _userInfo.storeId;
				if (this.typeCdIndex == 0) {
					this.typeCd = '809001';
				} else {
					this.typeCd = '809002';
				}
				let obj = {
					"typeCd": this.typeCd,
					"complaintName": this.complaintName,
					"tel": this.tel,
					"roomId": this.roomId,
					"photos": [],
					"context": this.context,
					userId: _userInfo.userId,
					storeId: _storeId,
					communityId: getCurrentCommunity().communityId
				}

				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});
				let msg = "";

				if (obj.typeCd == "") {
					msg = "请选择投诉类型";
				} else if (obj.complaintName == "") {
					msg = "请填写投诉人";
				} else if (obj.tel == "") {
					msg = "请填写手机号";
				} else if (obj.context == "") {
					msg = "请填写投诉内容";
				} else if (obj.roomId == "") {
					msg = "请选择房屋信息"
				}
				if (msg != "") {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					})
				} else {
					this.java110Context.request({
						url: url.saveComplaint,
						header: _that.java110Context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							console.log(res);
							if (res.statusCode != 200) {
								// uni.showToast({
								// 	icon: 'none',
								// 	title: res.data
								// });
								uni.navigateTo({
									url:'/pages/login/login'
								})
								return;
							}
							_that.state = '10001';
							_that._loadMyOrders();
						},
						fail: function(e) {
							console.log(e);
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							})
						}
					});
				}
			},
			_chooseImage: function() {
				let _that = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths);
							_that.java110Factory.base64.urlTobase64(res.tempFilePaths).then(function(
								_baseInfo) {
								_that.photos.push(_baseInfo);
							});
						} else {
							this.imgList = res.tempFilePaths;
							_that.photos = [];
						}
					}
				});
			},
			_delImg: function(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.photos.splice(e.currentTarget.dataset.index, 1);
			},
			_selectFloor: function() {
				uni.navigateTo({
					url: '/pages/floorList/floorList?communityId=' + getCurrentCommunity()
						.communityId
				});
			},
			_selectUnit: function() {
				if (this.floorId == '') {
					uni.showToast({
						icon: 'none',
						title: '请先选择楼栋'
					});
					return;
				}

				uni.navigateTo({
					url: '/pages/unitList/unitList?communityId=' + getCurrentCommunity()
						.communityId +
						"&floorId=" + this.floorId + "&floorNum=" + this.floorNum
				});
			},
			_selectRoom: function() {
				if (this.floorId == '') {
					uni.showToast({
						icon: 'none',
						title: '请先选择楼栋'
					});
					return;
				}

				if (this.unitId == '') {
					uni.showToast({
						icon: 'none',
						title: '请先选择单元'
					});
					return;
				}

				uni.navigateTo({
					url: '/pages/roomList/roomList?communityId=' + getCurrentCommunity()
						.communityId +
						"&floorId=" + this.floorId + "&floorNum=" + this.floorNum + "&unitId=" + this.unitId +
						"&unitNum=" + this.unitNum
				});
			},
			_changeResult: function(e) {
				this.typeCdIndex = e.detail.value;
				console.log(e, this.typeCdIndex);
			}


		}
	}
</script>

<style>

</style>
