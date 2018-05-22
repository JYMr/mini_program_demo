// pages/user/myreservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Status: 0,
    OrderList: [],
    ListNo: 1,
    ListSize: 8,
    isNeedLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status) {
      this.setData({
        Status: options.status
      })
    }
    this.GetOrderList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.Dialog = this.selectComponent('#Dialog');
    this.CustomerServiceComponent = this.selectComponent('#CustomerService');
    this.Floatcustomer = this.selectComponent("#Floatcustomer");
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
    console.log('触底');
    this.setData({
      ListNo: ++this.data.ListNo
    })
    this.GetOrderList();
  },
  //获取订单数据
  GetOrderList() {
    var that=this;
    wx.showLoading({
      title: '加载数据中...',
      mask: true
    });
    setTimeout(() => {
      let List = [{ id: '1658', status: 0, orderPrice: 75.90, isNeedExpress: false, total: 3, goods_list: [{ id: 1516, src: '', title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶', total: 3, spec_type: '盒', goods_type: '1', isGroup: false, price: 25.90 }] }, { id: '1658', status: 2, orderPrice: 25.90, isNeedExpress: true, total: 8, goods_list: [{ id: 1516, src: '', title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶', total: 5, spec_type: '盒', goods_type: '2', isGroup: true, price: 25.90 }, { id: 1516, src: '', title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶', total: 1, spec_type: '盒', goods_type: '3', isGroup: false, price: 25.90 }] }, { id: '1658', status: 1, orderPrice: 75.90, isNeedExpress: false, total: 3, goods_list: [{ id: 1516, src: '', title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶', total: 3, spec_type: '盒', goods_type: '4', isGroup: false, price: 25.90 }] }, { id: '1658', status: 3, orderPrice: 75.90, isNeedExpress: false, total: 3, goods_list: [{ id: 1516, src: '', title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶', total: 3, spec_type: '盒', goods_type: '4', isGroup: false, price: 25.90 }], ExpressSlotNumber: '2515446551321321', ExpressSlotName: '申通快递' }, { id: '1658', status: 4, orderPrice: 75.90, isNeedExpress: false, total: 3, goods_list: [{ id: 1516, src: '', title: '仁和健途(jintoo) 高级大胶原蛋白壳寡糖果味饮品480ml/瓶', total: 3, spec_type: '盒', goods_type: '4', isGroup: false, price: 25.90 }] }];
      // wx.request({
      //   url: 'https://4a0096a3-fd57-474d-9724-ed37426b5f75.mock.pstmn.io/GetOrderList', 
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success: function (res) {

      //     if (res.data.status==0){

      //       let List = res.data.List;
      //       that.setData({
      //         OrderList: List,
      //         status: 0
      //       })
      //       wx.hideLoading();
      //     }
      //   }
      // })

      that.setData({
        OrderList: List,
        status: 0
      })
      wx.hideLoading();
      
    }, 500)
  },
  //切换订单状态
  TabToggle(e) {
    let _Status = e.currentTarget.dataset.status;
    this.GetOrderList();
    this.setData({
      Status: _Status
    })
  },
  //取消预定
  CancelPeservation(e) {
    let _id = e.currentTarget.dataset.id;
    console.log('取消预定 - id:' + _id);

    this.Dialog.ShowDialog({
      title: '亲，是否取消该预定？',
      type: 'Confirm',
      btnArray: [
        { title: '是', name: 'yes' },
        { title: '否', name: 'no' }
      ],
      callback: res => {
        if (res.name == 'yes') {
          console.log('取消');
        }
        this.Dialog.CloseDialog();
      }
    })
  },
  //申请售后
  CustomerService(e) {
    let _id = e.currentTarget.dataset.id;
    console.log('申请售后 - id:' + _id);
    this.CustomerServiceComponent.Show({
      id: _id
    });
  },
  //处理售后弹窗回调
  CustomerServiceFn(e) {
    console.log(e)
    let _id = e.detail.id;
    this.CustomerServiceComponent.Close();
  },
  //重新提交
  AgainPeservation(e) {
    let _id = e.currentTarget.dataset.id;
    console.log('重新提交 - id:' + _id);
  },
  //删除预定
  DeletePeservation(e) {
    let _id = e.currentTarget.dataset.id;
    console.log('预定 - id:' + _id);
    this.Dialog.ShowDialog({
      title: '亲，是否删除该预定？',
      type: 'Confirm',
      btnArray: [
        { title: '是', name: 'yes' },
        { title: '否', name: 'no' }
      ],
      callback: res => {
        if (res.name == 'yes') {
          console.log('取消');
        }
        this.Dialog.CloseDialog();
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})