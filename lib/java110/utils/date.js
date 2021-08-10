export default {

	/**
	 * @desc: 格式化时间
	 * @return: eg: '2018/04/09 21:31:00'
	 * @param {Date对象} date 
	 */
	formatTime: function(date) {
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		hour = date.getHours();
		minute = date.getMinutes();
		second = date.getSeconds();
		return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
	},
	/**
	 * @desc: 格式化日期
	 * @return: eg: '2018/04/09 21:31:00'
	 * @param {Date对象} date 
	 */
	formatDate: function(date) {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return [year, month, day].map(this.formatNumber).join('-');
	}, //字符串转日期格式，strDate要转为日期格式的字符串 

	getDate: function(strDate) {
		var st = strDate;
		var a = st.split(" "); //这个根据你的字符串决定，如果中间为T则改T

		var b = a[0].split("-");
		var c = a[1].split(":");
		var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
		return date;
	},
	/**
	 * @desc: 格式化数字
	 * @return: n > 10 [eg: 12] => 12 | n < 10 [eg: 3] => '03'
	 * @param {*} n 
	 */
	formatNumber:function(n) {
		n = n.toString();
		return n[1] ? n : '0' + n;
	},

	/**
	 * 获取 类似 20200726161500 日期地址
	 */
	getDateYYYYMMDDHHMISS: function() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}
		if (hour < 10) {
			hour = '0' + hour;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		if (second < 10) {
			second = '0' + second;
		}
		return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
	},

	addYear: function(_date, _year) {
		let year = _date.getFullYear() + _year; //获取当前年份
		let mon = _date.getMonth(); //获取当前月份
		let da = _date.getDate(); //获取当前日
		let h = _date.getHours(); //获取小时
		let m = _date.getMinutes(); //获取分钟
		let s = _date.getSeconds(); //获取秒
		let newDate = new Date(year, mon, da, h, m, s);
		return newDate;
	},

	addMonth: function(_date, _month) {
		let year = _date.getFullYear(); //获取当前年份
		let mon = _date.getMonth() + _month; //获取当前月份
		let da = _date.getDate(); //获取当前日
		let h = _date.getHours(); //获取小时
		let m = _date.getMinutes(); //获取分钟
		let s = _date.getSeconds(); //获取秒
		let newDate = new Date(year, mon, da, h, m, s);
		return newDate;
	},

	addDay: function(_date, _day) {
		let year = _date.getFullYear(); //获取当前年份
		let mon = _date.getMonth(); //获取当前月份
		let da = _date.getDate() + _day; //获取当前日
		let h = _date.getHours(); //获取小时
		let m = _date.getMinutes(); //获取分钟
		let s = _date.getSeconds(); //获取秒
		let newDate = new Date(year, mon, da, h, m, s);
		return newDate;
	},

	addHour: function(_date, _hour) {
		let year = _date.getFullYear(); //获取当前年份
		let mon = _date.getMonth(); //获取当前月份
		let da = _date.getDate(); //获取当前日
		let h = _date.getHours() + _hour; //获取小时
		let m = _date.getMinutes(); //获取分钟
		let s = _date.getSeconds(); //获取秒
		let newDate = new Date(year, mon, da, h, m, s);
		return newDate;
	},

	addMinutes: function(_date, _minute) {
		let year = _date.getFullYear(); //获取当前年份
		let mon = _date.getMonth(); //获取当前月份
		let da = _date.getDate(); //获取当前日
		let h = _date.getHours(); //获取小时
		let m = _date.getMinutes() + _minute; //获取分钟
		let s = _date.getSeconds(); //获取秒
		let newDate = new Date(year, mon, da, h, m, s);
		return newDate;
	},

	addSeconds: function(_date, _second) {
		let year = _date.getFullYear(); //获取当前年份
		let mon = _date.getMonth(); //获取当前月
		let da = _date.getDate(); //获取当前日
		let h = _date.getHours(); //获取小时
		let m = _date.getMinutes(); //获取分钟
		let s = _date.getSeconds() + _second; //获取秒
		let newDate = new Date(year, mon, da, h, m, s);
		return newDate;
	},
	/**
	 * @description 将时间字符串 转为日期字符串 
	 * @param {String} _dateTimeString 时间字符串 YYYY-MM-DD hh:mi:ss
	 * @return {String} _value 日期字符串 YYYY/MM/DD
	 */
	dateTimeStringToDateString:function(_dateTimeString){
		let _value = _dateTimeString.replace(/\-/g, "/");
		let _tmpValue = new Date(_value);
		return this.formatDate(_tmpValue);
	},
	/**
	 * 日期转化为字符串‘Y-m-d H:i:s’
	 * @param {Object} _date
	 */
	date2String: function(_date){
		let date = new Date(_date);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}
		if (hour < 10) {
			hour = '0' + hour;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		if (second < 10) {
			second = '0' + second;
		}
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	},
	
	
	/**
	 * 对比时间
	 * @param {Object} date1
	 * @param {Object} date2
	 */
	compareDate:function(date1,date2){
		var oDate1 = new Date(date1);
		var oDate2 = new Date(date2);
		if(oDate1.getTime() > oDate2.getTime()){
			return true; //第一个大
		} else {
			return false; //第二个大
		}
	},
	
	/**
	 * 获取当前日期时间
	 */
	getCurrentDateTime: function(){
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}
		if (hour < 10) {
			hour = '0' + hour;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		if (second < 10) {
			second = '0' + second;
		}
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	},
	
	/**
	 * @param {Object} date日期 Y-m-d H:i:s
	 * @param {Object} days 天数
	 */
	decSomeDays: function(date, days){
		let timestamp = new Date(date.replace(/-/g, '/')).getTime();
		let decstamp =  60 * 60 * 24 * 1000 * days;
		return this.formatDate(new Date(timestamp - decstamp));
	}
}
