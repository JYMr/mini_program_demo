const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

/**
 * 每一个页面对应一个contoller
 */
class IndexController {

    /**
     * 获取首页数据
     * @return {Promise}
     */
    getIndex() {
        return request.get(`${URI}/api/getIndexActivityAndReGoodsAndPurchase.shtml`).then(res => res.data)
    }

    /**
     * 获取全局设置数据
     * @return {Promise}
     */
    GetParameter() {
        return request.get(`${URI}/api/getParameter.shtml`).then(res => res.data)
    }

    /**
     * 获取红点标识
     * @return {Promise}
     */
    GetCartCountAndOrderCount() {
        return request.get(`${URI}/api/getCartCountAndOrderCount.shtml`).then(res => res.data)
    }

     /**
     * 登录
     * @return {Promise}
     */
    UserApiLogin(params) {
        return request.get(`${URI}/api/userApiLogin.shtml`, params, false).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let indexController = new IndexController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
    controller: indexController,
}