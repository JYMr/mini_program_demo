const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        GoodsId: '',
        GroupId: '',
        OrderData: {
            Address: {
                /* id: 564,
                 name: '张晓峰',
                 mobile: 18858424268,
                 province: '广东省',
                 city: '湛江市',
                 area: '霞山区',
                 address: '万达广场附近大厦电子科技有限公司（ 产品研发部3室）',
                 isDefault: true*/
            },
            GoodsList: [{
                    id: 1516,
                    title: '仁和健途(jintoo)高级大胶原蛋白壳寡糖果味饮品480ml/瓶1',
                    imagesrc: '',
                    total: '5',
                    marketprice: '27.90',
                    goods_type: '4',
                    spec_type: '盒',
                    isChoose: '1',
                    GroupType: true
                },
                {
                    id: 1516,
                    title: '仁和健途(jintoo)高级大胶原蛋白壳寡糖果味饮品480ml/瓶1',
                    imagesrc: '',
                    total: '5',
                    marketprice: '27.90',
                    goods_type: '4',
                    spec_type: '盒',
                    isChoose: '1',
                    GroupType: false
                }
            ],
            TotalNum: 3,
            TotalPrice: 77.00,
            isNeedExpressPrice: false,
            cashStatus: false //货到付款状态
        },
        PayWay: 0,
        AddressId: '',
        ReMark: '',
        PayListStatus: false //选择支付方式列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if(options.id){
            this.setData({
                GoodsId: options.id
            })
        }
        if(options.gid){
             this.setData({
                GroupId: options.gid
            })
        }
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
    GetOrderData(){
        //注意区分用户新下拼团单和支付已有拼团单
    },
    //查询选择地址数据
    GetAddress() {

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