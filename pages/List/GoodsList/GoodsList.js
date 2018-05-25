// pages/cate/lists.js
const searchController = require('../../controllers/searchController').controller;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',//搜索关键词
        selectHide: false,
        contentlist: [], //商品列表
        pageNo: 1,
        isEnd: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.search) {
            this.setData({
                keyword: options.search,
                selectHide: true
            })
            wx.setNavigationBarTitle({
                title: options.search + '列表'
            })
        }
        this.GetListData(this) 
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.search = this.selectComponent("#search");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        //上拉 
        this.setData({
            pageNo: ++this.data.pageNo
        }) 
        this.GetListData()
    },
    //获取列表
    GetListData() {

        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });

        searchController.GetSearchList({
            keyword: this.data.keyword,
            no: this.data.pageNo
        }).then(res => {
            if (res.status == 0) {
                this.setData({
                    contentlist: this.data.contentlist.concat(res.list)
                })
                wx.hideLoading();
            }
        })
    },
    //处理搜索事件
    SearchtoList(e){
        let keyword = e.detail.keyword;
        this.setData({
            keyword: keyword,
            contentlist: [],
            pageNo: 1
        })
        this.GetListData();
    }
})