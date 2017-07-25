// JavaScript Document
//require.js调用的主框架
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"main" : ["main"],
		"swal":["lib/sweetalert2"]
	}
})
require(['jquery',"main","swal"],function($,main,swal){
	$(function(){

		//绑卡协议勾选
		$(".checked").on("click",function() {
			$(this).toggleClass("checked");
		})

		$("#bindCardBtn").on("click",function(){
			var cardId = $("#cardId").val();
			var moneyVal = $("#moneyNum").val();
			if(cardId == "" || !/^\d{16}|\d{19}$/.test(cardId)){
				swal(
					'请输入正确的银行卡号',
					'',
					'warning'
				)
			}else if(moneyVal == "" || !/^([0-9.]+)$/.test(moneyVal)){
				swal(
					'请输入正确的充值金额',
					'',
					'warning'
				)
			}else if(moneyVal<0.01){
				swal(
					'充值最小金额不得少于0.01元',
					'',
					'warning'
				)
			}else{
				 window.location.href="https://www.caifupad.com/";   
			}
			
		})

		var Top = document.documentElement.clientHeight/2-(parseInt($(".cardHelp").height())/2) +'px',
			Left = document.documentElement.clientWidth/2-(parseInt($(".cardHelp").width()))/2 +'px';
		$("#cardHelp").click(function(){
			$('.Maskbox').fadeIn(300);
			$('.cardHelp').css("top",Top);
			$('.cardHelp').css("left",Left);
			$('.cardHelp').slideDown(500);
		})
		$(".closeBtn").click(function(){
			$('.Maskbox').fadeOut(500);
			$('.cardHelp').slideUp(200);
		})
		$(".Maskbox").click(function(){
			$('.Maskbox').fadeOut(500);
			$('.cardHelp').slideUp(200);
		})
		
	})
})
