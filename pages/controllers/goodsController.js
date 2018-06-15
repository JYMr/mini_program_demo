const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

/**
 * 每一个页面对应一个contoller
 */
class GoodsController {
    /**
     * 加载商品数据
     * @return {Promise}
     */
    getGoodsDetail(params) {
        return request.get(`${URI}/api/getGoodsDetailByGoodsId.shtml`, params).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let goodsController = new GoodsController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
    controller: goodsController,
}