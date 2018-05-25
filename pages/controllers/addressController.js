const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = '';

class AddressController {
    /**
     * 获取地址数据
     * @return {Promise}
     */
    getAddressData(params) {
        return request.get(`${URI}/getAddressData`, params).then(res => res.data)
    }

    /**
     * 更改地址默认状态
     * @return {Promise}
     */
    setAddressDefault(params) {
        return request.get(`${URI}/setAddressDefault`, params).then(res => res.data)
    }

    /**
     * 添加地址
     * @return {Promise}
     */
    addAddress(params) {
        return request.get(`${URI}/addAddress`, params).then(res => res.data)
    }

    /**
     * 编辑地址
     * @return {Promise}
     */
    editAddress(params) {
        return request.get(`${URI}/editAddress`, params).then(res => res.data)
    }

    /**
     * 删除地址
     * @return {Promise}
     */
    delAddress(params) {
        return request.get(`${URI}/delAddress`, params).then(res => res.data)
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