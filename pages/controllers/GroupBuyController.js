const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

/**
 * 每一个页面对应一个contoller
 */
class GroupBuyController {
    /**
     * 获取拼团数据
     * @return {Promise}
     */
    getList(params) {
        return request.get(`${URI}/api/queryPurchaseList.shtml`, params).then(res => res.data)
    }

    /**
     * 获取拼团商品数据
     * @return {Promise}
     */
    getDetail(params) {
        return request.get(`${URI}/api/getPurchaseDetails.shtml`, params).then(res => res.data)
    }

    /**
     * 获取拼团提交订单数据
     * @return {Promise}
     */
    getConfirmGroupBuyOrder(params) {
        return request.get(`${URI}/api/sumbitPurchaseOrder.shtml`, params).then(res => res.data)
    }

    /**
     * 创建拼团订单，提交支付
     * @return {Promise}
     */
    CreatePurchaseOrder(params) {
        return request.get(`${URI}/api/createPurchaseOrder.shtml`, params).then(res => res.data)
    }

    /**
     * 获取拼团分享数据数据
     * @return {Promise}
     */
    getGroupBuyShare(params) {
        return request.get(`${URI}/getGroupBuyShare`, params).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let groupbuyController = new GroupBuyController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
    controller: groupbuyController,
}