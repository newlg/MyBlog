//点击切换
(function () {
  $('.tab a').click(function(event){

  $('.tab a').css('border-bottom','none');
  $('.tab a').css('color','#fff');

  $(this).css('color','#3EFEFF').css('border-bottom','3px solid #3EFEFF');

  $('.content table tbody').css('display','none');
  $('.content table tbody').eq($(this).index()).css('display','block');
  })

  $('.footer_ul li a').click(function(){
    $('.footer_ul li a').css('color','#AEAEAE');
    $('.footer_ul li i').css('background-position','0 top');
    $(this).css('color','#8372D3');
    $(this ).find('i').css('background-position','0 -22px');

    // $('.footer_ul li ').click(function(event){
    //     event.stopPropagation();
    //     // $('.footer_ul li i').css('background-position','0 top');
    //
    //
    // })

  })


})()
