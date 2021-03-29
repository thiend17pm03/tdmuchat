const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId : String,
  contactId : String, 
  status : {type : Boolean, default : false},
  createdAt : {type: Number, default: Date.now},
  updatedAt : {type: Number, default: null},
  deletedAt : {type: Number, default: null},
});

ContactSchema.statics = {
  createNew (item) {
    return this.create(item);
  },

    /**
   * Find all items that related with user.
   * @param {string} userId 
   */
     findAllByUser(userId) {
      return this.find({
        $or: [
          {"userId": userId},
          {"contactId": userId}
        ]
      }).exec();
    },

      /**
   * Check exists of 2 user
   * @param {string} userId 
   * @param {string} contactId 
   */
  checkExists(userId, contactId) {
    return this.findOne({
      $or: [
        {$and: [
          {"userId": userId},
          {"contactId": contactId}
        ]},
        {$and: [
          {"userId": contactId},
          {"contactId": userId}
        ]}
      ]
    }).exec();
  },

  /**
   * Remove contact
   * @param {string} userId 
   * @param {string} contactId 
   */
  removeContact(userId, contactId) {
    return this.deleteMany({
      $or: [
        {$and: [
          {"userId": userId},
          {"contactId": contactId},
          {"status": true}
        ]},
        {$and: [
          {"userId": contactId},
          {"contactId": userId},
          {"status": true}
        ]}
      ]
    }).exec();
  },

  /**
   * Remove request contact sent
   * @param {string} userId 
   * @param {string} contactId 
   */
  removeRequestContactSent(userId, contactId) {
    return this.deleteMany({
      $and: [
        {"userId": userId},
        {"contactId": contactId},
        {"status": false}
      ]
    }).exec();
  },

}


module.exports = mongoose.model("contact",ContactSchema);
