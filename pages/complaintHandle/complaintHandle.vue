<template>
	<view>

		<view class="cu-form-group margin-top">
			<view class="title">审核</view>
			<picker bindchange="PickerChange" :value="stateIndex" :range="stateCloums" :range-key="'name'" @change="stateChange">
				<view class="picker">
					{{stateCloums[stateIndex].name}}
				</view>
			</picker>
		</view>

		<view class="cu-form-group margin-top">
			<textarea v-model="content" placeholder="请输入处理意见"></textarea>
		</view>

		<view class="flex flex-direction margin-top">
			<button class="cu-btn bg-green margin-tb-sm lg" @click="_dispatchComplaint()">提交</button>
		</view>
	</view>
</template>

<script>
	import {auditComplaint} from '../../api/complaint/complaint.js'
	export default {
		data() {
			return {
				stateCloums: [{
						id: '0',
						name: '请选择'
					},{
						id: '1100',
						name: '接受'
					},
					{
						id: '1200',
						name: '不接受'
					}
				],
				state:'',
				content: '',
				complaintId:'',
				stateIndex:0,
				taskId:'',
				storeId:'',
				userId:'',
				userName:''

			}
		},
		onLoad(options) {
			this.complaintId = options.complaintId;
			this.taskId = options.taskId;
			let _userInfo = this.java110Context.getUserInfo();
			this.storeId = _userInfo.storeId;
			this.userId = _userInfo.userId;
			this.userName = _userInfo.userName;
		},
		methods: {
			_dispatchComplaint: function() {
				let _data = {
					state:this.state,
					remark:this.content,
					communityId:this.java110Context.getCurrentCommunity().communityId,
					taskId:this.taskId,
					complaintId:this.complaintId,
					storeId:this.storeId,
					userId:this.userId,
					userName:this.userName
				}
				auditComplaint(this,_data)
				.then(function(res){
					if (res.statusCode != 200) {
						uni.showToast({
							icon:'none',
							title:res.data
						});
						return;
					}
					uni.navigateBack({
						delta:1
					})
				})

			},
			stateChange:function(e){
				this.stateIndex = e.target.value //取其下标
				if (this.stateIndex == 0) {
					this.state = '' //选中的id
					return;
				}
				let selected = this.stateCloums[this.stateIndex] //获取选中的数组
				
				this.state = selected.id //选中的id
			}
		}
	}
</script>

<style>

</style>
