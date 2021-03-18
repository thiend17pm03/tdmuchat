const session = require('express-session')
const MongoStore = require('connect-mongo');

let DB_CONNECTION = 'mongodb';
  let DB_HOST = 'localhost';
  let DB_PORT = '27017';
  let DB_NAME = 'tmdu_chat';
  let DB_USERNAME = '';
  let DB_PASSWORD = '';
  // mongodb://localhost:27017/tdmu_chat
  //let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}/${DB_NAME}`;
  let URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

/**
 * This variable is where save sesion, in this case mongodb
 */
let sesionStore  = MongoStore.create({
  mongoUrl: `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  autoRemove: 'native' // Default
})

/**
 * Config sesion for app
 * @param app from exactly express module
 */
const configSesion = (app) =>{
  app.use(session({
    key: "express.sid",
    secret : "mySecret",
    store : sesionStore,
    resave : true,
    saveUninitialized : false,
    cookie : {
      maxAge : 1000*60*60*24 // 86400000 seconds =  1 day
    }
  }))
}

module.exports = configSesion;