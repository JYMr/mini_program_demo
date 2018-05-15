const goods = require('../controllers/goodsController.js').controller
var app = getApp();
var selectIndex; //选择的大规格key
var attrIndex; //选择的小规格的key
var selectIndexArray = []; //选择属性名字的数组

var selectAttrid = []; //选择的属性id
Page({
    data: { //页面的初始数据
        id: '',
        tabsindex: 0,
        animation1: {},
        animation2: {},
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
            selectspec: '',
            stock: 10,
            speclists: [
                { name: '150μg*30粒', isselect: true, id: 11 },
                { name: '150μg*60粒', isselect: false, id: 22 },
                { name: '150μg*90粒', isselect: false, id: 33 }
            ],
            packager: [
                { name: '150μg*30粒', isselect: false, id: 111 },
                { name: '150μg*60粒', isselect: true, id: 222 },
                { name: '150μg*90粒', isselect: false, id: 333 }
            ],
            detaildata: ['https://img.yzcdn.cn/upload_files/2018/04/03/Fo7iUgX_W9IcpHivxEAnMYb_ciy4.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fg5vZE-znRbNnAEmBYwjne7RNQN9.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fv37rLialylGy4thVdxIB1245cz4.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FrBkByevRU8xoJ1dBf2Cqb8pLZbM.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FsdBBPpX685m8nQBTVwTmI94bD5C.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FiZNsPTh-CJn92bNaDtnaP_H247d.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FsKam2UxI_N40uPQSB_-9JumYawJ.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FrRf6jmDxKgu0hlVrSIyQQwdxzgR.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FgS55WcICP6VQIMhSLAoiPHz1m4k.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FvJcKBqBr9SuPHvlxZ0GkWCL6DM-.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FngXHD4bTY4Lt1x07WZvveeKj0GK.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FjMT-JOJNvK021raBMMEi6FbUTEQ.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Foj0D7s_Vdjdbu_NlZTB1eWw4rFV.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FoWN5-QmFPZd6E-ReehQoksgJdRt.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fva4J9Co_AeIseRCZYcm1ev-bHRN.jpg!730x0.jpg']
        },
        showModalStatus: true, //是否显示
        ModalMode: 'Buy',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
                id: options.id
            });
            this.GetGoodsData();
        }else{
            //无Id，关闭页面
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    //加载商品信息
    GetGoodsData(){
         wx.showLoading({
            title: '加载数据中...',
            mask: true
        });
        //接口加载数据
        wx.hideLoading();
    },
    /* 点击减号 */
    bindMinus(e) {
        var nums = this.data.goodsnums.nums;
        if (nums > 1) {
            nums--;
        }
        var minsStatus = nums <= 1 ? 'disabled' : '';
        var plusStatus = nums >= this.data.goodsnums.maxnums ? 'disabled' : '';
        this.setData({
            'goodsnums.nums': nums,
            'goodsnums.plusStatus': plusStatus,
            'goodsnums.minsStatus': minsStatus
        });
    },
    /* 点击加号 */
    bindPlus(e) {
        var nums = this.data.goodsnums.nums;
        if (nums < this.data.goodsnums.maxnums) {
            nums++;
        }
        var minsStatus = nums <= 1 ? 'disabled' : '';
        var plusStatus = nums >= this.data.goodsnums.maxnums ? 'disabled' : '';
        this.setData({
            'goodsnums.nums': nums,
            'goodsnums.plusStatus': plusStatus,
            'goodsnums.minsStatus': minsStatus
        });
    },
    /* 输入框事件 */
    bindManua(e) {
        var nums = e.detail.value;
        if (!(/(^[1-9]\d*$)/.test(nums))) {
            nums = 1;
        }
        if (nums > this.data.goodsnums.maxnums) {
            nums = 10;
        }
        var minsStatus = nums <= 1 ? 'disabled' : '';
        var plusStatus = nums >= this.data.goodsnums.maxnums ? 'disabled' : '';
        this.setData({
            'goodsnums.nums': nums,
            'goodsnums.plusStatus': plusStatus,
            'goodsnums.minsStatus': minsStatus
        });
    },
    ClickAttr(e) {
        let type = e.currentTarget.dataset.type;
        if(type == 'spec'){
            //处理规格选择
            let _List = this.data.speclists;
            let _ChooseIndex = e.currentTarget.dataset.index;
            let _SpecId = null;
            for(let key in _List){
                _List[key].isselect = false;
                if(_ChooseIndex == key){
                    _List[key].isselect = true;
                    _SpecId = _List[key].id;
                }
            }
            this.setData({
                speclists: _List
            })
            if(_SpecId){
                //刷新规格
                this.ReloadGoodsData(_SpecId);
            }
        }else if(type == 'packager'){
            //处理套餐选择
            let _List = this.data.packager;
            let _ChooseIndex = e.currentTarget.dataset.index;
            for(let key in _List){
                _List[key].isselect = false;
                if(_ChooseIndex == key){
                    _List[key].isselect = true;
                }
            }
            this.setData({
                packager: _List
            })
        }
    },
    //刷新套餐规格信息
    ReloadGoodsData(id){
        console.log(id)
    },
    //规格选择层确定事件
    ModalConfirm(){
        let type = this.data.ModalMode;
        if(type == 'Buy'){
            //立即购买
        }else if(type == 'Cart'){
            //加入购物车
        }else{
            //选择规格
            this.hideModal();
        }
    },
    //初始化规格选择
    init_attr() {
        //初始化规格选择
        var name = "";
        var spec = this.data.spec;
        var size = spec.length;
        for (var i = 0; i < size; i++) {
            selectIndexArray.push({ key: i, value: spec[i].child[0].name });
            selectAttrid.push(spec[i].child[0].id)
            name += ' "' + selectIndexArray[i].value + '" ';
        }
        var selectName = this.data.selectName;
        selectName = name;
        this.setData({
            selectName: selectName,
            selectAttrid: selectAttrid
        });
    },
    // tabs
    tabs(e) {
        var index = e.target.dataset.id;
        this.setData({
            tabsindex: index
        })
    },
    // 显示遮罩层
    showModal(e) {
        let Mode = e.currentTarget.dataset.type || '';
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(420).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true,
            ModalMode: Mode
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 100)
    },
    // 隐藏遮罩层
    hideModal() { 
        var animation = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(420).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    },
    //处理图片错误
    errImg(event) { 
        var that = this;
        app.errImg(event, that);
    }
})