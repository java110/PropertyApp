<template>
	<view>
		<view class="" v-if="inouts.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in inouts"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{item.carNum}}({{item.stateName}})</text>
					</view>
					<view class="flex justify-start">
						<!-- <button  class="cu-btn sm bg-red " @click="_deleteOwnerMember(item)">删除</button> -->
						{{item.hours}}小时{{item.min}}分钟
					</view>
				</view>
				<view class="apply-content flex justify-start">
					<view class="item">
						<image :src="item.photoJpg || noFace" ></image>
					</view>
					<view class="margin-left">
						<view class="item">
							<text>停车场:</text>
							<text>{{item.areaNum}}</text>
						</view>
						<view class="item">
							<text>车牌类型:</text>
							<text>{{item.carTypeName}}</text>
						</view>
						
						<view class="item">
							<text>进场时间:</text>
							<text>{{item.inTime}}</text>
						</view>
						<view class="item" v-if="item.carInout == '3307'">
							<text>出场时间:</text>
							<text >{{item.outTime}}</text>
						</view>
						<view class="item" v-if="item.carInout == '3307' && item.carType == 'T'">
							<text>停车费:</text>
							<text >{{item.payCharge}}</text>
						</view>
						<view class="item">
							<text>说明:</text>
							<text>{{item.remark}}</text>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import {getCarInoutDetail} from '../../api/car/carApi.js';
	import noDataPage from '../no-data-page/no-data-page.vue';
	import conf from '../../conf/config.js';
	
	export default {
		name:"barrierControlInouts",
		data() {
			return {
				inouts:[],
				paId:'',
				noFace:''
			};
		},
		methods:{
			_loadInouts:function(_paId){
				this.noFace = conf.commonBaseUrl+"/img/noPhoto.jpg";
				let _that =this;
				getCarInoutDetail(this,{
					page:1,
					row:50,
					communityId:this.getCommunityId(),
					paId:this.paId
				}).then(_data=>{
					_that.inouts = _data.data;
				})
			}
		}
	}
</script>

<style lang="scss">
.apply-title {
		height: 60upx;
		line-height: 50upx;
		border-bottom: 1upx solid #F1F1F1;
	}
	
	.apply-content {
		.item {
			//width: 50%;
			margin-top: 20upx;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
			}
		}
	}
	
	.radius-sm {
		border-radius: 16upx;
	}
</style>