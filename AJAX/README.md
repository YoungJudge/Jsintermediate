## �������

���ȱ���Ҫ�����AJAX������������һЩ�������
```
function ajax(options){
 var url = options.url || "", //���������
        type = (options.type || "get").toLowerCase(), //����ķ���,Ĭ��Ϊget
        data = options.data || null, //���������
        contentType = options.contentType || "", //����ͷ
        dataType = options.dataType || "", //���������
        async = options.async === undefined && true, //�Ƿ��첽��Ĭ��Ϊtrue.
        timeOut = options.timeOut, //��ʱʱ�䡣 
        before = options.before || function(){}, //����֮ǰִ�еĺ���
        error = options.error || function(){}, //����ִ�еĺ���
        success = options.success || function() {}; //����ɹ��Ļص�����
}
```
## ����

```
	 //var json = "name=garfield&age=18";  //�ַ���
	 var json ={"haha":[{"name":"����"},{"age":"23"}]};  //��JSON��
  ajax({
    type:"post",  //�������ݵ�����
    url:"index.php", //����Լ��Ľӿ�����
    timeOut:5000,  //����ʱ��
	data:json,     //���͵�����
    before:function(){
        console.log("���ͳɹ�")     //����֮ǰҪ�������� 
    },
    success:function(str){        //���յ����ݳɹ���
       console.log(str);
    },
	error:function(status,statusText){   //������ִ���󣬵�һ����ʾ�����״̬ �ڶ�����ʾ�����ԭ��
	  console.log(status+"||"+statusText);
	}
  }) 
```
## PHP����

```
<?php
  header("content-type:text/html; charset=utf-8");
  $name = $_POST["haha"];  //��Ӧ�ľ���JSON��name
  echo($name[0]["name"]);
?>
```