var om = {};
om.features = om.features || {};
om.queryStringToParams = function (q) {
    var q = (q + '').replace(/(&amp;|\?)/g, "&").split('&');
    var p = {};
    var c = q.length;
    for (var i = 0; i < c; i++) {
        var pos = q[i].indexOf('=');
        if (-1 == pos) continue;
        p[q[i].substr(0, pos).replace(/[^a-zA-Z0-9_]/g, '')] = unescape(q[i].substr(pos + 1));
    }

    return p;
};


om.urlParams = function () {
    var hash = location.href.toString().indexOf('#');
    if (hash < 0) hash = '';
    else {
        hash = location.href.toString().substring(hash, location.href.toString().length);
    }
    return {
        search: om.queryStringToParams(location.search.substr(1)),
        hash: om.queryStringToParams(hash)
    };
};

om.formatFloat = function (f, precision) {
    f = f - 0;
    if (isNaN(f)) return "-";

    precision = precision === undefined ? 2 : precision;
    f = (f.toFixed(precision) + "").split(".");
    f[0] = f[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return f.join(".");
};

om.formatInt = function (f) {
    return this.formatFloat(f, 0);
};

om.formatRate = function (f) {
    if (f == null) return "-";
    return this.formatFloat(f * 100, 2) + "%";
};

om.diffDateString = function (date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    var tpad = function (t) {
        if (t >= 100) return (t - 0).toFixed(0);
        return (t / 100).toFixed(2).substr(2);
    };
    var seconds = (date1 - date2) / 1000, p = "", t = 0;
    t = Math.floor(seconds / 3600);
    p += tpad(t);
    seconds -= t * 3600;

    t = Math.floor(seconds / 60);
    p += ":" + tpad(t);
    seconds -= t * 60;

    t = seconds;
    p += ":" + tpad(t);

    return p;
};

om.te = function (t, cont) {
    return $('[t=' + t + "]", cont);
};

om.fillHTML = function (cont, obj) {
    $.each(obj, function (i, val) {
        om.fadeHTML(om.te(i, cont), val);
    });
};

om.fadeHTML = function (e, html) {
    e.html(html);
    // e.fadeTo('fast', 0.8, function(){
    // 	e.html(html).fadeIn('fast');
    // });
};

om.toggle = function (cont, jqBtn, jqContent) {
    om.te(jqBtn, cont).bind("click", function () {
        var opened = $(this).hasClass("icon-angle-up");
        if (opened) {
            $(this).removeClass("icon-angle-up").addClass("icon-angle-down");
            om.te(jqContent, cont).slideUp('fast');
            om.refreshContent(cont);
        } else {
            $(this).removeClass("icon-angle-down").addClass("icon-angle-up");
            om.te(jqContent, cont).slideDown('fast');
            om.refreshContent(cont);
        }
    });
};

om.changeHashPage = function (hash, params) {
    //$('#' + hash).data("omParams", params || {});
   // $.mobile.changePage('#' + hash);//"html/dashboard.html"
     var jsName = "";
	 a = hash.indexOf("#");
	 b = hash.lastIndexOf(".html");
	 c = hash.lastIndexOf("/");
	
	//om.appendJs(jsName);
	$("#omParams").data("omParams", params || {});

 	if(b>=0)
	 {
		 jsName = hash.substring(c+1,b);
		 //om.appendJs("menu");
		 
	 }
	 else if(a>=0)
	 {
		 jsName = hash.replace("#","").replace("_page","")
	 }
	$.mobile.changePage(hash ,{
							transition : "slide"
						});
	//传递参数
					

	$.getScript("js/app/src/"+jsName+".js") ;
	 
};
// append js to head
om.appendJs = function (jsPath){
	$("head").append(" <script type=\"text/javascript\" src=\"js/app/src/"+jsPath+".js??version=1.0.0\"></script>");

}
om.renderPage = function (pageDom, func) {
    var params = om.urlParams().search;
    params = $.extend({}, params, $(pageDom).data('omParams') || {});
    if (typeof func == 'function') func(pageDom, params);
};

om.load = function (pageName, pageDom) {
    if (!om.features || !om.features[pageName]) {
        var concatPath = G.isDebug ? "src" : "dist",
            min = G.isDebug ? "" : ".min";
        $.getScript('/web/js/app/' + concatPath + '/' + pageName + min + '.js?v=' + (G.version || "1.0.0"), function () {
            om.features[pageName] && om.renderPage(pageDom, om.features[pageName]);
        });
    } else {
        om.renderPage(pageDom, om.features[pageName]);
    }
};

om.refreshContent = function (pageDom) {
    setTimeout(function () {
        var elements = $(pageDom).find(":jqmData(iscroll)");
        elements.iscrollview("refresh");
    }, 600);
};

om.parseDate = function (dateStr) {
    var arr = (dateStr + "").split(/[- :]/);
    if (arr.length != 6) return null;
    return new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
};


/* add by indeed **************************************begin*/
om.showloading=function(message,isText){
		$.mobile.loadingMessageTextVisible = true;
		//是否显示加载图片
		if(isText){
			//不显示加载图片
			$.mobile.showPageLoadingMsg( 'a',message,isText);
			var timeout = setTimeout("om.hideloading()",3000);
		}else{
			//显示加载图片
			$.mobile.showPageLoadingMsg( 'a',message);
		}
		
}
om.hideloading=function(){
		$.mobile.hidePageLoadingMsg();
}
om.notifigion=function(message){
	om.showloading(message,true);
}

om.pubUrl=function()
{
	var vs = window.localStorage.getItem("version_test");
	if(vs==0)//测试库
	{
		return "http://183.129.206.88:8090/Smartlinks_Service/";//test
	}
	else if(vs==1)//正式库
	{
		return "http://183.129.206.88:8091/Smartlinks_Service/";
	}

}
//菜单加载
om.memu=function(menuId)
{
	   $("#"+menuId).empty();
	   //$("#"+menuId).append(" </ul>");
	   
	   $("#"+menuId).append("<li data-role=\"list-divider\" role=\"heading\">菜单</li>");
	   /*********************************/
	  $("#"+menuId).append("<li data-theme=\"a\"><a id='dashboard' href=\"#\" onclick=\"om.changeHashPage('dashboard.html')\" data-transition=\"none\" class=\"icon icon-rocket\"> 我的轨迹</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"match\"  href=\"#\" onclick=\"om.changeHashPage('match.html')\" data-transition=\"none\" class=\"icon icon-fire\"> 比赛</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"mygame\" href=\"#\" onclick=\"om.changeHashPage('mygame.html')\" data-transition=\"none\" class=\"icon icon-coffee\"> 我的对局</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"chart\" href=\"#\" onclick=\"om.changeHashPage('chart.html')\"  data-transition=\"none\" class=\"icon icon-gift\"> 积分动态</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"friend\" href=\"#\" onclick=\"om.changeHashPage('friend.html')\"  data-transition=\"none\" class=\"icon icon-user\"> 棋友</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\" ><a   id=\"messages\" href=\"#\"  onclick=\"om.changeHashPage('messages.html')\"  data-transition=\"none\" class=\"icon icon-bell\"> 消息</a></li>");
	   
	     /* $("#"+menuId).append("<li data-theme=\"a\"><a id='dashboard' href=\"#\"  data-transition=\"none\" class=\"icon icon-rocket\"> 我的轨迹</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"match\"  href=\"#\" data-transition=\"none\" class=\"icon icon-fire\"> 比赛</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"mygame\" href=\"#\"  data-transition=\"none\" class=\"icon icon-coffee\"> 我的对局</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"chart\" href=\"#\"   data-transition=\"none\" class=\"icon icon-gift\"> 积分动态</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\"><a id=\"friend\" href=\"#\"   data-transition=\"none\" class=\"icon icon-user\"> 棋友</a></li>");
	   $("#"+menuId).append("<li data-theme=\"a\" ><a   id=\"messages\" href=\"#\"   data-transition=\"none\" class=\"icon icon-bell\"> 消息</a></li>");*/
	   
	   
	   	   /*********************************/

	   $("#"+menuId).append("<li data-theme=\"a\"><a id='login_page' href=\"#login_page\" data-transition=\"none\" class=\"icon icon-reply\"> 注销</a></li>");
	   
	   console.log("菜单："+$("#"+menuId).html());

	   $("#"+menuId).listview('refresh');
	   
	  /*$("#dashboard").on("vclick" ,function(){om.changeHashPage('dashboard.html')});
	   $("#match").on("vclick" ,function(){om.changeHashPage('match.html')});
	   $("#mygame").on("vclick" ,function(){om.changeHashPage('mygame.html')});
	   $("#chart").on("vclick" ,function(){om.changeHashPage('chart.html')});
	   $("#friend").on("vclick" ,function(){om.changeHashPage('friend.html')});
	   $("#messages").on("vclick" ,function(){om.changeHashPage('messages.html')});*/

	   
	   
}

/* add by indeed **************************************end*/

om.init = function () {
   
    //$.mobile.defaultPageTransition = 'slide';
    //$.mobile.buttonMarkup.hoverDelay = 0;
    $(document).on("pagebeforeshow", '[id$="page"]', function () {
        var pageName = this.id.split("_")[0], self = this;
        
        if (!$(self).data('bindreload')) {
            om.te('reload', self).bind("vclick", function () {
                om.load(pageName, self);
            });
            $(self).data('bindreload', 1);
        }
        om.load(pageName, self);
    });
};

