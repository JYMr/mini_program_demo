const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

/**
 * 每一个页面对应一个contoller
 */
class GoodsController{
    /**
     * 加载商品数据
     * @return {Promise}
     */
    getGoodsDetail(params){
      return request.get(`${URI}/getGoodsDetail`, params).then(res => res.data)
    }
	    
	/**
     * 加载商品规格数据
     * @return {Promise}
     */
     getGoodsSpec(params){
     	return request.get(`${URI}/getGoodsSpec`, params).then(res => res.data)
     }

     /**
     * 加入购物车
     * @return {Promise}
     */
     addCart(params){
     	return request.get(`${URI}/AddCart`, params).then(res => res.data)
     }

     /**
     * 加入预定清单
     * @return {Promise}
     */
     addRxCart(params){
     	return request.get(`${URI}/AddRxCart`, params).then(res => res.data)
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