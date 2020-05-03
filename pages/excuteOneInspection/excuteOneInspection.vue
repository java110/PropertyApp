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
				patrolIndex:0
			}
		},
		onLoad(option) {
			this.taskDetailId = option.taskDetailId;
			this.taskId = option.taskId;
			this.inspectionId = option.inspectionId;
			this.inspectionName = option.inspectionName;
		},
		methods: {
			patrolChange:function(e){
				this.patrolTypeName = this.patrols[e.detail.value];
				this.patrolType = this.patrolTypes[e.detail.value];
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
