$(function(){

  $('#header ul li').hover(function(){
    $('li').removeClass('active');
    $(this).css('color','#E34E52');
    $(this).addClass('active');

    console.log('a');
  })


});
