$(function(){
    $(document).on('pageInit', '#index', function(event) {
        event.preventDefault();
        var swiperData = [
            { src: 'assets/img/1.jpg' },
            { src: 'assets/img/2.jpg' },
            { src: 'assets/img/3.jpg' },
            { src: 'assets/img/4.jpg' }
        ];
        Vue.component('swiperlist',{
            template:'<ul class="swiper-wrapper">'+
                        '<li class="swiper-slide" v-for="item in items"><img :src="item.src"/></li>'+
                     '</ul>',
            data:function(){
                console.log("ajax");
                return {
                    items:swiperData,
                };
            }
        });
        Vue.component('iconlist',{
            props:['item'],
            template:'<li class="flex-box">'+
                '<a href="#" class="component">'+
                    '<img :src="item.src"/>'+
                    '<p class="icon-tilte">{{ item.title }}</p>'+
                '</a>'+
            '</li>',
        });
            var data =  [{
                name: 'a',
                }, {
                name: 'b',
                }, {
                name: 'c',
            }];
        data.map(function(item){
            item.show = false;
        });
        Vue.component('test',{
            template:'<div class="item" v-for="item in items" v-touch:tap="toggle(item)">'+
                        '<div>{{item.name}}</div>'+
                            '<div v-show="item.show" transition="expand">初始隐藏</div>'+
                      '</div>',
            data:function(){
                return {
                    items:data
                };
            },
            methods: {
                toggle: function(item) {
                    item.show = !item.show;
                }
            }
        });
        var index = new Vue({
            el:'#index',
            data:{
                source1: [
                    { src: 'assets/img/ljb.png',title: '标题1' },
                    { src: 'assets/img/ljb.png',title: '标题3' },
                    { src: 'assets/img/ljb.png',title: '标题4' },
                    { src: 'assets/img/ljb.png',title: '标题5' },
                    { src: 'assets/img/ljb.png',title: '标题1' }
                ],
                source2: [
                    { src: 'assets/img/ljb.png',title: '标题1' },
                    { src: 'assets/img/ljb.png',title: '标题3' },
                    { src: 'assets/img/ljb.png',title: '标题4' },
                    { src: 'assets/img/ljb.png',title: '标题5' },
                    { src: 'assets/img/ljb.png',title: '标题1' }
                ],
            }
        });
        console.log(index.$refs.profile[1]);
        new Swiper('.swiper-container',{
            speed:1000,
            autoplay:3000,
            loop : true,
            loopAdditionalSlides : 4,
            pagination : '.swiper-pagination',
            autoplayDisableOnInteraction : false
        });
    });
    $.init();
});
