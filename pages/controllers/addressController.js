const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = 'https://api.77lemon.top/';

/**
 * 每一个页面对应一个contoller
 */
class AddressController{
    /**
     * 获取地址数据
     * @return {Promise}
     */
    getAddressData(e){
    	const r = {data: [{id: 564,name: '张晓峰',mobile: '18858424268',province: '广东省',city: '湛江市',area: '霞山区',address: '万达广场附近大厦电子科技有限公司（产品研发部3室）',isDefault: true},{id: 5264,name: '张晓峰',mobile: '18858424268',province: '广东省',city: '湛江市',area: '霞山区',address: '万达广场附近大厦电子科技有限公司（产品研发部3室）',isDefault: false},{id: 56124,name: '张晓峰',mobile: '18858424268',province: '广东省',city: '湛江市',area: '霞山区',address: '万达广场附近大厦电子科技有限公司（产品研发部3室）',isDefault: false}]};
    	return request.get(`${URI}Api.htm?method=getProductList`).then(res => r.data)
    }
     /**
     * 更改地址默认状态
     * @return {Promise}
     */
    setAddressDefault(e){
    	return request.get(`${URI}Api.htm?method=getProductList`).then(res => r.data)
    }

}
/**
 * 实例化对象
 */
let addressController = new AddressController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = { 
  controller: addressController,
 }