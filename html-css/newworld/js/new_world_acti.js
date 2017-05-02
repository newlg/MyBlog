// (function(){

function selectDistrict(){
   var data = {
     shengfeng:["城市"],
      hn:["海口","三亚","博鳌","万宁","琼海"],
 beijing:["昌平区","海淀区","东城区","西城区","朝阳区"],
 tianjing:["红桥区","河东区","河西区","南开区","河北区"],
 hebei:["石家庄","张家口","承德","秦皇岛","唐山"],
 guangdong:["广州","深圳","珠海","东莞","佛山"],
 fujian:["泉州","三明","南平","龙岩","漳州"],
 heilongjiang:["哈尔滨","依兰","佳木斯","漠河","齐齐哈尔"]

  }

var source = document.getElementById("select1");
var target = document.getElementById("select2");
var selected = source.options[source.selectedIndex].value;
console.log(selected);
target.innerHTML = "";
for (var i = 0; i < data[selected].length; i++) {
    var opt = document.createElement('option');
opt.value = data[selected][i];
opt.innerHTML = data[selected][i];
document.getElementById('select2').appendChild(opt);
}
}


// })();
