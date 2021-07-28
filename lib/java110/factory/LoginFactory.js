/**
 * 登录相关 代码封装
 * 
 * add by wuxw 2019-12-28
 * 
 */

/**
 * 登录工厂类
 */
const util = require("../utils/index.js");

const constant = require("../constant/index.js");

class LoginFactory {
  constructor() {
    this.coreUtil = util.core;
  } // 检查本地 storage 中是否有登录态标识


  checkLoginStatus(callback = () => {}) {
    let _that = this;

    let loginFlag = uni.getStorageSync(constant.mapping.LOGIN_FLAG);

    let nowDate = new Date();

    if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		// console.log("现在还是有效时间内");
		callback();
    } else {
      // 无登录态
      _that.doLogin(callback);
    }
  } // 登录动作
  doLogin(callback = () => {}) {
     this.requsetHcServerToLogin(callback);
  }
  /**
   * 请求 HC服务 登录
   */
  requsetHcServerToLogin(callback = () => {}) {
	console.log('常量',constant.mapping.USER_INFO);
	let userInfo = null;
	try{
		userInfo = uni.getStorageSync(constant.mapping.USER_INFO);
	}catch(e){
		console.log('读取数据失败',e)
	}
	
	console.log("用户信息",userInfo);
	
	if(userInfo == null || userInfo == undefined || userInfo == ''){
		uni.reLaunch({
			url:'/pages/login/login'
		});
		
		return ;
	}
	
	console.log('userInfo',userInfo);
	
	let _userInfo = JSON.parse(util.des.desDecrypt(userInfo));
	
	let _tmpUserInfo = {
		username:_userInfo.userName,
		password:_userInfo.password
	}
   
    uni.request({
      url: constant.url.loginUrl,
      method: 'post',
      header: {
        'APP-ID': constant.app.appId
      },
      data: _tmpUserInfo,
      success: function (res) {
        console.log('login success...:');
        res = res.data;
          //that.globalData.userInfo = res.userInfo;
          //wx.setStorageSync(constant.mapping.USER_INFO, JSON.stringify(userInfo));
          let afterOneHourDate = util.date.addHour(new Date(),1);
          wx.setStorageSync(constant.mapping.LOGIN_FLAG, {
            sessionKey: userInfo.userName,
            expireTime: afterOneHourDate.getTime(),
			createTime: new Date().getTime()
          });
          wx.setStorageSync(constant.mapping.TOKEN, res.token);
          callback();
      },
      fail: function (error) {
        // 调用服务端登录接口失败
        util.core.showInfo('调用接口失败');
        console.log(error);
      }
    });
  } // 获取用户登录标示 供全局调用


  getLoginFlag() {
    return uni.getStorageSync(constant.mapping.LOGIN_FLAG);
  }

}

;
module.exports = new LoginFactory();