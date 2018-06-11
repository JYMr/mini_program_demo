// pages/cart/detail.js
const orderController = require('../../controllers/orderController').controller;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Status: 0, //0： 普通订单状态, 1: 售后订单状态
        OrderId: '',
        OrderData: {},
        DefaultImage: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                OrderId: options.id
            })
        }

        if (options.status) {
            this.setData({
                OrderId: options.status
            })
        }

        this.GetOrderData();

        //获取全局默认图片底图
        this.setData({
            DefaultImage: app.globalData.defaultImg
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.Dialog = this.selectComponent('#Dialog');
        this.CustomerServiceComponent = this.selectComponent('#CustomerService');
        this.Floatcustomer = this.selectComponent("#Floatcustomer");
    },
    //加载数据
    GetOrderData() {
        if (this.data.Status == 1) {
            this.GetAfterSalesInfo();
        } else {
            this.GetOrderDetail();
        }
    },
    //获取订单详细数据
    GetOrderDetail() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        orderController.getOrderDetail({
            orderId: this.data.OrderId
        }).then(res => {
            if (res.done) {
                this.setData({
                    OrderData: res.result.orderInfo
                })
            }
            wx.hideLoading();
        })
    },
    //获取售后订单详细数据
    GetAfterSalesInfo() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        orderController.GetAfterSalesList({
            orderId: this.data.OrderId
        }).then(res => {
            if (res.done) {
                this.setData({
                    OrderData: res.result.orderInfo
                })
            }
            wx.hideLoading();
        })
    },
    //取消订单
    CancelOrder(e) {
        let _id = this.data.OrderId;

        this.Dialog.ShowDialog({
            title: '亲，真的不想买了么？',
            type: 'Confirm',
            btnArray: [
                { title: '是', name: 'yes' },
                { title: '否', name: 'no' }
            ],
            callback: res => {
                if (res.name == 'yes') {
                    //请求
                    wx.showLoading({
                        title: '提交中...',
                        mask: true
                    });
                    orderController.CancelOrder({
                        orderId: _id
                    }).then(res => {
                        if (res.done) {
                            this.Dialog.ShowDialog({
                                title: res.msg || '取消成功!',
                                type: 'Message'
                            });
                            //刷新数据
                            setTimeout(() => {
                                //等待动画
                                this.ReloadOrderData();
                            }, 1500)
                        } else {
                            this.Dialog.ShowDialog({
                                title: res.msg || '取消失败，请重试!',
                                type: 'Message',
                                messageType: 'fail'
                            });
                        }
                        wx.hideLoading();
                    })
                }
                this.Dialog.CloseDialog();
            }
        })
    },
    //物流单号
    ExpressNumber(e) {
        let _id = this.data.OrderId;
        let _expressName = this.data.OrderData.logisticsCompany;
        let _expressNumber = this.data.OrderData.logisticsCode;

        let _title = _expressName + _expressNumber;

        this.Dialog.ShowDialog({
            title: _title || '暂无单号信息',
            type: 'Confirm',
            btnArray: [
                { title: '复制', name: 'copy' },
                { title: '取消', name: 'cancel' }
            ],
            callback: res => {
                if (res.name == 'copy') {

                    //调用复制API
                    wx.setClipboardData({
                        data: _expressNumber,
                        success: res => {
                            this.Dialog.CloseDialog();
                            this.Dialog.ShowDialog({
                                title: '复制成功',
                                type: 'Message'
                            });
                        },
                        fail: err => {
                            this.Dialog.CloseDialog();
                            this.Dialog.ShowDialog({
                                title: '复制失败',
                                type: 'Message',
                                messageType: 'fail'
                            });
                        }
                    });

                }
                this.Dialog.CloseDialog();
            }
        })
    },
    //申请售后
    CustomerService(e) {
        let _code = e.currentTarget.dataset.code;
        let disabledStatus = e.currentTarget.dataset.disabled;
        if (!disabledStatus) {
            this.CustomerServiceComponent.Show({
                code: _code
            });
        } else {
            this.Dialog.ShowDialog({
                title: '该订单已经申请过售后，请等待商家处理!',
                type: 'Alert',
                callback: res => {
                    if (res) {
                        this.Dialog.CloseDialog();
                    }
                }
            });
        }
    },
    //处理售后弹窗回调
    CustomerServiceFn(e) {
        let _code = e.detail.code;
        let _type = e.detail.type;
        let _reason = e.detail.reason;
        let _name = e.detail.name;
        let _mobile = e.detail.mobile;
        this.CustomerServiceComponent.Close();

        //请求
        wx.showLoading({
            title: '提交中...',
            mask: true
        });
        orderController.ApplyAfterSales({
            orderCode: _code,
            aftersalesType: _type,
            aftersalesReason: _reason,
            aftersalesCustomerName: _name,
            aftersalesCustomerMobile: _mobile
        }).then(res => {
            if (res.done) {
                this.Dialog.ShowDialog({
                    title: res.msg || '申请售后成功!',
                    type: 'Message'
                });
                //刷新数据
                setTimeout(() => {
                    //等待动画
                    this.GetOrderData();
                }, 1500)
            } else {
                this.Dialog.ShowDialog({
                    title: res.msg || '申请售后失败，请重试!',
                    type: 'Message',
                    messageType: 'fail'
                });
            }
            wx.hideLoading();
        })
    },
    //再次购买
    BuyingAgain(e) {
        let _id = this.data.OrderId;
        console.log('再次购买 - id:' + _id);
    },
    //邀请参团
    InviteJoin(e) {
        let _id = this.data.OrderId;
        console.log('邀请参团 - id:' + _id);
        wx.navigateTo({
            url: '/pages/GroupBuy/GroupBuyShare/GroupBuyShare?id' + _id
        })
    },
    //确认收货
    ConfirmOrder(e) {
        let _id = this.data.OrderId;
        console.log('确认收货 - id:' + _id);
        //确认弹窗
        this.Dialog.ShowDialog({
            title: '亲，已经收到货了么？',
            type: 'Confirm',
            btnArray: [
                { title: '是', name: 'yes' },
                { title: '否', name: 'no' }
            ],
            callback: res => {
                if (res.name == 'yes') {
                    console.log('确认收货');
                    //请求
                    wx.showLoading({
                        title: '提交中...',
                        mask: true
                    });
                    orderController.SubmitReceiving({
                        orderId: _id
                    }).then(res => {
                        if (res.done) {
                            this.Dialog.ShowDialog({
                                title: res.msg || '确认收货成功',
                                type: 'Message'
                            });
                            //刷新数据
                            setTimeout(() => {
                                //等待动画
                                this.GetOrderData();
                            }, 1500)
                        } else {
                            this.Dialog.ShowDialog({
                                title: res.msg || '确认收货失败，请重试!',
                                type: 'Message',
                                messageType: 'fail'
                            });
                        }
                        wx.hideLoading();
                    })
                }
                this.Dialog.CloseDialog();
            }
        })
    },
    //支付
    PayToOrder(e) {
        let _id = this.data.OrderId;
        console.log('支付 - id:' + _id);
    },
    //删除订单
    DeleteOrder(e) {
        let _id = this.data.OrderId;

        this.Dialog.ShowDialog({
            title: '亲，真的要删除该订单吗？',
            type: 'Confirm',
            btnArray: [
                { title: '是', name: 'yes' },
                { title: '否', name: 'no' }
            ],
            callback: res => {
                if (res.name == 'yes') {

                    wx.showLoading({
                        title: '提交中...',
                        mask: true
                    });

                    orderController.DeleteOrder({
                        orderId: _id
                    }).then(res => {
                        if (res.done) {
                            this.Dialog.ShowDialog({
                                title: res.msg || '删除订单成功',
                                type: 'Message'
                            });
                            //刷新数据
                            setTimeout(() => {
                                //等待动画
                                this.GetOrderData();
                            }, 1500)
                        } else {
                            this.Dialog.ShowDialog({
                                title: res.msg || '删除订单失败，请重试!',
                                type: 'Message',
                                messageType: 'fail'
                            });
                        }
                        wx.hideLoading();
                    })

                }
            }
        })
    },
    ErrorImage(e) {
        app.errImg(e, this);
    }
})