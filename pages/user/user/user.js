const app = getApp()
const userController = require('../../controllers/userController').controller

Page({
    data: {
        OrderNum: {
            notpay: 0,
            share: 0,
            notdelivery: 0,
            deliveryed: 0
        },
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isOpenCustomerService: false
    },
    onLoad: function(options) {

        //在线客服开启状态
        this.setData({
            isOpenCustomerService: app.globalData.isOpenCustomerService
        })

        this.GetOrderNum();
    },
    onReady() {
        this.MenuCustomer = this.selectComponent('#MenuCustomer');
    },
    //获取订单数量
    GetOrderNum() {
        wx.showLoading({
            mask: true
        });
        userController.getUserData().then(res => {
            if (res.done) {
                this.setData({
                    OrderNum: res.result
                })
            }
            wx.hideLoading();
        })
    },
    //开启客服菜单
    OpenMenuCustomer() {
        this.MenuCustomer.ShowMenu(false);
    }
})