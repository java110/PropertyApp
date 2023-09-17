<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<input type="text" placeholder="输入楼栋-单元-房屋" v-model="roomName" confirm-type="search"></input>
			</view>
			<view class="q-item">
				<input type="text" placeholder="输入业主名称" v-model="ownerName" confirm-type="search"></input>
			</view>
			<view class="q-item">
				<input type="text" placeholder="输入手机号" v-model="link" confirm-type="search"></input>
			</view>
			<view class="q-item-btn flex justify-start">
				<button class="cu-btn  line-blue round q-input" @click="_queryOwner">搜索</button>
				<button class="cu-btn  line-blue margin-left-sm round q-input" @click="_addOwner">添加</button>
			</view>
		</view>
		
		<view class="margin-top" v-if="owners.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in owners"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{item.name}}</text>
					</view>
					<view class="flex justify-start">
						{{item.ownerTypeName}}
					</view>
				</view>
				<view class="apply-content flex justify-start">
					<view class="item">
						<image :src="item.url || noFace" ></image>
					</view>
					<view class="margin-left">
						<view class="item">
							<text>手机号:</text>
							<text>{{item.link}}</text>
						</view>
						<view class="item" v-if="item.roomName">
							<text>房屋:</text>
							<text>{{item.roomName}}</text>
						</view>
						<view class="item">
							<text>身份证:</text>
							<text>{{item.idCard}}</text>
						</view>
						<view class="item">
							<text>地址:</text>
							<text>{{item.address || '-'}}</text>
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
	import noDataPage from '../../components/no-data-page/no-data-page.vue';
	import {queryOwnerAndMembers} from '../../api/owner/owner.js';
	import conf from '../../conf/config.js';
	export default {
		data() {
			return {
				roomName:'',
				ownerName:'',
				link:'',
				owners:[],
				noFace:''
			}
		},
		onLoad() {
			this._queryOwner();
			this.noFace = conf.commonBaseUrl+"/img/noPhoto.jpg";
		},
		methods: {
			_queryOwner:function(){
				let _that = this;
				queryOwnerAndMembers(this,{
					page:1,
					row:50,
					name:this.ownerName,
					link:this.link,
					communityId:this.getCommunityId(),
					roomName:this.roomName
				}).then(_data=>{
					_that.owners = _data.data;
				})
			},
			_addOwner:function(){
				uni.navigateTo({
					url:'/pages/owner/addOwner'
				})
			}
		}
	}
</script>

<style lang="scss">
	.q-query {
		background-color: #FFF;
		padding: 15upx;

		.q-item {
			width: 45%;
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
			//width: 30%;
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
