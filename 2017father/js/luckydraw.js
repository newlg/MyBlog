
function getAddress(){
  $.ajax({
    url: '/member/addressList',
    type: 'POST',
    dataType: 'json',
    success: function(data){
       //  console.log(data);
        var html='';
        var data_list=data;

         $.each(data_list,function(k,v){
           // console.log(k);
           console.log(v);
           var isdefault="none";
           var opt ='none';
           var borderd = ''
           if(v.isdefault == 1){
               isdefault='block';
               opt = 'block';
               borderd = "2px solid #E14E85";
           }

           html+='<div class="ioa_mina ioa_border" style="border:'+borderd+'">';
           html+='<p class="ioa_ads">'+'<span class="province">'+v.province+'</span>'+'<span class="chengshi">'+v.area+'</span>'+'<span class="ioa_name">'+v.name+'</span></p>';
           html+='<p class="region">'+v.address +'</p>';
           html+='<p class="phone">'+v.mobile+'</p>';
           html+='<p class="default" style="display:'+isdefault+'">'+'</p>';
           html+='<p class="choiced" style="display:'+opt+'">'+'</p>';
           html+=" </div>";

         });


          if(html){
            $(".ioa_list").html(html);
          }
       }
    });



}

(function(){
  var data = {
    initialed: false,
    member: {
      isLogin: false,
      showLogin: false,
      inLoginSubmit: false,
      errmsg: '',
      loginForm: {
        mobile: '',
        password: ''
      }
    },
    awardNum: 8,
    awardIndex: 0,
    isStarted: 0,
    count: 0,
    chance: 0,
    //chanceToday: 0,
    token: '',
    inDrawing: false,
    plateStyle: {
      transition: 'transform 7s',
      transform: 'rotate(0deg)'
    },
    winnerList: [],
    msg: ''
  };

  var computed = {
    unitRotate: function () {
      return 360 / this.awardNum;
    },
    index: {
      get: function () {
        var nowRotate = this.plateStyle.transform.match(/rotate\((\-?\d+)deg\)/)[1];
        console(nowRotate);
        if (nowRotate != 0) {
          var index = (nowRotate % 360/* - this.unitRotate / 2*/) / this.unitRotate;
        } else {
          var index = 0;
        }
        return index;
      },
      set: function (index) {
        console.log(index);
        var offsetRotate = this.unitRotate * index;
        var targetRotate = 360 * 5 * (++this.count) + offsetRotate;
        this.plateStyle.transform = 'rotate(' + targetRotate + 'deg)';
      }
    }
  };

  var methods = {
    //初始化
    init: function(){
      var _this = this;
      $.ajax({
        url: '/FatherLottery/index',
        type: 'get',
        dataType: 'json',
        beforeSend: function(){
          _this.initialed = false;
        },
        success: function(json){
          _this.member.isLogin = json.isLogin;

          _this.member.showLogin = !_this.member.isLogin;
          _this.chance = json.total;
          //_this.chanceToday = json.times;
          _this.winnerList = json.list;
          _this.token = json.token;
          _this.isStarted = json.is_start;
        },
        complete: function(){
          _this.initialed = true;
          _this.inDrawing = false;
        }
      });
    },
    //登录
    login: function(){
      var that = this;
      if(that.member.inLoginSubmit) {
        return false;
      }
      that.member.errmsg = '';

      $.ajax({
        url: '/member/loginsubmit',
        type: 'POST',
        data: JSON.parse(JSON.stringify(that.member.loginForm)),
        dataType: 'json',
        timeout: 20000,
        beforeSend: function(){

          that.member.inLoginSubmit = true;
        },
        success: function(data){
            console.log(data)
          if(0 == data.status){
            that.member.errmsg = data.msg;
          } else {
            that.member.showLogin = false;
            _alert('登录成功');
            that.init();
          }
        },
        complete: function(){
          that.member.inLoginSubmit = false;
        },
        error: function(){
          _alert('网络错误');
        }
      });
    },
    //抽奖
    doLuckyDraw: function(){
      var _this = this;
      if(!this.member.isLogin){
        this.member.showLogin = true;
        return false;
      }
      if(this.inDrawing){
        return false;
      }
      if(0 == this.isStarted){
        _alert('活动未开始');
        return false;
      }
      if(2 == this.isStarted){
        _alert('活动已结束');
        return false;
      }
      if(this.chance <= 0){
        // _alert('抽奖次数不足');
        $('.mask').css('display','block');
        $('.tip').css('display','block');
        $
        return false;
      }
      $.ajax({
        url: '/FatherLottery/lotterysubmit',
        type: 'post',
        dataType: 'json',
        data: 'token='+_this.token,
        beforeSend: function(){
          _this.inDrawing = true;
        },
        success: function(json){
           console.log(json);

          pro_id = json.gift.value;
          console.log(pro_id);
          _this.prize_id = json.id;
          if(!json.status){
            _this.msg = json.info;
          } else {
            _this.index = json.id;
            setTimeout(function(){
              _this.msg = json.info;

            }, 7000 + 250);
          }
          // 判断是否是实物
          var type=json.gift.type;
          console.log(type);
          if(type==1){
            $('.close').css('display','none');
            $('.choice_ads').css('display','block');
          }
          // this.index++;
          // setTimeout(function(){
          //   _this.msg = '哈哈，你上当了，傻逼';
          // }, 7000 + 250);
        }
      });
    },
    // 选择地址
    choice:function(event){
      var that = this;
     that.init();
     var prize_id;
     $('.modal-result').css('display','none');
     $('.choice').css('display','block');
     event.stopPropagation();


     getAddress();

     var id,province,area,address,name,mobile;
     $(document).on("click",".ioa_mina",function(){
       $('.ioa_mina').css('border','2px solid #D7D7D7');
       $(this).css('border','2px solid #E14E85');

        $('.ioa_mina .choiced').css('display','none');
        $(this).find('.choiced').css('display','block');

        // id=$(this).find("id").text();
        province=$(this).find(".province").text();
        area=$(this).find(".area").text();
        region=$(this).find(".region").text();
        ioa_name=$(this).find(".ioa_name").text();
        phone=$(this).find(".phone").text();
          console.log(ioa_name);



     });

       $(document).on("click",".tijiao",function(){
         console.log(pro_id);
               $.ajax({
                 url:'/Lottery/prizeAddress',
                 type:'post',
                 dataType:'json',
                 data:{'prize_id':pro_id,
                       'province':province,
                       'address':region,
                       'name':ioa_name,
                       'mobile':phone
                     },
                 success:function(json){
                   console.log(json);
                  //  console.log(123);
                  //  console.log(prize_id);

                  $('.choice').css('display','none');
                  $('.mask').css('display','none');
                  _alert('提交成功');
                 },
                 error:function(json){
              console.log('net error.');
            }
            });



//执行后刷新
 setTimeout(function ( ) { window.location.reload(); }, 3500);
       })



       //
      //  error: function(){
      //    _alert('网络错误');
      //  }
    //  });

   },
   addads:function(){


     $('.choice').css('display','none');
     $('.addres').css('display','block');

     //保存
     $(document).on('click','.baocun',function(){

       var myselect=document.getElementById('addr_province');
       var index=myselect.selectedIndex;
       myselect.options[index].value;
        var select_province = myselect.options[index].text;

        var myselect_city=document.getElementById('addr_city');
        var index=myselect_city.selectedIndex;
        myselect_city.options[index].value;
         var select_city = myselect_city.options[index].text;
         console.log(select_city);


       var aprovince =$('.addr_province').val(),
            city = $('.addr_city').val(),
          aaddress = $('.s_address').val(),
           aioa_name  = $(".s_name").val(),
           aphone=$(".sh_phone").val();

       $.ajax({
         url:'/member/addressAdd',
         type:'post',
         dataType:'json',
         data:{
               'province':select_province,
                'area':select_city,
               'address':aaddress,
               'name':aioa_name,
               'mobile':aphone
             },
         success:function(json){
           console.log(json);
           console.log(aprovince);
           console.log(aaddress);
           console.log(aioa_name);
              console.log(aphone);
                // if(json.status){
                //   window.location.reload();
                // }
                _alert(json.info);
                getAddress();
                $('.addres').css('display','none');
                $('.choice').css('display','block');

         },
         error:function(json){
      console.log('net error.');

    }
    });



     console.log('123')



     })

   },

    //表格滚动
    tableScroll: function(){
      var _this = this;
      var log_table = _this.$refs.winnerlist;
      var h = $(log_table).find('td').height();
      if(!h){
        return false;
      }
      if(_this.winnerList.length > 5){
        $(log_table).css({
          transition: 'transform .25s',
          transform: 'translateY(-'+(h+3)+'px)'
        });
        setTimeout(function(){
          $(log_table).css({
            transition: '',
            transform: 'translateY(0)'
          });
          _this.winnerList.push(_this.winnerList.shift());
        }, 250);
      }
    }
  };

  var vm = new Vue({
    el: '#lucky_draw',
    data: data,
    computed: computed,
    methods: methods,
    mounted: function(){
      var _this = this;
      this.init();
      setInterval(function(){
        _this.tableScroll();
      }, 2000);
    }
  });

})();
