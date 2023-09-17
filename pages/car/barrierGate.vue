<template>
	<view>
		<view class="" v-if="!paId">
			<view class="block__title">选择停车场</view>
			<view v-if="parkingAreas && parkingAreas.length >0">
				<view class="cu-form-group arrow" v-for="(item,index) in parkingAreas" :key="index"
					@click="_chooseArea(item)">
					<view class="title">{{item.num}}</view>
					<text class='cuIcon-right'></text>
				</view>
			</view>
			<view v-else>
				<no-data-page></no-data-page>
			</view>
		</view>
		<view v-else>
			<view class="cu-bar bg-white  solid-bottom" style="justify-content: space-around;">
				<view class="action" @click="changeListType(0)">
					<text class="text-blue"
						:class="{'cuIcon-roundcheckfill' : currentPage == 0, 'cuIcon-roundcheck' : currentPage != 0}"></text>总控台
				</view>
				<view class="action" @click="changeListType(1)">
					<text class="text-blue"
						:class="{'cuIcon-roundcheckfill' : currentPage == 1, 'cuIcon-roundcheck' : currentPage != 1}"></text>出入场明细
				</view>
				<view class="action" @click="changeListType(2)">
					<text class="text-blue"
						:class="{'cuIcon-roundcheckfill' : currentPage == 2, 'cuIcon-roundcheck' : currentPage != 2}"></text>收费明细
				</view>
			</view>
			<view class="padding-sm" v-show="currentPage == 0">
				<barrier-gate-control ref="barrierGateControlRef"></barrier-gate-control>
			</view>
		</view>
	</view>
</template>

<script>
	import noDataPage from '../../components/no-data-page/no-data-page.vue';
	import {
		queryParkingAreas
	} from '../../api/car/carApi.js';
	import barrierGateControl from '../../components/car/barrier-gate-control.vue';
	export default {
		data() {
			return {
				paId: '',
				parkingAreas: [],
				currentPage:0,
			}
		},
		onLoad() {
			this._loadParkingArea();
		},
		components: {
			noDataPage,
			barrierGateControl
		},
		methods: {
			_loadParkingArea: function() {
				let _that = this;
				queryParkingAreas(this, {
					page: 1,
					row: 50,
					communityId: this.getCommunityId()
				}).then(_data => {
					_that.parkingAreas = _data.parkingAreas;
					if (_data.parkingAreas && _data.parkingAreas.length == 1) {
						_that._chooseArea(_data.parkingAreas[0]);
					}
				})
			},
			_chooseArea: function(_area) {
				let _that =this;
				this.paId = _area.paId;
				// #ifdef H5
					setTimeout(function(){
						_that.changeListType(0);
					},1000)
				// #endif
				// #ifndef H5
					_that.changeListType(0);
				// #endif
			},
			changeListType: function(e) {
				this.currentPage = e;
				if (e == 1) {
					
				} else if (e == 2) {
					
				}else{
					this.$refs.barrierGateControlRef._loadMachines(this.paId);
				}
			},
		}
	}
</script>

<style lang="scss">
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
</style>
