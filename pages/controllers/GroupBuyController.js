const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = 'https://4a0096a3-fd57-474d-9724-ed37426b5f75.mock.pstmn.io';

/**
 * 每一个页面对应一个contoller
 */
class GroupBuyController{
    /**
     * 获取拼团数据
     * @return {Promise}
     */
    GetList(params){
        return request.get(`${URI}/GetGroupBuyList`, params).then(res => res.data)
    }

    /**
     * 获取拼团商品数据
     * @return {Promise}
     */
    GetDetail(params){
        return request.get(`${URI}/GetGroupBuyDetail`, params).then(res => res.data)
    }

    GetRecommend(params){
        return request.get(`${URI}/GetRecommend`, params).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let groupbuyController=  new GroupBuyController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = { 
    controller:groupbuyController,
 }