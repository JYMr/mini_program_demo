const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

class OrderController {

    /**
     * 商品数据(单件购买)
     * @return {Promise}
     */
    getOneData(params) {
        return request.get(`${URI}/getOneData`, params).then(res => res.data)
    }

    /**
     * 商品数据(购物车结算)
     * @return {Promise}
     */
    getCartData(params) {
        return request.get(`${URI}/getCartData`, params).then(res => res.data)
    }

    /**
     * 地址数据
     * @return {Promise}
     */
    getAddress(params) {
        return request.get(`${URI}/getAddressById`, params).then(res => res.data)
    }

    /**
     * 订单列表
     * @return {Promise}
     */
    getOrder(params) {
        return request.get(`${URI}/api/getMyOrderList.shtml`, params).then(res => res.data)
    }

    /**
     * 订单详情
     * @return {Promise}
     */
    getOrderDetail(params) {
        return request.get(`${URI}/api/getOrderInfo.shtml`, params).then(res => res.data)
    }

    /**
     * 售后列表
     * @return {Promise}
     */
    GetAfterSalesList(params) {
        return request.get(`${URI}/api/getAfterSalesList.shtml`, params).then(res => res.data)
    }

    /**
     * 售后详情
     * @return {Promise}
     */
    GetAfterSalesInfo(params) {
        return request.get(`${URI}/api/getAfterSalesInfo.shtml`, params).then(res => res.data)
    }

    /**
     * 需求列表
     * @return {Promise}
     */
    GetNeedOrderList(params) {
        return request.get(`${URI}/api/getNeedOrderList.shtml`, params).then(res => res.data)
    }

    /**
     * 取消订单
     * @return {Promise}
     */
    CancelOrder(params) {
        return request.get(`${URI}/api/cancelOrder.shtml`, params).then(res => res.data)
    }

    /**
     * 确认收货订单
     * @return {Promise}
     */
    SubmitReceiving(params) {
        return request.get(`${URI}/api/submitReceiving.shtml`, params).then(res => res.data)
    }

    /**
     * 申请售后
     * @return {Promise}
     */
    ApplyAfterSales(params) {
        return request.get(`${URI}/api/applyAfterSales.shtml`, params).then(res => res.data)
    }

    /**
     * 删除订单
     * @return {Promise}
     */
    DeleteOrder(params) {
        return request.get(`${URI}/api/deleteOrder.shtml`, params).then(res => res.data)
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