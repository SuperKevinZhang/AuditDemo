// Add yang.liu@serviceindeed.com
// 登录页面JS实现
// 2013-10-29




var Login={}
//初始化Login页面事件
//UserName是用户登录框对象  userPass是密码框对象
Login.initLogin=function(userName,userPass){
	userName.val(window.localStorage.getItem("name")==null?"":window.localStorage.getItem("name"))
	userPass.val(window.localStorage.getItem("password")==null?"":window.localStorage.getItem("password"))
}

//登录按钮事件
Login.btnLogin=function(userName,userPass){
		if(userName=="")
		{
			om.notifigion("用户名不能为空");
			$('#txtName').focus();
			return ;
		}
		
		if(userPass=="")
		{
			om.notifigion("密码不能为空");
			$('#txtPs').focus();
			return ;
		}
		om.showloading("正在登录，请稍等……");
		if(userName==userPass)
		{
			om.hideloading();
	    	om.changeHashPage("#dashboard_page");
		}
		else
		{
			om.notifigion("用户名或密码错误");

		}
		om.hideloading();

		/*$.ajax({
                type: "get",
                url: om.pubUrl()+"Login/"+userName+"/"+userPass,
                dataType: "jsonp",
                jsonpCallback: "call",
				timeout:10000,
                success: function (data) {
					//data解析为JSON数据
					 data=eval(data);
					 //得到访问数据库的状态
					 var status=data.Status;

					 //访问成功
					 if(status=="OK"){
						 //得到用户信用
						  var userInfo=data.returnValue;
						  window.localStorage.setItem("name", userName);
						  window.localStorage.setItem("id", userInfo.Id);
						  window.localStorage.setItem("chineseName", userInfo.ChineseName);
						  window.localStorage.setItem("password",userPass);
						  om.changeHashPage("dashboard.html");
						  om.hideloading();
						
					}else{
						//得到错误提示信息
						var msg=data.Message;
						om.showloading(msg,true);
					}
				},
                error: function (error) {
						om.showloading("网络异常，请检查网络",true);
                }
            });*/
}

Login.openDialog= function (options) {
        var href = options.href || "about:blank";
        var transition = options.transition || "none";
        $('body').append("<a id='tPushDialog' href='" + options.href + "' data-rel=\"dialog\" data-transition=\"" + options.transition + "\" style='display:none;'>Open dialog</a> ");
        $("#tPushDialog").trigger('click');
        $('body').find('#tPushDialog').remove();

        $("#" + options.dialog).bind('pageshow', function (event) {
            if (typeof options.callback == 'function')
                options.callback();
        });

    }
//初始化登录信息
$(function(){
	//绑定登录按钮
	$("#login_login").unbind();
	$("#login_login").bind("click",function(e,ui){
			window.localStorage.setItem("version_test", 1);

			Login.btnLogin($("#txtName").val(),$("#txtPs").val());
	});
});
	