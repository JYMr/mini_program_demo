const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = 'https://4a0096a3-fd57-474d-9724-ed37426b5f75.mock.pstmn.io';

/**
 * 每一个页面对应一个contoller
 */
class SearchController{
    /**
     * 获取扫码放回
     * @return {Promise}
     */
    ScalCode(params){
        return request.get(`${URI}/scalCode`, params).then(res => res.data)
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
let searchController=  new SearchController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = { 
    controller:searchController,
 }