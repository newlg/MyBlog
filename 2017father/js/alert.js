/*
 自定义alert方法
 base.ui.alert()
  */
;var _alert = (function(){
    "use strict";
    function _alert(option){
        // var content = "";
        // var during = 0;
        // var callback = function(){};
        // var container = 'body';
        if("string" == (typeof option).toLowerCase()){
            var text = option;
            option = {};
            option.text = text;
            option.during = 1500;
            option.container = 'body';
            option.callback = function(){};
        }
        if("object" == (typeof option).toLowerCase()){
            option = $.extend({
                text: '',
                during: 1500,
                container: 'body',
                callback: function(){}
            }, option);
        }
        var box = $('<div></div>').html(option.text).appendTo('body')
            .css({
                "z-index": "2147483647",
                display: "none",
                position: "fixed",
                "min-width": "100px",
                "background-color": "#000000",
                padding: "20px",
                "font-size": "16px",
                "text-align": "center",
                color: "#ffffff",
                "box-shadow": "5px 5px 10px rgba(0,0,0,.382)",
                "border-radius": "5px"
            });
        box.fadeIn(500).css({
            left: $(option.container).offset().left + $(option.container).width()/2 - box.outerWidth()/2,
            top: $(window).width() >= 1024 ? $(window).height()/2 - box.outerHeight()/2 - 55 : "",
            bottom: $(window).width() < 1024 ? "10%" : ""
        });
        setTimeout(function(){
            box.fadeOut(500);
        }, 500 + option.during);
        setTimeout(function(){
            box.remove();
            option.callback();
        }, 1000 + option.during);
    }

    return _alert;
})();