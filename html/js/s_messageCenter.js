// JavaScript Document
//require.js调用的主框架
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"main" : ["main"]
	}
})
require(['jquery',"main"],function($,main) {
	$(function(){
		//tab切换
		$(".headNav").on("click","li",function(){
			var num = $(this).index();
			$(".headNav li").eq(num).addClass("cur").siblings().removeClass("cur");
			$(".couponList>div").eq($(".headNav>li").index(this)).show().siblings("div").hide();
		})
		//滚动加载
		$(document).on("scroll",function() {
			if(main.scrollLoading("s_content","l_NewScroll")) {
				alert("加载后续列表");
				// 此处写加载列表的方法
			}
			
		})

		function getUrlParam(name) { 
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); //匹配目标参数
			if (r != null) return unescape(r[2]); return null; //返回参数值
		}
		var get_ind = getUrlParam("news_list");
		if(get_ind){
			$(".headNav li").eq(get_ind).addClass("cur").siblings().removeClass("cur");
			$(".couponList>div").eq(get_ind).show().siblings("div").hide();
			console.log(get_ind);
		}
	})
})
