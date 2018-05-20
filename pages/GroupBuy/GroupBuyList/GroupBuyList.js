// pages/GroupBuy/GroupBuyList/GroupBuyList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        GroupBuyData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.GetGroupList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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

    },
    //获取团购列表数据
    GetGroupList(){
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        setTimeout(()=>{
            let _Data = [{siderimg: 'http://kzjimg01.b0.upaiyun.com/1505885853574.jpg', name: '【9.9元包邮】度太女神叶酸片0.4mg*31片', price: '1555.90', attr: '2件', sale: '15455',discont:'30.00', id: '1872' },{siderimg: 'http://kzjimg01.b0.upaiyun.com/1505885853574.jpg', name: '1【9.9元包邮】度太女神叶酸片0.4mg*31片', price: '16.90', attr: '1件', sale: '154', discont: '15.00', id: '1872' }];
            this.setData({
                GroupBuyData: _Data
            })
            wx.hideLoading();
        }, 500)
    }
})