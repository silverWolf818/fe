;(function($,window,document,undefined){
	var isLock = false,
	    count = 1;
  var Dialog = function(options){
  	  this.settings = $.extend({},Dialog.defaults, options);
  	  this.init();
  }
  Dialog.prototype = {
  	init:function(){
  		this.create();
  		if(this.settings.lock){
  				this.lock();
  		}
  	},
  	create:function(){
			console.log(this);
  		var divHeader = (this.settings.title==null)?'':'<div class="dialog-header">'+this.settings.title+'</div>',
          divContent = '<div class="dialog-content">'+this.settings.content+'</div>',
          divFooter = '<div class="dialog-footer"></div>'
  		var templates = '<div class="dialog-wrap">'+divHeader+''+divContent+''+divFooter+'</div>';
  		this.dialog = $('<div>').addClass('dialog').css({ zIndex :this.settings.zIndex+(count++)}).html(templates).prependTo('body');
  		//设置大小
  		this.size();
  		//位置
  		this.position();
  		//设置确定按钮
  		this.contentHeight();

			this.animated();

  		if($.isFunction(this.settings.ok)){
  				this.ok();
  		}
  		if ($.isFunction(this.settings.cancel)) {
        	this.cancel();
      }
  	},
  	size:function(){
  		var content = this.dialog.find('.dialog-wrap');
  		content.css({
  			width:this.settings.width,
  			height:this.settings.height
  		});
  	},
  	contentHeight:function(){
  		var allH = this.dialog.find('.dialog-wrap').height(),
  		    headerH = this.dialog.find('.dialog-header').height(),
  		    footerH = this.dialog.find('.dialog-footer').height();
  		   	this.dialog.find('.dialog-content').height(allH-headerH-footerH);
  	},
  	position:function(){
  		var _this = this;
  		this.dialog.css({
  			marginLeft:-_this.dialog.width()/2,
  			marginTop:-_this.dialog.height()/2
  		});
  	},
  	ok:function(){
  		var _this = this,
  		footer = this.dialog.find('.dialog-footer');
  		$('<a>',{
  			href:'javascript:;',
  			text:this.settings.okText
  		}).on('click',function(){
  			var okCallback = _this.settings.ok();
  				if(okCallback == undefined || okCallback){
  					_this.close();
  				}
  		}).addClass('dialog-ok').appendTo(footer);
  	},
  	cancel:function(){
  		var _this = this;
  		footer = this.dialog.find('.dialog-footer');
  		$('<a>',{
  			href:'javascript:;',
  			text:this.settings.cancelText
  		}).on('click',function(){
  			var cancelCallback = _this.settings.cancel();
        	if (cancelCallback == undefined || cancelCallback) {
            	_this.close();
            }
  		}).addClass('dialog-cancel').appendTo(footer);
  	},
  	lock:function(){
  		if(isLock) return;
  		this.lock = $('<div>').addClass('dialog-mask').css({ zIndex :this.settings.zIndex}).appendTo('body');
  		isLock = true;
  	},
  	unLock:function(){
  		if(this.settings.lock){
  			if(isLock){
  				this.lock.remove();
  				isLock = false;
  			}
  		}
  	},
  	close:function(){
  		this.dialog.remove();
  		this.unLock();
  	},
		animated:function(){
			// var content = this.dialog.find('.dialog-wrap');
			// content.animate({width:'400px',height:'200px'}, 300);
		}
  }
  Dialog.defaults = {
  	title:'header',
  	content: 'this is content',
  	width:'800',
  	height:'600',
  	ok:null,
  	cancel:null,
  	okText:'确定',
  	cancelText: '取消',
  	lock: true,
  	zIndex: 9999
  }
  var rDialog = function(options){
  	return new Dialog(options);
  }
  $.dialog = rDialog;
})(jQuery,window,document);
