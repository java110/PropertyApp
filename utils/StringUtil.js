/**
 * 空值判断
 * @param {Object} _obj 判断对象
 */
const isNull = function(_obj){
	if(_obj == null || _obj == undefined || _obj == ''){
		return true;
	}
	return false;
}

/**
 * 不为空判断
 * @param {Object} _obj 判断对象
 */
const isNotNull = function(_obj){
	if(isNull(_obj)){
		return false;
	}
	
	return true;
}

/**
 * 字符串工具类
 * 
 * add by 吴学文 2020-09-25
 */

/**
 * 判断是否为空
 * @param {Object} _value 字符串
 */
const isEmpty=function (_value) {
	let type = typeof _value;

	switch (type) {
		case 'number':
			if (isFinite(_value)) {
				if (_value == 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		case 'object':
			for (let i in _value) {
				return false;
			}
			return true;
		case 'string':
			if (_value.length == 0) {
				return true;
			} else {
				return false
			}
		default:
			return true
	}
}


module.exports = {
  isNull: isNull,
  isNotNull: isNotNull,
  isEmpty:isEmpty
};