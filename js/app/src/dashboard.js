// JavaScript Document
// Add kevin.zhang@serviceindeed.com
// dashborad JS实现
// 2013-10-31
var dashboard={}
//初始化
var curSencond;
dashboard.loadData=function(data){
		/*userName = data.userName;
		if(userName=="")
		{
			userName="CGF00088"
		}*/
		// colse menu
		userName = window.localStorage.getItem("name");
		om.showloading("正在加载，请稍等……");
		$.ajax({
                type: "get",
                url: om.pubUrl()+"GetUserSumInfo/"+userName,
                dataType: "jsonp",
                jsonpCallback: "call",
				timeout:10000,
                success: function (data) {
					//data解析为JSON数据
					 data=eval(data);
					 
					 // alert(JSON.stringify(data));
					 
					 //访问成功
					 if(data.Status=="OK"){
						 //访问成功，得到用户的基础信息
						  var info=data.returnValue;
						  $("#db_score").html(info.Score +"<span style='color:red'>("+info.GradeName+")</span>");//当前积分
						  if(info.Rank<=0)//没有排名
						  {
						  	$("#db_index").text("您暂无排名");//我的排名
						  }
						  else
						  {
							  $("#db_index").text(info.Rank);//我的排名
						  }
						  $("#db_frends").text(info.Opponent);//手谈棋友数
						  $("#db_games").text(info.GameNum);//对局数
						  $("#db_activity").text(info.Tourament);//活动次数
						  
						  // store the grade value
						  window.localStorage.setItem("userGrade",info.Grade);
						  
						  dashboard.jointime(info.RegisterDate);//入会时间
						  om.hideloading();// close loading
					}else{
						//得到错误提示信息
						var msg=data.Message;
						om.showloading(msg,true);
					}
				},
                error: function (error) {
                    om.showloading("远程访问出错",true);
                }
    });
}



dashboard.jointime = function(Sencond) {
// 当前入会时间秒数
 curSencond =parseInt( Sencond); 
// 首次更新当前秒数
setCurRegisterSencond();
// 定时器更新当前秒数
//window.setInterval(setCurRegisterSencond, 1 * 1000);

} 

// 设置当前时间
function setCurRegisterSencond() {
		// 入会时间以秒递增
		curSencond += 1;
		var y = Math.floor(curSencond / 3600 / 24/ 30 / 12);
		var mmSencond = curSencond % (3600 * 24 * 30 * 12);
		var mm = Math.floor(mmSencond / 3600 / 24 / 30);
		var dSencond = mmSencond % (3600 * 24 * 30);
		var d = Math.floor(dSencond / 3600 / 24);
		var hSencond = dSencond % (3600 * 24);
		var h = Math.floor(hSencond / 3600);
		var mSencond = hSencond % 3600;
		var m = Math.floor(mSencond / 60);
		var s = hSencond % 60;
		// 赋值
		$("#db_jointime").text(y.toString() + "年" + mm.toString() + "月" + d.toString() + "日"
		+ h.toString() + "时" + m.toString() + "分" + s.toString() + "秒");
}

//初始化信息
$(function(){
	
	/*//打开面板
	$("#dashboard_menu_a").bind("click", function () {
			$( "#dashboard_menupanel" ).panel( "open" );
		});*/
	/* //右滑动，打开菜单
	 $("#dashboard_page").bind("swiperight", function () {
			$( "#dashboard_menupanel" ).panel( "open" );
	 });*/
	 
	  /* $("#dashboard_page").swipe( {
                                                swipeStatus:function(event, phase, direction, distance, duration, fingers) {

                                                if(phase==$.fn.swipe.phases.PHASE_START) {
                                                        $(this).text("moving...");
                                                } 

                                                if(phase==$.fn.swipe.phases.PHASE_CANCEL) {
                                                        $(this).text("swipe cancelled (due to finger count) "  );
                                                }   
                                          },
                                          swipe:function(event, direction, distance, duration, fingerCount) {
                                                $(this).text("You swiped " + direction + " with " + fingerCount + " fingers");
                                          },
                                          threshold:0,
                                          fingers:2
                                        });*/
										
										
	/* //菜单按钮
	 $("#dashboard_menu").find("#dashboard").on("vclick" ,function(){om.changeHashPage('dashboard.html')});
	 $("#dashboard_menu").find("#match").on("vclick" ,function(){om.changeHashPage('match.html')});
	 $("#dashboard_menu").find("#mygame").on("vclick" ,function(){om.changeHashPage('mygame.html')});
	 $("#dashboard_menu").find("#chart").on("vclick" ,function(){om.changeHashPage('chart.html')});
	 $("#dashboard_menu").find("#friend").on("vclick" ,function(){om.changeHashPage('friend.html')});
	 $("#dashboard_menu").find("#messages").on("vclick" ,function(){om.changeHashPage('messages.html')});
	   */
	   
	//om.memu("dashboard_menu");
	//load data
	//dashboard.loadData("");
	
	
});

