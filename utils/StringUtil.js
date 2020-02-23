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

module.exports = {
  isNull: isNull,
  isNotNull: isNotNull
};