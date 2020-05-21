var express=require("express");
var app=express();
var methodoverride=require("method-override");

app.set("view engine","ejs");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/dogs",{
    useNewUrlParser:true,useUnifiedTopology:true,
    useFindAndModify:false,
});
var dog=require("./models/dog");
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodoverride("_method"));

//Restful Routes
//(1)Index Routes
app.get("/",function(req,res){
    res.redirect("/dog");
});
app.get("/dog",function(req,res){
    dog.find({},function(error,dogdata){
        if(error){
            console.log(error);
        }
        else{
            res.render("index",{dogdata:dogdata});
        }
    });
});

//(2)New Route
app.get("/dog/new",function(req,res){   
    res.render("new");
});

//(3)Create Route
app.post("/dog",function(req,res){
    dog.create({
        name:req.body.name,
    },function(error,data){
        if(error){
            console.log(error);
        }
        else{
            res.redirect("dog");
        }
    });
});

//(4)Show Route
app.get("/dog/:id",function(req,res){
    dog.findById(req.params.id,function(error,data){
        if(error){
            console.log(error);
        }
        else{
            res.render("show",{dogdata:data});
        }
    });
});

//(5)Edit Route
app.get("/dog/:id/edit",function(req,res){
    dog.findById(req.params.id,function(error,dogdata){
        if(error){
            console.log(error);
        }
        else{
            res.render("edit",{dogdata:dogdata});
        }
    });
});

//(6)Update Route
app.put("/dog/:id",function(req,res){
    dog.findByIdAndUpdate(req.params.id,{
        name:req.body.name
    },function(error,dogdata){
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/dog/"+req.params.id);
        }
    });
});

//(7)Destroy Route
app.delete("/dog/:id",function(req,res){
    dog.findByIdAndRemove(req.params.id,function(error){
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/dog");
        }
    });
});

app.listen(3000,function(){
    console.log("Server started");
});