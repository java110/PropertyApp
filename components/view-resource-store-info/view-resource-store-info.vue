<template>
	<view class="select-single-resource">
		<view class="cu-bar bg-white search ">
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_openChooseResourceModel()">选择物品</button>
			</view>
		</view>
		<view class="margin-top">
			<view class="cu-list menu-avatar " v-for="(item,index) in resourceList" :key="index">
				<view class="cu-item" style="height: 300rpx;">
					<view class="content content-left" style="width: 100%;">
						<view class="text-grey flex-around">
							<text class="ellip text-df">{{item.resName}}({{item.parentRstName}}>{{item.rstName}})</text>
							<text class="item-remove bg-red text-df" @click="_removeItem(index, item.resId)">移除</text>
						</view>
						<view class="text-gray flex-around">
							<label class="text-df">价格:</label>
							<picker :range="item.times" :range-key="'price'" @change="timesChange($event, index)">
								<view>{{item.times[item.selectedTimesIndex].price}}</view>
							</picker>
						</view>
						<view class="text-gray flex-around">
							<label class="text-df">库存:</label>
							<text class="text-df">{{_getTimesStock(item)}}{{item.unitCodeName}}</text>
						</view>
						<view class="text-gray flex-around">
							<label class="text-df">数量:</label>
							<input class="use-number bg-gray" type="number" v-model="item.quantity" :placeholder="item.unitCodeName" placeholder-class="text-grey text-df" value="" />
						</view>
						<view class="text-gray flex-around" style="margin: 10rpx 0;">
							<label class="text-df">备注:</label>
							<input class="remark bg-gray" type="text" v-model="item.remark" value="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<select-resource @getResourceInfo="_getResourceInfo" ref="selectresource" :resOrderType="resOrderType" :shType="shType"></select-resource>
	</view>
</template>

<script>
	import {
		queryResourceSupplier,
		queryRepairInfo
	} from '../../api/resource/resource.js'
	import selectResource from '../select-resource/select-resource.vue'
	
	export default {
		components: {
			selectResource
		},
		data() {
			return {
				resourceList: [],
				supplierIndex: 0,
				resourceSuppliers: [
					{
						supplierName: '请选择'
					}
				],
				suppliersList: [],
			}
		},
		props: {
			resOrderType: {
				type: String
			},
			shType: {
				type: String
			}
		},
		
		watch: {
		},
		
		created() {
		},
		
		computed: {
		},

		mounted() {
			// this._loadResourceSuppliers();
		},

		methods: {
			
			_openChooseResourceModel: function(){
				this.$refs.selectresource.switchShow();
			},
			
			_loadResourceSuppliers: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 100
				};
				queryResourceSupplier(this, _data)
					.then(function(res) {
						_that.resourceSuppliers = _that.resourceSuppliers.concat(res.data);
					});
			},
			
			_resourceSuppliersChange: function(i, e) {
				this.$set(this.suppliersList, i, e.target.value)
				this.resourceList[i].rsId=this.resourceSuppliers[this.suppliersList[i]].rsId
			},
			
			_getResourceInfo: function(list){
				this.resourceList = list;
				this.resourceList.forEach((item)=>{
					item.timesId = '';
					item.selectedTimesIndex = 0;
					item.selectedTimesStock = 0;
					item.times.unshift({timesId: '', price: '请选择'})
					this.suppliersList.push(0);
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
			
			timesChange: function(e, index){
				let timeIndex = e.target.value;
				this.resourceList[index].selectedTimesIndex = timeIndex;
				if(timeIndex == 0){
					this.resourceList[index].timesId = '';
					this.resourceList[index].selectedTimesStock = 0;
				}else{
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

<style>
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 0;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
	
	.flex-item{
		display: flex;
		flex-direction: row;
	}
	.w50{
		width: 50%;
	}
	.flex label, .flex-item label{
		width: 150rpx;
	}
	.use-number{
		width: 200rpx;
		border-radius: 15rpx;
	}
	.remark{
		width: 80%;
		border-radius: 15rpx;
	}
	.item-remove{
		border-radius: 15rpx;
		padding: 2rpx 10rpx;
	}
	.flex-around{
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	}
</style>
