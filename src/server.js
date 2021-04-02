// import express from 'epress'
const express = require('express');
const connectDB = require('./config/connectDB');
const viewEngine = require('./config/viewEngine');
const initRoutes = require('./routes/web');
const connectFlash = require('connect-flash');
const session  = require('./config/session');
const env = require('./../env/env');
const passport = require('passport');
const pem = require('pem');
const https = require('https')
const http = require("http");
const socketio = require("socket.io");
const initSockets = require("./sockets/index");
const cookieParser = require("cookie-parser");
const configSocketIo = require("./config/socketio");




let app = express();

// Init server with socket.io & express app
let server = http.createServer(app);
let io = socketio(server);


// config DB
connectDB();

// config Sesion
session.config(app);

// config View Engine
viewEngine(app);

// Enable post data for request
app.use(express.urlencoded({ extended: true }));

// Enable connect Flash
app.use(connectFlash());

// User Cookie Parser
app.use(cookieParser());

//config passport
app.use(passport.initialize());
app.use(passport.session()); 

// init routes 
initRoutes(app);

// Config for socket.io
configSocketIo(io, cookieParser, session.sessionStore);

// Init all sockets
initSockets(io);

 


server.listen(env.APP_PORT,env.APP_HOST,()=>{
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


// pem.config({
//     pathOpenSSL: 'C:\\Program Files\\OpenSSL-Win64\\bin\\openssl'
//   });

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err
//     }
//     let app = express();

//     // config DB
//     connectDB();
    
//     // config Sesion
//     configSession(app);
    
//     // config View Engine
//     viewEngine(app);
    
//     // Enable post data for request
//     app.use(express.urlencoded({ extended: true }));
    
//     // Enable connect Flash
//     app.use(connectFlash());
    
//     //config passport
//     app.use(passport.initialize());
//     app.use(passport.session()); 
    
//     // init routes 
//     initRoutes(app); 
    
    
//     app.get("/",((req,res)=>{
//      res.send("<h1>Hello</h1>")
//     })) 
   
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(env.APP_PORT,env.APP_HOST,()=>{
//         console.log(`listen at: ${env.APP_HOST}:${env.APP_PORT}`)
//     })
//   })
