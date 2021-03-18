// const authController = require('./../controllers/authController');
// const homeContrller =  require('./../controllers/homeController');
const express = require('express');
const controllers = require('./../controllers');
const {authValid} = require('./../validation/index');
const initPassportLocal = require('../controllers/passportController/local');
const passport = require('passport');

//init all passport
initPassportLocal();

let router = express.Router();

/**
 * @param app from exactly express module
 */

let initRoutes = (app) =>{
    // app.get("/",homeContrller.getHome)
    // app.get("/auth", authController.getLoginRegister) 
    // app.get("/logout", authController.getLogout) 
    
    app.get("/",controllers.auth.checkLoginIn,controllers.home.getHome)

    app.get("/auth",controllers.auth.checkLoginOut, controllers.auth.getLoginRegister) 

    app.get("/logout",controllers.auth.checkLoginIn, controllers.auth.getLogout) 

    app.post("/register",controllers.auth.checkLoginOut,authValid.register,controllers.auth.postRegister); 

    app.get('/verify/:token',controllers.auth.checkLoginOut,controllers.auth.verifyAccount);

    app.post('/login',controllers.auth.checkLoginOut,passport.authenticate('local',{
      successRedirect : '/',
      failureRedirect : '/auth',
      successFlash : true,
      failureFlash : true,
    }))

  return app.use('/',router)
}

module.exports = initRoutes;
