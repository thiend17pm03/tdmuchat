const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid');
const {transErrors,transSuccess,transMail} = require('./../../lang/vi');
const sendMail  = require ('./../config/mailer');

let saltRounds = 7;

const register =  (email,gender,password,protocol,host) =>{
  return new Promise(async (resolve,reject)=>{
        let userByEmail = await UserModel.findEmail(email);
        if(userByEmail){
            if(userByEmail.deletedAt != null){
              return reject(transErrors.account_remove);
            }
            if(!userByEmail.local.isActive){
              return reject(transErrors.accout_not_active);
            }
            return reject(transErrors.account_in_use);
        }


        let  salt = bcrypt.genSaltSync(saltRounds);
        let userItem ={
          username : email.split('@')[0],
          gender : gender,
          local : {
            email : email,
            password : bcrypt.hashSync(password,salt),
            verifyToken : uuidv4.v4(),
          }
        }

        let user = await UserModel.createNew(userItem);
        //send email
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
      //  console.log(linkVerify);
        //console.log("\n"+ transMail.template(linkVerify) );
        sendMail(email,transMail.subject,transMail.template(linkVerify))
        .then ( success =>{
          resolve(transSuccess.userCreated(email));
        })
        .catch ( async error =>{
          console.log(error);
          await UserModel.removeById(user._id); 
          reject(transMail.send_failed);
        });
      
  })

}

const verifyAccount = (token)=>{
  return new Promise(async(resolve,reject)=>{
    let checkToken = await UserModel.findByToken(token);
    if(!checkToken){
      //console.log(token);
      reject(transErrors.token_undefined);
    }
      await UserModel.verify(token);
      resolve(transSuccess.account_actived);
  });
}

module.exports = {
  register : register,
  verifyAccount : verifyAccount,
}

