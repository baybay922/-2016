// JavaScript Document
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"publicJS":["main"],
		"swal":["lib/sweetalert2"],
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

	perLineAnimate();
	})
	//进度条动画
	function  perLineAnimate() {
		var money = $("#money").attr("data-money"),
				hasmoney = $("#hasmoney").attr("data-hasmoney"),
				per = hasmoney/money*100,
				perbgin = 0;
		$(".l_perLine>i").css("width",per+"%");
		(function perAnimate(){
			if (perbgin == per) {
					$(".l_perLine>i>b").text(per+"%");
			}else{
					$(".l_perLine>i>b").text(perbgin+"%");
					setTimeout(function(){perAnimate(perbgin++)},2000/per);
			}
		})();
	}

	$(".l_btn").on("click",function() {
		if (!$(".l_propto>i").hasClass("l_checked")) {
			swal(
				'您还未勾选《省心计划投资协议》',
				'',
				'warning'
			)
			return false;
		}
		if ($("#moneyInput").val() == "") {
			swal(
				'请填写省心金额',
				'',
				'warning'
			)
			return false;
		}
		alert("提交数据！");
	})

	$(".l_propto i").on("click",function() {
		$(this).toggleClass("l_checked");
	})
	// 输入框公共方法
	$("input[name=input]").on("focus",function(){
		var placeholder =$(this).attr("placeholder");
		$(this).attr("data-placeholder",placeholder).css('border','solid 1px #b0d3fb').attr("placeholder","").prop("type","password");
				$(this).on("blur",function () {
						$(this).attr("placeholder",placeholder).css('border','solid 1px #ff5e61');
						if ($(this).val() == "") {
							$(this).prop("type","text");
						}else {
							alert("后端校验定向密码")
							$(".l_inputPassword").animate({top:-8+"rem"},600);
						}

				})
		})
		$("input[name=money]").on("focus",function(){
			var placeholder =$(this).attr("placeholder");
			$(this).attr("data-placeholder",placeholder).css('border','solid 1px #b0d3fb').attr("placeholder","");
					$(this).on("blur",function () {
							$(this).attr("placeholder",placeholder).css('border','solid 1px #ff5e61');

					})
			}).on("input",function () {
				publicJS.limitNUM(16);
				if ($(this).val()<100) {
					$("#shouYi").text("0.00");
				}else if ($(this).val()%100!=0) {
					$("#shouYi").text("--");
				}else {
					$("#shouYi").text(($(this).val()*1.007).toFixed(2));
				}
			})
//js结尾
})
