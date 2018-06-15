//const BASE_URL = "http://192.168.40.82:8080";
//const BASE_URL = "https://api.77lemon.top";
const BASE_URL = "http://192.168.40.93:8080";
//const BASE_URL = "http://7.167.61.111:8080"
//const BASE_URL = "http://1x7448h712.iok.la";
const app = getApp();

class Request {
    /**
     * 抓取API数据
     * @param  {String} url    链接
     * @param  {Objece} params 参数
     * @return {Promise}       包含抓取任务的Promise
     */
    getApi(url, params) {
        let token = wx.getStorageSync('token') || '';
        const promise = new Promise((resolve, reject) => {
            wx.request({
                url: `${BASE_URL}${url}`,
                method: 'POST',
                data: Object.assign({}, { 'token': token }, params), //置入token
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                success: res=>{
                    if(res.statusCode == 200){
                        resolve(res)
                    }else{
                        wx.showToast({
                            title: '服务器出错,请重试',
                            icon: 'none'
                        })
                    }
                },
                fail: err => {
                    wx.showToast({
                        title: '网络错误',
                        icon: 'none'
                    })
                    reject()
                }
            })
        })

        if (token == '') {
           return new Promise((resolve, reject) => {
                wx.showToast({
                    title: '状态失效，请关闭小程序后，重新打开',
                    icon: 'none'
                })
                reject()
            })
        } else {
            return promise
        }
    }

}

let request = new Request();

module.exports = {
    get: request.getApi
}