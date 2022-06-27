const express=require("express")
const app=express();
const hbs=require("hbs")
const path=require("path");
const favicon=require("serve-favicon")
const port=process.env.PORT || 8000
const staticpath=__dirname+"/public";
const view=path.join(__dirname,"/templates/views")
const partials=path.join(__dirname,"/templates/partials")
const icon=path.join(__dirname,"/public/images/icon.ico")
console.log(icon);
app.set("view engine","hbs");
app.set("views",view)
app.use(favicon(icon))
hbs.registerPartials(partials)
app.use(express.static(staticpath));
// app.set("views",viewAdd);
app.get("",(req,res)=>{
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/weather",(req,res)=>{
    res.render("weather")
})
app.get("/*",(req,res)=>{
    res.render("404err")
})
app.listen(port,()=>{
    console.log("I am active");
})