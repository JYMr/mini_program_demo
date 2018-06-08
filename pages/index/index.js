//index.js
const indexControllers = require('../controllers/indexController.js').controller;
var app = getApp();

Page({
    data: {
        navmeau: [], //菜单
        collage: [], //拼团
        recommendgoods: [], //推荐单品
        scanresult: '',
        isLoading: true,
        DefaultImage: ''
    },
    onLoad: function() {
        //获取全局默认图片底图
        this.setData({
            DefaultImage: app.globalData.defaultImg
        })

        this.GetHomeData();
    },
    onReady: function() {
        this.search = this.selectComponent("#search");
    },
    calling: function() {
        app.calling()
    },
    //导航菜单事件响应
    IndexCategroyTap(e) {
        let _actid = e.currentTarget.dataset.actid;
        let _oneid = e.currentTarget.dataset.oneid || '';
        let _twoid = e.currentTarget.dataset.twoid || '';
        let type = e.currentTarget.dataset.type;
        if (type == 0) {
            if (_twoid) {
                //二级分类跳转搜索页
                wx.navigateTo({
                    url: '/pages/List/GoodsList/GoodsList?id=' + _twoid
                });
            } else {
                //分类页跳转
                wx.navigateTo({
                    url: '/pages/List/Category/Category?id=' + _oneid
                });
            }
        } else if (type == 1) {
            //活动页跳转
            wx.navigateTo({
                url: '/pages/List/Activity/Activity?id=' + _actid
            });
        }
    },
    //获取首页数据
    GetHomeData() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        //获取数据
        indexControllers.getIndex({
            no: this.data.pageNo
        }).then(res => {
            if (res.done) {
                //格式化数据
                for (let item of res.result.reGoods) {
                    item.goods.goods_price = item.goods.goods_price.toFixed(2)
                }
                //计算立省
                this.setData({
                    navmeau: res.result.activities,
                    collage: res.result.purchases,
                    recommendgoods: res.result.reGoods,
                    isLoading: false
                })
                //设置客服地址
                app.globalData.tel = res.mobile;
                wx.hideLoading();
            }
        })
    },
    ErrorImage(e) {
        app.errImg(e, this);
    }
})