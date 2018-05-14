// pages/address/addressList/addressList.js

const app = getApp()
import AddressController from '../../controllers/addressController'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        AddressList: [],
        ChooseMode: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if(options.ChooseMode){
            this.setData({
                ChooseMode: options.ChooseMode
            })
        }
        this.getAddressData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.AddressEdit = this.selectComponent('#AddressEdit');
        if(this.data.ChooseMode){
            wx.setNavigationBarTitle({
              title: '选择地址'
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    getAddressData(){
        wx.showLoading();
        AddressController.controller.getAddressData().then(res => {
            this.setData({
                AddressList: res
            });
            wx.hideLoading();
        });
    },
    //编辑地址
    EditFu(event){
        let id = event.currentTarget.dataset.id;
        let option = this.SearchObject(id);
        this.AddressEdit.ShowEdit(option);
    },
    //删除地址
    DelFu(event){

    },
    //选择默认地址
    ChooseDefault(event){
        let id = event.currentTarget.dataset.id;
        //设置默认值
        let _Detail = this.data.AddressList;
        for(let item of _Detail){
            item.isDefault = id == item.id
        }
        this.setData({
            AddressList: _Detail
        })
        //AddressController.controller.setAddressDefault().then(res => {});
    },
    //点击选择地址
    ChooseAddress(event){
        if(this.data.ChooseMode){
            //选择地址
        }
    },
    //响应编辑窗口事件
    HandleEditEvent(){
        //重新加载列表数据
        this.getAddressData();
    },
    //遍历查找地址对象
    SearchObject(id){
        for(let item of this.data.AddressList){
            if(id == item.id){
                return item;
            }
        }
        return {};
    }
})