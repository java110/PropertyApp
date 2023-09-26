<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入车牌号" v-model="carNumLike"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入业主名称" v-model="ownerName"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入成员车牌号" v-model="memberCarNumLike"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入车位编号" v-model="num"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入业主手机号" v-model="link"></input>
			</view>
			<view class="q-item-btn">
				<button class="cu-btn  line-blue round q-input" @click="_loadOwnerCar">搜索</button>
			</view>
		</view>
		
		<view class="margin-top" v-if="cars.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in cars"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{item.carNum}}</text>
					</view>
					<view class="flex justify-start" @click="_toTel(item.link)">
						<!-- <button class="cu-btn round sm line-black margin-left-sm"
							@tap="_toApplyDetail(item)">详情</button> -->
						<text class="text-blue cuIcon-dianhua photo_icon margin-right-xs"></text>{{item.ownerName}}/{{item.link}}
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>车位:</text>
						<text v-if="item.areaNum && item.state == '1001'">{{item.areaNum}}-{{item.num}}</text>
						<text v-else>车位已释放</text>
					</view>
					
					<view class="item">
						<text>状态:</text>
						<text>{{item.stateName}}</text>
					</view>
					<view class="item">
						<text>房屋号:</text>
						<text>{{item.roomName || '-'}}</text>
					</view>
					<view class="item">
						<text>车牌类型:</text>
						<text v-if="item.leaseType == 'T'">临时车</text>
						<text v-else>{{item.leaseTypeName}}</text>
					</view>
					<view class="item" v-if="item.leaseType == 'H'">
						<text>有效期:</text>
						<text>{{item.startTime}}~{{item.endTime}}</text>
					</view>
		
				</view>
			</view>
		</view>
	</view>
</template>

<script >
	import {queryOwnerCars} from '../../api/car/carApi.js';
	export default {
		data() {
			return {
				carNumLike:'',
				num:'',
				ownerName:'',
				link:'',
				memberCarNumLike:'',
				cars:[]
			}
		},
		onLoad() {
			this._loadOwnerCar();
		},
		methods: {
			_loadOwnerCar:function(){
				let _that =this;
				queryOwnerCars(this,{
					page:1,
					row:15,
					communityId:this.getCommunityId(),
					carNumLike:this.carNumLike,
					num:this.num,
					ownerName:this.ownerName,
					link:this.link,
					memberCarNumLike:this.memberCarNumLike,
					carTypeCds:"1002,1001"
				}).then(_data=>{
					_that.cars = _data.data;
				})
			},
			_toTel:function(_tel){
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _tel,
				
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				
				});
			}
			
		}
	}
</script>

<style lang="scss">
.q-query {
		background-color: #FFF;
		padding: 15upx;

		.q-item {
			width: 30%;
			margin-left: 15upx;
			padding: 10upx 15upx;
			border-radius: 15upx;
			background-color: #f1f1f1;

			.q-input {
				height: 40upx;
			}

			margin-bottom: 15upx;
		}

		.q-item-btn {
			width: 30%;
			margin-left: 15upx;

			.q-input {
				height: 60upx;
			}
		}
	}
	.apply-title {
		height: 60upx;
		line-height: 50upx;
		border-bottom: 1upx solid #F1F1F1;
	}
	
	.apply-content {
		.item {
			width: 50%;
			margin-top: 20upx;
		}
	}
	
	.radius-sm {
		border-radius: 16upx;
	}
</style>
