//import CryptoJS from '../../crypto-js.js'

import StringUtil from './StringUtil.js'

var keyvi = 'java110_hc_wuxw';
function des_encrypt(message) {
    // var key            = CryptoJS.MD5(keyvi).toString();
    // var iv            = CryptoJS.MD5(keyvi).toString();
    // var crypto_key     = CryptoJS.enc.Utf8.parse(key);
    // var crypto_iv     = CryptoJS.enc.Utf8.parse(iv.substr(0,8));

    // var encode_str     = CryptoJS.TripleDES.encrypt(message, crypto_key, {    
    //                     iv:         crypto_iv,    
    //                     mode:         CryptoJS.mode.CBC,    
    //                     padding:     CryptoJS.pad.Pkcs7});
    // return encode_str.toString();
	return message;

}
//des解密 DES-EDE3-CBC
function des_decrypt(message)
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
 return message;
}

module.exports = {
    desEncrypt: des_encrypt,
    desDecrypt: des_decrypt
}