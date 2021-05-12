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
    router.put("/user/update-info2",controllers.auth.checkLoginIn,userValid.updateInfo,controllers.user.updateInfo2);
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
    router.get("/post/tag/:id",controllers.auth.checkLoginIn, controllers.post.getPostByTag);
    router.post("/post/new",controllers.auth.checkLoginIn, controllers.post.createPost);
    router.post("/post/search",controllers.auth.checkLoginIn, controllers.post.searchPost);
    router.post("/post",controllers.auth.checkLoginIn, controllers.post.getAllPostSortByLike);
    router.get("/post/view/:postId",controllers.auth.checkLoginIn, controllers.post.viewPost);
    router.post("/post/view/comment",controllers.auth.checkLoginIn, controllers.post.getCommentByType);
    
    router.put("/post/like/:postId",controllers.auth.checkLoginIn, controllers.post.likePost);
    router.delete("/post/:postId",controllers.auth.checkLoginIn, controllers.post.deletePost);

    router.post("/post/comment/vote/:commentId",controllers.auth.checkLoginIn, controllers.post.voteComment);
    router.post("/post/comment/child/:commentId",controllers.auth.checkLoginIn, controllers.post.addNewCommentChild);
    router.post("/post/comment/:postId",controllers.auth.checkLoginIn, controllers.post.addNewComment);

    router.post("/tag/new",controllers.auth.checkLoginIn, controllers.tag.createNewTag);

    router.get("/profile/:profileId",controllers.auth.checkLoginIn, controllers.profile.viewProfile);

    
    router.post("/admin/post/search",controllers.auth.checkLoginIn, controllers.admin.searchPost);
    router.get("/admin/post",controllers.auth.checkLoginIn, controllers.admin.getPost);
    router.get("/admin/user",controllers.auth.checkLoginIn, controllers.admin.getUser);
    router.post("/admin/user/search",controllers.auth.checkLoginIn, controllers.admin.searchUser);
    
    router.put("/admin/user/addad/:id",controllers.auth.checkLoginIn, controllers.admin.addAd);
    router.delete("/admin/user/delete/:id",controllers.auth.checkLoginIn, controllers.admin.deleteUser);
    router.get("/admin/ad",controllers.auth.checkLoginIn, controllers.admin.getAd);
    router.put("/admin/ad/delete/:id",controllers.auth.checkLoginIn, controllers.admin.deleteAd);


  return app.use('/',router)
}

module.exports = initRoutes;
