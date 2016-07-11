require.config({
    baseUrl:'js/lib',
    path:{
        jquery:'jquery'
    }
});
define(['jquery'], function ($) {
    console.log($);
});
