## 输入参数

首先必须要定义个AJAX函数，并设置一些输入参数
```
function ajax(options){
 var url = options.url || "", //请求的链接
        type = (options.type || "get").toLowerCase(), //请求的方法,默认为get
        data = options.data || null, //请求的数据
        contentType = options.contentType || "", //请求头
        dataType = options.dataType || "", //请求的类型
        async = options.async === undefined && true, //是否异步，默认为true.
        timeOut = options.timeOut, //超时时间。 
        before = options.before || function(){}, //发送之前执行的函数
        error = options.error || function(){}, //错误执行的函数
        success = options.success || function() {}; //请求成功的回调函数
}
```
## 调用

```
	 //var json = "name=garfield&age=18";  //字符串
	 var json ={"haha":[{"name":"张三"},{"age":"23"}]};  //大JSON包
  ajax({
    type:"post",  //发送数据的类型
    url:"index.php", //添加自己的接口链接
    timeOut:5000,  //过期时间
	data:json,     //发送的数据
    before:function(){
        console.log("发送成功")     //发送之前要做的事情 
    },
    success:function(str){        //接收到数据成功后
       console.log(str);
    },
	error:function(status,statusText){   //如果出现错误后，第一个表示错误的状态 第二个表示错误的原因
	  console.log(status+"||"+statusText);
	}
  }) 
```
## PHP接收

```
<?php
  header("content-type:text/html; charset=utf-8");
  $name = $_POST["haha"];  //对应的就是JSON的name
  echo($name[0]["name"]);
?>
```