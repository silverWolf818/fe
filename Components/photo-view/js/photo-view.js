;(function($){
	var PhotoView = function(settings){
		var self = this;
		this.settings = {
			speed:500
		};
		$.extend(this.settings,settings||{});
		this.bodyNode = $(document.body);
		//定义数据
		this.groupName = null;
			this.groupData = [];
			this.flag = true;
			this.curIndex = 0;
			$(document).on('click', '.pic-area', function(event) {
				event.preventDefault();
				$(this).parent('.pic-view').hide();
				$(this).closest('.photo-view').find('.scalePic').removeClass('cur');
			});
		$(document).on('click', '*[data-role=jsphoto]', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var $photoView = $(this).closest('.photo-view');
			var currentGroupName = $photoView.data('group');
			self.photoView = $photoView;
			self.selector($photoView);
			if ($(this).hasClass('cur')) {
				self.picView.hide();
				$(this).removeClass('cur');
			}else{
				self.picView.show();
				$photoView.find('.scalePic').removeClass('cur');
				$(this).addClass('cur');
			}
			if (currentGroupName != self.groupName) { 
				self.groupName = currentGroupName;
				self.getGroup($photoView);
			}
			self.initPhoto($(this));	
		});
		$(".view-next-btn").hover(function() {
			 if(!$(this).hasClass('disabled') && self.groupData.length>1){
        		$(this).addClass('view-next-show');
    		}
		}, function() {
			if(!$(this).hasClass('disabled') && self.groupData.length>1){
        		$(this).removeClass('view-next-show');
   			 }
		}).click(function() {
			var $photoView = $(this).closest('.photo-view');
			self.getGroup($photoView);
			self.selector($photoView);
			var dx = 0;
			$photoView.find('.scalePic').each(function(i) {
				dx = i;
				if ($(this).hasClass('cur')) {
					return false;
				}
			});
			self.curIndex = dx + 1;
			if (!$(this).hasClass('disabled')) {
        		self.flag = false;
        		$photoView.find('.scalePic').removeClass('cur');
        		$photoView.find('.scalePic').eq(self.curIndex).addClass('cur');
        		self.goto("next");
    		}
		});
		$(".view-prev-btn").hover(function() {
			 if(!$(this).hasClass('disabled') && self.groupData.length>1){
        		$(this).addClass('view-prev-show');
   			}
		}, function() {
			 if(!$(this).hasClass('disabled') && self.groupData.length>1){
       			$(this).removeClass('view-prev-show');
   			}
		}).click(function() {
			var $photoView = $(this).closest('.photo-view');
			self.getGroup($photoView);
			self.selector($photoView);
			var dx = 0;
			$photoView.find('.scalePic').each(function(i) {
				dx = i;
				if ($(this).hasClass('cur')) {
					return false;
				}
			});
			self.curIndex = dx - 1;
			if (!$(this).hasClass('disabled')) {
        		self.flag = false;
        		$photoView.find('.scalePic').removeClass('cur');
        		$photoView.find('.scalePic').eq(self.curIndex).addClass('cur');
        		self.goto("prev");
    		}
			if (!$(this).hasClass('disabled')) {
        		self.flag = false;
        		self.goto("prev");
    		}
		});
	};
	PhotoView.prototype = {
		selector:function(ids){
			this.picView = ids.find('.pic-view');
			this.picArea = ids.find('.pic-area');
			this.prevBtn = ids.find('.view-prev-btn');
			this.nextBtn = ids.find('.view-next-btn');
		},
		goto:function(dir){
			if (dir == 'next') {
				if (this.curIndex >= this.groupData.length-1) {
					this.nextBtn.addClass('disabled').removeClass('view-next-show');
				}else if (this.c!= 0) {
					this.prevBtn.removeClass('disabled');
				}
			}else if (dir == 'prev'){
				if (this.curIndex <= 0) {
             		this.prevBtn.addClass('disabled').removeClass('view-prev-show');
         		}else if (this.c!= this.groupData.length-1) {
         			this.nextBtn.removeClass('disabled');
         		}
			}
			var src = this.groupData[this.curIndex].src;
			this.loadPicSize(src);
		},
		loadPicSize:function(sourceSrc){
			var self = this;
			this.preLoadImg(sourceSrc,function(){
				self.picArea.attr('src',sourceSrc);
			});
		},
		preLoadImg:function(src,callback){
			var img = new Image();
			if (!!window.ActiveXObject) {
				img.onreadystatechange = function(){
					if (this.readyState == "complete") {
						 callback();
					}
				};
			}else{
				img.onload = function(){
					callback();
				}
			};
			img.src = src;
			this.picArea.animate({width:img.width,height:img.height},300);
		},
		showView:function(sourceSrc,currentId){
			var self = this;
			this.loadPicSize(sourceSrc);
			this.index = this.getIndexOf(currentId);
			var groupDataLength = this.groupData.length;
			if (groupDataLength > 1) {
				if (this.index == 0) {
					this.prevBtn.addClass('disabled');
            		this.nextBtn.removeClass('disabled');
				}else if (this.index == groupDataLength-1) {
					this.prevBtn.removeClass('disabled');
            		this.nextBtn.addClass('disabled');
				}else{
						this.prevBtn.removeClass('disabled');
            		this.nextBtn.removeClass('disabled');
				}
			}
		},
		getIndexOf:function(currentId){
			var index = 0;
			$(this.groupData).each(function(i) {
				index = i;
				if (this.id == currentId) {
					return false;
				}
			});
			return index;
		},
		initPhoto:function(currentObj){
			var self = this,
				sourceSrc = currentObj.data('source'),
        		currentId = currentObj.data('id');	
        	this.showView(sourceSrc,currentId);
		},
		getGroup:function(ids){
			var self = this;
			var groupList = ids.find('.scalePic');	
			this.groupData.length = 0;
			groupList.each(function() {
				self.groupData.push({
					src:$(this).data('source'),
					id:$(this).data('id')
				});
			});
		}
	};
	window["PhotoView"] = PhotoView;
})(jQuery);