<template>
	<view>
		<view class="block__title">保养{{machineName}}</view>
		<form>
			<view class="" v-for="(item,index) in titles" :key="index">
				<view class="block__title">{{item.itemTitle}}</view>
				<radio-group class="block" @change="radioChange($event,item)" v-if="item.titleType == '1001'">
					<view class="cu-form-group" v-for="(valueItem,valueIndex) in item.titleValues"
						:key="valueIndex">
						<view class="title">{{valueItem.itemValue}}</view>
						<radio :class="item.radio==valueItem.itemValue?'checked':''"
							:checked="item.radio==valueItem.itemValue?true:false" :value="valueItem.itemValue">
						</radio>
					</view>
				</radio-group>
				<checkbox-group class="block" @change="checkboxChange($event,item)" v-else-if="item.titleType == '2002'">
					<view class="cu-form-group " v-for="(valueItem,valueIndex) in item.titleValues" :key="valueIndex">
						<view class="title">{{valueItem.itemValue}}</view>
						<checkbox :class="item.radio[valueIndex].selected == '1'?'checked':''"
							:checked="item.radio[valueIndex].selected == '1'?true:false" :value="valueItem.itemValue">
						</checkbox>
					</view>
					<!--:checked="item.radio[valueIndex].checked?true:false"-->
				</checkbox-group>
				<view v-else>
					<view class="cu-form-group ">
						<textarea maxlength="512" v-model="item.radio" placeholder="请回答"></textarea>
					</view>
				</view>
			</view>
			
			<uploadImageAsync ref="vcUploadRef" :communityId="communityId" :maxPhotoNum="uploadImage.maxPhotoNum" :canEdit="uploadImage.canEdit" :title="uploadImage.imgTitle" @sendImagesData="sendImagesData" style="margin-top: 30rpx;"></uploadImageAsync>
		</form>
				
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="$preventClick(_submitExcuteMaintainance)">提交</button>
		</view>
		
	</view>
</template>

<script>
	import conf from '../../conf/config.js'
	import {preventClick} from '../../lib/java110/utils/common.js';
	import {queryDictInfo,queryMaintainanceItemTitle,updateMaintainanceTaskDetail} from '@/api/maintainance/maintainance.js';
	import {getCurrentCommunity} from '../../api/community/community.js'
	import url from '../../constant/url.js'
	import uploadImageAsync from "../../components/vc-upload-async/vc-upload-async.vue";
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				taskId:'',
				taskDetailId:'',
				machineId:'',
				machineName:'',
				pointStartTime: '',
				pointEndTime: '',
				patrolIndex:0,
				patrolType:'10001',
				patrolTypeName:'请选择',
				description:'',
				photos:[],
				imgList:[],
				communityId:'',
				userId:'',
				userName:'',
				titles: [],
				standardId:'',
				mapKey:'',
				uploadImage: {
					maxPhotoNum: 4,
					imgTitle: '保养图片',
					canEdit: true
				}
			}
		},
		
		components: {
			uploadImageAsync
		},
		
		onLoad(option) {
			this.java110Context.onLoad();
			let that = this;
			this.taskDetailId = option.taskDetailId;
			this.taskId = option.taskId;
			this.machineId = option.machineId;
			this.machineName = option.machineName;
			this.standardId = option.standardId;
			this.communityId = getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			this._loadMaintainanceItem();
		},
		methods: {
			sendImagesData: function(e){
				this.photos = [];
				if(e.length > 0){
					e.forEach((img) => {
						this.photos.push(img.fileId);
					})
				}
			},
			_loadMaintainanceItem:function(){
				let that = this;
				queryMaintainanceItemTitle(this,{
						communityId: that.communityId,
						standardId: that.standardId,
						page: 1,
						row: 100
					})
					.then(_data => {
						_data.forEach(item => {
							if (item.titleType == '1001') {
								item.radio = ''
							} else if (item.titleType == '2002') {
								// checked: false
								item.radio = [];
								item.titleValues.forEach(value => {
									item.radio.push({
										checked: false,
										itemValue: value.itemValue,
										selected: '0'
									})
								})
							} else {
								item.radio = ''
							}
						})
						that.titles = _data;
					})
			},
			_submitExcuteMaintainance: function() {
				let _that = this;
				
				this.description = '';
				this.titles.forEach(item=>{
					let _itemValue = ''
					if(item.titleType == '2002'){
						item.radio.forEach(_radio => {
							if (_radio.selected == '1') {
								_itemValue += (_radio.itemValue+',')
							}
						})
						this.description +=(item.itemTitle+':'+_itemValue+';')
					}else{
						this.description +=(item.itemTitle+':'+item.radio+';')
					}
				})
	
				updateMaintainanceTaskDetail(this,{
					"taskId": this.taskId,
					"taskDetailId": this.taskDetailId,
					"machineId": this.machineId,
					"machineName": this.machineName,
					"communityId": this.communityId,
					"description":this.description,
					"photos": this.photos,
					"userId": this.userId,
					"userName": this.userName,
					"latitude": this.latitude,
					"longitude": this.longitude
				}).then(_data=>{
					wx.showToast({
						title: _data.msg,
						icon: 'none',
						duration: 2000
					})
					if(_data.code == 0){
						uni.navigateBack({
							delta:1
						})
						return ;
					}
				})
			},
			radioChange: function(e, item) {
				console.log(e, item)
				item.radio = e.detail.value;
				console.log('item.radio', item.radio, e)
			},
			checkboxChange: function(e, item) {
				item.radio.forEach(value => {
					value.selected = '0';
					value.checked = false;
				})
				item.radio.forEach(value => {
					e.detail.value.forEach(_dValue =>{
						if (value.itemValue == _dValue) {
							if (value.selected == '0') {
								value.selected = '1';
								value.checked = true;
							}
						}
					})
				})
				console.log('item.radio', item.radio, e)
			},
			
		}
	}
</script>

<style>
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	}

</style>