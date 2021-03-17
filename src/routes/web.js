// const authController = require('./../controllers/authController');
// const homeContrller =  require('./../controllers/homeController');
const express = require('express')
const controllers = require('./../controllers')
const {authValid} = require('./../validation/index')


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

    app.post("/register",authValid.register,controllers.auth.postRegister); 

  return app.use('/',router)
}

module.exports = initRoutes;
