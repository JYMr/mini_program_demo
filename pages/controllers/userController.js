const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

const URI = 'https://4a0096a3-fd57-474d-9724-ed37426b5f75.mock.pstmn.io';

class UserController {
    /**
     * 获取订单数量
     * @return {Promise}
     */
    getUserData(params) {
        return request.get(`${URI}/getUserData`, params).then(res => res.data)
    }

}
/**
 * 实例化对象
 */
let userController = new UserController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = {
    controller: userController,
}