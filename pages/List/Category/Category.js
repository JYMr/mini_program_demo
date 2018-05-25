// pages/cate/cate.js
const categoryController = require('../../controllers/categoryController.js').controller;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CategoryList: [],
        ChildList: [],
        chooseId: null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                chooseId: options.id
            });
        }
        this.getCategory();
    },
    //根据Id获取子数据索引
    getDataIndex(id) {
        let _cateItemData = this.data.cateItems;
        for (let key in _cateItemData) {
            if (_cateItemData[key].cate_id == id) return key;
        }
    },
    //获取一级数据
    getCategory() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        categoryController.getcategory().then(res => {
            if (res.status == 0) {
                if (res.data.length > 0) {

                    let _curIndex = this.getDataIndex();
                    this.setData({
                        CategoryList: res.data
                    })
                    this.getcategoryChild(res.data[0].cate_id, true);
                }
            }
        })
    },
    //获取一级数据
    getcategoryChild(id, flag) {
        if (!flag) {
            wx.showLoading({
                title: '加载数据中...',
                mask: true
            });
        }
        categoryController.getcategoryChild({
            id: this.data.chooseId || id
        }).then(res => {
            if (res.status == 0) {
                this.setData({
                    ChildList: res.data
                })
                wx.hideLoading();
            }
        })
    },
    //事件处理函数  
    switchRightTab: function(e) {
        // 获取item项的id，和数组的下标值  
        let id = e.target.dataset.id;
        this.setData({
            chooseId: id,
        })
        this.getcategoryChild();
    }
})