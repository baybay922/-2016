// JavaScript Document
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"publicJS":["main"],
		"swal":["lib/sweetalert2"],
	}
})
require(['jquery','publicJS','swal'],function($,publicJS,swalr) {
	$(function() {
			var overscroll = function(el) {
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
		$("header p").on("click",function(){
			$(this).addClass("l_focus").siblings().removeClass("l_focus");
			switch($(this).index()){
				case 0:
						$(".l_borrowInfo").show().siblings("section").hide();
					break;
				case 1:
						$(".l_photoBox").show().siblings("section").hide();
					break;
				case 2:
						$(".l_photoBox2").show().siblings("section").hide();
					break;
				case 3:
						$(".l_borrowList").show().siblings("section").hide();
					break;
				case 4:
						$(".l_repayList").show().siblings("section").hide();
					break;
			}

		})
		publicJS.swiper("l_sections");
		if($(".l_sections2").has("li")){	publicJS.swiper("l_sections2");}
		$(".l_repayList>ul").on("touchstart touchmove",function(e) {
			e.stopPropagation();
		})
		$(document).on("scroll",function() {
			if (!$(".l_borrowList").is(":hidden")) {
					if (publicJS.scrollLoading("l_borrowList","l_NewScroll")) {
								alert("加载后续列表");
								// 此处写加载列表的方法
					}
			}
		})
	})

//js结尾
})
