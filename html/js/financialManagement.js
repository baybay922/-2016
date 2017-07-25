pushData(0);
      AnimationLoading($(".regular"),50);
      $("#w_vouList").on("click","li",function(){
        var thisIndex = $(this).index(),
            moveW = $(".w_page").width();
        $(this).find("a").addClass("w_active").parent().siblings("li").find("a").removeClass("w_active");
        $(".orderList").animate({
            "margin-left":-thisIndex*moveW+"px"
        },300)
        pushData(thisIndex)
        if(thisIndex == 0){
          AnimationLoading($(".pages1"),40);
        }
        if(thisIndex ==1){
          AnimationLoading($(".pages2"),30);
        }
        if(thisIndex == 2){
          AnimationLoading($(".pages3"),50);
        }
      })

      function pushData(ind){
        $(".page"+ind).on("scroll",function(){          
          var scrollTop= $(this).find("ul").outerHeight(true),
            selfH=$(this).scrollTop()+$(window).height();
              if( scrollTop <= selfH){
                  setTimeout(function(){
                tips = $("<p class='l_lastTips'><a href='javascript:void(0)'>加载更多</a></p>").appendTo($(".pay_page"+ind));
              },0);
              }
        })
      }

      function AnimationLoading(pages,number){
        var lis=pages.find("li");
        for(var i=0;i<lis.length;i++){
          if(i>-1){
            var div=$(lis[i]).find("div.schedule");
            var radialObj = $(div).radialIndicator({
                 barWidth : 10,
                 barColor : "#FF5E61",
                 barBgColor :"#efefef",
                 displayNumber: false
              }).data('radialIndicator');
            radialObj.animate(Math.floor(number));
          }
        } 
      }