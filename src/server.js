// import express from 'epress'
const express = require('express');
const connectDB = require('./config/connectDB');
const viewEngine = require('./config/viewEngine');
const initRoutes = require('./routes/web');
const connectFlash = require('connect-flash');
const configSession = require('./config/session');
const env = require('./../env/env');
const passport = require('passport');


let app = express();

// config DB
connectDB();

// config Sesion
configSession(app);

// config View Engine
viewEngine(app);

// Enable post data for request
app.use(express.urlencoded({ extended: true }));

// Enable connect Flash
app.use(connectFlash());

//config passport
app.use(passport.initialize());
app.use(passport.session()); 

// init routes 
initRoutes(app);


app.get("/",((req,res)=>{
 res.send("<h1>Hello</h1>")
})) 


app.listen(env.APP_PORT,env.APP_HOST,()=>{
    console.log(`listen at: ${env.APP_HOST}:${env.APP_PORT}`)
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

