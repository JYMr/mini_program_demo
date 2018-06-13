// pages/order/order.js
const orderController = require('../../controllers/orderController').controller;
const addressController = require('../../controllers/addressController').controller;
const app = getApp();

Page({
    data: {
        Mode: 0, //订单提交模式： 0 购物车结算  1 单件购买
        GoodsId: '',
        CartsIdList: '',
        type: '', //type
        num: '',
        OrderData: {},
        PayWay: 2,
        AddressId: '',
        ReMark: '',
        cashStatus: '', //货到付款状态 true为开启
        PayListStatus: false, //选择支付方式列表
        DefaultImage: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.mode) {
            this.setData({
                Mode: options.mode
            })
        }
        if (options.id) {
            if (this.data.Mode == 0) {
                this.setData({
                    CartsIdList: options.id
                })
            } else {
                this.setData({
                    GoodsId: options.id
                })
            }
        }
        if (options.num) {
            this.setData({
                num: options.num
            })
        }

        //获取全局默认图片底图
        this.setData({
            DefaultImage: app.globalData.defaultImg,
            cashStatus: app.globalData.cashStatus
        })

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
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });

        if (this.data.Mode == 0) {
            //购物车结算
            orderController.SubmitShopCart({
                shopcartIds: this.data.CartsIdList
            }).then(res => {
                if (res.done) {
                    let _AddressId = res.result.defalutUserAddr ? res.result.defalutUserAddr.addr_id : '';
                    this.setData({
                        OrderData: res.result,
                        AddressId: _AddressId
                    })
                    wx.hideLoading();
                }
            })
        } else {
            //单间商品提交
            orderController.getOneData({
                shopcart_goods_id: this.data.GoodsId,
                shopcart_num: this.data.num,
                shopcart_type: 1
            }).then(res => {
                if (res.done) {
                    let _AddressId = res.result.defalutUserAddr ? res.result.defalutUserAddr.addr_id : '';
                    this.setData({
                        OrderData: res.result,
                        AddressId: _AddressId,
                        CartsIdList: res.result.shopCartApi.shopcart_id
                    })
                    wx.hideLoading();
                }
            })
        }
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
                _orderData.defalutUserAddr = Object.assign(_orderData.defalutUserAddr || {}, res.result.userAddr);
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
        let id = e.detail.addr_id;
        if (id != undefined) {
            this.setData({
                AddressId: id
            });
            this.AddressEdit.CloseEdit();
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
        wx.showLoading({
            title: '提交订单中...',
            mask: true
        });
        if (this.data.AddressId == '') {

            return;
        }
        orderController.CreateOrder({
            addrId: this.data.AddressId,
            shopCartIds: this.data.CartsIdList,
            orderPrice: this.data.OrderData.totalPrice,
            remark: this.data.ReMark,
            payWay: this.data.PayWay
        }).then(res => {
            if (res.done) {
                wx.requestPayment({
                    'timeStamp': res.result.timeStamp,
                    'nonceStr': res.result.nonceStr,
                    'package': res.result.package,
                    'signType': res.result.signType,
                    'paySign': res.result.paySign,
                    'success': function(res) {
                        console.log(res)
                    },
                    'fail': function(res) {
                        console.log(res)
                    }
                })
            }
        })
    },
    //备注输入绑定
    BindChange(e) {
        let _val = e.detail.value;
        this.setData({
            ReMark: _val
        })
    },
    ErrorImage(e) {
        app.errImg(e, this);
    }
})