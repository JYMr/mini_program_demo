const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

class CartController {
    /**
     * 获取购物车数据
     * @return {Promise}
     */
    getCartData(params) {
        return request.get(`${URI}/api/getShopCartByShopcart.shtml`, params).then(res => res.data)
    }

    /**
     * 更改购物车选中状态
     * @return {Promise}
     */
    setCartChoose(params) {
        return request.get(`${URI}/setCartChoose`, params).then(res => res.data)
    }

    /**
     * 更改购物车数量
     * @return {Promise}
     */
    setCartTotal(params) {
        return request.get(`${URI}/api/updateShopCart.shtml`, params).then(res => res.data)
    }

    /**
     * 删除购物车
     * @return {Promise}
     */
    delCart(params) {
        return request.get(`${URI}/api/deleteShopCartIds.shtml`, params).then(res => res.data)
    }

    /**
     * 加入购物车
     * @return {Promise}
     */
    addCart(params) {
        return request.get(`${URI}/api/insertShopCart.shtml`, params).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let cartController = new CartController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
    controller: cartController,
}