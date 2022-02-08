/**
 * 压缩
 *
 * @param {Object} imgSrc 图片url
 * @param {Object} callback 回调设置返回值
 */

export function translate(imgSrc, callback) {
    imageToBease64(imgSrc, callback)
}

/**
 * 图片转base64
 *
 * @param imageUrl 图片地址
 * @param callback 回调
 */
function imageToBease64(imageUrl, callback) {
    // #ifdef MP-WEIXIN
    uni.getFileSystemManager().readFile({
        filePath: imageUrl,
        encoding: 'base64',
        success: res => {
            console.log(res);
            let base64 = 'data:image/jpeg;base64,' + res.data
            callback(base64)
        }, fail: (e) => {
            console.log("图片转换失败");
        }
    })
    // #endif

    // #ifndef MP-WEIXIN
    uni.request({
        url: imageUrl,
        method: 'GET',
        responseType: 'arraybuffer',
        success: ress => {
            let base64 = wx.arrayBufferToBase64(ress.data);
            base64 = 'data:image/jpeg;base64,' + base64
        }, fail: (e) => {
            console.log("图片转换失败");
        }
    })
    // #endif
}

/**
 * base转Blob对象
 *
 * @param {Object} base64 base64地址
 */
export function base64ToBlob(base64) {
    var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {
        type: mime
    });
}