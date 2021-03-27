const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username : String,
  gender : {type : String, default : "male"},
  phone : {type : Number, default : null},
  address : {type : String, default : null},
  avatar : {type  : String, default : "avatar-default.jpg"},
  role : {type : String, default : "user"},
  local : {
    email : {type : String, strim : true},
    password : String,
    isActive : {type : Boolean, default : false},
    verifyToken : String,
  },
  facebook : {
    uid : String,
    token : String,
    email : {type : String, strim : true},
  },
  google : {
    uid : String,
    token : String,
    email : {type : String, strim : true},
  },
  createdAt : {type: Number, default: Date.now},
  updatedAt : {type: Number, default: null},
  deletedAt : {type: Number, default: null},
});

UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findEmail(email) {
    return this.findOne({'local.email':email}).exec();
  },
  removeById(id){
    return this.findByIdAndRemove(id).exec(); 
  },
  findByToken(token) {
    return this.findOne({'local.verifyToken':token}).exec();
  },
  findUserById(id) {
    return this.findById(id).exec();
  },
  findByFacebookUid(id) {
    return this.findOne({'facebook.uid' : id}).exec();
  },
  findByGoogleUid(id) {
    return this.findOne({'google.uid' : id}).exec();
  },
  updateUser(id, item) {
    return this.findByIdAndUpdate(id, item).exec(); // return old item after updated
  },

  verify(token){
    return this.findOneAndUpdate(
      {'local.verifyToken' : token},
      {"local.isActive" : true,
      "local.verifyToken" : null}
    ).exec();
  }
}

UserSchema.methods= {
  /**
   * return promise has result true or false
   * @param {*} password 
   */
  comparePassword(password) {
    return bcrypt.compare(password,this.local.password);
  },
}

module.exports = mongoose.model("user",UserSchema);
