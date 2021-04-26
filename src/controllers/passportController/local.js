const UserModel = require('./../../models/userModel')
const ChatGroupModel = require('./../../models/chatGroupModel')
const passport = require('passport');
const passportLocal = require('passport-local') ;
const {transErrors,transSuccess} = require('../../../lang/vi');


let localStrategy =  passportLocal.Strategy;

/**
 * Vaild user account type : local
 */
const initPassportLocal = ()=>{
  passport.use(new localStrategy({
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true

  },async (req,email,password,done)=>{
    try {
      let user = await UserModel.findEmail(email);
    if(!user){
      return done(null,false,req.flash("errors",transErrors.login_failed))
    };

    //console.log(user);
    if(!user.local.isActive){
      return done(null,false,req.flash("errors",transErrors.accout_not_active));
    }

    let checkPassword = await user.comparePassword(password);
    if(!checkPassword){
      return done(null,false,req.flash("errors",transErrors.login_failed))
    }
    return done(null,user,req.flash("success",transSuccess.loginSuccess(user.username)))
    } catch (error) {
      console.log(error);
      return done(null,false,req.flash("errors",transErrors.server_error));
    }
  }));

  /**
   * save user id to session
   */
  passport.serializeUser((user,done)=>{
    done(null,user._id);
  });

  /**
   * Khi sever.js -> app.use(passport.sesion) thì nó sẽ gọi đến thằng này
   */

  passport.deserializeUser(async(id,done)=>{
    try {
      let user = await UserModel.findUserByIdForSessionToUse(id);
      let getChatGroupIds = await ChatGroupModel.getChatGroupIdsByUser(user._id);

      user = user.toObject();
      user.chatGroupIds = getChatGroupIds;

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })


};

module.exports = initPassportLocal;
