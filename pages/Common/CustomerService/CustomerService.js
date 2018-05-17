// pages/Common/CustomerService/CustomerService.js
Component({
    /**
     * 组件的初始数据
     */
    data: {
        isShow: true,
        UserInfo:{
            name: '',
            mobile: '',
            type: 0,
            reason: ''
        },
        reason_list: ['错拍/多拍','不想买了','发货慢','其它'],
        ValiStatus: false
    },
    ready(){
        this.Dialog = this.selectComponent('#Dialog');
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //验证表单
        //status: true 开启错误提示功能
        ValiData(status) {
            let flag = true;
            let msg = '';
            if(this.data.UserInfo.reason == ''){
                msg = '请选择售后原因';
                flag = false;
            }
            if (this.data.UserInfo.name == '') {
                if (msg == '') msg = '联系人不能为空';
                flag = false;
            }
            if (this.data.UserInfo.mobile == '') {
                if (msg == '') msg = '联系号码不能为空';
                flag = false;
            }
            if (!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.data.UserInfo.mobile)) {
                if (msg == '') msg = '联系号码格式错误';
                flag = false;
            }
            if (status && msg) {
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
        Show(option) {
            //接受参数
            var _Detail = option ? Object.assign(this.data.UserInfo, option) : {};

            this.setData({
                Detail: _Detail,
                isShow: true
            });

            this.ValiData();
        },
        //关闭弹窗
        CloseEdit() {
            this.setData({
                isShow: false
            })
        },
        //保存编辑地址
        save() {
            if (this.ValiData(1)) {
                //ajax
                //操作完成，发送EditEvent事件
                this.triggerEvent("SaveEvent", this.data.UserInfo);
            }
        },
        //表单事件绑定
        BindNameChange(e) {
            let _tempData = this.data.UserInfo;
            _tempData.name = e.detail.value;
            this.setData({
                UserInfo: _tempData
            })
            this.ValiData();
        },
        BindMobileChange(e) {
            let _tempData = this.data.UserInfo;
            _tempData.mobile = e.detail.value;
            this.setData({
                UserInfo: _tempData
            })
            this.ValiData();
        },
        //Picker改变事件
        bindpickerChange(e){
            let _index = e.detail.value;
            let _Data = this.data.UserInfo;
            _Data.reason = this.data.reason_list[_index];
            this.setData({
                UserInfo: _Data
            })
            this.ValiData();
        }
    }
})