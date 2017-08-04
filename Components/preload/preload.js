/**
 * Created by zzh on 2017/5/30.
 */
//图片预加载
(function ($) {
    var preLoad = function (imgs,options) {
        this.defaults = {
            each:null,//每一张图片加载完毕后执行
            all:null //所以图片加载完后执行
        };
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts =  $.extend({},this.defaults,options);
        this._unordered();
    };
    preLoad.prototype = {
        _unordered:function () { //无序加载
            var imgs = this.imgs,
                opts = this.opts,
                count = 0,
                len = imgs.length;
            $.each(imgs,function (i,src) {
                if(typeof src !== 'string') return;
                var imgObj = new Image();
                    $(imgObj).on('load error',function () {
                        count++;
                        opts.each && opts.each(count);
                        if(count === len){
                            opts.all && opts.all();
                        }
                    });
                imgObj.src = src;
            })
        }
    };
    // $.fn['preload'] = $['preload'] = function (imgs,opts) {
    //     new preLoad(imgs,opts);
    // };
    $.extend({
        preload:function (imgs,opts) {
           new preLoad(imgs,opts);
        }
    })
})(jQuery);