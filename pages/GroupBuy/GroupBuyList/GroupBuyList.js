// pages/GroupBuy/GroupBuyList/GroupBuyList.js
const GroupBuyController = require('../../controllers/groupBuyController').controller;
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        GroupBuyData: [],
        pageNo: 1,
        pageSize: 6,
        isEnd: false,
        DefaultImage: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.GetGroupList();

        //获取全局默认图片底图
        this.setData({
            DefaultImage: app.globalData.defaultImg
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.isEnd) return;
        this.GetGroupList();
    },
    //监听用户下拉动作
    onPullDownRefresh() {
        this.setData({
            pageNo: 1,
            GroupBuyData: [],
            isEnd: false
        })
        this.GetGroupList();
    },
    //获取团购列表数据
    GetGroupList() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        GroupBuyController.getList({
            pageNo: this.data.pageNo,
            pageSize: this.data.pageSize
        }).then(res => {
            if (res.done) {
                this.setData({
                    GroupBuyData: this.data.GroupBuyData.concat(res.result.purchases.list),
                    pageNo: res.result.purchases.nextPage,
                    isEnd: res.result.purchases.totalPage == this.data.pageNo
                })
            }
            wx.hideLoading();
            wx.stopPullDownRefresh();
        })
    },
    ErrorImage(e) {
        app.errImg(e, this);
    }
})