// pages/GroupBuy/GroupBuyShare/GroupBuyShare.js
const GroupBuyController = require('../../controllers/groupBuyController').controller;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        GroupId: '12312',
        TimeOut: {
            hours: '00',
            minute: '00',
            second: '00'
        },
        Default_avatar: 'http://www.kzj365.com/mini_program/images/avatar_default.png',
        ShareData: {
            id: 12,
            GoodsInfo: {
                id: 231321,
                url: '',
                title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶',
                price: '25.90',
                total: '5',
                spec_type: '盒',
                goods_type: '4',
            },
            ShareMenberList: [{
                id: '',
                avatar: 'http://www.kzj365.com/mini_program/images/avatar.png',
            }],
            GroupStatus: 0,
            GroupNumber: 6,
            GroupHasNumber: 1,
            ShareUrl: '',
            ShareTitle: '1123123123',
            serverTime: 1525920589,
            finishTime: 1525930425,
            isGroupKing: false
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.id) {
            this.setData({
                GroupId: options.id
            })
        }
        this.GetShaerData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.Dialog = this.selectComponent('#Dialog');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    //获取拼团数据
    GetShaerData(id) {

        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        GroupBuyController.getGroupBuyShare({
            id: this.data.GroupId
        }).then(res => {
            if (res.status == 0) {
                res.data = this.MakeDefaultData(res.data, res.data.GroupNumber)
                this.setData({
                    ShareData: res.data
                })
                this.TimeOutFn();
            }
            wx.hideLoading();

        })
    },
    //补全数据列表
    MakeDefaultData(list, n) {
        if (n > list.ShareMenberList.length) {
            let _Length = list.ShareMenberList.length
            for (let i = 0; i < n - _Length; i++) {
                list.ShareMenberList.push({
                    id: '',
                    avatar: this.data.Default_avatar
                })
            }
        }
        return list;
    },
    //拼团计时
    TimeOutFn() {
        let FinishTime = this.data.ShareData.finishTime;
        let ServerTime = this.data.ShareData.serverTime;
        let _TimeOut = this.data.TimeOut
        let _time = FinishTime - ServerTime

        if (_time > 0) {
            let GroupTime = setInterval(() => {
                _time = FinishTime - ServerTime
                if (_time > 0) {
                    let _hours = Math.floor(_time / (60 * 60));
                    let _minute = Math.floor((_time - _hours * 60 * 60) / 60);
                    let _second = Math.floor(_time - _hours * 60 * 60 - _minute * 60);
                    _TimeOut.hours = _hours < 10 ? ('0' + _hours) : _hours
                    _TimeOut.minute = _minute < 10 ? ('0' + _minute) : _minute
                    _TimeOut.second = _second < 10 ? ('0' + _second) : _second
                } else {
                    _TimeOut.hours = '00'
                    _TimeOut.minute = '00'
                    _TimeOut.second = '00'
                    clearInterval(GroupTime);
                }
                ServerTime = ServerTime + 1;
                this.setData({
                    TimeOut: _TimeOut
                })
            }, 1000);
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        let GroupId = this.data.ShareData.id;
        let ShareOption = {
            title: this.data.ShareData.ShareTitle || this.data.ShareData.GoodsInfo.title,
            path: '/' + this.route + '?id' + GroupId,
            imageUrl: this.data.ShareData.ShareUrl || this.data.ShareData.GoodsInfo.url
        }
        return ShareOption;
    }
})