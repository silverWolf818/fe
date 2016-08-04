;(function($){
var LightBox = function(){
    var self = this;
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
                //获取一组数据
                self.getGroup();
            }
            self.initPopup($(this));
    });
};
LightBox.prototype = {
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
        this.popupWin.fadeIn().css({ width:viewWide,height:viewTop,marginLeft:-viewWide/2,top:-viewTop }).animate({top:winHeight-viewTop/2 },function(){

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
            index == i;
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
                    '<p class="lightbox-of-index">当前索引：0 of 0</p>'+
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
