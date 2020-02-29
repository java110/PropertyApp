/**
 * base64 处理 工厂类
 * 
 * add by wuxw 2020-01-01 美丽的夏都西宁
 */
class Base64Factory {
  constructor() {}

  static urlTobase64(url) {
    return new Promise((resolve, reject) => {
      uni.request({
      	url: url,
      	method:'GET',
      	responseType: 'arraybuffer',
      	success: ress => {
      		let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
      		base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
      		console.log(base64);
			resolve(base64);
      	},
		fail: function (e) {
          console.log(e);
          reject(e);
        }
      });
      /* wx.getFileSystemManager().readFile({
        filePath: url,
        //选择图片返回的相对路径
        encoding: 'base64',
        //编码格式
        success: res => {
          //成功的回调
          //console.log('data:image/png;base64,' + res.data);
          let base64 = 'data:image/png;base64,' + res.data;
          resolve(base64);
        },
        fail: function (e) {
          console.log(e);
          reject(e);
        }
      }); */
    });
  }

}

module.exports = Base64Factory;