const goodscontroller = require('../../controllers/goodsController.js').controller
var app = getApp();

var selectAttrid = []; //选择的属性id
Page({
    data: { //页面的初始数据
        id: '',
        num: 1,
        tabsindex: 0,
        goodsinfo: {},//商品信息
        spec: {},//规格
        chooseSpecId: '',
        showModalStatus: false, //是否显示
        ModalMode: 'Buy', //遮罩模式
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false,
        goodsnavtop: 0,//导航是否浮动
        goodsnavbool:false 
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //判断用户权限
        if (app.globalData.userInfo) {
            this.setData({
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
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

        if (options.id) {
            this.setData({
                id: options.id
            });
            this.GetGoodsData();
        } else {
            //无Id，关闭页面
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.Dialog = this.selectComponent('#Dialog');
        this.ReservationInput = this.selectComponent('#ReservationInput');
        var that = this;
        var query = wx.createSelectorQuery()
        query.select('.goodsnav').boundingClientRect(function (res) {
          that.setData({
            goodsnavtop: res.top
          })
        }).exec()
    },
    onPageScroll: function (e) { // 获取滚动条当前位置
      if (e.scrollTop > this.data.goodsnavtop) {
        this.setData({
          goodsnavbool: true
        })
      } else {
        this.setData({
          goodsnavbool: false
        })
      }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        let _ImageUrl = app.globalData.defaultImg;
        let _GoodsImageList = this.data.goodsinfo.siderimg;
        for (let item of _GoodsImageList) {
            if (item != app.globalData.defaultImg) {
                _ImageUrl = item;
                break;
            }
        }
        let ShareOption = {
            title: this.data.goodsinfo.name,
            path: '' + this.route,
            imageUrl: _ImageUrl,
            success: res => {
                if (res.errMsg == 'shareAppMessage:ok') {
                    this.Dialog.ShowDialog({
                        type: 'Message',
                        title: '分享成功'
                    })
                }
            },
            fail: err => {
                if (err.errMsg != 'shareAppMessage:fail cancel') {
                    this.Dialog.ShowDialog({
                        type: 'Message',
                        title: err.errMsg.split(':')[1],
                        messageType: 'fail'
                    })
                }
            }
        }
        return ShareOption;
    },
    //加载商品信息
    GetGoodsData() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        //接口加载数据
        goodscontroller.getGoodsDetail({
            id: this.data.id
        }).then(res => {
            if (res.status == 0) {
                //提取规格信息
                let _Spec = {};
                _Spec.name = res.goodsinfo.name;
                _Spec.price = res.goodsinfo.price;
                _Spec.src = res.goodsinfo.siderimg[0];
                _Spec.speclists = res.goodsinfo.speclists;
                _Spec.packager = res.goodsinfo.packager;

                //框选默认规格
                _Spec = this.DefaultAttr(_Spec);

                this.setData({
                    goodsinfo: res.goodsinfo,
                    spec: _Spec,
                    chooseSpecId: res.goodsinfo.id
                })
                wx.hideLoading();
            }
        })
    },
    //刷新套餐规格信息
    ReloadGoodsData(id) {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        goodscontroller.getGoodsSpec({
            id: id
        }).then(res => {
            if (res.status == 0) {
                //框选套餐默认规格
                let _spec = this.data.spec;
                _spec.name = res.Spec.name;
                _spec.price = res.Spec.price;
                _spec.market = res.Spec.market;
                _spec.src = res.Spec.src;
                _spec.packager = res.Spec.packager;
                _spec = this.DefaultAttr(_spec, 'packager');
                this.setData({
                    spec: _spec
                })
                wx.hideLoading();
            }
        })
    },
    //加入购物车
    AddCart() {
        goodscontroller.addCart({
            //购物车提交的数据
        }).then(res =>{
            if(res.status == 0){
                this.Dialog.ShowDialog({
                    type: 'Message',
                    title: '加入购物车成功'
                })
            }else{
                this.Dialog.ShowDialog({
                    type: 'Message',
                    title: '加入购物车失败',
                    messageType: 'fail'
                })
            }
        })
    },
    //加入预定清单
    AddRxCart() {  
        goodscontroller.addRxCart({
            id: this.data.id
        }).then(res =>{
            if(res.status == 0){
                this.Dialog.ShowDialog({
                    type: 'Message',
                    title: '加入清单成功'
                })
            }else{
                this.Dialog.ShowDialog({
                    type: 'Message',
                    title: '加入清单失败',
                    messageType: 'fail'
                })
            }
        })
    },
    //非处方药提交订单
    BuyFn() {
        wx.navigateTo({
            url: '/pages/Order/ConfirmOrder/ConfirmOrder?type=' + this.data.goodsinfo.type + '&id=' + this.data.chooseSpecId + '&num=' + this.data.num
        })
    },
    //预定方法
    RxBuyFn(e) {
        //获取返回用户填写的信息
        let UserInfo = e.detail;
        wx.navigateTo({
            url: '/pages/Order/ConfirmOrder/ConfirmOrder?type=' + this.data.goodsinfo.type + '&id=' + this.data.chooseSpecId + '&num=' + this.data.num
        })
    },
    /* 点击减号 */
    bindMinus(e) {
        let _num = this.data.num;
        if (_num <= 1) return;
        this.setData({
            num: --_num
        });
    },
    /* 点击加号 */
    bindPlus(e) {
        let _num = this.data.num;
        if (_num >= this.data.goodsinfo.stock) return;
        this.setData({
            num: ++_num
        });
    },
    /* 输入框事件 */
    bindManual(e) {
        var _num = e.detail.value;
        //判断空值
        if (_num == '') {
            _num = 1;
        }
        //判断库存
        if (_num > this.data.goodsinfo.stock) {
            _num = this.data.goodsinfo.stock;
        }
        this.setData({
            num: _num
        });
    },
    //规格选择
    ClickAttr(e) {
        let type = e.currentTarget.dataset.type;
        let _Spec = this.data.spec;

        if (type == 'spec') {
            //处理规格选择
            let _List = _Spec.speclists;
            let _ChooseIndex = e.currentTarget.dataset.index;
            let _SpecId = null;//选择的商品规格id

            for (let key in _List) {
                //判断规格id以及规格库存
                if (_ChooseIndex == key && _List[key].stock > 0 && !_List[key].isselect) {
                    _List[key].isselect = true;
                    _SpecId = _List[key].id;
                }else{
                    _List[key].isselect = false;
                }
            }
            this.setData({
                spec: _Spec
            })
            if (_SpecId) {
                //套餐选择
                this.ReloadGoodsData(_SpecId);
            }
        } else if (type == 'packager') {
            //处理套餐选择
            let _List = _Spec.packager;
            let _ChooseIndex = e.currentTarget.dataset.index;
            for (let key in _List) {
                _List[key].isselect = false;
                if (_ChooseIndex == key) {
                    _List[key].isselect = true;
                }
            }
            this.setData({
                spec: _Spec
            })
        }
    },
    //默认规格选中
    DefaultAttr(spec, mode){

        if(mode == 'spec' || mode == undefined){
            if(spec.packager.length > 0 && spec.speclists[0].stock > 0){
                spec.speclists[0].isselect = true;
            }
        }
        if(mode == 'packager' || mode == undefined){
            if(spec.packager.length > 0){
                spec.packager[0].isselect = true;
            }
        }
        return spec;
    },
    //规格选择层确定事件
    ModalConfirm() {
        let type = this.data.ModalMode;
        switch (type) {
            case 'Buy':
                //立即购买
                if (this.data.hasUserInfo) {
                    this.BuyFn();
                }
                break;
            case 'Cart':
                //加入购物车
                this.AddCart();
                break;
            case 'RxCart':
                //加入预定清单
                this.AddRxCart();
                break;
            case 'RxBuy':
                //立即预定
                //判断是否拥有用户权限
                if (this.data.hasUserInfo) {
                    this.ReservationInput.Show(this.data.UserInfo);
                }
                break;
            default:
                this.hideModal();
        }
    },
    // 选项卡切换
    TabToggle(e) {
        var index = e.target.dataset.id;
        this.setData({
            tabsindex: index
        })
        var goodsnavtop = this.data.goodsnavtop;
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: goodsnavtop
          })
        }
    },
    // 显示遮罩层
    showModal(e) {
        let Mode = e.currentTarget.dataset.type || '';
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(420).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true,
            ModalMode: Mode
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 100)
    },
    // 隐藏遮罩层
    hideModal() {
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(420).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    },
    //处理图片错误
    errImg(event) {
        var that = this;
        app.errImg(event, that);
    },
    //处理用户权限选择
    getUserInfo(e) {
        if (e.detail.userInfo) {
            this.setData({
                hasUserInfo: true
            })
            app.globalData.userInfo = e.detail.userInfo
            //此处提交订单
            let Mode = this.data.ModalMode;
            if (Mode == 'Buy') {
                this.BuyFn();
            } else if (Mode == 'RxBuy') {
                this.ReservationInput.Show(this.data.UserInfo);
            }
        } else {
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