// const authController = require('./../controllers/authController');
// const homeContrller =  require('./../controllers/homeController');
const express = require('express')
const controllers = require('./../controllers')


let router = express.Router();

/**
 * @param app from exactly express module
 */

let initRoutes = (app) =>{
    // app.get("/",homeContrller.getHome)
    // app.get("/auth", authController.getLoginRegister) 
    // app.get("/logout", authController.getLogout) 
    
    app.get("/",controllers.home.getHome)
    app.get("/auth", controllers.auth.getLoginRegister) 
    app.get("/logout", controllers.auth.getLogout) 

  return app.use('/',router)
}

module.exports = initRoutes;
