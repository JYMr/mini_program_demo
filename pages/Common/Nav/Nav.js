// pages/Common/Nav/Nav.js
let app = getApp(); 
Component({
    /**
     * 组件的初始数据
     */
    data: {
        navList: [
            {
                path: '/pages/index/index',
                title: '搜索',
                auth: false
            },
            {
                path: '/pages/GroupBuyList/GroupBuyList',
                title: '拼团',
                auth: false
            },
            {
                path: '/pages/cart/cart',
                title: '购物车',
                auth: false
            },
            {
                path: '/pages/user/user/user',
                title: '我的',
                auth: true
            }
        ],
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false,
        route: ''
    },
    ready(){
        let page = getCurrentPages();
        this.setData({
            route: page[0].route
        })
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
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //响应用户授权操作
        getUserInfo(e){
            if(e.detail.userInfo){
                this.setData({
                    hasUserInfo: true
                })
                app.globalData.userInfo = e.detail.userInfo
                wx.redirectTo({
                    url: e.currentTarget.dataset.route
                });
            }else{
                console.log('用户拒绝了授权');
            }
        }
    }
})