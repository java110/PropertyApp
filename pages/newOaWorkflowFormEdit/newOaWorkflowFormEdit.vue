<template>
	<view>
		<view v-for="(item,index) in components">
			<!-- 标题 -->
			<view class="block__title" v-if="item.type=='text'">{{item.text}}</view>

			<!--文本框-->
			<view class="cu-form-group margin-top-xs" v-if="item.type== 'textfield'">
				<view class="title">{{item.label}}</view>
				<input v-model="item.value" type="text" :placeholder="item.description" class="text-right"></input>
			</view>
			<!--数字框-->
			<view class="cu-form-group margin-top-xs" v-if="item.type== 'number'">
				<view class="title">{{item.label}}</view>
				<input v-model="item.value" type="number" :placeholder="item.description" class="text-right"></input>
			</view>
			<view class="cu-form-group margin-top" v-if="item.type== 'textarea'">
				<textarea v-model="item.value" :placeholder="item.description"></textarea>
			</view>
			<!--日期选择-->
			<view class="cu-form-group arrow margin-top-xs" v-if="item.type== 'textdate'">
				<view class="title">{{item.label}}</view>
				<picker mode="date" :value="item.value" start="2010-09-01" end="2050-09-01"
					@change="dateChange($event,item)">
					<view class="picker">
						{{item.value}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group arrow margin-top-xs" v-if="item.type== 'textdatetime'">
				<view class="title">{{item.label}}</view>
				<picker mode="time" :value="item.value" start="00:00" end="23:59" @change="timeChange($event,item)">
					<view class="picker">
						{{item.value}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group arrow margin-top-xs" v-if="item.type== 'radio' ">
				<view class="title">{{item.label}}</view>
				<picker bindchange="PickerChange" :value="item.valueIndex" :range-key="'label'" :range="item.values"
					@change="selectChange($event,item)">
					<view class="picker">
						{{item.values.length==0 ? "请选择" : item.values[item.valueIndex].label}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group arrow margin-top-xs" v-if="item.type== 'select' ">
				<view class="title">{{item.label}}</view>
				<picker bindchange="PickerChange" :value="item.valueIndex" :range-key="'label'" :range="item.values"
					@change="selectChange($event,item)">
					<view class="picker">
						{{item.values.length==0 ? "请选择" : item.values[item.valueIndex].label}}
					</view>
				</picker>
			</view>

			<checkbox-group class="block" @change="checkboxChange($event,item)" v-if="item.type== 'checkbox' ">
				<view class="cu-form-group margin-top-xs">
					<view class="title">{{item.label}}</view>
					<checkbox :class="item.value == item.label?'checked':''"
						:checked="item.value == item.label?true:false" :value="item.label"></checkbox>
				</view>
			</checkbox-group>

			<view v-if="item.type== 'button' && item.action == 'submit'" class=" text-right">
				<view class="button_up_blank"></view>
				<view>{{fileName}}</view>
				<view class="flex flex-direction">
					<button class="cu-btn bg-white margin-tb-sm lg" @click="_doUploadFile()">上传附件</button>
				</view>
			</view>
			<!--提交框-->
			<view v-if="item.type== 'button' && item.action == 'submit'">
				<view class="button_up_blank"></view>
				<view class="flex flex-direction">
					<button class="cu-btn bg-green margin-tb-sm lg" @click="_doSubmit()">{{item.label}}</button>
				</view>
			</view>
			<!--重置框-->
			<view v-if="item.type== 'button' && item.action == 'reset'">
				<view class="button_up_blank"></view>
				<view class="flex flex-direction">
					<button class="cu-btn bg-white margin-tb-sm lg" @click="_doReset()">{{item.label}}</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {getHeaders} from '../../lib/java110/api/SystemApi.js'
	import {
		queryOaWorkflowForm,
		updateOaWorkflowFormData,
		queryOaWorkflowFormData
	} from '../../api/oa/oa.js'
	import {
		isEmpty
	} from '../../lib/java110/utils/StringUtil.js'
	export default {
		data() {
			return {
				formJson: {},
				components: [],
				flowId: '',
				flowName: '',
				id: '',
				fileName:'',
				realFileName:''
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.flowId = options.flowId;
			this.id = options.id;
			this.flowName = options.flowName;
			this._loadForm();
		},
		methods: {
			_loadForm: function() {
				let _that = this;
				queryOaWorkflowForm(this, {
					page: 1,
					row: 1,
					flowId: this.flowId
				}).then(_data => {
					_that.formJson = JSON.parse(_data.data[0].formJson);
					console.log(_that.formJson);
					_that.components = _that.formJson.components;
					_that.components.forEach(item => {
						item.value = "";
						if (item.type == 'textdate' || item.type == 'textdatetime') {
							item.value = "请选择";
						}
						if (item.type == "radio" || item.type == "select") {
							item.valueIndex = 0;
						}
					})
				}).then(_data => {
					return queryOaWorkflowFormData(this, {
						page: 1,
						row: 1,
						flowId: this.flowId,
						id: this.id
					})
				}).then(_data => {
					let _oaData = _data.data[0];
					_that.components.forEach(item => {
						item.value = _oaData[item.key];
					})
					console.log(_that.components);
					if(_oaData.files){
						_that.fileName = _oaData.files[0].fileName;
						_that.realFileName = _oaData.files[0].realFileName;
					}
					_that.$forceUpdate();
				})
			},

			dateChange: function(e, obj) {
				obj.value = e.detail.value;
				this.$forceUpdate();
			},
			timeChange: function(e, obj) {
				obj.value = e.detail.value;
				this.$forceUpdate();
			},
			checkboxChange: function(e, obj) {
				obj.value = e.detail.value;
				console.log(obj, e.detail)
				this.$forceUpdate();
			},
			selectChange: function(e, obj) {
				obj.valueIndex = e.target.value //取其下标
				let selected = obj.values[obj.valueIndex] //获取选中的数组
				if (selected == undefined) {
					return;
				}
				obj.value = selected.value //选中的id
				this.$forceUpdate();
			},
			_doSubmit: function() {
				//做数据校验
				let _components = this.components;
				let _data = {
					fileName:this.fileName,
					realFileName:this.realFileName
				};
				_components.forEach(item => {
					if (item.validate && item.validate.required == true && isEmpty(item.value)) {
						uni.showToast({
							title: item.label + "不能为空",
							icon: 'none',
							duration: 2000
						})
						throw Error(item.label + "不能为空");
					}
					if (item.type != 'button' && item.type != 'text') {
						_data[item.key] = item.value;
						if (item.type == 'checkbox') {
							_data[item.key] = item.value.length > 0 ? item.value[0] : '';
						}
					}
				});
				_data.flowId = this.flowId;
				_data.id = this.id;
				updateOaWorkflowFormData(this, _data)
					.then(_data => {
						if (_data.data.code == 0) {
							uni.showToast({
								title: "提交成功",
								icon: 'none',
								duration: 2000
							})
							uni.navigateBack({
								delta: 1
							})
							return;
						}
						uni.showToast({
							title: _data.data.msg,
							icon: 'none',
							duration: 2000
						})
					}, _err => {
						uni.showToast({
							title: '网络异常',
							icon: 'none',
							duration: 2000
						})
					})



			},
			_doReset: function() {
				let _that = this;
				_that.components.forEach(item => {
					item.value = "";
					if (item.type == 'textdate' || item.type == 'textdatetime') {
						item.value = "请选择";
					}

					if (item.type == "radio" || item.type == "select") {
						item.valueIndex = 0;
					}
				});
				this.$forceUpdate();
			},
			_doUploadFile: function() {
				uni.chooseFile({
					count: 1, //默认100
					extension: ['.zip'],
					success: (res) => {
						console.log(res);
						if (res.tempFiles[0].size / 1024 / 1024 > 20) {
							this.$refs.uToast.show({
								title: '附件大小不能超过20M',
								type: 'warning',
							})
							return;
						}
				 	this.resultPath(res.tempFilePaths[0], res.tempFiles[0].name);
					}
				});
			},
			resultPath(path,fileName) {
			    let _that = this;
			    uni.showLoading({
			      title: '上传中...',
			    });
			    uni.uploadFile({
			        url: '/callComponent/upload/uploadVedio/upload', 
			        filePath: path,
					name: 'uploadFile',
			        header:getHeaders(),
			        formData: {
			            // 'user': 'test'
			        },
			        success: (uploadFileRes) => {
						uni.hideLoading();
			             let obj = JSON.parse(uploadFileRes.data);
			             _that.fileName = obj.fileName;
						 _that.realFileName = obj.realFileName;
						 
			         },
			         fail:(err) =>{
			             this.$refs.uToast.show({
			                 title: '上传失败',
			                 type: 'error',
			             });
			             uni.hideLoading();
			         }
			    });
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
