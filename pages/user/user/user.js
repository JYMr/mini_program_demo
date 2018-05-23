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
        this.GetOrderNum()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    //获取订单数据
    GetOrderNum() {
        wx.showLoading({
            mask: true
        });
        userController.getUserData().then(res => {
            if (res.status == 0) {
                this.setData({
                    OrderNum: res.data
                })
            }
            wx.hideLoading();
        })
    }
})