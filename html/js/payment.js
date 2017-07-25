// JavaScript Document
//require.js调用的主框架
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"main" : ["main"],
		"swal":["lib/sweetalert2"]
	}
})
require(['jquery','main','swal'],function($,main,swal) {
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

		$(".vou_list").on("touchstart touchmove",function(evt){
			// evt.preventDefault();
			evt.stopPropagation();
		})
	})
	//隐藏显示密码切换
	var falg = true;
	$("#eye").on("click",function(){
		if(falg){
			$("#pwd-number").prop("type","text");
			$(this).addClass("eye-close");
			falg = false;
		}else{
			$("#pwd-number").prop("type","password");
			$(this).removeClass("eye-close");
			falg = true;
		}
	})
	//判断密码是否正确
	$("#confirm").on("click",function(){
		var pwdVal = $("#pwd-number").val();
		if(pwdVal == ""){
			swal(
				'密码不能为空',
				'',
				'warning'
			)

		}
	})
	//限制密码长度
	$("#pwd-number").on("input",function(){
		main.limitNUM(16);
	})

	//添加银行卡号
	var checked1 = true;
	$(".checked1").on("click",function(){
		if (checked1) {
			$(this).addClass("unchecked");
			checked1 = false;
		}else{
			$(this).removeClass("unchecked");
			checked1 = true;
		}
	})

	var checked2 = false;
	$(".checked2").on("click",function(){
		if (checked2) {
			$(this).addClass("unchecked");
			checked2 = false;
		}else{
			$(this).removeClass("unchecked");
			checked2 = true;
		}
	})

	//勾选
	var Selected = true;
	$("#Checkbox").on("click",function(){
		if (Selected) {
			$(this).addClass("un_Checkbox");
			Selected = false;
		}else{
			$(this).removeClass("un_Checkbox");
			Selected = true;
		}
	});

	/* 弹框 */
	$(".forgetBtn").on("click",function(){
		$(".maskBox").show();
	})
	$(".maskBox").on("click",function(e){
		e.stopPropagation();
		$(this).hide();
	});

	/* 财富券显示框 */
	$(".Voucher").on("click",function(){
		$(".couponList").show(50,function(){
			$(this).on("click",function(){
				$(this).hide(50);
				$("#Voucher").html("未使用");
			})
		})
	});
	$(".vou_list").on("click","li",function(event){
		event.stopPropagation();
		var moneyVal = $(this).find("span").html();
		$("#Voucher").html(moneyVal);
		$(".couponList").hide(50);
	});
	$(".page").on("click","h2",function(event){
		event.stopPropagation();
		$(".couponList").hide(50);
		$("#Voucher").html("未使用");
	})
})
