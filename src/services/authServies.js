const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid');
const {transErrors,transSuccess} = require('./../../lang/vi');

let saltRounds = 7;

const register =  (email,gender,password) =>{
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
        resolve(transSuccess.userCreated(email));
  })

}

module.exports = {
  register : register,
}

