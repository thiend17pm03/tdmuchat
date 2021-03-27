const UserModel = require('./../../models/userModel');
const passport = require('passport');
const passportFacebook = require('passport-facebook') ;
const {transErrors,transSuccess} = require('../../../lang/vi');
const env = require('../../../env/env');


let facebookStrategy = passportFacebook.Strategy;

/**
 * Vaild user account type : facebook
 */
const initPassportFacebook = ()=>{
  passport.use(new facebookStrategy({
    clientID : env.FB_APP_ID,
    clientSecret : env.FB_APP_SECRET,
    callbackURL : env.FB_CALLBACK_URL,
    passReqToCallback : true,
    profileFields : ["email","gender","displayName"],

  },async (req,accessToken,refreshToken,profile,done)=>{
    try {
        let user = await UserModel.findByFacebookUid(profile.id);
        
        //console.log(user);
        if (user){
          return done(null,user,req.flash("success",transSuccess.loginSuccess(user.username)))
        }
        //console.log(profile);
        let emailUser = profile.emails[0].value ? profile.emails[0].value : null;
        let newUserItem = {
          username : profile.displayName,
          gender : profile.gender,
          local : {isActive : true},
          facebook : {
            uid : profile.id,
            token : accessToken,
            email : emailUser,
          },
        };
        //console.log(newUserItem);
      let newUser = await UserModel.createNew(newUserItem);
      return done(null,newUser,req.flash("success",transSuccess.loginSuccess(newUser.username)))
     
        
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

  passport.deserializeUser((id,done)=>{
    UserModel.findUserById(id)
      .then(user=>{
          return done(null,user);
      })
      .catch(err=>{
        return done(err, null);
      });
  })


};

module.exports = initPassportFacebook;
