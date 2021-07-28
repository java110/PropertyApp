<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入单元编号" v-model="unitNum" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_searchUnit()">搜索</button>
			</view>
		</view>
		<view>
			<view class="padding">单元信息</view>
			<view class="cu-list menu ">
				<view class="cu-item" v-for="(item,sub) in units" :key="sub" @tap="_doChangeUnit(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="lg  cuIcon-homefill text-blue margin-right-xs"></text> {{item.unitNum}}单元</view>
						<view class="text-gray text-sm">
							<text class="lg text-gray cuIcon-location margin-right-xs"></text> {{item.unitId}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getCurrentCommunity} from '../../api/community/community.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				unitNum:'',
				floorId:'',
				communityId:'',
				units:[]
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.floorId = options.floorId;
			this.communityId = options.communityId;
			this._loadUnits();
		},
		methods: {
			//加载楼栋信息
			_loadUnits:function(){
				let _communityId = this.communityId;
				
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					floorId: this.floorId,
					unitNum:this.unitNum,
					communityId:getCurrentCommunity().communityId
				};
				
				
				this.java110Context.request({
					url: url.queryUnits,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon:'none',
								title:res.data
							});
							return;
						}
						let _data = res.data;
						_that.units = _data;
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
				
			},
			_searchUnit:function(){
				this._loadUnits();
			},
			_doChangeUnit:function(_unit){
				// let pages = getCurrentPages();
				// var prevPage = pages[pages.length - 2];
				// prevPage.unitId = _unit.unitId;
				// prevPage.unitNum = _unit.unitNum;
				this.java110Context.setParam("unitInfo",_unit);
				uni.navigateBack({
					delta:1
				});
			}
		}
	}
</script>

<style>

</style>
