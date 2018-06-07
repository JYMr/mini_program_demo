// pages/cart/detail.js
const orderController = require('../../controllers/orderController').controller;
const app =getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        OrderId: '',
        OrderData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if(options.id){
            this.setData({
                OrderId: options.id
            })
            this.GetOrderDetail();
        }
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
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    //获取订单详细数据
    GetOrderDetail(){
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        orderController.getOrderDetail({
            orderId: this.data.OrderId
        }).then(res=>{
            if(res.done){
                this.setData({
                    OrderData: res.result.orderInfo
                })
            }
            wx.hideLoading();
        })
        this.HandleData();
    },
    //处理数据
    HandleData() {
        let _Data = this.data.OrderData;
        let date = new Date(_Data.orderTime * 1000);

        _Data.orderTime = app.Util.handleDate.formatTime(date);

        this.setData({
            OrderData: _Data
        })
    },

    //取消订单
    CancelOrder(e) {
        let _id = this.data.OrderData.id;
        console.log('取消订单 - id:' + _id);

        this.Dialog.ShowDialog({
            title: '亲，真的不想买了么？',
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
    //物流单号
    ExpressNumber(e) {
        let _id = this.data.OrderData.id;
        let _expressName = this.data.OrderData.ExpressName;
        let _expressNumber = this.data.OrderData.ExpressNumber;

        let _title = _expressName + _expressNumber;
        console.log('物流单号 - id:' + _id);

        this.Dialog.ShowDialog({
            title: _title || '暂无单号信息',
            type: 'Confirm',
            btnArray: [
                { title: '复制', name: 'copy' },
                { title: '取消', name: 'cancel' }
            ],
            callback: res => {
                if (res.name == 'copy') {
                    console.log('物流单号');

                    //调用复制API
                    wx.setClipboardData({
                        data: _expressNumber,
                        success: res=>{
                            this.Dialog.CloseDialog();
                            this.Dialog.ShowDialog({
                                title: '复制成功',
                                type: 'Message'
                            });
                        },
                        fail: err=>{
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
        let _id = this.data.OrderData.id;
        console.log('申请售后 - id:' + _id);
        this.CustomerServiceComponent.Show({
            id: _id
        });
    },
    //处理售后弹窗回调
    CustomerServiceFn(e){
        console.log(e)
        let _id = e.detail.id;
        this.CustomerServiceComponent.Close();
    },
    //再次购买
    BuyingAgain(e) {
        let _id = this.data.OrderData.id;
        console.log('再次购买 - id:' + _id);
    },
    //邀请参团
    InviteJoin(e) {
        let _id = this.data.OrderData.id;
        console.log('邀请参团 - id:' + _id);
        wx.navigateTo({
            url: '/pages/GroupBuy/GroupBuyShare/GroupBuyShare?id' + _id
        })
    },
    //确认收货
    ConfirmOrder(e) {
        let _id = this.data.OrderData.id;
        console.log('确认收货 - id:' + _id);
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
                }
                this.Dialog.CloseDialog();
            }
        })
    },
    //支付
    PayMent(e) {
        let _id = this.data.OrderData.id;
        console.log('支付 - id:' + _id);
    },
    //删除订单
    DeleteOrder(e){
        let _id = this.data.OrderData.id;
        console.log('支付 - id:' + _id);
    }
})