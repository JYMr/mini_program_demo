const addressController = require('../../controllers/addressController').controller;
const groupBuyController = require('../../controllers/groupBuyController').controller;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        GroupId: '',
        OrderData: {},
        PayWay: 2,
        AddressId: '',
        ReMark: '',
        PayListStatus: false, //选择支付方式列表
        DefaultImage: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                id: options.id
            });
        }
        if (options.gid) {
            this.setData({
                GroupId: options.gid
            });
        }

        //获取全局默认图片底图
        this.setData({
            DefaultImage: app.globalData.defaultImg,
            cashStatus: app.globalData.cashStatus
        });

        this.GetOrderData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.Dialog = this.selectComponent('#Dialog');
        this.AddressEdit = this.selectComponent('#AddressEdit');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (app.globalData.AddressId) {
            //选择地址返回，加载选择地址数据
            this.setData({
                AddressId: app.globalData.AddressId
            });
            //查询选择的地址
            this.GetAddress();
            //清除公共存储，选择的地址id
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
            p_id: this.data.id,
            group_id: this.data.GroupId
        }).then(res => {
            if (res.done) {
                let _AddressId = res.result.defalutUserAddr ? res.result.defalutUserAddr.addr_id : '';
                this.setData({
                    OrderData: res.result,
                    AddressId: _AddressId
                });
                wx.hideLoading();
            }
        });
    },
    //查询选择地址数据
    GetAddress() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });

        addressController.getAddressById({
            addr_id: this.data.AddressId
        }).then(res => {
            if (res.done) {
                let _orderData = this.data.OrderData;
                //组合地址信息
                _orderData.defalutUserAddr = Object.assign(_orderData.defalutUserAddr || {}, res.result.userAddr);

                this.setData({
                    OrderData: _orderData
                });
            } else {
                this.Dialog.ShowDialog({
                    title: res.msg || '拉去数据异常，请重试!',
                    type: 'Message',
                    messageType: 'fail'
                });
            }
            wx.hideLoading();
        });
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
        });
    },
    //切换支付方式
    choosePayWay(e) {
        let type = e.currentTarget.dataset.type;
        this.setData({
            PayWay: type,
            PayListStatus: false
        });
    },
    //提交订单
    ConfirmOrder() {
        if (this.data.AddressId == '') {
            this.Dialog.ShowDialog({
                title: '请添加收货地址!',
                type: 'Message',
                messageType: 'fail'
            });
            return;
        }
        wx.showLoading({
            title: '提交订单中...',
            mask: true
        });
        groupBuyController.CreatePurchaseOrder({
            p_id: this.data.id,
            group_id: this.data.GroupId,
            remark: this.data.ReMark,
            addrId: this.data.AddressId,
            payWay: this.data.PayWay,
            orderPrice: this.data.OrderData.totalPrice
        }).then(res => {
            if (res.done) {
                wx.requestPayment({
                    timeStamp: res.result.timeStamp,
                    nonceStr: res.result.nonceStr,
                    package: res.result.package,
                    signType: res.result.signType,
                    paySign: res.result.paySign,
                    success: res => {
                        this.Dialog.ShowDialog({
                            title: '支付成功!',
                            type: 'Message'
                        });
                    },
                    fail: res => {
                        this.Dialog.ShowDialog({
                            title: '支付取消!',
                            type: 'Message'
                        });
                    }
                });
            } else {
                this.Dialog.ShowDialog({
                    title: res.msg || '提交支付失败，请重试!',
                    type: 'Message',
                    messageType: 'fail'
                });
            }
            wx.hideLoading();
        })
    },
    //备注输入绑定
    BindChange(e) {
        let _val = e.detail.value;
        this.setData({
            ReMark: _val
        });
    },
    ErrorImage(e) {
        app.errImg(e, this);
    }
})