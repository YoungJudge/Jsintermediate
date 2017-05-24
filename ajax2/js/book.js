/**
 * Created by Administrator on 2017/4/19.
 */
/*
 验证用户名
 get
 guestbook/index.php
 m : index
 a : verifyUserName
 username : 要验证的用户名
 返回
 {
 code : 返回的信息代码 0 = 没有错误，1 = 有错误
 message : 返回的信息 具体返回信息
 }
 */
/*
 用户注册
 get/post
 guestbook/index.php
 m : index
 a : reg
 username : 要注册的用户名
 password : 注册的密码
 返回
 {
 code : 返回的信息代码 0 = 没有错误，1 = 有错误
 message : 返回的信息 具体返回信息
 }
 */
/*
 用户登陆
 get/post
 guestbook/index.php
 m : index
 a : login
 username : 要登陆的用户名
 password : 登陆的密码
 返回
 {
 code : 返回的信息代码 0 = 没有错误，1 = 有错误
 message : 返回的信息 具体返回信息
 }
 */
/*
 用户退出
 get/post
 guestbook/index.php
 m : index
 a : logout
 返回
 {
 code : 返回的信息代码 0 = 没有错误，1 = 有错误
 message : 返回的信息 具体返回信息
 }
 */
/*
 留言
 post
 guestbook/index.php
 m : index
 a : send
 content : 留言内容
 返回
 {
 code : 返回的信息代码 0 = 没有错误，1 = 有错误
 data : 返回成功的留言的详细信息
 {
 cid : 留言id
 content : 留言内容
 uid : 留言人的id
 username : 留言人的名称
 dateline : 留言的时间戳(秒)
 support : 当前这条留言的顶的数量
 oppose : 当前这条留言的踩的数量
 }
 message : 返回的信息 具体返回信息
 }
 */
/*
 初始化留言列表
 get
 guestbook/index.php
 m : index
 a : getList
 page : 获取的留言的页码，默认为1
 n : 每页显示的条数，默认为10
 返回
 {
 code : 返回的信息代码 0 = 没有错误，1 = 有错误
 data : 返回成功的留言的详细信息
 {
 cid : 留言id
 content : 留言内容
 uid : 留言人的id
 username : 留言人的名称
 dateline : 留言的时间戳(秒)
 support : 当前这条留言的顶的数量
 oppose : 当前这条留言的踩的数量
 }
 message : 返回的信息 具体返回信息
 }
 */
window.onload = function(){
    var iPage = 1;
    function showList(){
        ajax({
            type:"get",
            url: "guestbook/index.php?m=index&a=getList&n=3&page="+iPage,
            success:function(data){
                var d = JSON.parse(data);
                var data = d.data;
                if (data) {
                    for (var i=0; i<data.list.length; i++) {
                        createList(data.list[i]);
                    }
                } else {
                    if (iPage == 1) {
                        oList.innerHTML = '现在还没有留言，快来抢沙发...';
                    }
                }
            }
        })
    }
    showList();
    document.getElementById("showMore").onclick = function(){
        iPage++;
        showList();
    }
    //获取cookie
    function getCookie(key){
        var arr1 = document.cookie.split("; ");  //必须有空格
        for(var i =0;i<arr1.length;i++)
        {
            var arr2 = arr1[i].split("=");
            if(arr2[0]==key)
            {
                return decodeURI(arr2[1]);
            }
        }
    }
    //设置cookie
    function setCookie(key,value,t){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+t);
        document.cookie = key+"="+value+' ;expires='+oDate.toGMTString()+";path=/";
    }
    //删除cookie
    function deleteCookie(key){
        setCookie(key," ",-1)
    }
   //要是有cookie就直接登录
    var LoginName = document.getElementById("userinfo");  //登录名
    var RegModel = document.getElementById("reg");  //注册模块
    var LoginModel = document.getElementById("login");  //登录模块
    if(getCookie("username"))
    {
        LoginName.innerHTML = getCookie("username");
        RegModel.style["display"] = "none";
        LoginModel.style["display"] = "none";
    }

  //用户注册
   var username1 = document.getElementById("username1"); //获取到用户名
   var password1 = document.getElementById("password1"); //判断密码
   var Reg1 = document.getElementById("verifyUserNameMsg"); //验证框信息
   var RegButton = document.getElementById("btnReg"); //注册按钮
   //验证是否注册
    username1.onblur = function(){
        ajax({
            type: "post",
            url: "guestbook/index.php?m=index&a=verifyUserName&username="+username1.value,
            success:function(data){
                 var data = JSON.parse(data); //封装好数据
                 if(data.code==0)
                 {
                     Reg1.style["color"] = "green";
                 }else
                 {
                     Reg1.style["color"] = "red";
                 }
                Reg1.innerHTML = data.message;
            }
        })
    }
    //用户注册开始
    RegButton.onclick = function(){
        var username = username1.value;
        var password = password1.value;
        ajax({
            type: "post",
            url: "guestbook/index.php?m=index&a=reg&username="+username+"&password="+password,
            success:function(data){
                var data = JSON.parse(data);
                 window.alert(data.message);
            }
        })
    }
    //用户登录开始
    var Login= document.getElementById("username2"); //获取到用户名
    var LoginPassword = document.getElementById("password2"); //判断密码
    var LoginButton = document.getElementById("btnLogin"); //注登录按钮
    LoginButton.onclick = function(){
         ajax({
             type:"post",
             url:"guestbook/index.php?m=index&a=login&username="+Login.value+"&password="+LoginPassword.value,
             success:function(data){
                  var data = JSON.parse(data);
                  window.alert(data.message);
                  UpdataStatus();
             }
         })
    }
    //更新状态
   function UpdataStatus()
   {
       var uid = getCookie("uid");
       var username = getCookie("username");
       //成功
      if(uid)
      {
          LoginName.innerHTML = getCookie("username");
          RegModel.style["display"] = "none";
          LoginModel.style["display"] = "none";
      }else//失败或者销毁
      {
          LoginName.innerHTML = "";
          RegModel.style["display"] = "block";
          LoginModel.style["display"] = "block";
          deleteCookie("username");  //删除cookie
      }
   }
   //点击退出
    var SignOut = document.getElementById("logout"); //退出按钮
    SignOut.onclick = function(){
        ajax({
            type:"post",
            url: "guestbook/index.php?m=index&a=logout",
            success:function(data){
                var data = JSON.parse(data);
                if(data.code==0)
                {
                    window.alert(data.message);
                    UpdataStatus();
                }
            }
        })
    }
    //留言开始
   var SendButon = document.getElementById("btnPost");
    var ContentMessage = document.getElementById("content");
    SendButon.onclick = function(){
        var value = ContentMessage.value;
        console.log(value);
        ajax({
            type:"post",
            url:"guestbook/index.php?m=index&a=send&content="+value,
            success:function(data){
                 var data = JSON.parse(data);
                console.log(data);
                createList(data.data,true);
            }
        })
    }
    //创建节点
    var oList = document.getElementById("list");
    function createList(data, insert) {
        var oDl = document.createElement('dl');
        var oDt = document.createElement('dt');
        var oStrong = document.createElement('strong');
        oStrong.innerHTML = data.username;
        oDt.appendChild(oStrong);
        var oDd1 = document.createElement('dd');
        oDd1.innerHTML = data.content;
        var oDd2 = document.createElement('dd');
        oDd2.className = 't';
        var oA1 = document.createElement('a');
        oA1.href = '';
        oA1.innerHTML = '顶(<span>'+data.support+'</span>)';
        var oA2 = document.createElement('a');
        oA2.href = '';
        oA2.innerHTML = '踩(<span>'+data.oppose+'</span>)';
        oDd2.appendChild(oA1);
        oDd2.appendChild(oA2);
        oDl.appendChild(oDt);
        oDl.appendChild(oDd1);
        oDl.appendChild(oDd2);
        if (insert && oList.children[0]) {
            oList.insertBefore(oDl, oList.children[0]);
        } else {
            oList.appendChild(oDl);
        }
    }






}




















