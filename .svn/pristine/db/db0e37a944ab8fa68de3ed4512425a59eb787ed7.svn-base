// pages/cate/lists.js
var p = 2 
var url = "http://m.kzj365.com/ajaxSearchCategoryGoodsInfo.htm";  
var GetList = function (that) {  
  that.setData({  
    hidden: false  
  });  
  wx.request({  
    url: url,  
    data: {
      c_id:46,
      pageSize: 10,  
      page: p  
    },  
    success: function (res) {  
      var l = that.data.contentlist; 
      
      for (var i = 0; i < res.data.length; i++) {  
        l.push(res.data[i])  
      }
      that.setData({  
        contentlist: l  
      });  
      p++;  
      that.setData({  
        hidden: true  
      });  
    }  
  });  
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……' ,
    contentlist: [//商品列表
      // { img: 'http://kzjimg01.b0.upaiyun.com/1505198984892.jpg', name: '藏王天宝 补肾丸', price: '498.00', id: '8183',type:'1' },
      // { img: 'http://kzjimg01.b0.upaiyun.com/1490338932018.jpg', name: '京果 海狗丸', price: '89.00', id: '381', type: '2' },
      // { img: 'http://www.kzj365.com/images/201509/goods_img/11650_P_1443087906384.jpg', name: '弥凝 醋酸去氨加压素片', price: '195.00', id: '27156', type: '3'},
      // { img: 'http://www.kzj365.com/images/201508/goods_img/20529_P_1439888106324.jpg', name: '济民可信 金水宝胶囊(OTC)', price: '41.00', id: '36096', type: '1'},
      // { img: 'http://kzjimg01.b0.upaiyun.com/1505198984892.jpg', name: '藏王天宝 补肾丸', price: '498.00', id: '8183', type: '1' },
      // { img: 'http://kzjimg01.b0.upaiyun.com/1490338932018.jpg', name: '京果 海狗丸', price: '89.00', id: '381', type: '2' },
      // { img: 'http://www.kzj365.com/images/201509/goods_img/11650_P_1443087906384.jpg', name: '弥凝 醋酸去氨加压素片', price: '195.00', id: '27156', type: '3' },
      // { img: 'http://www.kzj365.com/images/201508/goods_img/20529_P_1439888106324.jpg', name: '济民可信 金水宝胶囊(OTC)', price: '41.00', id: '36096', type: '1' },
      // { img: 'http://kzjimg01.b0.upaiyun.com/1505198984892.jpg', name: '藏王天宝 补肾丸', price: '498.00', id: '8183', type: '1' },
      // { img: 'http://kzjimg01.b0.upaiyun.com/1490338932018.jpg', name: '京果 海狗丸', price: '89.00', id: '381', type: '2' },
      // { img: 'http://www.kzj365.com/images/201509/goods_img/11650_P_1443087906384.jpg', name: '弥凝 醋酸去氨加压素片', price: '195.00', id: '27156', type: '3' },
      // { img: 'http://www.kzj365.com/images/201508/goods_img/20529_P_1439888106324.jpg', name: '济民可信 金水宝胶囊(OTC)', price: '41.00', id: '36096', type: '1' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.search){
      this.setData({
        inputValue: options.search
      })
    }
    var that = this  
    GetList(that) 
    // var date = new Date();
    // this.setData({
    //   refreshTime: date.toLocaleTimeString()
    // })
    // this.getData();
  },
  // // 上拉加载更多
  // loadMore: function () {
  //   var that = this;
  //   // 当前页是最后一页
  //   if (that.data.currentPage == that.data.allPages) {
  //     that.setData({
  //       loadMoreData: '已经到顶'
  //     })
  //     return;
  //   }
  //   setTimeout(function () {
  //     console.log('上拉加载更多');
  //     var tempCurrentPage = that.data.currentPage;
  //     tempCurrentPage = tempCurrentPage + 1;
  //     that.setData({
  //       currentPage: tempCurrentPage,
  //       hideBottom: false
  //     })
  //     that.getData();
  //   }, 300);
  // },
  // // 下拉刷新
  // refresh: function (e) {
  //   var that = this;
  //   setTimeout(function () {
  //     console.log('下拉刷新');
  //     var date = new Date();
  //     that.setData({
  //       currentPage: 1,
  //       refreshTime: date.toLocaleTimeString(),
  //       hideHeader: false
  //     })
  //     that.getData();
  //   }, 300);
  // },
  // // 获取数据  pageIndex：页码参数
  // getData: function () {
  //   var that = this;
  //   var pageIndex = that.data.currentPage;
  //   wx.request({
  //     url: 'http://m.kzj365.com/ajaxSearchCategoryGoodsInfo.htm',
  //     data: {
  //       c_id: '46',
  //       page: pageIndex
  //     },
  //     success: function (res) {
  //       var currentPage=1;
  //       var dataModel = res.data;
  //         if (pageIndex == 1) { // 下拉刷新
  //           currentPage++;
  //           that.setData({
  //             contentlist: dataModel,
  //             hideHeader: true
  //           })
  //         } else { // 加载更多
  //           console.log('加载更多');
  //           var tempArray = that.data.contentlist;
  //           tempArray = tempArray.concat(dataModel);
  //           that.setData({
  //             allPages: dataModel.allPages,
  //             contentlist: tempArray,
  //             hideBottom: true
  //           })
  //         }

  //     },
  //     fail: function () {
  //     }
  //   })
  // },
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
     //下拉  
    console.log("下拉");  
    p = 1;  
    this.setData({  
      list: [],  
    });  
    var that = this  
    GetList(that)
    // var that = this;
    // wx.request({
    //   url: 'http://m.kzj365.com/ajaxSearchCategoryGoodsInfo.htm?c_id=46&page=0',
    //   method: "GET",
    //   header: {
    //     'content-type': 'application/text'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       contentlist: res.data
    //     });
    //     // 隐藏导航栏加载框  
    //     wx.hideNavigationBarLoading();
    //     // 停止下拉动作  
    //     wx.stopPullDownRefresh();
    //   }
    // })  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉  
    console.log("上拉")  
    var that = this  
    GetList(that)  
    // var that = this;
    // // 显示加载图标  
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    // var page=1;
    // // 页数+1 
    // page = page + 1;
    // wx.request({
    //   url: 'http://m.kzj365.com/ajaxSearchCategoryGoodsInfo.htm?c_id=46&page=' + page,
    //   method: "GET",
    //   // 请求头部  
    //   header: {
    //     'content-type': 'application/text'
    //   },
    //   success: function (res) {
    //     // // 回调函数  
    //     // var moment_list = that.data.contentlist;

    //     // for (var i = 0; i < res.data.data.length; i++) {
    //     //   moment_list.push(res.data.data[i]);
    //     // }
    //     // // 设置数据  
    //     // that.setData({
    //     //   contentlist: that.data
    //     // })
    //     // // 隐藏加载框  
    //     // wx.hideLoading();
    //   }
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})