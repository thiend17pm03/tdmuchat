// const authController = require('./../controllers/authController');
// const homeContrller =  require('./../controllers/homeController');
const express = require('express');
const controllers = require('./../controllers');
const {authValid,userValid,contactValid,messageValid,groupChatValid,extrasValid} = require('./../validation/index');
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
    router.get("/contact/read-more-contacts", controllers.auth.checkLoginIn, controllers.contact.readMoreContacts);
    router.get("/contact/read-more-contacts-sent", controllers.auth.checkLoginIn, controllers.contact.readMoreContactsSent);
    router.get("/contact/read-more-contacts-received", controllers.auth.checkLoginIn, controllers.contact.readMoreContactsReceived);
    router.get("/contact/search-friends/:keyword",
      controllers.auth.checkLoginIn,
      contactValid.searchFriends,
      controllers.contact.searchFriends);
    router.delete("/contact/remove-request-contact-received",
      controllers.auth.checkLoginIn,
      controllers.contact.removeRequestContactReceived);
    
    router.put("/contact/approve-request-contact-received",
      controllers.auth.checkLoginIn,
      controllers.contact.approveRequestContactReceived);      
    
    router.delete("/contact/remove-contact", controllers.auth.checkLoginIn, controllers.contact.removeContact);

    
  
    router.post("/message/add-new-text-emoji", controllers.auth.checkLoginIn, messageValid.checkMessageLength,  controllers.message.addNewTextEmoji);
    router.post("/message/add-new-image", controllers.auth.checkLoginIn,  controllers.message.addNewImage);
    router.post("/message/add-new-attachment", controllers.auth.checkLoginIn,  controllers.message.addNewAttachment);
    router.get("/message/read-more-all-chat", controllers.auth.checkLoginIn,  controllers.message.readMoreAllChat);
    router.get("/message/read-more", controllers.auth.checkLoginIn,  controllers.message.readMore);
  
    router.post("/group-chat/add-new", controllers.auth.checkLoginIn, groupChatValid.addNewGroup, controllers.groupChat.addNewGroup);
   

    router.get("/notification/read-more", controllers.auth.checkLoginIn, controllers.notification.readMore);
    router.put("/notification/mark-all-as-read", controllers.auth.checkLoginIn, controllers.notification.markAllAsRead);

    router.get("/post",controllers.auth.checkLoginIn, controllers.post.getPost);


  return app.use('/',router)
}

module.exports = initRoutes;
