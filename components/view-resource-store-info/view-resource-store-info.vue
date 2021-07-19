<template>
	<view class="select-single-resource">
		<view class="cu-bar bg-white search ">
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_openChooseResourceModel()">选择物品</button>
			</view>
		</view>
		<view class="margin-top">
			<view class="cu-list menu-avatar " v-for="(item,index) in resourceList" :key="index">
				<view class="cu-item" style="height: 160rpx;">
					<view class="content content-left" style="width: 100%;">
						<view class="text-grey">
							<text class="ellip">{{item.resName}}-{{item.rstName}}</text>
							<text class="item-remove bg-red text-df" @click="_removeItem(index, item.resId)">移除</text>
						</view>
						<view class="text-gray flex">
							<view class="flex-item w50">
								<label>数量:</label>
								<input class="use-number bg-gray" type="number" v-model="item.quantity" value="" />
							</view>
							<!-- <view class="flex-item w50" v-show="resOrderType == '10000'">
								<label>供应商:</label>
								<picker :value="suppliersList[index]" :range="resourceSuppliers" :range-key="'supplierName'" @change="_resourceSuppliersChange(index,$event)">
									<view class="picker">
										{{resourceSuppliers[suppliersList[index]].supplierName}}
									</view>
								</picker>
							</view> -->
						</view>
						<view class="text-gray flex" style="margin: 10rpx 0;">
								<label>备注:</label>
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
			}
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
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
		width: 100rpx;
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
</style>
