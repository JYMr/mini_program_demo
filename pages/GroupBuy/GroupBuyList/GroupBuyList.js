// pages/GroupBuy/GroupBuyList/GroupBuyList.js
const GroupBuyController = require('../../controllers/GroupBuyController').controller;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        GroupBuyData: [],
        pageNo: 0
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.setData({
            pageN: ++this.data.pageNo
        })
        this.GetGroupList();
    },
    //获取团购列表数据
    GetGroupList(){
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
       GroupBuyController.getList({
            no: this.data.pageNo
       }).then(res=>{
            if(res.status == 0){
                this.setData({
                    GroupBuyData: this.data.GroupBuyData.concat(res.List)
                })
                wx.hideLoading();
            }
       })
    }
})