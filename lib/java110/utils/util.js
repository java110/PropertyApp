//import CryptoJS from '../../crypto-js.js'

import date from '../utils/date.js'
const StringUtil = require("./StringUtil")

const keyvi = 'java110_hc_wuxw';
export default {

	/**
	 * @desc: 格式化时间
	 * @return: eg: '2018/04/09 21:31:00'
	 * @param {Date对象} date 
	 */
	formatTime:function(date){
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
	},
	/**
	 * @desc: 格式化数字
	 * @return: n > 10 [eg: 12] => 12 | n < 10 [eg: 3] => '03'
	 * @param {*} n 
	 */
	formatNumber: function(n) {
		n = n.toString();
		return n[1] ? n : '0' + n;
	},
	/**
	 * 获取uuid
	 */
	wxuuid: function() {
		var s = [];
		var hexDigits = "0123456789abcdef";

		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}

		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010

		s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

		s[8] = s[13] = s[18] = s[23] = "-";
		var uuid = s.join("");
		return uuid;
	},
	/**
	 * 判断字符串是否为空
	 * @param {Object} _param 字符串
	 * @return true 如果为空时 
	 * 		   false 不为空
	 */
	isNull: function(_param){
		if(_param == null || _param == undefined || _param == ''){
			return true;
		}
		return false;
	},
	/**
	 * 判断字符串是否为空
	 * @param {Object} _param 字符串
	 * @return true 如果不为空时 
	 * 		   false 为空
	 */
	isNotNull: function(_param){
		if(this.isNull(_param)){
			return false;
		}
		
		return true;
	},
	desEncrypt:function(message) {
	//     var key            = CryptoJS.MD5(keyvi).toString();
	//     var iv            = CryptoJS.MD5(keyvi).toString();
	//     var crypto_key     = CryptoJS.enc.Utf8.parse(key);
	//     var crypto_iv     = CryptoJS.enc.Utf8.parse(iv.substr(0,8));
	
	//     var encode_str     = CryptoJS.TripleDES.encrypt(message, crypto_key, {    
	//                         iv:         crypto_iv,    
	//                         mode:         CryptoJS.mode.CBC,    
	//                         padding:     CryptoJS.pad.Pkcs7});
	//     return encode_str.toString();
		return message
	
	},
	//des解密 DES-EDE3-CBC
	desDecrypt:function(message)
	{
		// console.log("message",message);
		// if(StringUtil.isNull(message)){
		// 	return message;
		// }
	 //    var key            = CryptoJS.MD5(keyvi).toString();
	 //    var iv            = CryptoJS.MD5(keyvi).toString();
	 //    var crypto_key     = CryptoJS.enc.Utf8.parse(key);
	 //    var crypto_iv     = CryptoJS.enc.Utf8.parse(iv.substr(0,8));
	 //    var decrypt_str    = CryptoJS.TripleDES.decrypt(message, crypto_key, {    
	 //                        iv:         crypto_iv,    
	 //                        mode:         CryptoJS.mode.CBC,    
	 //                        padding:     CryptoJS.pad.Pkcs7});
	 //    return     decrypt_str.toString(CryptoJS.enc.Utf8);    
	 return message
	}
	
}
