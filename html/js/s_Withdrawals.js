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

		//提现倒计时
		$("#checkCodeB").on("click",function(){
			main.countDown();
		});

		//提现券勾选
		$(".checked").on("click",function(){
			$(this).toggleClass("checked");
		})

		//提现
		$("#tiXianbtn").on("click",function(){

			var	tXmoney = $("#tXmoney").val(),
				tXcode = $("#tXcode").val(),
				tXpwd = $("#tXpwd").val();
				ktXmoney = $("#tiXianRi").val();


			if(tXmoney == ""){
				swal(
					'提现金额不能为空',
					'',
					'warning'
				)
			}else if(tXmoney < 100){
				swal(
					'提现金额最少100元',
					'',
					'warning'
				)
			}
			else if(tXmoney > ktXmoney){
				swal(
					'提现金额不能大于可提现金额',
					'',
					'warning'
				)
			}else if(tXcode == ""){
				swal(
					'验证码不能为空',
					'',
					'warning'
				)
			}else if(tXpwd == ""){
				swal(
					'交易密码不能为空',
					'',
					'warning'
				)
			}else{
				 window.location.href="https://www.caifupad.com/";   
			}
			
		})


	})
})
