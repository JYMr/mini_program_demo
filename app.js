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
                        wx.request({
                            url: 'http://192.168.40.93:8090/api/userApiLogin.shtml',
                            method: 'POST',
                            data: {
                                code: res.code
                            },
                            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            success: function(res) {
                                if (res.data.done) {
                                    wx.setStorageSync('token', res.data.result.token)
                                }
                            },
                            fail: err => {}
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

        //异步更新 + 强制更新

        // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
        const updateManager = wx.getUpdateManager()

        updateManager.onCheckForUpdate(function(res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        })

        updateManager.onUpdateReady(function() {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否马上重启小程序？',
                success: function(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })

        updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
        })
    },
    globalData: {
        userInfo: null,
        defaultImg: 'http://www.kzj365.com/mini_program/images/default.png',
        tel: '',
        isOpen: '', //后台设置开启购买
        AddressId: '' //用于订单地址选择
    },
    Util: {
        handleDate: Util
    },
    errImg: function(e, that) {
        console.log("!!!")
        let _obj = e.target.dataset.obj;
        let _errObj = {};
        _errObj[_obj] = this.globalData.defaultImg;
        that.setData(_errObj);
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