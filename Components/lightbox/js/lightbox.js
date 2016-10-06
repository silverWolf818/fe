;(function($){
var LightBox = function(settings){
    var self = this;
    this.settings = {
        speed:500,
        scale:1,
        disabled:false
    };
    $.extend(this.settings,settings||{});
    this.popupMask = $('<div id="lightbox-mask"></div>');
    this.popupWin = $('<div id="lightbox-popup">');
    this.bodyNode = $(document.body);
    this.renderDOM();
    this.picViewArea = this.popupWin.find('div.lightbox-pic-view');
    this.popupPic = this.popupWin.find('img.lightbox-image');
    this.picCaption = this.popupWin.find('div.lightbox-pic-caption');
    this.prevBtn = this.popupWin.find('span.lightbox-prev-btn');
    this.nextBtn = this.popupWin.find('span.lightbox-next-btn');
    this.closeBtn = this.popupWin.find('span.lightbox-close-btn');
    this.captionText = this.popupWin.find('p.lightbox-pic-desc');
    this.currentIndex = this.popupWin.find('p.lightbox-of-index');
    //事件委托
    this.groupName = null;
    this.groupData = [];
    this.bodyNode.delegate('.js-lightbox,*[data-role=lightbox]', 'click', function(e) {
            e.stopPropagation();
            var currentGroupName = $(this).data('group');
            if (currentGroupName != self.groupName) {
                self.groupName = currentGroupName;
                console.log(self.groupName);
                //获取一组数据
                self.getGroup();
            }
            self.initPopup($(this));
    });
    this.popupMask.on("click",function(){
        $(this).fadeOut();
        self.popupWin.fadeOut();
        self.clear = false;
    });
    //上下切换
    this.flag = true;
    this.closeBtn.on("click",function(){
        self.popupMask.fadeOut();
        self.popupWin.fadeOut();
        self.clear = false;
    });
    this.prevBtn.hover(function(){
        if(!$(this).hasClass('disabled') && self.groupData.length>1){
            $(this).addClass('lightbox-prevBtn-show');
        }
    },function(){
        if(!$(this).hasClass('disabled') && self.groupData.length>1){
            $(this).removeClass('lightbox-prevBtn-show');
        }
    }).click(function(e){
        e.stopPropagation();
        if (!$(this).hasClass('disabled')&&self.flag) {
            self.flag = false;
            self.goto("prev");
        }
    });
    this.nextBtn.hover(function(){
        if(!$(this).hasClass('disabled') && self.groupData.length>1){
            $(this).addClass('lightbox-nextBtn-show');
        }
    },function(){
        if(!$(this).hasClass('disabled') && self.groupData.length>1){
            $(this).removeClass('lightbox-nextBtn-show');
        }
    }).click(function(e){
        e.stopPropagation();
        if (!$(this).hasClass('disabled')&&self.flag) {
            self.flag = false;
            self.goto("next");
        }
    });
    //绑定窗口事件
    var timer = null;
    this.clear = false;
    $(window).resize(function(){
        if (self.clear) {
            window.clearTimeout(timer);
            timer = window.setTimeout(function(){
                self.loadPicSize(self.groupData[self.index].src);
            },500);
        }
    });
};

LightBox.prototype = {
    hidden:function(bool){
        if (bool) {
            this.prevBtn.hide();
            this.nextBtn.hide();
            this.picCaption.hide();
        }
    },
    goto:function(dir){
        if (dir=='next') {
            this.index++;
            if (this.index >= this.groupData.length-1) {
                this.nextBtn.addClass('disabled').removeClass('lightbox-nextBtn-show');
            };
            if(this.index != 0){
                this.prevBtn.removeClass('disabled');
            }
        }else{
            this.index--;
            if (this.index <= 0) {
                this.prevBtn.addClass('disabled').removeClass('lightbox-prevBtn-show');
            }
            if (this.index != this.groupData.length-1) {
                this.nextBtn.removeClass('disabled');
            }
        }
        var src = this.groupData[this.index].src;
        this.loadPicSize(src);
    },
    loadPicSize:function(sourceSrc){
        var self = this;
        this.popupPic.css({width:'auto',height:'auto'}).hide();
        this.picCaption.hide();
        this.preLoadImg(sourceSrc,function(){
            self.popupPic.attr('src', sourceSrc);
            var picWidth = self.popupPic.width(),
                picHeight = self.popupPic.height();
            self.changePic(picWidth,picHeight);
        });
    },
    changePic:function(width,height){
        var self = this,
            winWidth = $(window).width()/2,
            winHeight = $(window).height();
        // 边界判断
        var scale = Math.min(winWidth/(width+10),winHeight/(height+10),self.settings.scale);
        width = width*scale;
        height = height*scale;
        this.picViewArea.animate({width:width-10,height:height-10},self.settings.speed);
        this.popupWin.animate({width:width,height:height,marginLeft:-width/2,top:(winHeight-height)/2},self.settings.speed,function(){
            self.popupPic.css({width:width-10,height:height-10}).fadeIn();
            self.picCaption.fadeIn();
            self.flag = true;
            self.clear = true;
            self.hidden(self.settings.disabled);
        });
        this.captionText.text(this.groupData[this.index].caption);
        this.currentIndex.text("当前索引： "+(this.index+1)+" of "+this.groupData.length);
    },
    preLoadImg:function(src,callback){
        var img = new Image();
        if(!!window.ActiveXObject){
            img.onreadystatechange = function(){
                    if(this.readyState == "complete"){
                        callback();
                    }
            };
        }else{
            img.onload = function(){
                callback();
            }
        };
        img.src = src;
    },
    showView:function(sourceSrc,currentId){
        var self = this;
        this.popupPic.hide();
        this.picCaption.hide();
        this.popupMask.fadeIn();
        var winWidth = $(window).width()/2,
            winHeight = $(window).height()/2;    
        this.picViewArea.css({ width:winWidth,height:winHeight });
        var viewWide = winWidth+10,
            viewTop = winHeight+10;  
        this.popupWin.fadeIn().css({ width:viewWide,height:viewTop,marginLeft:-viewWide/2,top:-viewTop }).animate({top:winHeight-viewTop/2 },self.settings.speed,function(){
                //加载图片
                self.loadPicSize(sourceSrc);
        });
        //根据当前id获取当前索引
        this.index = this.getIndexOf(currentId);
        var groupDataLength = this.groupData.length;
        if (groupDataLength>1) {
            //this.prevBtn this.nextBtn
            if (this.index == 0) {
                this.prevBtn.addClass('disabled');
                this.nextBtn.removeClass('disabled');
            }else if(this.index == groupDataLength-1){
                this.prevBtn.removeClass('disabled');
                this.nextBtn.addClass('disabled');
            }else{
                this.prevBtn.removeClass('disabled');
                this.nextBtn.removeClass('disabled');
            };
        };
    },
    getIndexOf:function(currentId){
        var index = 0;
        $(this.groupData).each(function(i) {
            index = i;
            if (this.id == currentId) {
                return false;
            };
        });
        return index;
    },
    initPopup:function(currentObj){
        var self = this,
            sourceSrc = currentObj.data('source'),
            currentId = currentObj.data('id');
        this.showView(sourceSrc,currentId);
    },
    getGroup:function(){
        var self = this;
        var groupList = this.bodyNode.find('*[data-group='+this.groupName+']');
        self.groupData.length = 0;
        groupList.each(function(){
            self.groupData.push({
                src:$(this).data('source'),
                id:$(this).data('id'),
                caption:$(this).data('caption')
            });
        });
    },
    renderDOM:function(){
        var strDOM = '<div class="lightbox-pic-view">'+
                '<span class="lightbox-btn lightbox-prev-btn"></span>'+
                '<img class="lightbox-image">'+
                '<span class="lightbox-btn lightbox-next-btn"></span>'+
            '</div>'+
            '<div class="lightbox-pic-caption">'+
                '<div class="lightbox-caption-area">'+
                    '<p class="lightbox-pic-desc"></p>'+
                    '<p class="lightbox-of-index"></p>'+
                '</div>'+
                '<span class="lightbox-close-btn"></span>'+
            '</div>';
        this.popupWin.html(strDOM);
        this.bodyNode.append(this.popupMask,this.popupWin);
    }
};
// 注册到全局变量
window["LightBox"] = LightBox;
})(jQuery);
