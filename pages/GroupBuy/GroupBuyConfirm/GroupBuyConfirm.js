const app = getApp()
const orderController = require('../../controllers/orderController').controller;
const groupBuyController = require('../../controllers/groupBuyController').controller;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        GoodsId: '',
        GroupId: '',
        OrderData: {},
        PayWay: 0,
        AddressId: '',
        ReMark: '',
        PayListStatus: false //选择支付方式列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                GoodsId: options.id
            })
        }
        if (options.gid) {
            this.setData({
                GroupId: options.gid
            })
        }
        this.GetOrderData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.AddressEdit = this.selectComponent('#AddressEdit')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (app.globalData.AddressId) {
            //查询新地址
            this.setData({
                AddressId: app.globalData.AddressId
            });
            this.GetAddress();
            app.globalData.AddressId = '';
        }
    },
    //查询订单信息
    GetOrderData() {
        //注意区分用户新下拼团单和支付已有拼团单
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        groupBuyController.getConfirmGroupBuyOrder({
            id: this.data.GoodsId,
            gid: this.data.GroupId
        }).then(res => {
            if (res.status == 0) {
                this.setData({
                    OrderData: res.data
                })
                wx.hideLoading();
            }
        })
    },
    //查询选择地址数据
    GetAddress() {
         wx.showLoading({
            title: '加载数据中...',
            mask: true
        });

        orderController.getAddress({
            id: this.data.AddressId
        }).then(res => {
            if (res.status == 0) {
                let _orderData = this.data.OrderData;
                console.log(_orderData)
                _orderData.Address = res.data;
                this.setData({
                    OrderData: _orderData
                })
                wx.hideLoading();
            }
        })
    },
    //显示添加地址
    ShowEdit() {
        this.AddressEdit.ShowEdit();
    },
    //添加地址
    AddAddress(e) {
        let id = e.detail.id;
        if (id != undefined) {
            this.setData({
                AddressId: id
            });
            this.GetAddress();
        }
    },
    //显示支付列表
    ShowPayList() {
        this.setData({
            PayListStatus: true
        })
    },
    //切换支付方式
    choosePayWay(e) {
        let type = e.currentTarget.dataset.type;
        this.setData({
            PayWay: type,
            PayListStatus: false
        })
    },
    //提交订单
    ConfirmOrder() {
        console.log('提交订单');
        wx.redirectTo({
            url: '/pages/GroupBuy/GroupBuyShare/GroupBuyShare?id=3'
        })
    },
    //备注输入绑定
    BindChange(e) {
        let _val = e.detail.value;
        this.setData({
            ReMark: _val
        })
    }
})