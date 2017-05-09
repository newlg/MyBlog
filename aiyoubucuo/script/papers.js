$(function(){

  var IDCard =document.getElementById("IDCard"),
    CIDCard = document.getElementById("CIDCard");

    IDCard.onblur = function(){
  if(IDCard.value.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)){
    IDCardInfo.innerHTML = "输入正确";
    IDCardInfo.className ="cg ml100";

  }else{
  IDCardInfo.innerHTML = "请输入正确的身份证号";
  }
    }

    CIDCard.onblur = function(){
  if(CIDCard.value.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)){
    CIDCardInfo.innerHTML = "输入正确";
    CIDCardInfo.className ="cg ml100";

  }else{

  CIDCardInfo.innerHTML = "请输入正确的身份证号";
  }
    }

})
