<template>
	<view>
		<view class="cu-form-group arrow margin-top">
			<view class="title">动作</view>
			<picker bindchange="PickerChange" :value="actionIndex" :range-key="'label'" :range="actions"
				@change="selectChange($event)">
				<view class="picker">
					{{actions.length==0 ? "请选择" : actions[actionIndex].label}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top-xs">
			<textarea v-model="audit.auditMessage" placeholder="请输入处理意见"></textarea>
		</view>
		<view class="cu-form-group arrow margin-top-xs" v-if="audit.auditCode == '1100' && nextAudit.assignee == '-2'">
			<view class="title">下一处理人</view>
			<pickerStaffs @change="changeStaff" class="text-right" style="width:80%">{{audit.staffName}}</pickerStaffs>
			<text class='cuIcon-right'></text>
		</view>
		<view class="cu-form-group arrow margin-top-xs" v-if="audit.auditCode == '1300'">
			<view class="title">下一处理人</view>
			<pickerStaffs @change="changeStaff" class="text-right" style="width:80%">{{audit.staffName}}</pickerStaffs>
			<text class='cuIcon-right'></text>
		</view>

		<view class="button_up_blank"></view>
		<view class="flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="_doSubmit()">提交</button>
		</view>
	</view>
</template>

<script>
	import pickerStaffs from '../../components/pickerStaffs/pickerStaffs.vue';
	import {
		queryNextDealUser,
		auditUndo
	} from '../../api/oa/oa.js';
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				taskId: '',
				flowId: '',
				id: '',
				actionIndex: 0,
				business:'',
				startUserId:'',
				actions: [],
				audit: {
					auditCode: '1100',
					auditMessage: '',
					staffId: '',
					staffName: '请选择',
					taskId: ''
				},
				nextAudit: {}
			}
		},
		components: {
			pickerStaffs
		},
		onLoad(option) {
			this.taskId = option.taskId;
			this.flowId = option.flowId;
			this.id = option.id;
			this.business = option.business;
			this.startUserId = option.startUserId;
			this._getNextTask();
		},
		methods: {
			selectChange: function(e) {
				this.actionIndex = e.target.value //取其下标
				let selected = this.actions[this.actionIndex] //获取选中的数组
				if (selected == undefined) {
					return;
				}
				this.audit.auditCode = selected.value //选中的id
			},
			changeStaff: function(data) {
				console.log(data);
				if (data.data.length < 3) {
					return;
				}

				this.audit.staffId = data.data[2].code;
				this.audit.staffName = data.data[2].name;
			},
			_doSubmit: function() {
				let _audit = this.audit;
				_audit.flowId = this.flowId;
				_audit.id = this.id;
				_audit.taskId = this.taskId;
				/**
				 * assigness 
				 *  -1 表示 下一个节点为 结束节点
				 *  -2 表示 需要指定依稀处理人
				 *  其他表示 下一指定人ID
				 * 
				 */
				if (this.nextAudit.assignee != '-2') {
					_audit.staffId = this.nextAudit.assignee;
				}
				if (!_audit.auditCode) {
					vc.toast('请选择状态');
					return;
				}
				if (!_audit.auditMessage) {
					vc.toast('请填写说明');
					return;
				}
				if (_audit.auditCode != '1200' && _audit.auditCode != '1400' && !_audit.staffId) {
					vc.toast('请选择下一节点处理人');
					return;
				}
				let _url = this.getUndoUrl();
				auditUndo(this,_url, _audit).then(_data => {
					if (_data.data.code == 0) {
						uni.showToast({
							title: "提交成功",
							icon: 'none',
							duration: 2000
						})
						uni.navigateBack({
							delta: 2
						})
						return;
					}
					uni.showToast({
						title: _data.data.msg,
						icon: 'none',
						duration: 2000
					})
				})
			},
			getUndoUrl:function(){
				let _url = '';
				if(!this.business){
					return _url;
				}
				
				if(this.business == 'purchaseApply'){
					return url.saveMyAuditOrders;
				}
				if(this.business == 'itemOut'){
					return url.saveMyAuditOrders;
				}
				if(this.business == 'allocation'){
					return url.saveAuditAllocationStoreOrder;
				}
				return _url;
				
			},
			_getNextTask: function() {
				let _that = this;
				queryNextDealUser(this, {
					taskId: this.taskId,
					flowId: this.flowId,
					startUserId:this.startUserId,
					id: this.id
				}).then(_data => {
					console.log(_data);
					let data = _data[0];
					_that.nextAudit = data;
					if (data.hasOwnProperty("next")) {
						_that.actions.push({
							label: '办理',
							value: '1100'
						});
					}
					if (data.hasOwnProperty("back")) {
						_that.actions.push({
							label: '退回',
							value: '1200'
						});
					}
					if (data.hasOwnProperty("backIndex")) {
						_that.actions.push({
							label: '退回至提交者',
							value: '1400'
						});
					}
					if (data.hasOwnProperty("exit")) {
						_that.actions.push({
							label: '结束',
							value: '1500'
						});
					}
					_that.actions.push({
						label: '转单',
						value: '1300'
					});
				})
			}

		}
	}
</script>

<style>
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
</style>
