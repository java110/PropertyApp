<template>
	<view>
		<view class=" text-left">
			<view class="button_up_blank"></view>
			<view>{{fileName}}</view>
			<view class="flex flex-direction">
				<button class="cu-btn bg-white margin-b-sm lg" @click="_doUploadFile()">上传附件</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {getHeaders} from '../../lib/java110/api/SystemApi.js'
	
	export default {
		name:"vcUploadFile",
		data() {
			return {
				fileName:'',
			};
		},
		methods:{
			_setFileName:function(_fileName){
				this.fileName = _fileName;
			},
			_doUploadFile: function() {
				uni.chooseFile({
					count: 1, //默认100
					extension: ['.zip','.jpg','.png','.xlsx','.doc','docx','.xls'],
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
						 _that.$emit('uploadFile',obj);
						 
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

</style>