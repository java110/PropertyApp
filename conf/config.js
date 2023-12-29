/**
 * HC掌上物业配置文件
 * 
 * 本项目只有这里修改相应配置信息，如果不是二次开发 请不要修改其他文件内容
 * 
 * @website http://www.homecommunity.cn/
 * @author 吴学文
 * @QQ 928255095
 */

let _systemConfig = uni.getStorageSync('java110SystemConfig');

// #ifdef H5
// 服务器域名 公众号时，配置为 / 就可以
let baseUrl = '/'; 
// #endif

// 腾讯地图Key, h5使用
let QQMapKey = '';
let commonBaseUrl= 'http://192.168.100.108:8088/';

// #ifndef H5
//服务器域名 小程序 或者 app 时 后端地址
//let baseUrl = 'http://demo.homecommunity.cn/'; 
let baseUrl = 'https://192.168.100.108:8088/'; 
// #endif

//app支付时这里需要填写支付秘钥
let appPayKey="";

let logLevel="DEBUG"; // 日志级别

let systemName="物业版";

if(_systemConfig){
	QQMapKey = _systemConfig.qqMapKey;
	commonBaseUrl = _systemConfig.imgUrl;
	systemName = _systemConfig.propertyTitle;
}

export default{
	baseUrl:baseUrl,
	logLevel:logLevel,
	appPayKey:appPayKey,
	commonBaseUrl: commonBaseUrl,
	QQMapKey: QQMapKey,
	imgUrl:commonBaseUrl,
	systemName:systemName
}