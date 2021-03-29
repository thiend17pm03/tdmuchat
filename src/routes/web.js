// const authController = require('./../controllers/authController');
// const homeContrller =  require('./../controllers/homeController');
const express = require('express');
const controllers = require('./../controllers');
const {authValid,userValid,contactValid} = require('./../validation/index');
const initPassportLocal = require('../controllers/passportController/local');
const initPassportFacebook = require('../controllers/passportController/facebook');
const initPassportGoogle = require('../controllers/passportController/google');
const passport = require('passport');

//init all passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let router = express.Router();

/**
 * @param app from exactly express module
 */

let initRoutes = (app) =>{
    // app.get("/",homeContrller.getHome)
    // app.get("/auth", authController.getLoginRegister) 
    // app.get("/logout", authController.getLogout) 
    
    router.get("/",controllers.auth.checkLoginIn,controllers.home.getHome),
    
    router.get("/logout",controllers.auth.checkLoginIn, controllers.auth.getLogout) 

    router.post("/register",controllers.auth.checkLoginOut,authValid.register,controllers.auth.postRegister); 

    router.get('/verify/:token',controllers.auth.checkLoginOut,controllers.auth.verifyAccount);

    router.post('/login',controllers.auth.checkLoginOut,passport.authenticate('local',{
      successRedirect : '/',
      failureRedirect : '/auth',
      successFlash : true,
      failureFlash : true,
    }))

    router.get("/auth",controllers.auth.checkLoginOut, controllers.auth.getLoginRegister) ;
    router.get("/auth/facebook",controllers.auth.checkLoginOut,passport.authenticate('facebook',{scope:["email"]}));
    router.get("/auth/facebook/callback",controllers.auth.checkLoginOut,passport.authenticate('facebook',{
      successRedirect : '/',
      failureRedirect : '/auth',
     }));
    router.get("/auth/google",controllers.auth.checkLoginOut,passport.authenticate('google',{scope:["email"]}));
    router.get("/auth/google/callback",controllers.auth.checkLoginOut,passport.authenticate('google',{
      successRedirect : '/',
      failureRedirect : '/auth',
     }));

    router.put("/user/update-avatar",controllers.auth.checkLoginIn,controllers.user.updateAvatar);
    router.put("/user/update-info",controllers.auth.checkLoginIn,userValid.updateInfo,controllers.user.updateInfo);
    router.put("/user/update-password",controllers.auth.checkLoginIn,userValid.updatePassword,controllers.user.updatePassword);

    router.get("/contact/find-users/:keyword",
     controllers.auth.checkLoginIn,
     contactValid.findUsersContact,
     controllers.contact.findUsersContact);
    router.post("/contact/add-new", controllers.auth.checkLoginIn, controllers.contact.addNew);
    router.delete("/contact/remove-request-contact-sent", controllers.auth.checkLoginIn, controllers.contact.removeRequestContactSent);


  return app.use('/',router)
}

module.exports = initRoutes;
