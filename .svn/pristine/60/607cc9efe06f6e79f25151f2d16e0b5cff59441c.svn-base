const goods = require('../controllers/goodsController.js').controller
var app = getApp();
var selectIndex;//选择的大规格key
var attrIndex;//选择的小规格的key
var selectIndexArray = [];//选择属性名字的数组

var selectAttrid = [];//选择的属性id
Page({
  data: {//页面的初始数据
    tabsindex:0,
    animation1: {},
    animation2: {},
    goodsinfo:{//商品信息
      siderimg: [
        'http://www.kzj365.com/images/201609/goods_img/10107_P_147521',
        'http://www.kzj365.com/images/201609/goods_img/10107_P_1475217761551.jpg',
        'http://www.kzj365.com/images/201609/goods_img/10107_P_1475217761551.jpg'
      ],
      type:2,
      name:'Now Foods美国玛卡精片蒺藜皂甙玛咖精华片成人男性保健品持久增大',
      price:'15.90',
      market:'18.00',
      manufacturer:'nowfoodsNow Foods美国玛卡精片蒺藜皂甙玛咖精华片成人男性保健品持久增大',
      selectspec: ''
    },
    speclists: [
      {name: '150μg*30粒', isselect: true, id:11 },
      { name: '150μg*60粒', isselect: false, id: 22 },
      { name: '150μg*90粒', isselect: false, id: 33 }
    ],
    packager: [
      { name: '150μg*30粒', isselect: false, id: 111 },
      { name: '150μg*60粒', isselect: true, id: 222 },
      { name: '150μg*90粒', isselect: false, id: 333}
    ],
    showModalStatus: false, //是否显示
    goodsnums: {
      nums: 1,
      minsStatus: 'disabled',
      plusStatus: '',
      maxnums:10
    },
    detaildata: ['https://img.yzcdn.cn/upload_files/2018/04/03/Fo7iUgX_W9IcpHivxEAnMYb_ciy4.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fg5vZE-znRbNnAEmBYwjne7RNQN9.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fv37rLialylGy4thVdxIB1245cz4.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FrBkByevRU8xoJ1dBf2Cqb8pLZbM.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FsdBBPpX685m8nQBTVwTmI94bD5C.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FiZNsPTh-CJn92bNaDtnaP_H247d.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FsKam2UxI_N40uPQSB_-9JumYawJ.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FrRf6jmDxKgu0hlVrSIyQQwdxzgR.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FgS55WcICP6VQIMhSLAoiPHz1m4k.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FvJcKBqBr9SuPHvlxZ0GkWCL6DM-.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FngXHD4bTY4Lt1x07WZvveeKj0GK.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FjMT-JOJNvK021raBMMEi6FbUTEQ.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Foj0D7s_Vdjdbu_NlZTB1eWw4rFV.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/FoWN5-QmFPZd6E-ReehQoksgJdRt.jpg!730x0.jpg', 'https://img.yzcdn.cn/upload_files/2018/04/03/Fva4J9Co_AeIseRCZYcm1ev-bHRN.jpg!730x0.jpg'
    ],
    selectName: "",//已选的属性名字
    selectAttrid: [],//选择的属性id
  },
  /* 点击减号 */
  bindMinus: function () {
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
  bindPlus: function () {
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
  bindManual: function (e) {
    var nums = e.detail.value;
    if (!(/(^[1-9]\d*$)/.test(nums))){
      nums=1;
    }
    if (nums > this.data.goodsnums.maxnums) {
      nums=10;
    }
    var minsStatus = nums <= 1 ? 'disabled' : '';
    var plusStatus = nums >= this.data.goodsnums.maxnums ? 'disabled' : '';
    this.setData({
      'goodsnums.nums': nums,
      'goodsnums.plusStatus': plusStatus,
      'goodsnums.minsStatus': minsStatus
    });
  },
  clickAttr: function (e) {
    // console.log(e);return;
    var selectIndex = e.currentTarget.dataset.selectindex;
    var attrIndex = e.currentTarget.dataset.attrindex;
    var spec = this.data.speclists;
    console.log(selectIndex)
    var count = spec[selectIndex].length;
    // console.log(count); return;
    for (var i = 0; i < count; i++) {
      spec[selectIndex].child[i].isSelect = false;
    }
    spec[selectIndex].child[attrIndex].isSelect = true;
    var name = spec[selectIndex].child[attrIndex].name;//点击属性的名称
    var attrid = spec[selectIndex].child[attrIndex].id;
    // //点击过，修改属性
    var selectName = "";
    //点击过，修改属性
    selectIndexArray[selectIndex].value = name;
    selectAttrid[selectIndex] = attrid;
    var selectIndexArraySize = selectIndexArray.length;
    //将数组的所有属性名拼接起来
    for (var i = 0; i < selectIndexArraySize; i++) {
      selectName += ' "' + selectIndexArray[i].value + '" ';
    }
    console.log(selectName);
    this.setData({
      spec: spec,//变换选择框
      selectName: selectName,
      selectAttrid: selectAttrid
    });
  },

  //初始化规格选择
  init_attr: function () {
    //初始化规格选择
    var name = "";
    var spec = this.data.spec;
    var size = spec.length;
    for (var i =0; i < size; i++) {
      selectIndexArray.push({ key: i, value: spec[i].child[0].name });
      selectAttrid.push(spec[i].child[0].id)
      name += ' "' + selectIndexArray[i].value +  '" ';
    }
    var selectName = this.data.selectName;
    selectName = name;
    this.setData({
      selectName: selectName,
      selectAttrid: selectAttrid
    });
  },
  // tabs
  tabs:function(e){
    var index=e.target.dataset.id;
    this.setData({
      tabsindex: index
    })
  },
  showModal: function () {// 显示遮罩层
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(420).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 100)
  },
  hideModal: function () {// 隐藏遮罩层
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var article = `<p style="padding: 20px 10px; background-color:#eee; text-algin:center"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/Fo7iUgX_W9IcpHivxEAnMYb_ciy4.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/Fg5vZE-znRbNnAEmBYwjne7RNQN9.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/Fv37rLialylGy4thVdxIB1245cz4.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="426" src="https://img.yzcdn.cn/upload_files/2018/04/03/FrBkByevRU8xoJ1dBf2Cqb8pLZbM.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FsdBBPpX685m8nQBTVwTmI94bD5C.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FiZNsPTh-CJn92bNaDtnaP_H247d.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FsKam2UxI_N40uPQSB_-9JumYawJ.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FrRf6jmDxKgu0hlVrSIyQQwdxzgR.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FgS55WcICP6VQIMhSLAoiPHz1m4k.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FvJcKBqBr9SuPHvlxZ0GkWCL6DM-.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FngXHD4bTY4Lt1x07WZvveeKj0GK.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="426" src="https://img.yzcdn.cn/upload_files/2018/04/03/FjMT-JOJNvK021raBMMEi6FbUTEQ.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/Foj0D7s_Vdjdbu_NlZTB1eWw4rFV.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/FoWN5-QmFPZd6E-ReehQoksgJdRt.jpg!730x0.jpg"><img data-origin-width="750" data-origin-height="425" src="https://img.yzcdn.cn/upload_files/2018/04/03/Fva4J9Co_AeIseRCZYcm1ev-bHRN.jpg!730x0.jpg"></p>`;

    
    // WxParse.wxParse('article', 'html', article, that, 5);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  errImg: function (event) {//图片错误
    var that = this;
    app.errImg(event,that);
  }
})

