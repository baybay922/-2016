// JavaScript Document
//require.js调用的主框架
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"]
	}
})
require(['jquery'],function($) {
	$(function() {
		var overscroll = function(el) {//阻止浏览量默认滚动
		  el.addEventListener('touchstart', function() {
		    var top = el.scrollTop
		      , totalScroll = el.scrollHeight
		      , currentScroll = top + el.offsetHeight
		    //If we're at the top or the bottom of the containers
		    //scroll, push up or down one pixel.
		    //
		    //this prevents the scroll from "passing through" to
		    //the body.
		    if(top === 0) {
		      el.scrollTop = 1
		    } else if(currentScroll === totalScroll) {
		      el.scrollTop = top - 1
		    }
		  })
		  el.addEventListener('touchmove', function(evt) {
		    //if the content is actually scrollable, i.e. the content is long enough
		    //that scrolling can occur
		    if(el.offsetHeight < el.scrollHeight)
		      evt._isScroller = true
		  })
		}
		overscroll(document.querySelector('.l_NewScroll'));
		document.body.addEventListener('touchmove', function(evt) {
		  //In this case, the default behavior is scrolling the body, which
		  //would result in an overflow.  Since we don't want that, we preventDefault.
		  if(!evt._isScroller) {
		    evt.preventDefault()
		  }
		})
		$(".Branch-list").on("touchstart touchmove",function(e){
			e.stopPropagation();
		})
		$(".listing").on("touchstart touchmove",function(e){
			e.stopPropagation();
		})
		
	})

	//支行搜索
	$("#search-txt").on("focus",function(){
		$("#Branch-list").slideDown(300);
	})
	$("#search-txt").on("blur",function(){
		$("#Branch-list").slideUp(300);
	})
	//选择省市
	$("#region-box").on("click",function(evet){
		evet.stopPropagation();
		$("#select-mask").slideDown(300);
	})

	$(document).on("click",function(){	
		$("#select-mask").slideUp(300);		
	})

	$("#Branch-list").on("click","li",function(evet){//获取支行信息
		evet.stopPropagation();
		var thisVal = $(this).html();	
		$("#search-txt").val(thisVal)
	})
	
	$("#Selected").on("click","span",function(evet){//城市tab切换
		evet.stopPropagation();
		$(this).addClass("cur").siblings().removeClass('cur');
		var thisInd = $(this).index(),
			cityBoxW = $("#cityBox ul:first-child").width();
			console.log(cityBoxW)
		$("#cityBox").animate({
			"margin-left":-(thisInd)*(cityBoxW)+'px'
		},300)
	})

})
