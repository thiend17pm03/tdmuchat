// var express = require('express')
import express from 'express'
let app = express();

let hostname = "localhost";
let port = "8017";

app.get("/",((req,res)=>{
 res.send("<h1>Hello</h1>")
})) 

app.listen(port,hostname,()=>{
    console.log(`listen at: ${hostname}:${port}`)
})
