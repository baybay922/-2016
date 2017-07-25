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

		$("#nextBtn").on("click",function(){
			var moneyVal = $("#moneyInput").val(),
			    cardNumber = $("#cardNumber").val();
			if ($(".bodyBj").hasClass("l_noCard")) {
					if(moneyVal == ""){
						swal(
							'充值金额不能为空',
							'',
							'warning'
						)
						return false;
					}
					if(!/^([0-9.]+)$/.test(moneyVal)){
						swal(
							'请输入正确的充值金额',
							'',
							'warning'
						)
						return false;
					}
					if(!/^([0-9]+)$/.test(cardNumber)){
						swal(
							'请输入正确的银行卡号',
							'',
							'warning'
						)
						return false;
					}
					if(moneyVal<100){
						swal(
							'请输入大于100元的金额',
							'',
							'warning'
						)
						return false;
					}
						 window.location.href="https://www.caifupad.com/";

			}else {
				if(moneyVal == ""){
					swal(
						'充值金额不能为空',
						'',
						'warning'
					)
				}else if(moneyVal ==""|| !/^([0-9.]+)$/.test(moneyVal)){
					swal(
						'请输入正确的充值金额',
						'',
						'warning'
					)
				}else if(moneyVal<100){
					swal(
						'请输入大于100元的金额',
						'',
						'warning'
					)
				}else{
					 window.location.href="https://www.caifupad.com/";
				}
			}


		})
	})
})
