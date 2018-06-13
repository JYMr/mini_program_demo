// pages/user/CustomerService/CustomerService.js
const orderController = require('../../controllers/orderController').controller;
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Status: 1,
        OrderList: [],
        ListNo: 1,
        ListSize: 8,
        isEnd: false,
        DefaultImage: '' //默认底图
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.status) {
            this.setData({
                Status: options.status
            })
        }

        this.setData({
            DefaultImage: app.globalData.defaultImg
        })

        this.GetOrderList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.Dialog = this.selectComponent('#Dialog');
        this.CustomerServiceComponent = this.selectComponent('#CustomerService');
        this.Floatcustomer = this.selectComponent("#Floatcustomer");
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.data.isEnd) return;
        this.GetOrderList();
    },
    //获取订单数据
    GetOrderList() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        orderController.GetAfterSalesList({
            aftersalesStatus: this.data.Status,
            pageNo: this.data.ListNo
        }).then(res => {
            if (res.done) {
                this.setData({
                    OrderList: this.data.OrderList.concat(res.result.orderList.list),
                    isEnd: this.data.ListNo == res.result.orderList.totalPage
                })
            } else {

            }
            wx.hideLoading();
        })
    },
    //切换订单状态
    TabToggle(e) {
        let _Status = e.currentTarget.dataset.status;
        this.setData({
            Status: _Status,
            ListNo: 1,
            OrderList: []
        })
        this.GetOrderList();
    },
    ErrorImage(e) {
        app.errImg(e, this);
    }
})