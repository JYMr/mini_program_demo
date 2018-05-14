// pages/cate/cate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cateItems: [{
                cate_id: 1,
                cate_name: "专科用药",
                ishaveChild: true,
                children: [{
                        child_id: 1,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 2,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 3,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 4,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    }

                ]
            },
            {
                cate_id: 2,
                cate_name: "家庭用药",
                ishaveChild: true,
                children: [{
                        child_id: 1,
                        name: '藏王天宝 补肾丸2',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 2,
                        name: '藏王天宝 补肾丸2',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },

                ]
            },
            {
                cate_id: 3,
                cate_name: "医疗器械",
                ishaveChild: true,
                children: [{
                        child_id: 1,
                        name: '藏王天宝 补肾丸3',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },

                ]
            },
            {
                cate_id: 4,
                cate_name: "成人用品",
                ishaveChild: true,
                children: [{
                        child_id: 1,
                        name: '藏王天宝 补肾丸3',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 2,
                        name: '藏王天宝 补肾丸3',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 3,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 4,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    }
                ]
            },
            {
                cate_id: 5,
                cate_name: "健康体检",
                ishaveChild: true,
                children: [{
                        child_id: 1,
                        name: '藏王天宝 补肾丸5',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 2,
                        name: '藏王天宝 补肾丸3',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 3,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    },
                    {
                        child_id: 4,
                        name: '藏王天宝 补肾丸',
                        image: "http://kzjimg01.b0.upaiyun.com/1505198984892.jpg",
                        id: '8183'
                    }
                ]
            },
            {
                cate_id: 6,
                cate_name: "专科用药",
                ishaveChild: false,
                children: [

                ]
            }
        ],
        curNav: 1,
        curIndex: 0
    },
    //事件处理函数  
    switchRightTab: function(e) {
        // 获取item项的id，和数组的下标值  
        let id = e.target.dataset.id,
            index = parseInt(e.target.dataset.index);
        // 把点击到的某一项，设为当前index  
        this.setData({
            curNav: id,
            curIndex: index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if(options.id){
            this.setData({
                curNav: options.id,
                curIndex: this.getDataIndex(options.id)
            });
        }
    },
    //根据Id获取子数据索引
    getDataIndex(id){
        let _cateItemData = this.data.cateItems;
        for(let key in _cateItemData){
            if(_cateItemData[key].id == id) return key;
        }
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