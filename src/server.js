// import express from 'epress'
const express = require('express');
const connectDB = require('./config/connectDB');
const viewEngine = require('./config/viewEngine');
const initRoutes = require('./routes/web');


let app = express();

// config DB
connectDB();

// config View Engine
viewEngine(app);

// Enable post data for request
app.use(express.urlencoded({ extended: true }));

// init routes
initRoutes(app);

// config app info
let hostname = "localhost";
let port = "8017";

app.get("/",((req,res)=>{
 res.send("<h1>Hello</h1>")
})) 


app.listen(port,hostname,()=>{
    console.log(`listen at: ${hostname}:${port}`)
})





/**
 * 
 * 
 * 
 * 
 * app.get('/test-database', async (req,res)=>{
    try{
        let item = {
            userId : 'thiend17pm03',
            contactId : 'thiencafe2018',
        }
        let contact = await ContactModel.createNew(item);
        res.send(contact);
    }
    catch(e)
    {
        console.log(e);
    }
})

 */

