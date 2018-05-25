const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

/**
 * 每一个页面对应一个contoller
 */
class IndexController{
    /**
     * 抓取首页布局
     * @return {Promise}
     */
    getIndex(){
        return request.get(`${URI}/getIndex`).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let indexController=  new IndexController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = { 
    controller:indexController,
 }