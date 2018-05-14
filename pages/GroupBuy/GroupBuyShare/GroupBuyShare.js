// pages/GroupBuy/GroupBuyShare/GroupBuyShare.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Default_avatar: 'http://www.kzj365.com/mini_program/images/avatar_default.png',
        ShareMenberList: [
            {
                id: '',
                avatar: 'http://www.kzj365.com/mini_program/images/avatar.png',
            }
        ],
        GroupStatus: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.MakeDefaultData(6);
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
    //补全数据列表
    MakeDefaultData(n){
        let _List = this.data.ShareMenberList
        if(n > _List.length){
            let _Length = _List.length
            for(let i = 0; i < n - _Length; i++){
                _List.push({
                    id: '',
                    avatar: this.data.Default_avatar
                })
            }
            this.setData({
                ShareMenberList: _List
            })
        }   
    },
    TestTap(){
        /*wx.checkIsSupportSoterAuthentication({
    success(res) {
        // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
        // res.supportMode = ['fingerPrint'] 只支持指纹识别
        // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
    }
})*/
        wx.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: '123456',
          authContent: '请用指纹解锁',
          success(res) {
            console.log(res)
          }
        })
    }
})