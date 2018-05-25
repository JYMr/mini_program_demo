// pages/search.js
const searchController = require('../../controllers/searchController').controller;
Page({
    data: {
        selectHide: false,
        searchstory: [],
        hotgoods: []
    },
    clearSearchStorage: function() {
        wx.showModal({
            title: '提示',
            content: '确定清除历史记录?',
            success: function(res) {
                if (res.confirm) {
                    wx.setStorageSync('searchData', [])
                    this.setData({
                        searchstory: []
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.GetKeyWordList();
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
        var searchstory = wx.getStorageSync('searchData').reverse();
        this.setData({
            searchstory: searchstory,
            inputValue: '',
            selectHide: false
        })
    },
    //处理搜索事件
    SearchtoList(e){
        let keyword = e.detail.keyword;
        wx.navigateTo({
            url: '/pages/List/GoodsList/GoodsList?search=' + keyword
        })
    },
    //获取关键字列表
    GetKeyWordList(){
        searchController.GetSearchKeyWord().then(res=>{
            if(res.status == 0){
                this.setData({
                    hotgoods: res.list
                })
            }
        })
    }
})