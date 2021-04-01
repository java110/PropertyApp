import login from '../factory/login.js'


export default{
	/**
	 * 请求
	 * @param {Object} _reqObj 请求内容
	 */
	request:function(_reqObj) {
		//检查是否登录成功
		login.checkLoginStatus(function() {
			//重写token
			_reqObj.header.cookie = '_java110_token_=' + uni.getStorageSync('token'); //console.log("_reqObj",_reqObj);
			console.log(_reqObj);
			uni.request(_reqObj);
		});
	}
}