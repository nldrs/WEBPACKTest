 // var $=require("jquery");
   require("../css/index.css");
 define(["./data.json"],function(str){
     console.log(str);
     return $("#container").html(str.name);
 })