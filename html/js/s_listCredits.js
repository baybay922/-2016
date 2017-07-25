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
			$(".headNav li").eq(num).addClass("listCur").siblings().removeClass("listCur");
			$(".mainList>div").eq($(".headNav>li").index(this)).show().siblings("div").hide();
		})
		//滚动加载
		$(document).on("scroll",function() {
			if(main.scrollLoading("s_content","l_NewScroll")) {
				alert("加载后续列表");
				// 此处写加载列表的方法
			}
			
		})
	})
})
