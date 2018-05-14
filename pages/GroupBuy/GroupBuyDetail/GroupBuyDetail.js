// pages/GroupBuy/GroupBuyDetail/GroupBuyDetail.js
Page({
    data: {
        goodsinfo: { //商品信息
            siderimg: [
                'http://www.kzj365.com/images/201609/goods_img/10107_P_1475217761551.jpg',
                'http://www.kzj365.com/images/201609/goods_img/10107_P_1475217761551.jpg',
                'http://www.kzj365.com/images/201609/goods_img/10107_P_1475217761551.jpg'
            ],
            type: 2,
            name: 'Now Foods美国玛卡精片蒺藜皂甙玛咖精华片成人男性保健品持久增大',
            price: '15.90',
            market: '18.00',
            manufacturer: 'nowfoodsNow Foods美国玛卡精片蒺藜皂甙玛咖精华片成人男性保健品持久增大',
            selectspec: ''
        },
        GroupList:[
            {
                id: '123',
                name: '发财哥',
                number: '12',
                avatar: 'http://www.kzj365.com/mini_program/images/avatar.png',
                finishTime: 1525930425,
                serverTime: 1525920589
            },
            {
                id: '1223',
                name: '发财哥',
                number: '12',
                avatar: 'http://www.kzj365.com/mini_program/images/avatar.png',
                finishTime: 1525930415,
                serverTime: 1525920589
            },
            {
                id: '1233',
                name: '发财哥',
                number: '12',
                avatar: 'http://www.kzj365.com/mini_program/images/avatar.png',
                finishTime: 1525930797,
                serverTime: 1525940589
            }
        ],
        DetailActive: '0',
        ChaticonMenu: false
    },
    //开团列表倒计时
    GroupTimeOut(){
        setInterval(()=>{
            let _TempGroupList = this.data.GroupList
            for(let item of _TempGroupList){
                let _time = item.finishTime - item.serverTime;
                if(_time > 0){
                    let _hours = Math.floor(_time / (60 * 60));
                    let _minute = Math.floor((_time - _hours * 60 * 60) / 60);
                    let _second = Math.floor(_time - _hours * 60 * 60 - _minute * 60);
                    _hours = _hours < 10 ? ('0' + _hours) : _hours
                    _minute = _minute < 10 ? ('0' + _minute) : _minute
                    _second = _second < 10 ? ('0' + _second) : _second
                    item.time = _hours + ':' + _minute + ':' + _second;
                }else{
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
    TabToggle(e){
        let index = e.currentTarget.dataset.index + '';
        this.setData({
            DetailActive: index
        })
    },
    //联系客服菜单
    ToggleChaticonMenu(){
        this.setData({
            ChaticonMenu: !this.data.ChaticonMenu
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.GroupTimeOut()
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