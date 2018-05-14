//index.js
const index = require('../controllers/indexController.js').controller;
//获取应用实例
var app = getApp();

Page({
    data: {
        navmeau: [],//菜单
        collage: [],//拼团
        recommendgoods: [],//推荐单品
        scanresult: '',
        route: ''
    },
    onLoad: function() {
        this.GetHomeData();
    },
    onReady: function() {
        this.search = this.selectComponent("#search");
    },
    calling: function() {
        app.calling()
    },
    //导航菜单事件响应
    IndexCategroyTap(e) {
        let _id = e.currentTarget.dataset.id;
        let type = e.currentTarget.dataset.type;
        if (type == 0) {
            //分类跳转
            wx.navigateTo({
                url: '/pages/Category/Category?id=' + _id
            });
        } else if (type == 1) {
            //活动页跳转
            /* 
            wx.navigateTo({
                url: 'pages/category/category?id=' + _id
            });
            */
        }
    },
    //获取首页数据
    GetHomeData() {
        wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        //获取数据
        setTimeout(() => {
            let navmeau = [ //菜单
                { img: 'http://www.kzj365.com/mini_program/images/navmeauicon01.png', name: '分类', id: '', type: '0' },
                { img: 'http://www.kzj365.com/mini_program/images/navmeauicon02.png', name: '家庭用药', id: '2', type: '0' },
                { img: 'http://www.kzj365.com/mini_program/images/navmeauicon03.png', name: '医疗器械', id: '3', type: '0' },
                { img: 'http://www.kzj365.com/mini_program/images/navmeauicon04.png', name: '成人用品', id: '4', type: '0' }
            ];
            let collage = [ //拼团
                { siderimg: 'http://kzjimg01.b0.upaiyun.com/1505885853574.jpg', name: '【9.9元包邮】度太女神叶酸片0.4mg*31片', price: '15.90', attr: '2件', sale: '154', discont: '30.00', id: '18721' },
                { siderimg: 'http://kzjimg01.b0.upaiyun.com/1505885853574.jpg', name: '1【9.9元包邮】度太女神叶酸片0.4mg*31片', price: '16.90', attr: '1件', sale: '154', discont: '15.00', id: '1872' }
            ];
            let recommendgoods = [ //推荐单品
                { img: 'http://kzjimg01.b0.upaiyun.com/1505198984892.jpg', name: '藏王天宝 补肾丸', price: '498.00', id: '8183' },
                { img: 'http://kzjimg01.b0.upaiyun.com/1490338932018.jpg', name: '京果 海狗丸', price: '89.00', id: '381' },
                { img: 'http://www.kzj365.com/images/201509/goods_img/11650_P_1443087906384.jpg', name: '弥凝 醋酸去氨加压素片', price: '195.00', id: '27156' },
                { img: 'http://www.kzj365.com/images/201508/goods_img/20529_P_1439888106324.jpg', name: '济民可信 金水宝胶囊(OTC)', price: '41.00', id: '36096' }
            ];
            this.setData({
                navmeau: navmeau,
                collage: collage,
                recommendgoods: recommendgoods
            })
            wx.hideLoading();
        }, 500)
    }
})