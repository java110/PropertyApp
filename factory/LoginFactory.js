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
    console.log("afterOneHourDate", loginFlag);
    let nowDate = new Date();

    if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
		
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
		uni.redirectTo({
			url:"/pages/login/login"
		})
		
		return ;
	}
   
    uni.request({
      url: constant.url.loginUrl,
      method: 'post',
      header: {
        APP_ID: constant.app.appId
      },
      data: userInfo,
      success: function (res) {
        console.log('login success...:');
        res = res.data;

        if (res.result == 0) {
          //that.globalData.userInfo = res.userInfo;
          wx.setStorageSync(constant.mapping.USER_INFO, JSON.stringify(userInfo));
          let date = new Date();
          let year = date.getFullYear(); //获取当前年份

          let mon = date.getMonth(); //获取当前月份

          let da = date.getDate(); //获取当前日

          let h = date.getHours() + 1; //获取小时

          let m = date.getMinutes(); //获取分钟

          let s = date.getSeconds(); //获取秒

          console.log("获取过去时间", year, mon, da, h, m, s); //将时间格式转化为时间戳

          let afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间

          console.log("afterOneHourDate", afterOneHourDate);
          wx.setStorageSync(constant.mapping.LOGIN_FLAG, {
            sessionKey: userInfo.userName,
            expireTime: afterOneHourDate.getTime()
          });
          wx.setStorageSync(constant.mapping.TOKEN, res.token);
          callback();
        } else {
          util.core.showInfo(res.errmsg);
        }
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