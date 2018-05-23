// pages/search.js
Page({
    data: {
        selectHide: false,
        searchstory: [],
        hotgoods: [
            '泛福舒',
            '血尔口服液',
            '安宫牛黄丸',
            '汇仁肾宝',
            '万艾可',
            '昂润比斯海乐',
            '汇仁肾宝',
            '泛福舒',
            '血尔口服液',
            '安宫牛黄丸',
            '汇仁肾宝',
            '万艾可',
            '昂润比斯海乐',
            '汇仁肾宝'
        ]
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})