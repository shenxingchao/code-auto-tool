{$name}:{$value} {循环连接符关联循环控件} //{$type} {$comment} 


title:'你好', //string 标题
age:3,//number 年龄

变量名 类型 默认值 注释

title text 你好  标题  
age number 3     年龄  


let for_tpl = {$name}:{$value} {循环连接符关联循环控件} //{$type} {$comment} 

for(){
    str.replace({$name},item.name).replace({$value},$type=='text'?"$value":$value)
}