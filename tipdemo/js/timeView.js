var addTimer = function () {
    var list = [],
        interval,
        d,h,m,s,g;
    return function (id, time) {
        console.log(!interval);
        if (!interval)
            interval = setInterval(go, 1000);
        list.push({ ele: document.getElementById(id), time: time });
    }
    function go() {
        for (var i = 0; i < list.length; i++) {
            list[i].ele.innerHTML = getTimerString(list[i].time ? list[i].time -= 1 : 0);
            if (!list[i].time){
                    list.splice(i--, 1);
            }
        }
    }
    function getTimerString(time) {
            d = Math.floor(time / 86400),
            h = Math.floor((time % 86400) / 3600),
            g = Math.floor((time % 86400) % 3600),
            m = Math.floor(g / 60),
            s = Math.floor(g % 60);
        if (time>0)
            return d + "天" + h + "小时" + m + "分" + s + "秒";
        else return "时间到";
    }
}();
$('.clock').each(function(e){
    addTimer("timer"+e,$(this).data('mm'));
});
