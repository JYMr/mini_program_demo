// pages/address/addressEdit/addressEdit.js
Component({
    data: {
        isShow: false,
        ValiStatus: false,
        isPicker: false,
        Detail: {
            name: '',
            mobile: '',
            province: '',
            city: '',
            area: '',
            address: ''
        },
        region: ['广东省', '广州市', '白云区']
    },
    ready(){
        this.Dialog = this.selectComponent("#Dialog");
    },
    methods: {
        //验证表单
        //status: true 开启错误提示功能
        ValiData(status){
            let flag = true;
            let msg = '';
            if(this.data.Detail.name == ''){
                msg = '收货人不能为空';
                flag = false;
            }
            if(this.data.Detail.mobile == ''){
                if(msg == '') msg = '联系号码不能为空';
                flag = false;
            }
            if(!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.data.Detail.mobile)){
                if(msg == '') msg = '联系号码格式错误';
                flag = false;
            }
            if(this.data.Detail.address == ''){
                if(msg == '') msg = '详细地址不能为空';
                flag = false;
            }
            if(status && msg){
                this.Dialog.ShowDialog({
                    type: "Message",
                    title: msg,
                    messageType: 'fail'
                })
            }
            this.setData({
                ValiStatus: flag
            })
            return flag;
        },
        ShowEdit(option){
            //接受参数
            var _Detail = option ? Object.assign(this.data.Detail, option) : {};

            this.setData({
                Detail: _Detail,
                region: [
                    _Detail.province || this.data.region[0],
                    _Detail.city || this.data.region[1],
                    _Detail.area || this.data.region[2]
                ],
                isShow: true
            });
            
            this.ValiData();
        },
        //关闭弹窗
        CloseEdit(){
            this.setData({
                isShow: false
            })
        },
        //保存编辑地址
        saveEdit(){
            if(this.ValiData(1)){
                //ajax
                //操作完成，发送EditEvent事件
                this.triggerEvent("EditEvent", {
                    id: 123
                });
            }
        },
        //表单事件绑定
        BindNameChange(e){
            let _tempData = this.data.Detail;
            _tempData.name = e.detail.value;
            this.setData({
                Detail: _tempData
            })
            this.ValiData();
        },
        BindMobileChange(e){
            let _tempData = this.data.Detail;
            _tempData.mobile = e.detail.value;
            this.setData({
                Detail: _tempData
            })
            this.ValiData();
        },
        BindAddressChange(e){
            let _tempData = this.data.Detail;
            _tempData.address = e.detail.value;
            this.setData({
                Detail: _tempData
            })
            this.ValiData();
        },
        //Picker改变事件
        bindRegionChange(e){
            let _ChooseArray = e.detail.value;
            let _Detail = this.data.Detail;
            _Detail.province = _ChooseArray[0];
            _Detail.city = _ChooseArray[1];
            _Detail.area = _ChooseArray[2];
            this.setData({
                region: e.detail.value,
                Detail: _Detail
            })
        }
    }
})