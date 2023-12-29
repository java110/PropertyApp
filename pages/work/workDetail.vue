<template>
	<view>
		<view class="flex justify-between">
			<view class="block__title">工作单详情</view>
			<view class="" style="padding: 32rpx 30rpx 20rpx;" v-if="staffId == workTaskDetailInfo.createUserId">
				<button class="cu-btn round sm line-blue margin-left-sm" @tap="_toEditWork()">修改</button>
				<button class="cu-btn round sm line-red margin-left-sm" @tap="_openDeleteWork()">删除</button>
			</view>
		</view>
		<view class="cu-list menu ">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">工单编号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.workId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">工单名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.workName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">类型名称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.typeName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">标识</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.workCycle == '1001'?'一次性工单':'周期性工单'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">时间段</text>
				</view>
				<view class="action">
					<text
						class="text-grey text-sm">{{workTaskDetailInfo.startTime}}~{{workTaskDetailInfo.endTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">发起人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.createUserName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">处理人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.curStaffName || '-'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">抄送人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.curCopyName || '-'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.stateName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">创建时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.createTime}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="workTaskDetailInfo.pathUrl">
				<view class="content">
					<text class="text-grey">附件</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm" @click="_downloadFile(workTaskDetailInfo.pathUrl)">下载</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">内容</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{workTaskDetailInfo.content}}</text>
				</view>
			</view>
		</view>

		<view class="cu-timeline margin-top" v-if="events && events.length>0">
			<view class="cu-time">流转</view>
			<view class="cu-item " v-for="(item,index) in events" :key="index">
				<view class="bg-cyan content">
					<text>{{item.staffName}} </text> 在 {{item.createTime}} 处理任务
				</view>
				<view class="bg-cyan content">
					<text>处理意见：</text> {{item.remark}}
				</view>
			</view>
		</view>

		<view v-if="files && files.length>0">
			<view class="block__title">附件</view>
			<view class="cu-list menu ">
				<view class="cu-item" v-for="(file,index) in files" :key="index">
					<view class="content">
						<text class="text-grey">{{file.staffName}}</text>
					</view>
					<view class="action" v-if="file.pathUrl">
						<text class="text-grey text-sm" @click="_downloadFile(file.pathUrl)">下载</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="delWorkDetailFlag==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">温馨提示</view>
					<view class="action" @tap="_cancleCall()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认删除工作单？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action margin-0 flex-sub  solid-left" @tap="_cancleDelete()">取消</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="_doDeleteWork()">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import url from '../../constant/url.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js';
	import {getStaffId} from '@/api/staff/staff.js'
	import {
		getWorkPool,
		getWorkEvent,
		getWorkPoolFile,
		deleteWorkPool
	} from '@/api/oa/workApi.js';
	export default {
		data() {
			return {
				viewImage: false,
				viewImageSrc: '',
				workTaskDetailInfo: {},
				workId: '',
				taskId: '',
				events: [],
				files: [],
				delWorkDetailFlag: false,
				staffId:'',
				
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.workId = options.workId;
			this.taskId = options.taskId;
			this.srcPath = url.hcBaseUrl;
			this.staffId = getStaffId();
			this._queryWorkDetail();
			this._queryWorkEvent();
			this._queryWorkFiles();
		},
		methods: {
			_queryWorkDetail: function() {
				let _that = this;
				getWorkPool(this, {
					page: 1,
					row: 1,
					workId: this.workId,
					taskId: this.taskId
				}).then(_data => {
					_that.workTaskDetailInfo = _data.data[0];
				})
			},
			_queryWorkEvent: function() {
				let _that = this;
				getWorkEvent(this, {
					page: 1,
					row: 100,
					workId: this.workId,
					taskId: this.taskId
				}).then(_data => {
					_that.events = _data.data;
				})
			},
			_queryWorkFiles: function() {
				let _that = this;
				getWorkPoolFile(this, {
					page: 1,
					row: 100,
					workId: this.workId,
					taskId: this.taskId
				}).then(_data => {
					_that.files = _data.data;
				})
			},
			_toEditWork: function() {
				uni.navigateTo({
					url: '/pages/work/editWrok?workId=' + this.workId
				});
			},
			_openDeleteWork: function() {
				this.delWorkDetailFlag = true;
			},
			_doDeleteWork: function() {
				let _that = this;
				deleteWorkPool(this, {
					workId : this.workId,
				}).then(_data => {
					uni.navigateBack({
						delta:2
					});
				})
			},
			_cancleDelete:function(){
				this.delWorkDetailFlag = false;
			},
			_downloadFile: function(_url) {
				uni.downloadFile({
					url: _url, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {

							let tempFile = res.tempFilePath;
							//保存成功之后 打开文件
							uni.getFileSystemManager().saveFile({
								tempFilePath: tempFile,
								// filePath: wx.env.USER_DATA_PATH + '/' + '上传成员.pdf',//自定义文件名
								success(res) {
									uni.showToast({
										icon: 'none',
										title: '保存成功'
									})
									return;
								}
							})
						}
					}
				});
			}

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
</style>