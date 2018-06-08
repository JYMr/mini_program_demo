// pages/user/myreservation.js
const orderController = require('../../controllers/orderController').controller;
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Status: "",
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
        var that = this;
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        orderController.GetNeedOrderList({
            needStatus: this.data.Status,
            pageNo: this.data.ListNo
        }).then(res => {
            if (res.done) {
                this.setData({
                    OrderList: this.data.OrderList.concat(res.result.needList.list),
                    ListNo: res.result.needList.nextPage,
                    isEnd: this.data.ListNo == res.result.needList.totalPage
                })
            } else {
                wx.showToast({
                    title: res.msg || '服务器错误',
                    icon: 'none'
                })
            }
            wx.hideLoading();
        })
    },
    //切换订单状态
    TabToggle(e) {
        let _Status = e.currentTarget.dataset.status;
        this.setData({
            OrderList: [],
            Status: _Status,
            ListNo: 1
        })
        this.GetOrderList();
    },
    //取消预定
    CancelPeservation(e) {
        let _id = e.currentTarget.dataset.id;
        console.log('取消预定 - id:' + _id);

        this.Dialog.ShowDialog({
            title: '亲，是否取消该预定？',
            type: 'Confirm',
            btnArray: [
                { title: '是', name: 'yes' },
                { title: '否', name: 'no' }
            ],
            callback: res => {
                if (res.name == 'yes') {
                    console.log('取消');
                }
                this.Dialog.CloseDialog();
            }
        })
    },
    //申请售后
    CustomerService(e) {
        let _id = e.currentTarget.dataset.id;
        console.log('申请售后 - id:' + _id);
        this.CustomerServiceComponent.Show({
            id: _id
        });
    },
    //处理售后弹窗回调
    CustomerServiceFn(e) {
        console.log(e)
        let _id = e.detail.id;
        this.CustomerServiceComponent.Close();
    },
    //重新提交
    AgainPeservation(e) {
        let _id = e.currentTarget.dataset.id;
        console.log('重新提交 - id:' + _id);
    },
    //删除预定
    DeletePeservation(e) {
        let _id = e.currentTarget.dataset.id;
        console.log('预定 - id:' + _id);
        this.Dialog.ShowDialog({
            title: '亲，是否删除该预定？',
            type: 'Confirm',
            btnArray: [
                { title: '是', name: 'yes' },
                { title: '否', name: 'no' }
            ],
            callback: res => {
                if (res.name == 'yes') {
                    console.log('取消');
                }
                this.Dialog.CloseDialog();
            }
        })
    }
})