const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username : String,
  gender : {type : String, default : "male"},
  phone : {type : String, default : null},
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
UserSchema.index({'$**': 'text'});
UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findEmail(email) {
    return this.findOne({'local.email':email}).exec();
  },
  findUserByIdToUpdatePassword(id) {
    return this.findById(id).exec();
  },
  findUserById(id) {
    return this.findOne({_id : id},{_id: 1, email : 1, username: 1, address: 1, avatar: 1,gender : 1,phone:1,email :1}).exec();
  },
  removeById(id){
    return this.findByIdAndRemove(id).exec(); 
  },
  findByToken(token) {
    return this.findOne({'local.verifyToken':token}).exec();
  },
  findUserByIdForSessionToUse(id) {
    return this.findById(id, {"local.password": 0}).exec();
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
  updatePassword(id, hashedPassword) {
    return this.findByIdAndUpdate(id, {"local.password": hashedPassword}).exec();
  },
  /**
   * Find all users for add contact.
   * @param {array: deprecated userIds} deprecatedUserIds 
   * @param {string: keyword search} keyword 
   */
   findAllForAddContact(deprecatedUserIds, keyword) {
    return this.find({
      $and: [
        {"_id": {$nin: deprecatedUserIds}},
        {"local.isActive": true},
        {$or: [
          {"username": {"$regex": new RegExp(keyword, "i") }},
          {"local.email": {"$regex": new RegExp(keyword, "i") }},
          {"facebook.email": {"$regex": new RegExp(keyword, "i") }},
          {"google.email": {"$regex": new RegExp(keyword, "i") }}
        ]}
      ]
    }, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
  },

  verify(token){
    return this.findOneAndUpdate(
      {'local.verifyToken' : token},
      {"local.isActive" : true,
      "local.verifyToken" : null}
    ).exec();
  },
  getNormalUserDataById(id) {
    return this.findById(id, {_id: 1,email:1, username: 1, address: 1, avatar: 1}).exec();
  },

  /**
   * Find all users for add to group chat.
   * @param {array: friend userIds} friendIds 
   * @param {string: keyword search} keyword 
   */
   findAllToAddGroupChat(friendIds, keyword) {
    return this.find({
      $and: [
        {"_id": {$in: friendIds}},
        {"local.isActive": true},
        {$or: [
          {"username": {"$regex": new RegExp(keyword, "i") }},
          {"local.email": {"$regex": new RegExp(keyword, "i") }},
          {"facebook.email": {"$regex": new RegExp(keyword, "i") }},
          {"google.email": {"$regex": new RegExp(keyword, "i") }}
        ]}
      ]
    }, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
  },

  // extras
  getNormalUserDataByIdAndKeyword (id, keyword) {
    return this.find({
      $and: [
        {"_id": id},
        {"local.isActive": true},
        { $or: [
          {"username": {"$regex": new RegExp(keyword, "i") }},
          {"local.email": {"$regex": new RegExp(keyword, "i") }},
          {"facebook.email": {"$regex": new RegExp(keyword, "i") }},
          {"google.email": {"$regex": new RegExp(keyword, "i") }}
        ]}
      ]
    }, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
  },
  getAllUser(){
    return this.aggregate([
      { "$match": { "createdAt": {$gte: 1000}} },//l???n h??n b???ng 1000
      { "$sort": { "createdAt": -1 } },
    ]).exec();
  },
  deleteUser(id){
    return this.findByIdAndDelete(id).exec();
  },
  searchUser(keyword,limit) {
    return this.aggregate([
      { "$match": { $text: { $search: keyword } } },
      { "$sort": { "createdAt": -1 } },
      { "$limit": limit },
    ]).exec();
  },

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
