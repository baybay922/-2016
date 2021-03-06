// JavaScript Document
//require.js调用的主框架
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"main" : ["main"],
		"swal":["lib/sweetalert2"]
	}
})
require(['jquery',"main","swal"],function($,main,swal) {
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

		// 倒计时
		
		$("#checkCodeB").on("click",function(){
			main.countDown()
		});
		$("#next-btn").on("click",function(){
			var codeVal = $("#Veri-in").val();
			if(codeVal == ""){
				swal(
					'验证码不能为空',
					'',
					'warning'
				)
			}else{//跳转路径

			}
			
		})

		$("#Veri-in").on("input",function(){
			main.limitNUM(6);
		})

		$("#quetion").on("click",function(){
			swal({
				html:
				    '<h3>人工找回密码</h3></br>' +
				    '如遇手机丢失等特殊情况无法找回密码，请将您的身份证信息发送至客服邮箱：</br>' +
				    'myservice@mayitz.com，</br>' +
				    '或拨打客服电话：<a href="tel:400-061-8080">400-061-8080</a>。</br>' +
				    '我们会尽快帮您找回密码。'
			})
		})
	})
})
