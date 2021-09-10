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
		<view class="cu-form-group arrow margin-top-xs">
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
	import pickerStaffs from '../../components/pickerStaffs/pickerStaffs.vue'
	export default {
		data() {
			return {
				taskId: '',
				flowId: '',
				id: '',
				actionIndex: 0,
				actions: [{
					label: '办理',
					value: '1100'
				}, {
					label: '退回',
					value: '1200'
				}, {
					label: '退回至提交者',
					value: '1400'
				}, {
					label: '结束',
					value: '1500'
				}, {
					label: '转单',
					value: '1300'
				}],
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
		components:{
			pickerStaffs
		},
		onLoad(option) {
			this.taskId = option.taskId;
			this.flowId = option.flowId;
			this.id = option.id;
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
			changeStaff:function(data){
				console.log(data);
				if(data.data.length<3){
					return;
				}
				
				this.audit.staffId = data.data[2].code;
				this.audit.staffName = data.data[2].name;
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
