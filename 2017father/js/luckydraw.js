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
    awardIndex: 21,
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
          if(!json.status){
            _this.msg = json.info;
          } else {
            _this.index = json.id;
            setTimeout(function(){
              _this.msg = json.info;

            }, 7000 + 250);
          }
          // this.index++;
          // setTimeout(function(){
          //   _this.msg = '哈哈，你上当了，傻逼';
          // }, 7000 + 250);
        }
      });
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
