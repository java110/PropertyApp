<template>
	<view>
		<view class="index-undo">
			<view class="undo-title">
				<text class="text-bold">其他类</text>
			</view>
			<view class="undo-menu flex justify-start flex-wrap">
				<view class="menu-item" v-for="(item,index) in others" :key="index" @click="_toPage(item)">
					<view style="position: relative;">
						<view class="item-value"><text>{{item.value}}</text></view>
						<view class="item-name"><text>{{item.name}}</text></view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {queryOthersDataReport} from '@/api/report/feeReport.js'
	export default {
		name:"otherDataReport",
		data() {
			return {
				others:[]
			};
		},
		methods:{
			_loadOtherData:function(startDate,endDate){
				let _that = this;
				queryOthersDataReport(this,{
					communityId:this.getCommunityId(),
					startDate:startDate,
					endDate:endDate
				}).then(_data=>{
					_that.others = _data.data;
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.index-undo {
		background-color: #ffffff;

		.undo-title {
			padding: 20upx;
			border-bottom: 1upx solid #F1F1F1;
		}
		
		.undo-menu{
			padding:20upx;
			.menu-item{
				
				width: 33.33%;
				padding: 30upx;
				text-align: center;
				.item-name{
					color:#777 ;
					margin-top: 10upx;
				}
				.item-value{
					color: #F28A4A;
					font-size: 32upx;
				}
				border-bottom: 1upx solid #F1F1F1;
				border-right: 1upx solid #F1F1F1;
			}
			.menu-item:nth-child(3n+3) {
			    border-right: none;
			}
			.menu-item:nth-child(n+4) {
				border-bottom: none;
			}
		}
	}
</style>