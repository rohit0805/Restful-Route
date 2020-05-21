var mongoose=require("mongoose");

var dogschema=new mongoose.Schema({
    name:String,
    created:{type:Date,default:Date.now},
});

module.exports=mongoose.model("dog",dogschema);
 