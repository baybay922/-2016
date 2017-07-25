// JavaScript Document
var FormCheck =	function(iptName,el,newReg) {
		if($(".l_flag").length == 0){
			var iptHidden = $("<input>").addClass("l_flag").attr("type","hidden").appendTo("body");
		}
		if (this instanceof FormCheck) {
			var f = new this[iptName](el,newReg);
			return f;
		}else{
			return new FormCheck(iptName,el,newReg);
		}
	}
	FormCheck.prototype = {
		bindFun:function() {
			$('.l_del').on('touchend',function (e) {
				e.stopPropagation();
				FormCheck('delete',$(this));
			});
			$('input').on('focus',function() {
				FormCheck('focus',$(this))
			}).on('blur',function() {
				$('.l_del').hide();
				FormCheck($(this).attr('id'),$(this));
			});
			// 密码切换按钮
			$(".l_pswBtn").on("touchend",function(e) {
				e.stopPropagation();
				e.preventDefault(); //阻止浏览器元素默认行为
				$(this).toggleClass("l_pswBtn2");
				$(this).hasClass("l_pswBtn2")?$("#passWord").prop("type","text"):$("#passWord").prop("type","password");
			})
			// 勾选切换按钮
			$(".l_uncheck").on("touchend",function(e) {
				e.stopPropagation();
				e.preventDefault(); //阻止浏览器元素默认行为
				$(this).toggleClass("l_checked");
			})

			$('#checkCodeB').on('click',function(e) {
				e.stopPropagation();
				if ($(".l_flag").attr("data-telNumber") === 'true') {
					postMSG();
					FormCheck('countDown',60);
				}
				return false; //防止button的click触发form表单提交
			})
		},

		countDown:function (el) {
			var num = el;
			num-=1;
			if (num == 0) {
				$("#checkCodeB").text("获取验证码");
				$("#checkCodeB").removeAttr('disabled');
				$("#checkCodeB").removeClass("l_disable");
			}else{
				$("#checkCodeB").attr("disabled","");
				$("#checkCodeB").addClass("l_disable");
				$("#checkCodeB").text(num + "秒");
				setTimeout(function(){FormCheck('countDown',num--)},1000);
			}
		},

		focus:function(el) {
				var e = window.event || arguments.callee.caller.arguments[0];
				e.stopPropagation();
				var placeholder = el.attr("data-placeholder"),
						regTip = el.next();
				el.attr("data-placeholder",placeholder).css('border-bottom','solid 1px #b0d3fb').attr("placeholder","").siblings(".l_del").show();
				regTip.text(regTip.attr("data-regTip")).removeClass("pjWrong").addClass("pjTip").slideDown();
		},

		input:function(el,newReg) {
				var val = el.val();
				switch (newReg) {
					case 'numberOnly':
								if (!/^[0-9]*$/.test(val)) {
										el.val(val.substring(0,val.length-1));
								}
						break;
					case 'twoNumAfterDot':
								if (!/^\d*\.{0,1}\d*$/.test(val)) {
										el.val(val.substring(0,val.length-1));
								}
						break;
					case 'numAndLetter':
								if (/[^A-Za-z0-9]/g.test(val)) {
										el.val(val.substring(0,val.length-1));
								}
						break;

				}
		},

		delete:function(el) {
				var e = window.event || arguments.callee.caller.arguments[0];
				e.stopPropagation();
				e.preventDefault();
				el.siblings("input:visible").val("");
		},

		userName:function(el,newReg) {
				// 默认的正则验证
				var regX = (/[^\w\u4e00-\u9fa5,-]/g.test(val)),
						val = el.val();
				if (arguments[2] !== undefined)//如果有额外传入的正则方法，则使用新传入的规则校验
				{
					regX = arguments[2];
					console.log("本次校验使用新传入的校验规则！");
				}
				if(val=="")//用户名为空
				{
					el.attr("placeholder",el.attr("data-placeholder")).css({"border-bottom":"solid 1px #ffc281"}).next().text("用户名不能为空").removeClass("pjTip").addClass("pjWrong");
					$(".l_flag").attr("data-userName",false);
				}
				else if(regX)//用户名不合法
				{
					el.css({"border-bottom":"solid 1px #ffc281"}).next().text("您输入的用户名含有非法字符").removeClass("pjTip").addClass("pjWrong");
					$(".l_flag").attr("data-userName",false);
				}
				else if(val.length<4||val.length>20)//用户名长度不合法
				{
					el.css({"border-bottom":"solid 1px #ffc281"}).next().text("您输入的用户名长度不正确").removeClass("pjTip").addClass("pjWrong");
					$(".l_flag").attr("data-userName",false);
				}
				else
				{
						el.css({"border-bottom":"solid 1px #1ad8b0"}).next().text("").slideUp();
						$(".l_flag").attr("data-userName",true);
				}
				el.attr("placeholder",el.attr("data-placeholder"));
		},

		telNumber:function(el,newReg) {
				// 默认的正则验证
				var val = el.val(),
						regX = (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(val));
						console.log(val);
				if (arguments[1] !== undefined)//如果有额外传入的正则方法，则使用新传入的规则校验
				{
					regX = arguments[1];
					console.log("本次校验使用新传入的校验规则！");
				}
				if (val == "")
				{
					el.attr("placeholder",el.attr("data-placeholder")).css({"border-bottom":"solid 1px #ffc281"}).next().text("请输入手机号码").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
					$(".l_flag").attr("data-telNumber",false);
				}
				else if (!(regX))
				{
					el.css({"border-bottom":"solid 1px #ffc281"}).next().text("请输入正确的手机号码").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
					$(".l_flag").attr("data-telNumber",false);
				}
				else
				{
					el.css({"border-bottom":"solid 1px #1ad8b0"}).next().text("").slideUp();
					$(".l_flag").attr("data-telNumber",true);
				};
				el.attr("placeholder",el.attr("data-placeholder"));

		},
		checkCode:function(el) {
				var val = el.val(),
				 		leg = val.length;
				if (val == '')
				{
					el.css({"border-bottom":"solid 1px #ffc281"}).next().text("请输入验证码").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
					$(".l_flag").attr("data-checkCode",false);
				}
				else if (leg < 6)
				{
					el.css({"border-bottom":"solid 1px #ffc281"}).next().text("验证码位数错误").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
					$(".l_flag").attr("data-checkCode",false);
				}else{
					el.css({"border-bottom":"solid 1px #1ad8b0"}).next().text("").slideUp();
					$(".l_flag").attr("data-checkCode",true);
				}
				el.attr("placeholder",el.attr("data-placeholder"));
		},
		passWord:function(el) {
				var e = window.event || arguments.callee.caller.arguments[0];
				e.stopPropagation();
				var val = el.val();
						//密码为空
					if(val=="")
					{
						el.css({"border-bottom":"solid 1px #ffc281"}).next().text("密码不能为空").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
						$(".l_flag").attr("data-passWord",false);
					}
					else if(val.length<6||val.length>16)
					{
						el.css({"border-bottom":"solid 1px #ffc281"}).next().text("您设置的密码长度不正确").removeClass("pjTip").addClass("pjWrong").fadeOut(1500);
						$(".l_flag").attr("data-passWord",false);
					}else{
						$(".l_flag").attr("data-passWord",true);
						el.css({"border-bottom":"solid 1px #1ad8b0"}).next().text("").slideUp();
					}
					el.attr("placeholder",el.attr("data-placeholder"));
		},
		code:function(el) {
				var e = window.event || arguments.callee.caller.arguments[0];
				e.stopPropagation();
				el.attr("placeholder",el.attr("data-placeholder"));
		},

	}


$(function() {
	FormCheck('bindFun');

	$('#load').on('click',function() {
		var ipt1 = $(".l_flag").attr("data-userName"),
				ipt2 = $(".l_flag").attr("data-telNumber"),
				ipt3 = $(".l_flag").attr("data-checkCode"),
				ipt4 = $(".l_flag").attr("data-passWord"),
				iptCheck = $('.l_uncheck').hasClass('l_checked');
		if ( ipt1 === 'true' && ipt2 === 'true' && ipt3 === 'true' && ipt4 === 'true' && iptCheck ) {
				var val1 = $('#userName').val(),
						val2 = $('#telNumber').val(),
						val3 = $('#checkCode').val(),
						val4 = $('#passWord').val();
				goAjax(val1,val2,val3,val4);
		}else if (!iptCheck) {
				alert('请勾选注册协议！')
		}else if (ipt1 === 'false') {
				alert('请填写用户名！')
		}else if (ipt2 === 'false') {
				alert('请填写手机号！')
		}else if (ipt3 === 'false') {
				alert('请填写验证码！')
		}else if (ipt4 === 'false') {
				alert('请填写密码！')
		}else {
			return false;
		}
		return false; //防止button的click触发form表单提交
	})
})


function goAjax(val1,val2,val3,val4) {
	alert('走你：'+ val1 +'（用户名）'+ val2 +'（手机号）'+ val3 +'（验证码）'+ val4 +'（密码）');
}
function postMSG() {
	alert('发送短信验证码！');
}
