import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username : String,
  gender : {type : String, default : "male"},
  phone : {type : Number, default : null},
  address : {type : String, default : null},
  avatar : {type  : String, default : "avatar-default.jpg"},
  role : {type : String, dafault : "user"},
  local : {
    email : {type : Number, strim : true},
    password : String,
    isActive : {type : Boolean, default : false},
    verifyToken : String,
  },
  facebook : {
    uid : String,
    token : String,
    email : {type : Number, strim : true},
  },
  google : {
    uid : String,
    token : String,
    email : {type : Number, strim : true},
  },
  createdAt : {type: Number, default: Date.now},
  updatedAt : {type: Number, default: null},
  deletedAt : {type: Number, default: null},
});

module.exports = mongoose.model("user",UserSchema);
