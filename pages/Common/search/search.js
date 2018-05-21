const searchController = require('../../controllers/searchController').controller;
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    properties: {
        inputValue: {
            type: String,
            value: ''
        },
        classtype: {
            type: String,
            value: ''
        },
        selectHide: {
            type: Boolean,
            value: true
        },
        clickable: {
            type: Boolean,
            value: false
        },
    },

    /**
     * 私有数据,组件的初始数据
     * 可用于模版渲染
     */
    data: {
        // clickable:false
    },

    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
        /*
         * 公有方法
         */
        bindchange: function(e) {
            console.log('bindchange')
        },
        bindInput: function(e) {
            var selectHide = false;
            if (e.detail.value != '') {
                selectHide = true;
            } else {
                selectHide = false;
            }
            this.setData({
                selectHide: selectHide,
                inputValue: e.detail.value
            })
        },
        searchSubmit: function(e) {
            if (e.target.dataset.search) {
                this.setData({
                    inputValue: e.target.dataset.search
                })
            }
            let data;
            let localStorageValue = [];
            if (this.data.inputValue != '') {
                //调用API从本地缓存中获取数据
                var searchData = wx.getStorageSync('searchData') || []
                searchData.push(this.data.inputValue)
                wx.setStorageSync('searchData', searchData)
                wx.navigateTo({
                    url: "/pages/List/GoodsList/GoodsList?search=" + this.data.inputValue
                })
            } else {
                wx.showToast({
                    title: '请输入关键词！',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        clearInput: function() {
            this.setData({
                inputValue: '',
                selectHide: false
            })
        },
        tosearch: function(e) { //搜索框跳转
            if (e.currentTarget.dataset.clickable) {
                wx.navigateTo({
                    url: '/pages/List/Search/Search'
                })
            }
        },
        scan: function() { //扫码
            var that = this;
            var scanresult;
            that.dialog = that.selectComponent("#Dialog");
            wx.scanCode({
                success: (res) => {

                    wx.showLoading({
                        title: '识别中...',
                        mask: true
                    });
                    this.scanresult = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;

                    searchController.ScalCode({
                        result: res.result
                    }).then(res=>{
                        if(res.status == 0){
                            wx.hideLoading();
                            //获取商品id
                            wx.navigateTo({
                                url: '/pages/Goods/GoodsDetail/GoodsDetail?id=' + res.data.id
                            })
                        }else if(res.status == -1){
                            wx.hideLoading();
                            that.dialog.ShowDialog({
                                type: 'Slot'
                            })
                        }
                    })
                },
                fail: (res) => {

                },
                complete: (res) => {}
            });
        },
        /*
         * 内部私有方法建议以下划线开头
         * triggerEvent 用于触发事件
         */
        _cancelEvent() {
            //触发取消回调
            this.triggerEvent("cancelEvent")
        },
        _confirmEvent() {
            //触发成功回调
            this.triggerEvent("confirmEvent");
        }
    }
})