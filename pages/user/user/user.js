const app = getApp()
const userController = require('../../controllers/userController').controller

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        OrderNum: [0, 0, 0, 0, 0],
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isOpenCustomerService: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        } else if (this.data.canIUse) {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo
                    })
                }
            })
        }
        this.setData({
            isOpenCustomerService: app.globalData.isOpenCustomerService
        })
        this.GetOrderNum()
    },
    onReady() {
        this.MenuCustomer = this.selectComponent('#MenuCustomer');
    },
    //获取订单数据
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
    Customer(){
        this.MenuCustomer.ShowMenu(false);
    }
})