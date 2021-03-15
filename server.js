var express = require('express')
var app = express();

var hostname = "localhost";
var port = "8017";

app.get("/",((req,res)=>{
 res.send("<h1>Hello</h1>")
})) 

app.listen(port,hostname,()=>{
    console.log(`listen at: ${hostname}:${port}`)
})
