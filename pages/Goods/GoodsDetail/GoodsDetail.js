const goodscontroller = require('../../controllers/goodsController.js').controller;
const cartController = require('../../controllers/cartController').controller;
var app = getApp();

Page({
    data: {
        id: '',
        num: 1,
        tabsindex: 0,
        goodsinfo: {}, //商品信息
        spec: {}, //规格
        chooseSpecId: '', //选择的规格id
        selectSpecName: '', //选择的规格名称
        showModalStatus: false, //是否显示
        ModalMode: 'Buy', //遮罩模式
        goodsnavtop: 0, //tab距离顶部的距离
        goodsnavbool: false, //tab是否浮动
        DefaultImage: '', //默认底图
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false
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

            let token = wx.getStorageSync('token') || '';
            if (token) {
                //加载数据
                this.GetGoodsData();
            } else {
                //首次进入，等待login登录回调
                app.tokenReadyCallback = res => {
                    this.GetGoodsData();
                }
            }
        } else {
            //无Id，关闭页面
            wx.navigateBack({
                delta: 1
            })
        }

        //设置默认底图
        this.setData({
            DefaultImage: app.globalData.defaultImg
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.Dialog = this.selectComponent('#Dialog');
        this.ReservationInput = this.selectComponent('#ReservationInput');
        this.MenuCustomer = this.selectComponent('#MenuCustomer');

        var that = this;
        var query = wx.createSelectorQuery()
        query.select('.goodsnav').boundingClientRect(function(res) {
            that.setData({
                goodsnavtop: res.top
            })
        }).exec()
    },
    onPageScroll: function(e) {
        // 获取滚动条当前位置
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
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        let _ImageUrl = app.globalData.defaultImg;
        let _GoodsImageList = this.data.goodsinfo.goodsImg;
        let ShareOption = {
            title: this.data.goodsinfo.goodsName,
            path: '' + this.route + '?id=' + this.data.id,
            imageUrl: _GoodsImageList || _ImageUrl
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
            goodsId: this.data.id
        }).then(res => {
            if (res.done) {
                //提取规格信息
                let _Spec = {};
                _Spec.name = res.result.goodsdetail.goodsTitle;
                _Spec.price = res.result.goodsdetail.goodsPrice.toFixed(2);
                _Spec.src = res.result.goodsdetail.goodsImg;
                _Spec.speclists = res.result.goodsdetail.specGoodsApis || [];
                _Spec.packager = res.result.goodsdetail.goodsCombinations || [];

                //处理商品轮播图为空
                if (res.result.goodsdetail.goodsImages.length == 0) {
                    res.result.goodsdetail.goodsImages.push({
                        imageArtworkName: app.globalData.defaultImg
                    })
                }

                //框选默认规格
                _Spec = this.DefaultAttr(_Spec, res.result.goodsdetail.goodsType);

                this.setData({
                    goodsinfo: res.result.goodsdetail,
                    spec: _Spec,
                    chooseSpecId: res.result.goodsdetail.goodsId
                })


                wx.hideLoading();
            } else {
                wx.showToast({
                    title: '拉去商品数据失败，请返回重试',
                    icon: 'none'
                })
            }
        })
    },
    //加入购物车
    AddCart() {
        cartController.addCart({
            shopcart_goods_id: this.data.id,
            shopcart_num: this.data.num,
            shopcart_type: 1
        }).then(res => {
            if (res.done) {
                this.Dialog.ShowDialog({
                    type: 'Message',
                    title: '加入购物车成功'
                })
                this.setData({
                    editMode: false
                })
            } else {
                this.Dialog.ShowDialog({
                    type: 'Message',
                    title: res.msg || '加入购物车失败',
                    messageType: 'fail'
                })
            }
        })
    },
    //加入预定清单
    AddRxCart() {
        cartController.addCart({
            shopcart_goods_id: this.data.id,
            shopcart_num: this.data.num,
            shopcart_type: 2
        }).then(res => {
            if (res.done) {
                this.Dialog.ShowDialog({
                    type: 'Message',
                    title: '加入清单成功'
                })
            } else {
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
        //处理套餐
        this.AutoPackager();
    },
    /* 点击加号 */
    bindPlus(e) {
        let _num = this.data.num;
        if (_num >= this.data.goodsinfo.stock) return;
        this.setData({
            num: ++_num
        });
        //处理套餐
        this.AutoPackager();
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
        //处理套餐
        this.AutoPackager();
    },
    //数量变化自动选择套餐
    AutoPackager() {
        let _List = this.data.spec;
        //判断是否有套餐
        if (_List.packager && _List.packager.length > 0) {
            let isSelectKey = 0;
            for (let key in _List.packager) {
                //判断数量是否符合套餐数量
                if (this.data.num >= _List.packager[key].packageCount) {
                    //添加选中
                    _List.packager[key].isselect = true;
                    //除去其他套餐选中
                    if (key > 0) {
                        for (let ukey = key - 1; ukey >= 0; ukey--) {
                            _List.packager[ukey].isselect = false;
                        }
                    }
                }
            }

            this.setData({
                spec: _List
            })
        }
    },
    //规格选择,套餐选择
    ClickAttr(e) {
        let type = e.currentTarget.dataset.type;
        let _Spec = this.data.spec;
        let _Name = this.data.selectspec;
        if (type == 'spec') {
            //处理规格选择
            let _List = _Spec.speclists;
            let _ChooseIndex = e.currentTarget.dataset.index;
            let _SpecId = null; //选择的商品规格id

            for (let key in _List) {
                //判断规格id以及规格库存
                if (_ChooseIndex == key && _List[key].goodsStock > 0 && !_List[key].isselect) {
                    //选中规格
                    _List[key].isselect = true;
                    //获取规格ID
                    _SpecId = _List[key].goodsId;
                    //获取规格名
                    _Name = _List[key].goodsSpec
                    //获取规格商品名
                    _Spec.name = _List[key].goodsTitle;
                    //获取规格商品主图
                    _Spec.src = _List[key].goodsImg;
                    //获取规格商品价格
                    _Spec.price = _List[key].goodsPrice.toFixed(2);

                } else {
                    _List[key].isselect = false;
                }
            }
            this.setData({
                spec: _Spec,
                chooseSpecId: _SpecId,
                selectSpecName: _Name
            })
        } else if (type == 'packager') {
            //处理套餐选择

            //如果为处方药，仅提供展示
            if (this.data.goodsinfo.goodsType == 0) return;
            let _List = _Spec.packager;
            //套餐数量
            let _Num = 1;
            let _ChooseIndex = e.currentTarget.dataset.index;
            for (let key in _List) {
                _List[key].isselect = false;
                if (_ChooseIndex == key) {
                    _List[key].isselect = true;
                    _Num = _List[key].packageCount;
                }
            }
            this.setData({
                spec: _Spec,
                num: _Num
            })
        }
    },
    //默认规格选中
    DefaultAttr(spec, type, mode) {

        if (mode == 'spec' || mode == undefined) {
            if (spec.speclists != undefined && spec.speclists.length > 0 && spec.speclists[0].goodsStock > 0) {
                spec.speclists[0].isselect = true;
            }
        }
        if (mode == 'packager' || mode == undefined) {
            if (type == 0) return spec;
            if (spec.packager != undefined && spec.packager.length > 0 && spec.packager.packageCount == 1) {
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
    //联系客服弹层
    ToggleChaticonMenu() {
        this.MenuCustomer.ShowMenu();
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
    },
    ErrorImage(e) {
        app.errImg(e, this);
    }
})