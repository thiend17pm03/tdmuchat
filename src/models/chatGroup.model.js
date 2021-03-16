import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
  name : String,
  userAmount : {type : Number, min : 3 , max : 200 },
  messageAmount : {type : Number, defalut : 0},
  userId : String,
  memberId : [
    {userId : String,}
  ],
  createdAt : {type: Number, default: Date.now},
  updatedAt : {type: Number, default: null},
  deletedAt : {type: Number, default: null}, 
});

module.exports = mongoose.model("chat-group",ChatGroupSchema);
