<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="state=='10002'?'text-green cur':''" @tap="_tabSelect('10002')">
					发起报修
				</view>
				<view class="cu-item flex-sub" :class="state=='10001'?'text-green cur':''" @tap="_tabSelect('10001')">
					报修历史
				</view>
				
			</view>
		</scroll-view>
		
		<view class="margin-top" v-if="state=='10001'">
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in myRepairOrders" :key="index" @tap="_toAuditComplaintOrder(item)">
					<view class="cu-avatar round lg" :style="'background-image:url('+orderImg+');'">
					</view>
					<view class="content">
						<view class="text-grey">{{item.repairId}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.repairName}}
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.appointmentTime}}</view>
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
				<text>报修信息</text>
			</view>
		
			<form>
				<view class="cu-form-group">
					<view class="title">报修类型</view>
					<picker @change="repairChange" :value="typeCdIndex" :range="typeCds">
						<view class="picker">
							{{typeName?typeName:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">报修人</view>
					<input placeholder="请输入投诉人" v-model="repairName" name="input"></input>
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
				<view class="cu-form-group arrow">
					<view class="title">预约日期</view>
					<picker mode="date" :value="bindDate" start="2015-09-01" end="2020-09-01" @change="dateChange">
						<view class="picker">
							{{bindDate}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group arrow">
					<view class="title">预约时间</view>
					<picker mode="time" :value="bindTime" start="09:01" end="21:01" @change="timeChange">
						<view class="picker">
							{{bindTime}}
						</view>
					</picker>
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
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
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
				<button class="cu-btn bg-green margin-tb-sm lg" @tap="_submitRepair()">提交</button>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:'10002',
				orderImg:this.java110Constant.url.baseUrl + 'img/order.png',
				myRepairOrders:[],
				imgList: [],
				photos:[],
				floorId: '',
				floorNum: '',
				unitId: '',
				unitNum: '',
				roomId: '',
				roomNum: '',
				typeCd: '',
				typeCds: ['卧室报修', '管道报修', '客厅报修'],
				repairIdAttr:['10001','10002','10003'],
				typeName:'请选择',
				typeCdIndex: -1,
				context:'',
				repairName:'',
				tel:'',
				minDate: new Date().getTime(),
				bindDate: '请选择',
				bindTime: '请选择',
			}
		},
		onShow() {
			//this._loadMyOrders();
			
			let _floorInfo = this.java110Context.getParam("floorInfo");
			if(_floorInfo){
				this.floorId = _floorInfo.floorId;
				this.floorNum = _floorInfo.floorNum;
			}
			
			let _unitInfo = this.java110Context.getParam("unitInfo");
			if(_unitInfo){
				this.unitId = _unitInfo.unitId;
				this.unitNum = _unitInfo.unitNum;
			}
			
			let _roomInfo = this.java110Context.getParam("roomInfo");
			if(_roomInfo){
				this.roomId = _roomInfo.roomId;
				this.roomNum = _roomInfo.roomNum;
			}
		},
		methods: {
			_tabSelect: function(_state) {
				this.state = _state;
				if(_state == '10002'){
					//this._loadOrder();
				}else{
					this._queryMyRepairOrders();
				}
			},
			_queryMyRepairOrders:function(){
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					communityId:_that.java110Context.getCurrentCommunity().communityId
				};
				this.java110Context.request({
					url: _that.java110Constant.url.listOwnerRepairs,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon:'none',
								title:res.data
							});
							return;
						}
						let _data = res.data;
						_that.myRepairOrders = _data.ownerRepairs;
						
						_data.ownerRepairs.forEach(function(item){
							let dateStr = item.appointmentTime;
							console.log(dateStr);
							let _date=new Date(dateStr);
							item.appointmentTime = (_date.getMonth()+1) +'-'+_date.getDate();
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
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						if (that.$data.photoList.length) {
							that.$data.photoList.push(res.tempFilePaths[0]);
						} else {
							that.$data.photoList = res.tempFilePaths;
						}
					}
				});
			},
			removePhoto: function(e) {
				console.log(e);
				let imageArr = this.$data.photoList;
				imageArr.splice(e, 1);
			},
			_selectFloor: function() {
				uni.navigateTo({
					url: '/pages/floorList/floorList?communityId=' + this.java110Context.getCurrentCommunity().communityId
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
					url: '/pages/unitList/unitList?communityId=' + this.java110Context.getCurrentCommunity().communityId +
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
					url: '/pages/roomList/roomList?communityId=' + this.java110Context.getCurrentCommunity().communityId +
						"&floorId=" + this.floorId + "&floorNum=" + this.floorNum + "&unitId=" + this.unitId + "&unitNum=" + this.unitNum
				});
			},
			
			repairChange: function(e) {
				this.typeName = this.typeCds[e.detail.value];
				this.typeCd = this.repairIdAttr[e.detail.value];
			},
			dateChange:function(e){
				this.bindDate = e.detail.value;
			},
			timeChange:function(e){
				this.bindTime = e.detail.value;
			},
			_submitRepair: function(e) {
				let _that = this;
			let _userInfo = this.java110Context.getUserInfo();
			let storeId = _userInfo.storeId;
			
				let obj = {
					"repairName": this.repairName,
					"repairType": this.typeCd,
					"appointmentTime": this.bindDate + " " + this.bindTime + ":00",
					"tel": this.tel,
					"roomId": this.roomId,
					"photos": [],
					"context": this.context,
					"userId": _userInfo.userId,
					"communityId": _that.java110Context.getCurrentCommunity().communityId,
					"bindDate": this.bindDate,
					"bindTime": this.bindTime
				}
			
				let _photos = this.photos;
				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});
			
				let msg = "";
				if (obj.roomId == "") {
					msg = "请选择房屋";
				} else if (obj.repairType == "") {
					msg = "请选择报修类型";
				} else if (obj.repairName == "") {
					msg = "请填写报修人";
				} else if (obj.tel == "") {
					msg = "请填写手机号";
				} else if (obj.bindDate == "") {
					msg = "请选择预约日期";
				} else if (obj.bindTime == "") {
					msg = "请选择预约时间";
				} else if (obj.context == "") {
					msg = "请填写报修内容";
				}
				console.log(obj.roomId);
			
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					this.java110Context.request({
						url: this.java110Constant.url.saveOwnerRepair, //  http://hc.demo.winqi.cn:8012/appApi/ownerRepair.saveOwnerRepair 
						header: this.java110Context.getHeaders(),
						method: "POST",
						data: obj, //动态数据
						success: function(res) {
							if (res.statusCode == 200) {
								_that._tabSelect('10001');
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
			}
			
		}
	}
</script>

<style>

</style>
