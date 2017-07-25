// JavaScript Document
//require.js调用的主框架
require.config({
	paths:{
		"jquery":["lib/jquery-1.11.0.min"],
		"swal":["lib/sweetalert2"]
	}
})
require(['jquery','swal'],function($,swal) {
	$(function() {
		var unRealBroadP = false;
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


		/**
		 * 提现
		 * @param callback
		 */
		var exceed_val = $("#exceed").html(),
			flag=true,
			selfHasClass = true;
		var Withdrawals = {	 	
			_init: function (){
				$("#moeny").on('input propertychange',function(){//判断输入框条件
					var money_val = $(this).val(),
						moeny_len = money_val.length;

					Withdrawals._JudgmentLen(money_val, moeny_len, exceed_val);
				});
				$("#allOut").on("click",Withdrawals._CounterFee);//使用提现券
				$("#sure_Button").on("click",Withdrawals._verifyPwd)

			}
			,_JudgmentLen: function(money_val, len, exceed_val){
				
				var	errorPrompt = $("#errorPrompt"),
					allOut = $("#allOut"),
					Arrival = $("#Arrival");
				
				if(money_val == ""){
					errorPrompt.html("当前账户余额(￥"+ exceed_val +"元)")
					.removeClass("prompt");
					allOut.show();
					Arrival.html("0");
					$("#allOut").html("全部提现")
					.removeClass("maskUse")
				}
				if(money_val < 100 && !money_val == ""){
					console.log(money_val)
					errorPrompt.html("提现金额不得小于100元")
					.addClass("prompt");
					allOut.hide();
					Arrival.html("0")
				}
				if(money_val > exceed_val){
					errorPrompt.html("提现金额不得大于当前账户余额(￥"+ exceed_val +"元)")
					.addClass("prompt");
					allOut.hide();
					Arrival.html("0");
				}
				if(money_val >= 100 && money_val < exceed_val){
					errorPrompt.html("额外扣除￥<span id='CounteFee'>3.00</span>手续费")
					.removeClass("prompt");
					allOut.show();
					if(flag){
						allOut.html("使用提现券").addClass("maskUse");
					}else{
						allOut.html("").addClass("maskUse");
					}
					Arrival.html(""+(money_val-3)+"");
				}
				
			},
			_CounterFee: function(){
				var self = $(this),
					Arrival = $("#Arrival"),
					moeny_val = $("#moeny").val(),
					errorPrompt = $("#errorPrompt");
					if(flag){
						if($("#allOut").hasClass("maskUse")){
							if(selfHasClass){
								$("#CounteFee").addClass("CounteFee");
								self.html("取消")
								.addClass("colose")
								Arrival.html(""+(moeny_val)+"")
								selfHasClass = false;
								
							}else{
								$("#CounteFee").removeClass("CounteFee");
								self.html("使用提现券")
								.removeClass("colose");
								Arrival.html(""+(moeny_val-3)+"");
								selfHasClass = true;
							}
						}else{
							errorPrompt.html("额外扣除￥<span id='CounteFee'>3.00</span>手续费");
							$("#moeny").val(exceed_val);
							self.html("使用提现券")
							.addClass("maskUse").removeClass("colose");
							Arrival.html(exceed_val-3);						
						}
					}else{
						errorPrompt.html("额外扣除￥<span id='CounteFee'>3.00</span>手续费");
						$("#moeny").val(exceed_val);
						self.html("")
						.addClass("maskUse").removeClass("colose");
						Arrival.html(exceed_val-3);		
					}
			}
			,_verifyPwd: function(){
				var pwd_val = $("#pwd_frame").val();
				if(pwd_val == ""){
					swal('交易密码不能为空','','warning');
				}else{
					window.setTimeout(unRealBroad.showHide(),300);
					$(this).addClass("adopt");
				}
			}
		}
		Withdrawals._init();

		/* 
			模拟键盘
		 */
		// 提现虚拟键盘功能
		var UnRealBroad = function(telNum) {
			// 插入DOM结构
			this.addBroad = function (telNum) {
				var mask = $("<div>").addClass("mask").appendTo($("body")),
						broadBG = $("<section>").addClass("l_broadBG").appendTo(mask),
						topInfo = $("<ul>").addClass("l_topInfo").html("<li class='l_close'></li><li>请输入验证码</li><li>已发送至："+telNum+"</li><li class='l_checkCode'><input type='hidden' id='checkCode' value=''/><span></span><span></span><span></span><span></span><span></span><span></span><p class='pjred' id='errTip'>验证码错误，请重新输入</p><button class='l_checkCodeBtn'>重新发送</button></li>").appendTo(broadBG),
						btmInfo = $("<ul>").addClass("l_btmInfo").html("<li data-val='1'>1</li><li data-val='2'>2</li><li data-val='3'>3</li><li data-val='4'>4</li><li data-val='5'>5</li><li data-val='6'>6</li><li data-val='7'>7</li><li data-val='8'>8</li><li data-val='9'>9</li><li data-val=''></li><li data-val='0'>0</li><li data-val='del'></li>").appendTo(broadBG);
			};
			// 绑定touch事件
			this.touchMe = function(){
					touchBind();
			};
			// 显示隐藏键盘方法
			this.showHide = function () {
				$(".mask").show();
				$(".l_broadBG").animate({bottom:0},300);
				countDown(60,$(".l_checkCodeBtn"));
				$(".l_close").on("touchend",function(e) {
					e.stopPropagation();
					e.preventDefault();
					$(".mask").hide();
				})
			};
			// 结果返回方法
			this.checkResult =function (result) {
				if (result) {
					$(".mask").hide();
				}else{
					$("#errTip").show();
					$(".l_topInfo").animate({top:0},1000);
					$(".l_btmInfo").animate({bottom:0},1000);
				}
			}
			// 初始化时调用
			this.addBroad(telNum);
			this.touchMe();

			// 绑定touch事件私有方法
			function touchBind() {
				$(".l_btmInfo li").on("touchstart",function(e){
						e.stopPropagation();
						e.preventDefault();
						$("#errTip").hide();
						if ($(this).attr("data-val")!='') {
							$(this).toggleClass("l_touchShadow");
						}
				}).on("touchend",function (e) {
						e.stopPropagation();
						e.preventDefault();
						if ($(this).attr("data-val")!='') {
								$(this).toggleClass("l_touchShadow");
								if ($(this).attr("data-val")!='del'&&$("#checkCode").val().length<=6) {
									$("#checkCode").val($("#checkCode").val().toString()+$(this).attr("data-val").toString());
								}else if($(this).attr("data-val")=='del') {
									$("#checkCode").val($("#checkCode").val().substring(0,$("#checkCode").val().length-1));
								}
								var iptarr =$("#checkCode").val().split('');
								$(".l_checkCode span").each(function (index) {
										$(this).text("");
										$(this).text(iptarr[index]);
										if ($(".l_checkCode span").last().text() != "") {
											$(".l_btmInfo li").off("touchend").off("touchstart");
											$(".l_topInfo").animate({top:-50+"%"},1000);
											$(".l_btmInfo").animate({bottom:-50+"%"},1000);
											console.log("验证去："+$("#checkCode").val());
											window.setTimeout(function () {
												checkResultTest(false);
											},3000)
										}
								})
						}
				});
				$(".l_checkCodeBtn").on("click",function (e) {
					e.stopPropagation();
					e.preventDefault();
					countDown(60,$(this));
				})
			}
			// 倒计时私有方法
			function countDown(num,el) {
				num-=1;
				if (num == 0) {
					el.text("重新发送");
					el.removeAttr('disabled');
					el.removeClass("l_disable");
				}else{
					el.attr("disabled","");
					el.addClass("l_disable");
					el.text(num + "s后重新发送");
					setTimeout(function(){countDown(num--,el)},1000);
				}
			};



			// 测试用私有方法，部署时请调用this.checkResult()
			function checkResultTest(result) {
				if (result) {
					$(".mask").hide();
				}else{
					$("#errTip").show();
					$(".l_checkCode span").text("");
					$("#checkCode").val("");
					touchBind();
					$(".l_topInfo").animate({top:0},1000);
					$(".l_btmInfo").animate({bottom:0},1000);
				}
			}

		}
		var unRealBroad = new UnRealBroad("185****0040");
	});
	
})
