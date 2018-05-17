// pages/cart.js
let app = getApp(); 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        CartList: [],
        editMode: false,
        isAllSelect: false,
        GoodsTotalNum: 0,
        GoodsTotalPrice: 0,
        MaxExpress: 99,//买满包邮
        ExpressPrice: '10',//运费
        ExpressText: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.GetCartList();

        if(app.globalData.userInfo){
            this.setData({
                hasUserInfo: true
            })
        }else if (this.data.canIUse) {
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.Dialog = this.selectComponent("#Dialog");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    //获取购物车数据
    GetCartList() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        let cartData = [{
                id: 1516,
                title: '仁和健途(jintoo)高级大胶原蛋白壳寡糖果味饮品480ml/瓶1',
                imagesrc: '',
                total: '5',
                stock: '56',
                marketprice: '27.90',
                productprice: '',
                goods_type: '4',
                spec_type: '盒',
                isChoose: '1',
                goods_group: [{
                    name: '3盒起480元；',
                    num: '3',
                    price: '25.90'
                },
                {
                    name: '5盒起480元；',
                    num: '5',
                    price: '21.90'
                }]
            },
            {
                id: 15126,
                title: '仁和健途(jintoo)高级大胶原蛋白壳寡糖果味饮品480ml/瓶2',
                imagesrc: '',
                total: '3',
                stock: '56',
                marketprice: '27.90',
                productprice: '',
                goods_type: '1',
                spec_type: '件',
                isChoose: '1',
                goods_group: [{
                    name: '3盒起480元；',
                    num: '3',
                    price: '25.90'
                }]
            }
        ];
        setTimeout(() => {
            this.setData({
                CartList: cartData
            })
            this.CheckAllSelect();
            this.handleGroup();
            this.ListTotal();
            wx.hideLoading();
        }, 500);
    },
    //处理优惠套餐
    handleGroup(){
        let _List = this.data.CartList;
        /*
        * 这里可更改为接口查询
        */
        for(let item of _List){
            let _Length = item.goods_group.length;
            item.price = item.marketprice;
            item.GroupName = item.goods_group[_Length-1].name;
            item.GroupStatus = -1;
            for(let gItem of item.goods_group){
                //goods_group 注意需为升序
                if(item.total >= gItem.num){
                    item.price = gItem.price;//更改套餐价格
                    if(gItem.name) item.GroupName = gItem.name;//更改套餐名称
                    item.GroupStatus = 1;//更改套餐状态
                }
            }
        }
        this.setData({
            CartList: _List
        })
    },
    //统计价格数量方法
    ListTotal(){
        let _List = this.data.CartList;
        let _TotalNum = 0;
        let _TotalPrice = 0;
        for(let item of _List){
            //是否选中
            if(item.isChoose == '1'){
                _TotalNum = _TotalNum + parseInt(item.total);
                _TotalPrice = parseFloat(
                        parseFloat(_TotalPrice) + (parseInt(item.total) * parseFloat(item.price))
                    ).toFixed(2)
            }
        }
        _TotalPrice = this.handleExpress(_TotalPrice);
        this.setData({
            GoodsTotalNum: _TotalNum,
            GoodsTotalPrice: _TotalPrice
        })
    },
    //邮费判断
    //return 处理后价格
    handleExpress(TotalPrice){
        if(TotalPrice < this.data.MaxExpress){
            TotalPrice = parseFloat(
                    parseFloat(TotalPrice) + parseFloat(this.data.ExpressPrice)
                ).toFixed(2);
            this.setData({
                ExpressText: '（包含快递费10元）'
            })
        }else{
             this.setData({
                ExpressText: '(已免邮)'
            })
        }
        return TotalPrice;
    },
    //数量增加
    bindPlus(e){
        //编辑模式下不可用
        if(this.data.editMode) return;
        let _id =  e.currentTarget.dataset.id;
        let _List = this.data.CartList;
        for(let item of _List){
            if(item.id == _id && item.stock > item.total){
                item.total++;
            }
        }
        this.setData({
            CartList: _List
        });
        this.handleGroup();
        this.ListTotal();
    },
    //数量减少
    bindMinus(e){
        //编辑模式下不可用
        if(this.data.editMode) return;
         let _id =  e.currentTarget.dataset.id;
        let _List = this.data.CartList;
        for(let item of _List){
            if(item.id == _id && item.total > 1){
                item.total--;
            }
        }
        this.setData({
            CartList: _List
        });
        this.handleGroup();
        this.ListTotal();
    },
    //复选框事件
    HandleCheckBox(e){
        let _id =  e.currentTarget.dataset.id;
        let _List = this.data.CartList;
        for(let item of _List){
            if(item.id == _id){
                item.isChoose = item.isChoose == '1' ? '0' : '1'
            }
        }
        //非编辑模式下，提交选中状态
        if(!this.data.editMode){
            /**
            * 此处接口提交选中状态
            */
        }
        this.setData({
            CartList: _List
        });
        this.CheckAllSelect();
        this.ListTotal();
    },
    //检查是否全选
    CheckAllSelect(){
        let _List = this.data.CartList;
        let length = _List.length;
        let ChooseLength = 0;
        for(let item of _List){
            if(item.isChoose == '1'){
                ChooseLength++;
            }
        }
        this.setData({
            isAllSelect: ChooseLength == length
        })
    },
    //全选或反选
    AllSelect(){
        let _status = this.data.isAllSelect;
        let _List = this.data.CartList;
        for(let item of _List){
            item.isChoose = !_status;
        }
        this.setData({
            isAllSelect: !_status,
            CartList: _List
        })
    },
    //编辑模式
    editMode(){
        this.setData({
            editMode: !this.data.editMode
        })
    },
    //删除购物车操作
    DelCartList(){
        let _List = this.data.CartList;
        let DelList = new Array();
        for(let item of _List){
            if(item.isChoose == '1'){
                DelList.push(item.id);
            }
        }
        if(DelList.length == 0){
            this.Dialog.ShowDialog({
                title: '请勾选你需要删除的商品',
                type: 'Message',
                messageType: 'fail'
            });
            return;
        }
        this.Dialog.ShowDialog({
            title: '确定删除选中的购物车商品',
            type: 'Confirm',
            callback: res => {
                if(res.name == 'confrim'){
                    /**
                    * 此处删除接口
                    */
                }else{
                    this.Dialog.CloseDialog(); 
                }
            }
        })
    },
    ConfirmOrder(){
        console.log('提交订单操作')
    },
    //申请授权判断
    getUserInfo(e){
        if(e.detail.userInfo){
            this.setData({
                hasUserInfo: true
            })
            app.globalData.userInfo = e.detail.userInfo
            //此处提交订单
            this.ConfirmOrder();
            /*wx.navigateTo({
                url: '/pages/index/index'
            });*/
        }else{
            this.Dialog.ShowDialog({
                title: '授权登录，方可购买商品',
                type: 'Alert',
                callback: res => {
                    this.Dialog.CloseDialog(); 
                }
            })
        }
    }
})