var pathName=window.document.location.pathname;
var ctx=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
if(ctx == "/html")
	ctx = "";
var CommonJS = function() {
};
CommonJS.prototype.serviceUrl = ctx + "/rest/service/routing";
//CommonJS.prototype.serviceUrl = "/SpringWebProject/test.do";
CommonJS.prototype.ajax = function(data ,event) {
	//判断请求发送后，是否需要禁用按钮
	if(!(event == undefined)){
		if($(event.target).hasClass('doublesubmit')){
			$(event.target).attr('disabled',"true");
		}
	}
	
	$.ajax({
		type : data.type == undefined ? 'POST' : data.type,
		url : CommonJS.prototype.serviceUrl,
		data : data.param,
		cache:false,
		dataType : "json",
		traditional:true,
		success : function(returnData) {
			//操作成功后启用按钮
			if(!(event == undefined)){
				if($(event.target).hasClass('doublesubmit')){
					$(event.target).removeAttr('disabled');
				}
			}
			
			if(data.successF){		
				//data.successF(returnData);//请求成功
				if(returnData.respCode == '0000'){
					data.successF(returnData);//请求成功
				}else{
					layer.alert(returnData.respDesc,{icon:'error'});
				}
			}else{
				//调用提示框组件，提示成功，在平台开发的时候进行补充
                //CommonJS.prototype.getPlatFormContext().Modal.alert({"msg":returnData.respDesc});
			}			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//操作成功后启用按钮
			if(!(event == undefined)){
				if($(event.target).hasClass('doublesubmit')){
					$(event.target).removeAttr('disabled');
				}
			}
			
			if(data.errorF){
				data.errorF(XMLHttpRequest, textStatus, errorThrown);
			}else{
				//调用提示框组件，提示失败，在平台开发的时候进行补充
				//CommonJS.prototype.getPlatFormContext().Modal.alert({"msg":"操作失败！"});
			}
		}
	});
};
/**验证输入内容是否符合正则表达式，$dom为待验证的元素，regstr为正则表达式,regdes为验证提示信息*/
CommonJS.prototype.validateDom = function($dom,regstr,regdes,required){
	var value = $dom.val();
	if($dom[0].tagName == 'TEXTAREA'){
		$dom = $dom.parent();
	}
	var left = $dom.position().left;
/*	var top = $dom.position().top;*/

	if(required == "required" && value == ""){
		$dom.next(".invalidDiv").remove();
		$dom.addClass("validate-color");
		var invalidHtml = "<div class='invalidDiv clear-padding input-sm col-sm-9 ' style='height:auto;margin-left:"+left/*+"px; margin-top:"+top*/+"px; '>";
		invalidHtml = invalidHtml + "<label style='color:red;font-size:12px;'>必输项";
		invalidHtml = invalidHtml + "</label></div>";
		$dom.after(invalidHtml);
	}else if(regstr!=""){//进行中正则验证
		var reg = new RegExp(regstr);  
		var compire = reg.test(value);
		if(compire || value == ""){
			//移除验证描述区域
			$dom.next(".invalidDiv").remove();
			//去掉字体颜色
			$dom.removeClass("validate-color");
		}else{
			//没有提示区域，元素变红并追加提示区域
				$dom.next(".invalidDiv").remove();
			//去掉字体颜色
			$dom.removeClass("validate-color");
			$dom.addClass("validate-color");
			if(!regdes || regdes == ""){
				regdes == "输入不合法";
			}
			var invalidHtml = "<div class='invalidDiv input-sm col-sm-9 ' style='height:auto;margin-left:"+left+"px; '>";
			invalidHtml = invalidHtml + "<label style='color:red;font-size:12px;'>" + regdes;
			invalidHtml = invalidHtml + "</label></div>";
			$dom.after(invalidHtml);
		}
	}else{//不用则在表达式验证，只用提示信息
		//没有提示区域，元素变红并追加提示区域
			$dom.next(".invalidDiv").remove();
			//去掉字体颜色
			$dom.removeClass("validate-color");
			$dom.addClass("validate-color");
			if(!regdes || regdes == ""){
				regdes == "输入不合法";
			}
			var invalidHtml = "<div class='invalidDiv input-sm col-sm-9 ' style='height:auto;margin-left:"+left+"px; '>";
			invalidHtml = invalidHtml + "<label style='color:red;font-size:12px;'>" + regdes;
			invalidHtml = invalidHtml + "</label></div>";
			$dom.after(invalidHtml);
	}
};

CommonJS.prototype.parseJsonToData = function(obj){
	var jstr = "";  
	for(var item in obj){
        jstr += item+"="+obj[item]+"&";
	}
	return jstr;
};

/**生成唯一主键*/
CommonJS.prototype.makePmk = function(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
};

CommonJS.prototype.getPlatFormContext = function(){
	var i = 0;
 	var parentContext = parent;
 	//循环5次页面超过5曾跳出循环
 	while(!parentContext.Modal && i < 5){
 		i++;
 		parentContext = parentContext.parent;
 	}
 	return parentContext;
};

CommonJS.prototype.formLoadData = function(obj,$form){
    var key,value,tagName,type,arr;
    for(x in obj){
        key = x;
        value = obj[x];
		$form.find("[name='"+key+"'],[name='"+key+"[]']").each(function(){
            tagName = $(this)[0].tagName;
            type = $(this).attr('type');
            if(tagName=='INPUT'){
                if(type=='radio'){
                    $(this).attr('checked',$(this).val()==value);
                }else if(type=='checkbox'){
                    arr = value.split(',');
                    for(var i =0;i<arr.length;i++){
                        if($(this).val()==arr[i]){
                            $(this).attr('checked',true);
                            break;
                        }
                    }
                }else{
                    $(this).val(value);
                }
            }else if(tagName=='SELECT' || tagName=='TEXTAREA'){
                $(this).val(value);
            }

        });
    }
};

/**
*
* 扩展jquery对象，生成序列化json对象
* 
*/
$.fn.serializeObject = function (formValid) {
	var o = {};
	var self=this;
	if(!self){
		return o;
	}
	if(formValid){
			if (self[0]&&self[0].tagName.toLowerCase() == "form") {
				//var cuinputcomb=self.find(".cuinputcomb");
				var inputs = self.find("input");
				var flag = 0;
				var hasRequired = 0;
				var valid = true;//是否校验通过
				inputs.each(function () {
					//var $input=$(this).find("input");
					var $input = $(this);
					if ($input.attr("required")) {
						hasRequired = 1;
						if (!$input.val()) {
							$input.focus().trigger("focus");// 表单查询时，验证必输项是否正确
							valid = false;
							//					return false;
						}
					}
					if ($input.val()) {
						flag = 1;
						if ($input.siblings(".invalidDiv").html()) {
							$input.focus().trigger("focus");
							valid = false;
							//					return false;
						}
					}
				});

			var textareas = self.find("textarea");
			textareas.each(function(){
				var $textarea = $(this);
				if($textarea.attr("required")){
					hasRequired=1;
					if(!$textarea.val()){
						$textarea.focus().trigger("focus");
						valid = false;
					}
				}
			});
			if(flag==0&&hasRequired==0){
//				alert("最少输入一项");
//				return false;
			}
			if(!valid)
				return false;
		}
	}
   var a = this.serializeArray();
   $.each(a, function () {
       if (o[this.name] !== undefined) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
    	   if(this.value)
    		   o[this.name] = this.value || '';
       }
   });
   return o;
};

/**组装Form结构及数据回显*/
CommonJS.prototype.formDOMData = function($object,$FROM){
	var obj = $object.list;
	if(obj.length>0){
		if($FROM.hasClass("cumodal")){
			var html=[];
			for(var i=0;i<obj.length;i++){
				html.push('<div cid="10155" class="cuinputcomb form-group pool-boxs two_columns" data-options="');
		        html.push('{&quot;label_text&quot;:&quot;&quot;,');
		        html.push('&quot;cuinputcomb_type&quot;:&quot;text&quot;,');
		        html.push(' &quot;cuinputcomb_name&quot;:&quot;goodLevel&quot;,');
		        html.push(' &quot;cuinputcomb_required&quot;:&quot;&quot;');
		        html.push('}">');
		        html.push('<label class="breadth-laber pool-label ">',obj[i].attrName,'</label>');
		        html.push(' <input class="form-control form-angle input-sm breadth-form col-sm-9" type="text" name=',obj[i].attrCode,' value=',obj[i].attrValue,'>');
		        html.push(' </div>');
			}
			$FROM.empty().append(html.join(""));
		}else{
			var html=[];
			for(var i=0;i<obj.length;i++){
				html.push('<div cid="10155" class="cuinputcomb form-group pool-boxs" data-options="');
		        html.push('{&quot;label_text&quot;:&quot;&quot;,');
		        html.push('&quot;cuinputcomb_type&quot;:&quot;text&quot;,');
		        html.push(' &quot;cuinputcomb_name&quot;:&quot;goodLevel&quot;,');
		        html.push(' &quot;cuinputcomb_required&quot;:&quot;&quot;');
		        html.push('}">');
		        html.push('<label class="breadth-laber pool-label ">',obj[i].attrName,'</label>');
		        html.push(' <input class="form-control form-angle input-sm breadth-form col-sm-9" type="text" name=',obj[i].attrCode,' value=',obj[i].attrCode,'>');
		        html.push(' </div>');
			}
			$FROM.prepend(html.join(""));
		}
	}	
};
//返回当前页面的文本
CommonJS.prototype.getHtml = function(){
    return $("html").html();
};
//登陆超时没权限跳转提示
$.ajaxSetup({
	error:function(request, status, error){
		if(request.status=='403'){
			layer.alert("没有访问权限，请稍后再试",{icon:'warn'});
		}
	}  ,
	complete:function(XMLHttpRequest,textStatus){
		var respSessionStatus = XMLHttpRequest.getResponseHeader("sessionstatus");
		var pathName=window.document.location.pathname;
		var ctx=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		if(ctx == "/html")
			ctx = "";
		if(respSessionStatus =="timeout"){
			window.location.href=ctx+"/PlatForm.html";
			return false;
		}else if(respSessionStatus =="401"){
			layer.alert("没有访问权限，请稍后再试",{icon:'warn'});
			return false;
		}
		return true;
	}
});