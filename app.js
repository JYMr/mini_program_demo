//app.js
const Util = require('/utils/util.js')
const request = require('/utils/kzj.request.js')
App({
    onLaunch: function() {
        wx.checkSession({
            success: function() {
                //session_key 未过期，并且在本生命周期一直有效
                console.log('session_key 未过期')
            },
            fail: function() {
                // session_key 已经失效，需要重新执行登录流程
                wx.login({
                    success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        console.log(res)
                        request.get('/Login', {
                            code: res.code
                        }).then(res => {
                            if(res.data.status == 0){
                                wx.setStorageSync('token', res.data.token)
                            }
                        })
                    }
                })
            }
        })
        // 登录
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 未授权，跳转授权页面
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        defaultImg: 'http://www.kzj365.com/mini_program/images/default.png',
        tel: '18819446959',
        AddressId: '' //用于订单地址选择
    },
    Util: {
        handleDate: Util
    },
    errImg: function(e, that) {
        var _errImg = e.target.dataset.errImg;
        var _objImg = "'" + _errImg + "'";
        var _errObj = {};
        _errObj[_errImg] = this.globalData.defaultImg;
        that.setData(_errObj); //注意这里的赋值方式...  
    },
    calling: function() { //拨打电话
        wx.makePhoneCall({
            phoneNumber: this.globalData.tel,
            success: function() {
                console.log("拨打电话成功！")
            },
            fail: function() {
                console.log("拨打电话失败！")
            }
        })
    }
})