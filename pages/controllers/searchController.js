const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

/**
 * 每一个页面对应一个contoller
 */
class SearchController{
    /**
     * 获取扫码放回
     * @return {Promise}
     */
    ScalCode(params){
        return request.get(`${URI}/api/searchBarcode.shtml`, params).then(res => res.data)
    }

    /**
     * 获取搜索关键词列表
     * @return {Promise}
     */
    GetSearchKeyWord(params){
        return request.get(`${URI}/api/searchGoodsName.shtml`, params).then(res => res.data)
    }

    /**
     * 获取搜索列表
     * @return {Promise}
     */
    GetSearchList(params){
        return request.get(`${URI}/getSearchList`, params).then(res => res.data)
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