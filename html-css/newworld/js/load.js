

  $(document).ready(function(){
    var $loadBar = $('#loadBar');
    var $load = $('#load');
    var re = /stage_\d/g ;
    var $container = $('#container');

    var total = $('containe').length ;

    var loadedNum = 0;
    var nowPercent = 0;
    var timer;
    var totalTime = setTimeout(function(){
        $loadBar.addClass("satge_4");
        var timer1 = setTimeout(function(){
          $load.fadeOut();
          $container.fadeIn();
        },500);
    },1000);
    $('container').load(function(){
      //$loadBar.removeClass();
      loadedNum++;
      nowPercent = loadedNum / total;
      if(nowPercent<=0.25){
        $loadBar.addClass("stage_1");
      }
      if(nowPercent>0.25 && nowPercent<=0.5){

        $loadBar.addClass("stage_2");
      }
      if(nowPercent>0.5 && nowPercent<=0.75){

        $loadBar.addClass("stage_3");
      }
      if(nowPercent>0.75 && nowPercent<=1){
        $loadBar.addClass("stage_4");
        if(nowPercent===1){
            timer = setTimeout(function(){
            $load.fadeOut();
            $container.fadeIn();
            console.log('finish');
          },500);
        }
        //console.log(nowPercent);
      }
    });
  });
