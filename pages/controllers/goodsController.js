const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = 'http://m.kzj365.com/';

/**
 * 每一个页面对应一个contoller
 */
class GoodsController{
    /**
     * 抓取首页布局
     * @return {Promise}
     */
    getHomeLayout(e){
      return request.get('${URI}/ajaxWapGoodsDetail.htm').then(res => res.data)
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