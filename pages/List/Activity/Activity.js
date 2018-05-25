// pages/List/Activity/Activity.js
const activityControllers = require('../../controllers/activityController.js').controller;
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 214864,
        activityData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                id: options.id
            })
            this.getActivityData();
        }
    },
    getActivityData() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        activityControllers.getAddressData({
            id: this.data.id
        }).then(res => {
            if (res.status == 0) {
                this.setData({
                    activityData: res.data
                })
            }
            wx.hideLoading();
        })
    },
    //拨打电话
    calling: function() {
        app.calling()
    }

})