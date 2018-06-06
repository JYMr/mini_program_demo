// pages/cate/lists.js
const searchController = require('../../controllers/searchController').controller;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '', //搜索关键词
        selectHide: false,
        contentlist: [], //商品列表
        categoryId: '',
        categoryName: '',
        pageNo: 1,
        pagesize: 8,
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
            this.GetListData(this)
        }
        if (options.id && options.name) {
            this.setData({
                categoryId: options.id,
                categoryName: options.name
            })
            wx.setNavigationBarTitle({
                title: this.data.categoryName
            })
            this.GetCategoryList();
        }
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
        if (this.data.isEnd) {
            wx.showToast({
                title: '已经到底了哦',
                icon: 'none'
            })
            return;
        }
        this.GetListData()
    },
    //获取搜索列表
    GetListData() {

        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });

        searchController.GetSearchList({
            goodsname: this.data.keyword,
            pageNo: this.data.pageNo,
            pageSize: this.data.pagesize
        }).then(res => {
            if (res.done) {
                //处理价格，保留两位小数
                for (let item of res.result.goodsList.list) {
                    item.goods_price = parseFloat(item.goods_price).toFixed(2);
                }
                this.setData({
                    contentlist: this.data.contentlist.concat(res.result.goodsList.list),
                    pageNo: res.result.goodsList.nextPage,
                    isEnd: this.data.pageNo == res.result.goodsList.nextPage //判断是否为最后一页
                })
                wx.hideLoading();
            } else {
                wx.hideLoading();
            }
        })
    },
    //获取商品分类列表
    GetCategoryList(){

        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });

        searchController.GetCategoryList({
            categoryId: this.data.categoryId,
            pageNo: this.data.pageNo,
            pageSize: this.data.pagesize
        }).then(res => {
            if (res.done) {
                //处理价格，保留两位小数
                for (let item of res.result.goodslist.list) {
                    item.goods_price = parseFloat(item.goods_price).toFixed(2);
                }
                this.setData({
                    contentlist: this.data.contentlist.concat(res.result.goodslist.list),
                    pageNo: res.result.goodslist.nextPage,
                    isEnd: this.data.pageNo == res.result.goodslist.nextPage //判断是否为最后一页
                })
                wx.hideLoading();
            } else {
                wx.hideLoading();
            }
        })
    },
    //处理搜索事件
    SearchtoList(e) {
        let keyword = e.detail.keyword;
        this.setData({
            keyword: keyword,
            contentlist: [],
            pageNo: 1
        })
        this.GetListData();
    }
})