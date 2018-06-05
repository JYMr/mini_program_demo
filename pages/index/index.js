//index.js
const indexControllers = require('../controllers/indexController.js').controller;
//获取应用实例
var app = getApp();

Page({
    data: {
        navmeau: [], //菜单
        collage: [], //拼团
        recommendgoods: [], //推荐单品
        scanresult: ''
    },
    onLoad: function() {
        //this.GetHomeData();
    },
    onReady: function() {
        this.search = this.selectComponent("#search");
    },
    calling: function() {
        app.calling()
    },
    //导航菜单事件响应
    IndexCategroyTap(e) {
        let _id = e.currentTarget.dataset.id;
        let type = e.currentTarget.dataset.type;
        if (type == 0) {
            //分类跳转
            wx.navigateTo({
                url: '/pages/List/Category/Category?id=' + _id
            });
        } else if (type == 1) {
            //活动页跳转
            wx.navigateTo({
                url: '/pages/List/Activity/Activity?id=' + _id
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
            if (res.status == 0) {
                this.setData({
                    navmeau: res.navmeau,
                    collage: res.collage,
                    recommendgoods: res.recommendgoods
                })
                //设置客服地址
                app.globalData.tel = res.mobile;
                wx.hideLoading();
            }
        })
    }
})