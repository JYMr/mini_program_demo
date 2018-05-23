const BASE_URL = "";

class Request {
    /**
     * 抓取API数据
     * @param  {String} url    链接
     * @param  {Objece} params 参数
     * @return {Promise}       包含抓取任务的Promise
     */
    getApi(url, params) {
        let token = wx.getStorageSync('token') || '';
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${BASE_URL}${url}`,
                data: Object.assign({}, {'token': token}, params),//置入token
                header: { 'Content-Type': 'application/json' },
                success: resolve,
                fail: reject
            })
        })
    }

}

let request = new Request();

module.exports = {
    get: request.getApi
}