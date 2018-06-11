// pages/Common/MenuCustomer/MenuCustomer.js
var app = getApp();
Component({
    data: {
        isShow: false,
        mobile: '',
        flag: true
    },
    ready(){
        this.setData({
            mobile: app.globalData.tel,
            isOpenCustomerService: app.globalData.isOpenCustomerService
        })
    },
    methods: {
        ToggleChaticonMenu() {
            this.setData({
                isShow: !this.data.isShow
            })
        },
        ShowMenu(flag){
            if(flag === undefined){
                flag = true
            }
            this.setData({
                isShow: true,
                flag: flag
            })
        },
        Calling(){
            app.calling();
        }
    }
})