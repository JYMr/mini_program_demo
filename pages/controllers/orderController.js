const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

class OrderController {

    /**
     * 加载商品数据(单件购买)
     * @return {Promise}
     */
    getOneData(params) {
        return request.get(`${URI}/getOneData`, params).then(res => res.data)
    }

    /**
     * 加载商品数据(购物车结算)
     * @return {Promise}
     */
    getCartData(params) {
        return request.get(`${URI}/getCartData`, params).then(res => res.data)
    }

    /**
     * 加载地址数据
     * @return {Promise}
     */
    getAddress(params) {
        return request.get(`${URI}/getAddressById`, params).then(res => res.data)
    }

    /**
     * 加载订单列表
     * @return {Promise}
     */
    getOrder(params) {
        return request.get(`${URI}/api/getMyOrderList.shtml`, params).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let orderController = new OrderController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
    controller: orderController
}