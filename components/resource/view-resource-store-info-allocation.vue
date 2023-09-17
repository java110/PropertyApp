<template>
	<view class="select-single-resource">
		<view class="resource-header flex justify-between bg-white">
			<view class="text-bold">调拨物品</view>
			<view>
				<button class="cu-btn line-blue sm round" @tap="_openChooseResourceModel()">选择物品</button>
			</view>
		</view>
		<view class="">
			<view class="resource-item bg-white" v-for="(item,index) in resourceList" :key="index">
				<view class=" " style="">
					<view class=" flex-around">
						<text class="ellip text-df">{{item.resName}}({{item.parentRstName}}>{{item.rstName}})</text>
						<text class="item-remove line-red text-df" @click="_removeItem(index, item.resId)">移除</text>
					</view>
					<view class=" flex-around">
						<label class="text-df">当前仓库:</label>
						<text>{{item.shName}}</text>
					</view>
					<view class=" flex-around">
						<label class="text-df">价格:</label>
						<picker :range="item.times" :range-key="'price'" @change="timesChange($event, index)">
							<view>{{item.selectedTimesIndex <0?'请选择': item.times[item.selectedTimesIndex].price}}  ></view>
						</picker>
					</view>
					<view class=" flex-around">
						<label class="text-df">当前库存:</label>
						<text class="text-df">{{_getTimesStock(item)}}{{item.unitCodeName}}</text>
					</view>
					<view class=" flex-around">
						<label class="text-df">调拨数量:</label>
						<input class="  text-right" type="number" v-model="item.curStock" placeholder="请输入数量"
							placeholder-class="text-grey text-df" value="" />
					</view>
					<view class=" flex-around">
						<label class="text-df">目标仓库:</label>
						<picker  :range="storeHouses" :range-key="'shName'" @change="_storeHousesChange($event,index)">
							<view class="picker">
								{{item.selectedShzIndex <0?'请选择': storeHouses[item.selectedShzIndex].shName}}
							</view>
						</picker>
					</view>
					
					<view class=" flex-around">
						<label class="text-df">备注:</label>
						<input class="  text-right" type="text" placeholder="选填,请输入备注"
							placeholder-class="text-grey text-df" v-model="item.remark" value="" />
					</view>
				</view>
			</view>
		</view>
		<select-resource @getResourceInfo="_getResourceInfo" ref="selectresource" :resOrderType="resOrderType"></select-resource>
	</view>
</template>

<script>
	import {
		listStoreHouses
	} from '../../api/resource/resource.js'
	import selectResource from '../resource/select-resource.vue'
	import {getCurrentCommunity} from '../../api/community/community.js'
	
	export default {
		name:"viewResourceStoreInfoAllocation",
		components: {
			selectResource
		},
		data() {
			return {
				resourceList: [],
				supplierIndex: 0,
				storeHouses: [
					{
						shId: '',
						shName: '请选择'
					}
				],
				selectedStoreHousesList: []
			}
		},
		props: {
			resOrderType: {
				type: String
			},
			shId: {
				type: String
			},
		},

		mounted() {
			this._loadResourceStoreHouses();
		},

		methods: {
			
			_openChooseResourceModel: function(){
				this.$refs.selectresource.switchShow(this.shId);
			},
			
			_loadResourceStoreHouses: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					//communityId: getCurrentCommunity().communityId,
					isShow: true
				};
				listStoreHouses(this, _data)
					.then(function(res) {
						res.data.forEach(item=>{
							if(item.shId != _that.shId){
								_that.storeHouses.push(item);
							}
						})
					});
			},
			
			
			
			_getResourceInfo: function(list){
				this.resourceList = list;
				this.resourceList.forEach((item) => {
					item.timesId = '';
					if (item.times && item.times.length > 0) {
						item.timesId = item.times[0].timesId;
						item.selectedTimesIndex = 1;
						item.selectedTimesStock = 1;
					} else {
						item.selectedTimesIndex = 0;
						item.selectedTimesStock = 0;
					}
					item.selectedShzIndex = 0;
					item.times.unshift({
						timesId: '',
						price: '请选择'
					})
				})
			},
			
			getResourceStores: function(){
				this.$emit('getResourceStores', this.resourceList);
			},
			
			_removeItem: function(index, resId){
				this.resourceList.splice(index, 1);
				// 通知子组件 取消选中checkbox
				this.$refs.selectresource.removeSelectedItem(resId);
			},
			_storeHousesChange: function(e, index) {
				let timeIndex = e.target.value;
				this.resourceList[index].selectedShzIndex = timeIndex;
				if (timeIndex == 0) {
					this.resourceList[index].shzId = '';
				} else {
					this.resourceList[index].shzId = this.storeHouses[timeIndex].shId;
				}
				this.$forceUpdate();
			},
			timesChange: function(e, index) {
				let timeIndex = e.target.value;
				this.resourceList[index].selectedTimesIndex = timeIndex;
				if (timeIndex == 0) {
					this.resourceList[index].timesId = '';
					this.resourceList[index].selectedTimesStock = 0;
				} else {
					this.resourceList[index].timesId = this.resourceList[index].times[timeIndex].timesId;
					this.resourceList[index].selectedTimesStock = this.resourceList[index].times[timeIndex].stock;
				}
				this.$forceUpdate();
			},
			_getTimesStock: function(_resourceStore) {
				if (!_resourceStore.timesId) {
					return "-";
				}
				let _stock = 0;
				_resourceStore.times.forEach(_item => {
					if (_item.timesId == _resourceStore.timesId) {
						_stock = _item.stock;
					}
				});
				if (!_resourceStore.quantity) {
					_resourceStore.quantity = '';
				}
				return _stock;
			}
		}
	}
</script>

<style lang="scss">
	.item-remove {
		border-radius: 15rpx;
		padding: 2rpx 10rpx;
	}
	.resource-header {
		margin-top: 30upx;
		padding: 20upx
	}

	.resource-item {
		margin-top: 2upx;
		padding:20upx;
		.flex-around {
			display: flex;
			justify-content: space-between;
			margin-top: 15upx;
		}
	}
</style>
