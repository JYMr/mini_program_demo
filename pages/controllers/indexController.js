const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = 'https://4a0096a3-fd57-474d-9724-ed37426b5f75.mock.pstmn.io';

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