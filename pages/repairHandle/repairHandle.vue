<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">维修师傅</view>
			<picker bindchange="PickerChange" :value="index" :range="staffCloums" @change="staffChange">
				<view class="picker">
					{{roomName?roomName:'请选择'}}
				</view>
			</picker>
		</view>
		
		<view class="cu-form-group margin-top">
			<textarea v-model="context" placeholder="请输入报修内容"></textarea>
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
				<view class="bg-img" v-for="(img,index) in imgList" bindtap="ViewImage" :data-url="imgList[index]">
					<image :src='imgList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" @tap="deleteImage(index)" :data-index="index">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-direction margin-top">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="submitRepair()">提交</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffCloums:[],
				action:'',
				repairId:'',
				repairType:'',
				imgList:[]
				
			}
		},
		onLoad(options) {
			this.action = options.action;
			this.repairId = options.repairId;
			this.repairType=options.repairType;
			this._loadRepairStaff();
		},
		methods: {
			
			_loadRepairStaff:function(){
				let _that = this;
				let _data={
					repairType:this.repairType,
					communtiyId:this.java110Context.getCurrentCommunity().communityId,
					page:1,
					row:50
				}
				this.java110Context.request({
					url: _that.java110Constant.url.listRepairStaffs,
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
						_that.staffCloums = _data;
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
			
		}
	}
</script>

<style>

</style>
