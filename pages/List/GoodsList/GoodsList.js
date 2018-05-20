// pages/cate/lists.js
var pageNum = 1
var url = "http://m.kzj365.com/ajaxSearchCategoryGoodsInfo.htm";
var GetList = function(that) {
    that.setData({
        hidden: false
    });
    wx.request({
        url: url,
        data: {
            c_id: 46,
            pageSize: 10,
            page: pageNum
        },
        success: function(res) {
            var contentlist = that.data.contentlist;

            for (var i = 0; i < res.data.length; i++) {
                contentlist.push(res.data[i])
            }
            that.setData({
                contentlist: contentlist
            });
            pageNum++;
            that.setData({
                hidden: true
            });
        }
    });
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: '',
        hideHeader: true,
        hideBottom: true,
        selectHide: false,
        contentlist: [ //商品列表

        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.search) {
            this.setData({
                inputValue: options.search,
                selectHide: true
            })
            wx.setNavigationBarTitle({
                title: options.search + '列表'
            })
        }
        //GetList(this) 
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
        var that = this;
        pageNum = 1;
        that.setData({
            msgList: [],
            scrollTop: 0,
            hideHeader: false
        });
        GetList(that);
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        //上拉  
        var that = this
        GetList(that)

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})