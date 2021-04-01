import util from '../utils/util.js'
import request from '../context/request.js'
import url from '../constant/url.js'
import mapping from '../constant/mapping.js'

export default {
	/**
	 * 获取用户信息
	 */
	getUserInfo: function() {
		let userInfo = uni.getStorageSync(mapping.USER_INFO);
		if (util.isNull(userInfo)) {
			uni.redirectTo({
				url: "/pages/login/login"
			});
			return;
		}
		let _userInfo = JSON.parse(util.desDecrypt(userInfo));
	
		return _userInfo;
	},
	/**
	 * 获取小区信息
	 * @param {Object} reload 是否重新加载 小区信息
	 * @param {Object} _condition 查询小区条件
	 */
	getCommunity: function(reload, _condition) {
		let _communityInfo = uni.getStorageSync(mapping.COMMUNITY_INFO);
		let _that =this;
		return new Promise(function(reslove,reject){
			//小区没有就去登录
			if (util.isNotNull(_communityInfo) && reload != true) {
				_communityInfo = JSON.parse(_communityInfo);
				reslove(_communityInfo);
				return;
			}
			
			let _userInfo = _that.getUserInfo();
			//如果用户不存在 则跳转为登录页面
			if (util.isNull(_userInfo)) {
				uni.redirectTo({
					url: "/pages/login/login"
				});
				reject()
				return;
			}
			if (util.isNull(_condition)) {
				_condition = {
					userId: '',
					storeId: '',
					page:1,
					row:50
				};
			}
			
			if(!_condition.hasOwnProperty("page")){
				_condition.page = 1;
				_condition.row = 50;
			}
			_condition.userId = _userInfo.userId;
			_condition.storeId = _userInfo.storeId;
			request.request({
				url: url.listMyEnteredCommunitys,
				header: util.getHeaders(),
				data: _condition,
				success: function(res) {
					if (res.statusCode != 200) {
						uni.showToast({
							icon: 'none',
							title: res.data
						});
						return;
					}
					let data = res.data;
					if (data.total < 1) {
						uni.showToast({
							icon: none, 
							title: '当前员工还没有隶属小区,请先去后台添加'
						});
						return;
					}
					let _communitys = data.communitys;
					uni.setStorageSync(mapping.COMMUNITY_INFO, JSON.stringify(_communitys));
					reslove(_communitys)
				},
				fail: function(error) {
					// 调用服务端登录接口失败
					uni.showToast({
						title: '调用接口失败'
					});
				}
			});
		});	
	},
	getCurrentCommunity : function() {
		let currentCommunity = uni.getStorageSync(mapping.CURRENT_COMMUNITY_INFO);
		if (util.isNull(currentCommunity)) {
			return {};
		}
		if(currentCommunity instanceof Object){
			return currentCommunity;
		}
		return JSON.parse(currentCommunity);
	},
	getLocalFilePath:function(path) {
		if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf(
				'_downloads') === 0) {
			return path
		}
		if (path.indexOf('file://') === 0) {
			return path
		}
		if (path.indexOf('/storage/emulated/0/') === 0) {
			return path
		}
		if (path.indexOf('/') === 0) {
			var localFilePath = plus.io.convertAbsoluteFileSystem(path)
			if (localFilePath !== path) {
				return localFilePath
			} else {
				path = path.substr(1)
			}
		}
		return '_www/' + path
	},
	urlTobase64:function(url) {
		return new Promise((resolve, reject) => {
			console.log('url', url);
			// #ifdef H5
			let imgData;
			let reader = new FileReader();
			getImageBlob(url, function(blob) {
				reader.readAsDataURL(blob);
			});
			reader.onload = function(e) {
				imgData = e.target.result;
				resolve(imgData);
			};
	
			function getImageBlob(_url, cb) {
				let xhr = new XMLHttpRequest();
				xhr.open("get", _url, true);
				xhr.responseType = "blob";
				xhr.onload = function() {
					if (this.status == 200) {
						if (cb) cb(this.response);
					}
				};
				xhr.send();
			}
			// #endif
			// #ifdef APP-PLUS 
			let _imageBase64List = '';
			plus.io.resolveLocalFileSystemURL(url,
				function(entry) {
					// 可通过entry对象操作test.html文件
					entry.file(function(file) {
						var fileReader = new plus.io.FileReader();
						fileReader.readAsDataURL(file);
						fileReader.onloadend = function(evt) {
							_imageBase64List = _imageBase64List.concat(evt.target.result);
							resolve(_imageBase64List);
						}
					})
				});
			// #endif
	
			// #ifdef MP-WEIXIN
			wx.getFileSystemManager().readFile({
				filePath: url, //选择图片返回的相对路径
				encoding: 'base64', //编码格式
				success: res => { //成功的回调
					//console.log('data:image/png;base64,' + res.data);
					let base64 = 'data:image/png;base64,' + res.data;
					resolve(base64);
				},
				fail: function(e) {
					console.log(e);
					reject(e);
				}
			})
			// #endif
		});
	
	}
	
}
