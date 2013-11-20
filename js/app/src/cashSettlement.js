// Add by Wilshere
// 棋友列表
// 2013/10/31

var friend = {};
var pageIndex=0;
// search method
//status="showmore"/"search"
friend.btnsearch=function(gradeFrom,gradeTo,status){
     // waiting dialog

    om.showloading("正在加载，请稍等……");     
     gradeFrom=parseInt(30)-parseInt(gradeFrom);
     gradeTo = parseInt(30)-parseInt(gradeTo);
     // hide the showmore button
     $("#showmore").hide();
     
     // value="search" reload listview，otherwise  append listview item
     if(status=="search"){
          pageIndex=0;
     }
     $.ajax({
          type:"get",//QueryMember?GradeFrom=5&GradeTo=2&PageIndex=0
          url:om.pubUrl()+"QueryMember?GradeFrom="+gradeFrom+"&GradeTo="+gradeTo+"&PageIndex="+pageIndex,
          dataType:"jsonp",
          jsonpCallback:"call",
		  timeout:10000,
          success: function(data){
                    // parse json to js json
                    var returnData=eval(data);
                    // get request state
                    var state=returnData.Status;
                    if(state=="OK")
                    {                    
                         // declare a variable with whick to build our output
                         var output='';
                         var returnList=returnData.returnValue;
                         var listcount=0;
                         // iterate the data
                         $.each(returnList,function(index,value){
                              //*******
                              console.log("********: "+value.Rank);

                              var i=index+1;
                              output+= "<li><a class=\"a_friend\" onclick=\"om.changeHashPage('friendDetail.html',{memberid:'"+value.MemberId+"',membername:'"+value.MemberName+"'})\" href=\"#\" id=\"a_person\"  >";
                              
                              output+="<h6 class='detail_name'>"+value.MemberName +"</h6>";
                              output+="<p><strong>城市："+value.AddressCity+"</strong></p>";
                              output+="<p class='detail_score'>积分："+value.CurrentIntegrate+"</p>";
                              output+="<p class='ui-li-aside' ><span class='detail_index'>第"+value.Rank+"名</span></p>";
                              output+="</a>";
                              output+="</li> ";
                              // count ++
                              listcount++; 
                         });
                         
                         // empty listview and refresh
                         if(status=="search"){
                              $('#list_friend').empty()
                         }
                         $('#list_friend').append(output).listview('refresh');
                         // bind change page on listview
//                         $(".a_friend").bind("click",function(){
//                              
//                              alert("tiao");
//                                   $.mobile.changePage("friendDetail.html");
//                              });
                         om.hideloading();
                         //chanage value
                         pageIndex++;
     
                         // judge the list count
                         if(listcount>=10)
                         {
                              $("#showmore").show();
                         }
                         // $("#showmore").hide();
                    }
                    else
                    {
                         // request false
                         var msg=returnData.Message;               
                         om.showloading(msg,true);
                    }
               },
        error:function(error){
                    // request false
                    om.showloading("远程调用出错",true);
               }
     });
     };

//段位值的显示处理
friend.formatGrade=function(value){
     // alert(value);
     if(value>20){
          return ((parseInt(value)-20)+"D");
     }else{
          return (21-(parseInt(value))+"K");
     }
}
//初始化登录信息
$(function(){
     //om.memu("friend_menu");

   /* //打开面板
     $("#friend_menu_a").bind("vclick", function () {
               $( "#friend_friendpanel" ).panel( "open" );
          });    */      
    /* //右滑动，打开菜单     
     $("#friend_page").bind("swiperight", function () {
                 $( "#friend_friendpanel" ).panel("open" );
          });*/
 
	
     //bind showmore button click enent
	 $("#showmore").unbind();
     $("#showmore").bind("click",function(e,ui){
               friend.btnsearch($("#gradeFrom").val(),$("#gradeTo").val(),"showmore");
     });
         

     
      
});