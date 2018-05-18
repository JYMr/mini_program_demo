// pages/GroupBuy/GroupBuyDetail/GroupBuyDetail.js
var app = getApp();
Page({
    data: {
        isAllow: true,
        GroupId: '',
        goodsinfo: { //商品信息
            id: 22135,
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
            selectspec: '',
            GroupNum: 365,
            GroupStock: 2000,
            GroupBuy: 1058,
            finishTime: 1525930415,
            startTime: 1525920589,
            detaildata: ['https://img.yzcdn.cn/upload_files/2018/04/03/Fo7iUgX_W9IcpHivxEAnMYb_ciy4.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fg5vZE-znRbNnAEmBYwjne7RNQN9.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fv37rLialylGy4thVdxIB1245cz4.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FrBkByevRU8xoJ1dBf2Cqb8pLZbM.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FsdBBPpX685m8nQBTVwTmI94bD5C.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FiZNsPTh-CJn92bNaDtnaP_H247d.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FsKam2UxI_N40uPQSB_-9JumYawJ.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FrRf6jmDxKgu0hlVrSIyQQwdxzgR.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FgS55WcICP6VQIMhSLAoiPHz1m4k.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FvJcKBqBr9SuPHvlxZ0GkWCL6DM-.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FngXHD4bTY4Lt1x07WZvveeKj0GK.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FjMT-JOJNvK021raBMMEi6FbUTEQ.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Foj0D7s_Vdjdbu_NlZTB1eWw4rFV.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FoWN5-QmFPZd6E-ReehQoksgJdRt.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fva4J9Co_AeIseRCZYcm1ev-bHRN.jpg!730x0.jpg'],
            manual: [{"key":"商品名称","value":"汇仁 肾宝片(电商专用)"},{"key":"品　　牌","value":"汇仁"},{"key":"通 用 名","value":"肾宝片"},{"key":"生产厂家","value":"江西汇仁药业有限公司"},{"key":"产品类型","value":"男科用药"},{"key":"成　　份","value":"淫羊藿、葫芦巴、金樱子、熟地黄、补骨脂、蛇床子、制何首乌、肉苁蓉、枸杞子、菟丝子、五味子、覆盆子、黄芪、红参、白术、山药、茯苓、当归、川穹、小茴香、车前子、灸甘草。"},{"key":"药品性状","value":"汇仁肾宝片为薄膜衣片，除去薄膜衣后显浅褐色；气芳香，味微苦。"},{"key":"适 应 症","value":"调和阴阳，温阳补肾，扶正固本。汇仁肾宝片用于腰腿酸痛，精神不振，夜尿频多，畏寒怕冷；妇女白带清稀。"},{"key":"用法用量","value":"口服，一次3片，一日3次。"},{"key":"不良反应","value":"尚不明确。"},{"key":"禁 忌 症","value":"孕妇忌服肾宝片，儿童禁用。 "},{"key":"注意事项","value":"1、忌油腻食物。2、凡脾胃虚弱，呕吐泄泻，腹胀便溏、咳嗽痰多者慎用。3、感冒病人不宜服用。4、高血压、糖尿病患者应在医师指导下服用。5、服用本品同时不宜服用藜芦、五灵脂、皂荚或其制剂；不宜喝茶和吃萝卜，以免影响药效。6、本品宜饭前服用。7、服药二周或服药期间症状无改善，或症状加重，或出现新的严重症状，应立即停药并去医药就诊。8、对本品过敏者禁用，过敏体质者慎用。9、本品性状发生改变时禁止使用。10、请将汇仁肾宝片放在儿童不能接触的地方。11、如正在使用其他药品，使用汇仁肾宝片前请咨询医师或药师。"},{"key":"药物相互作用","value":"如与其他药物同时使用可能会发生药物相互作用，详情请咨询医师或药师。 "},{"key":"贮　　藏","value":"密封，遮光，置阴凉处（不超过20°C）。"},{"key":"包　　装","value":"铝塑板，每板装9片，每小盒装2板， 每盒装7小盒，共126片。"},{"key":"有 效 期","value":"24个月。"},{"key":"孕妇及哺乳期妇女用药","value":"孕妇忌服肾宝片。 "},{"key":"儿童用药","value":"儿童禁用肾宝片。 "}]
        },
        GroupList: [{
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

        if(options.gid){
            //有拼团id传入
            this.setData({
                GroupId: options.id
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
    //加载乒团详情数据
    GetGroupDetailData(){
        this.handleData();

        this.GroupTimeOut();
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