;(function(){
$.fn.validate = $.validate = function(options){
    var _this = this;
    var isok = false;
    var defaults = {
        tips_success:' ',
        tips_required:'不能为空',
        tips_user:'账号不能为空',
        tips_pwd:'密码不能为空',
        tips_code:'验证码不能为空',
        tips_mobile:'请输入正确的手机号',
        reg_mobile: /^1[234578]{1}[0-9]{9}$/
    };
    if(options){
        $.extend(defaults,options);
    }
    var check = function(obj,_match,_val){
        switch (_match) {
            case 'required':
                    return _val ? true : showMsg(defaults.tips_required);
            case 'user':
                    return _val ? true : showMsg(defaults.tips_user);
            case 'pwd':
                    return _val ? true : showMsg(defaults.tips_pwd);
            case 'code':
                    return _val ? true : showMsg(defaults.tips_code);
            case 'mobile':
                    return regex(_val, defaults.reg_mobile) ? true : showMsg(defaults.tips_mobile);
            default:
                return true;

        }
    }
    var regex = function (str, reg){
            return reg.test(str);
    }
    var showMsg = function(msg){
            alert(msg);
        return false;
    }
    $(":text,:password,textarea",_this).each(function(){
            isok = true;
            var _validate = $(this).attr('check');
            if(_validate){
                var arr = _validate.split(' '),
                    len = arr.length;
                for (var i = 0; i < len; i++) {
                    if(!check($(this),arr[i],$(this).val())){
                        isok = false;
                        return false;
                    }else{
                         continue;
                    }
                }
            }
        });
    return isok;
}
})(jQuery);
