/**
 * HC掌上物业配置文件
 * 
 * 本项目只有这里修改相应配置信息，如果不是二次开发 请不要修改其他文件内容
 * 
 * @website http://www.homecommunity.cn/
 * @author 吴学文
 * @QQ 928255095
 */

// #ifdef H5
// 服务器域名 公众号时，配置为 / 就可以
const baseUrl = '/'; 
// #endif

const commonBaseUrl= 'https://app.demo.winqi.cn';

// #ifndef H5
//服务器域名 小程序 或者 app 时 后端地址
const baseUrl = 'https://app.demo.winqi.cn/'; 
// #endif


//app支付时这里需要填写支付秘钥
const appPayKey="";

const logLevel="DEBUG"; // 日志级别

export default{
	baseUrl:baseUrl,
	logLevel:logLevel,
	appPayKey:appPayKey,
	commonBaseUrl: commonBaseUrl
}