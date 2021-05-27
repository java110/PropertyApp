import mapping from '../constant/mapping.js'
import url from '../constant/url.js'
import util from '../utils/util.js'
import AppConstant from '../constant/AppConstant.js'
import date from '../utils/date.js'

export default{
	/**
	 * 校验登录
	 * @param {callback} 登录成功 回调函数 
	 */
	checkLoginStatus:function(callback = () => {}) {
	  let _that = this;
	
	  let loginFlag = uni.getStorageSync(mapping.LOGIN_FLAG);
	  let nowDate = new Date();
	  if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
			// console.log("现在还是有效时间内");
			callback();
	  } else {
	    // 无登录态
	    _that.doLogin(callback);
	  }
	},
	doLogin:function(callback = () => {}) {
	   this.requsetHcServerToLogin(callback);
	},
	/**
	 * 请求 HC服务 登录
	 */
	requsetHcServerToLogin:function(callback = () => {}) {
		console.log('常量',mapping.USER_INFO);
		let userInfo = null;
		try{
			userInfo = uni.getStorageSync(mapping.USER_INFO);
		}catch(e){
			console.log('读取数据失败',e)
		}
		console.log("用户信息",userInfo);
		if(util.isNull(userInfo)){
			uni.reLaunch({
				url:'/pages/login/login'
			});
			return ;
		}
		
		let _userInfo = JSON.parse(util.desDecrypt(userInfo));
		let _tmpUserInfo = {
			username:_userInfo.userName,
			password:_userInfo.password
		}
	  uni.request({
	    url: url.loginUrl,
	    method: 'post',
	    header: {
	      'APP-ID': AppConstant.appId
	    },
	    data: _tmpUserInfo,
	    success: function (res) {
	      console.log('login success...:');
	      res = res.data;
	        let afterOneHourDate = date.addHour(new Date(),1);
	        wx.setStorageSync(mapping.LOGIN_FLAG, {
	          sessionKey: userInfo.userName,
	          expireTime: afterOneHourDate.getTime(),
				createTime: new Date().getTime()
	        });
	        uni.setStorageSync(mapping.TOKEN, res.token);
	        callback();
	    },
	    fail: function (error) {
	      // 调用服务端登录接口失败
	      console.log(error);
	    }
	  });
	}, // 获取用户登录标示 供全局调用
	getLoginFlag:function() {
	  return uni.getStorageSync(mapping.LOGIN_FLAG);
	}
}