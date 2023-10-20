
import {wxuuid} from '../utils/SeqUtil.js'

import {getDateYYYYMMDDHHMISS} from '../utils/DateUtil.js'

import java110Config from '../Java110Config.js'

/**
 * 获取 header 
 */
export function getHeaders(){
	return {
		'app-id': java110Config.AppId,
		'transaction-id': wxuuid(),
		'req-time': getDateYYYYMMDDHHMISS(),
		'sign': '1234567',
		'user-id': '-1',
		'X-Requested-With':'XMLHttpRequest',
		// #ifndef H5
		cookie: '_java110_token_=' + uni.getStorageSync('token')
		// #endif
	};
};