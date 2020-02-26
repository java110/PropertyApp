/**
 * 上下文对象,再其他文件调用常量 方法 时间工具类时 只引入上下文文件
 * 
 * add by wuxw 2019-12-27
 * 
 * the source opened https://gitee.com/java110/WechatOwnerService
 */
const constant = require("../constant/index.js");

const util = require("../utils/index.js");

const factory = require("../factory/index.js");
/**
 * 获取请后台服务时的头信息
 */


const getHeaders = function () {
  return {
    app_id: constant.app.appId,
    transaction_id: util.core.wxuuid(),
    req_time: util.date.getDateYYYYMMDDHHMISS(),
    sign: '1234567',
    user_id: '-1',
    cookie: '_java110_token_=' + wx.getStorageSync('token')
  };
};
/**
 * http 请求 加入是否登录判断
 */


const request = function (_reqObj) {
  //检查是否登录成功
  factory.login.checkLoginStatus(function () {
	  
    //重写token
    _reqObj.header.cookie = '_java110_token_=' + uni.getStorageSync('token'); //console.log("_reqObj",_reqObj);
	console.log("_reqObj",_reqObj);
    uni.request(_reqObj);
  });
};
/**
 * 获取位置
 * add by wuxw 2019-12-28
 */


const getLocation = function () {
  return uni.getStorageSync('location');
};

const getCurrentLocation = function () {
  return uni.getStorageSync('currentLocation');
};
/**
 * 获取用户信息
 * 
 * add by wuxw 2019-12-28
 */


const getUserInfo = function () {
  let userInfo = uni.getStorageSync(constant.mapping.USER_INFO);
  if(util.string.isNull(userInfo)){
	  uni.redirectTo({
	  	url:"/pages/login/login"
	  });
	  return;
  }
  let _userInfo = JSON.parse(util.des.desDecrypt(userInfo));
  
  return _userInfo;
};
/**
 * 登录标记
 * add  by wuxw 2019-12-28
 */


const getLoginFlag = function () {
  let _loginFlag = uni.getStorageSync(constant.mapping.LOGIN_FLAG);

  return _loginFlag;
};

const _loadArea = function (_level, _parentAreaCode, callBack = _areaList => {}) {
  let areaList = uni.getStorageSync(constant.mapping.AREA_INFO);

  if (areaList) {
    callBack(areaList);
    return;
  }

  request({
    url: constant.url.areaUrl,
    header: getHeaders(),
    data: {
      areaLevel: _level,
      // 临时登录凭证
      parentAreaCode: _parentAreaCode
    },
    success: function (res) {
      console.log('login success');
      res = res.data;
      var province = [],
          city = [],
          area = [];
      var _currentArea = [];
      province = res.areas.filter(item => {
        return item.areaLevel == '101';
      });
      city = res.areas.filter(item => {
        return item.areaLevel == '202';
      });
      area = res.areas.filter(item => {
        return item.areaLevel == '303';
      });
      var provinceList = {};
      province.forEach(function (item) {
        provinceList[item.areaCode] = item.areaName;
      });
      var cityList = {};
      city.forEach(function (item) {
        cityList[item.areaCode] = item.areaName;
      });
      var quyuList = {};
      area.forEach(function (item) {
        quyuList[item.areaCode] = item.areaName;
      });
      let areaList = {
        province_list: provinceList,
        city_list: cityList,
        county_list: quyuList
      };
      callBack(areaList); //将 地区信息存储起来

      uni.setStorageSync(constant.mapping.AREA_INFO, areaList);
    },
    fail: function (error) {
      // 调用服务端登录接口失败
      uni.showToast({
        title: '调用接口失败'
      });
      console.log(error);
    }
  });
};
/**
 * 获取当前小区
 */
const getCurrentCommunity = function(){
	let currentCommunity = uni.getStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO);
	if(util.string.isNull(currentCommunity)){
		return {};
	}
	return JSON.parse(currentCommunity);
};

/**
 * 获取当前小区信息
 */
const getCommunity = function (callBack,reload,_condition) {
  let _communityInfo = uni.getStorageSync(constant.mapping.COMMUNITY_INFO);
  console.log('本地小区信息',_communityInfo);
  if(_communityInfo != null && _communityInfo != undefined && _communityInfo != "" && reload != true){
	  _communityInfo = JSON.parse(_communityInfo);
	  callBack(_communityInfo);
	  return ;
  }
  
  
  //调用远程查询小区信息
  let _userInfo = getUserInfo();
  
  if(_condition == null || _condition == undefined){
	  _condition = {};
  }
  
  console.log('_condition',_condition);
  
  _condition.userId = _userInfo.userId;
  _condition.storeId = _userInfo.storeId;
  
  request({
    url: constant.url.listMyEnteredCommunitys,
    header: getHeaders(),
    data: _condition,
    success: function (res) {
      console.log('login success');
	  if(res.statusCode != 200){
		  uni.showToast({
		  	icon:none,
			title:res.data
		  });
		  return ;
	  }
      let data = res.data;
	  if(data.total <1){
		  uni.showToast({
		  	icon:none,
		  	title:'当前员工还没有隶属小区,请先去后台添加'
		  });
		  return ;
	  }
	  let _communitys = data.communitys;
      uni.setStorageSync(constant.mapping.COMMUNITY_INFO, JSON.stringify(_communitys));
	  callBack(_communitys);
    },
    fail: function (error) {
      // 调用服务端登录接口失败
      uni.showToast({
        title: '调用接口失败'
      });
      console.log(error);
    }
  });
};




module.exports = {
  constant: constant,
  util: util,
  factory: factory,
  getHeaders: getHeaders,
  getLocation: getLocation,
  getUserInfo: getUserInfo,
  getLoginFlag: getLoginFlag,
  _loadArea: _loadArea,
  getCurrentLocation: getCurrentLocation,
  getCommunity: getCommunity,
  request: request,
  getCurrentCommunity:getCurrentCommunity
};