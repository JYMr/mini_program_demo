const request = require('../../utils/kzj.request.js');
const linq = require('../../lib/linq.min.js').linq;

class MainController{


}

/**
 * 实例化对象
 */
let mainController=  new MainController();
/**
 * 暴露对象，无需每次都加函数名
 */
module.exports = { 
    controller:mainController,
 }