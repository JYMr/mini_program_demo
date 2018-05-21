// pages/GroupBuy/GroupBuyDetail/GroupBuyDetail.js
const app = getApp();
const GroupBuyController = require('../../controllers/GroupBuyController').controller;
Page({
    data: {
        GoodsId: '',
        isAllow: true,
        GroupId: '',
        goodsinfo: {},//商品详细信息
        GroupList: [],//拼团推荐
        DetailActive: '0',
        ChaticonMenu: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //判断用户权限
        if(app.globalData.userInfo){
            this.setData({
                hasUserInfo: true
            })
        }else if (this.data.canIUse) {
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        if(options.id){
            this.setData({
                GoodsId: options.id
            })
        }

        if(options.gid){
            //有拼团id传入
            this.setData({
                GroupId: options.gid
            })
        }

        this.GetGroupDetailData();
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
    //加载拼团详情数据
    GetGroupDetailData(){
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        GroupBuyController.GetDetail({
            id: this.data.GoodsId
        }).then(res=>{
            if(res.status == 0){
                this.setData({
                    goodsinfo: res.goodsinfo,
                    isAllow: res.isAllow,
                    GroupId: this.data.GroupId
                })
                this.handleData();
                wx.hideLoading();
            }
        })
        setTimeout(()=>{
            //延迟加载推荐列表
            this.GetRecommend();
        }, 500)
    },
    //获取拼团推荐列表
    GetRecommend(){
        GroupBuyController.GetRecommend({
            id: this.data.GoodsId
        }).then(res=>{
            if(res.status == 0){
                if( res.GroupList.length > 0){
                    this.setData({
                        GroupList: res.GroupList
                    })
                    this.GroupTimeOut();
                }
            }
        })
    },
    //开团列表倒计时
    GroupTimeOut() {
        setInterval(() => {
            let _TempGroupList = this.data.GroupList
            for (let item of _TempGroupList) {
                let _time = item.finishTime - item.serverTime;
                if (_time > 0) {
                    let _hours = Math.floor(_time / (60 * 60));
                    let _minute = Math.floor((_time - _hours * 60 * 60) / 60);
                    let _second = Math.floor(_time - _hours * 60 * 60 - _minute * 60);
                    _hours = _hours < 10 ? ('0' + _hours) : _hours
                    _minute = _minute < 10 ? ('0' + _minute) : _minute
                    _second = _second < 10 ? ('0' + _second) : _second
                    item.time = _hours + ':' + _minute + ':' + _second;
                } else {
                    item.time = '00:00:00';
                    item.number = 0;
                }
                item.serverTime = item.serverTime + 1;
            }
            this.setData({
                GroupList: _TempGroupList
            })
        }, 1000);
    },
    //Tab切换
    TabToggle(e) {
        let index = e.currentTarget.dataset.index + '';
        this.setData({
            DetailActive: index
        })
    },
    //联系客服菜单
    ToggleChaticonMenu() {
        this.setData({
            ChaticonMenu: !this.data.ChaticonMenu
        })
    },
    //处理数据
    handleData(){
        let _Data = this.data.goodsinfo;
        _Data.startTime = app.Util.handleDate.formatTime_1(new Date(_Data.startTime * 1000), '-');
        _Data.finishTime = app.Util.handleDate.formatTime_1(new Date(_Data.finishTime * 1000), '-');
        this.setData({
            goodsinfo: _Data
        })
    },
    //提交拼团订单
    ConfirmGroupOrder(e){
        let _gid =  e.currentTarget.dataset.id
        let _id = this.data.goodsinfo.id;
        wx.navigateTo({
            url: '/pages/GroupBuy/GroupBuyConfirm/GroupBuyConfirm?' + (_gid ? ('gid=' + _gid): ('id=' + _id ))
        })
    },
    //拨打电话
    Calling(){
        app.calling();
    },
    //处理权限
    getUserInfo(e){
        if(e.detail.userInfo){
            this.setData({
                hasUserInfo: true
            })
            app.globalData.userInfo = e.detail.userInfo
            //此处提交订单
            this.ConfirmGroupOrder(e);
        }else{
            this.Dialog.ShowDialog({
                title: '授权登录，方可购买商品',
                type: 'Alert',
                callback: res => {
                    this.Dialog.CloseDialog(); 
                }
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        let _ImageUrl = app.globalData.defaultImg;
        let _GoodsImageList = this.data.goodsinfo.siderimg;
        for(let item of _GoodsImageList){
            if(item != app.globalData.defaultImg){
                _ImageUrl = item;
                break;
            }
        }
        let ShareOption = {
            title: this.data.goodsinfo.name,
            path: '/' + this.route,
            imageUrl: _ImageUrl,
            success: res=>{
                if(res.errMsg == 'shareAppMessage:ok'){
                    this.Dialog.ShowDialog({
                        type: 'Message',
                        title: '分享成功'
                    })
                }
            },
            fail: err=>{
                if(err.errMsg != 'shareAppMessage:fail cancel'){
                     this.Dialog.ShowDialog({
                        type: 'Message',
                        title: err.errMsg.split(':')[1],
                        messageType: 'fail'
                    })
                }
            }
        }
        return ShareOption;
    }
})