// JavaScript Document
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"publicJS":["main"],
		"swal":["lib/sweetalert2"]
	}
})
require(['jquery','publicJS','swal'],function($,publicJS,swal) {
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
		  var winHightAuto = $(".swal2-modal").innerHeight();
		  $(".swal2-modal").css("margin-top",-(winHightAuto/4)+"px!important");
			console.log(winHightAuto);
	})
	$("input:visible").each(function(){
		$(this).val("");
	})

	// 输入框公共方法
	$("input[name=input]").on("focus",function(){
		publicJS.inpputFocus($(this));
		$("#sclTest").text($(".l_NewScroll").scrollTop())
	})
	$("input").on("blur",function(){
		$(this).siblings(".l_del").hide();
	})
	$(".l_del").on("touchend",function(e) {
		e.stopPropagation();
		e.preventDefault(); //阻止浏览器元素默认行为
		$(this).siblings("input").val("");
	})
	//用户名前端验证
	$("#userID").on("blur",function(e){
		e.stopPropagation();
		var name = $("#userID").val(),
				el = $(this);

		//用户名为空
		if(name==""){
			el.css({"border-bottom":"solid 1px #ffc281"}).next().text("请输入用户名").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
			$("#load").removeClass("test1");

		//用户名不合法
		}else if((/[^\w\u4e00-\u9fa5,-]/g.test(name))){
			el.css({"border-bottom":"solid 1px #ffc281"}).next().text("您输入的用户名含有非法字符").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
			$("#load").removeClass("test1");
		}else{
				el.css({"border-bottom":"solid 1px #1ad8b0"}).next().slideUp();
				$("#load").addClass("test1");
				return false;
		}
		publicJS.inpputBlur($(this));
	})

	//密码前端验证
	$("#passWord").on("blur",function(e){
		e.stopPropagation();
		var el = $(this);
			//密码为空
		if($(this).val()==""){
			el.next().text("请输入密码").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
			el.css({"border-bottom":"solid 1px #ffc281"});
			$("#load").removeClass("test4");

		}else{
			$("#load").addClass("test4");
			el.css({"border-bottom":"solid 1px #1ad8b0"});
			publicJS.inpputBlur($(this));
			$(".l_regTip").hide();
		}
	})

})
