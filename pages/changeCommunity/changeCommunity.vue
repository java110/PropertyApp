<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的小区名称" v-model="communityName" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_searchCommunity()">搜索</button>
			</view>
		</view>

		<view>
			<view class="padding">小区信息</view>
			<view class="cu-list menu ">
				<view class="cu-item" v-for="(item,sub) in communitys" :key="sub" @tap="_doChangeCommunity(item)">
					<view class="content padding-tb-sm">
						<view>
							<text class="lg  cuIcon-homefill text-blue margin-right-xs"></text> {{item.name}}
						</view>
						<view class="text-gray text-sm">
							<text class="lg text-gray cuIcon-location margin-right-xs"></text> {{item.address}}
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getCommunity
	} from '../../api/community/community.js'
	import mapping from '../../constant/mapping.js'
	export default {
		data() {
			return {
				communityName: '',
				communitys: []
			}
		},
		onLoad() {
			this.java110Context.onLoad();
			this._loadCommunitys();
		},
		methods: {
			_loadCommunitys: function() {
				let _that = this;
				let _condition = {
					name: this.communityName
				}
				getCommunity(true, _condition)
					.then(_communitys => {
						_that.communitys = _communitys;
						console.log('_communitys', _communitys);

					});
			},
			_searchCommunity: function() {
				this._loadCommunitys();
			},
			_doChangeCommunity: function(_community) {
				uni.setStorageSync(mapping.CURRENT_COMMUNITY_INFO, JSON.stringify(_community));
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>

</style>
