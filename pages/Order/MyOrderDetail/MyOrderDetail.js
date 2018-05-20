// pages/cart/detail.js
const app =getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        OrderData: {
            id: '1658',
            status: 2,
            orderPrice: 25.90,
            isNeedExpress: true,
            total: 8,
            orderNumber: '1156132213',
            orderTime: '1526542446',
            ExpressNumber: '2515446551321321',
            ExpressName: '申通快递',
            goods_list: [{
                    id: 1516,
                    src: '',
                    title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶',
                    total: 5,
                    spec_type: '盒',
                    goods_type: '4',
                    isGroup: true,
                    price: 25.90
                },
                {
                    id: 1516,
                    src: '',
                    title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶',
                    total: 1,
                    spec_type: '盒',
                    goods_type: '4',
                    isGroup: false,
                    price: 25.90
                }
            ],
            Address: {
                id: 564,
                name: '张晓峰',
                mobile: 18858424268,
                province: '广东省',
                city: '湛江市',
                area: '霞山区',
                address: '万达广场附近大厦电子科技有限公司（ 产品研发部3室）',
                isDefault: true
            },
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.GetOrderDetail();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.Dialog = this.selectComponent('#Dialog');
        this.CustomerServiceComponent = this.selectComponent('#CustomerService');
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
        this.HandleData();
        wx.hideLoading();
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