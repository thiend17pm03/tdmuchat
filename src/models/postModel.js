const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let postSchema = new Schema({
  userId : mongoose.Types.ObjectId,
  title : String,
  description : String,
  likeAmount : {type:Number, default : 0},
  commentAmount : {type:Number, default : 0},
  report : {type : Boolean, default : false},
  tagId :  mongoose.Types.ObjectId,
  likes : [
    {userId : mongoose.Types.ObjectId,}
  ],
  createdAt : {type: Number, default: Date.now},
  updatedAt : {type: Number, default: null},
  deletedAt : {type: Number, default: null}, 
});


postSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findPostByUserId(userId){
    return this.find({userId}).sort({"createdAt": -1}).exec();
  },
  getAllPost(limit){
    return this.aggregate([
      { "$match": { "createdAt": {$gte: 1000}} },//lớn hơn bằng 1000
      { "$sort": { "createdAt": -1 } },
      { "$limit": limit },
      { "$lookup": {
        "localField": "userId" ,
        "from": "users",
        "foreignField": "_id",
        "as": "userinfo"
      } },
      { "$unwind": "$userinfo" },
      { "$lookup": {
        "localField": "tagId" ,
        "from": "tags",
        "foreignField": "_id",
        "as": "taginfo"
      } },
      { "$unwind": "$taginfo" },
      
    ]).exec();
  },
  getPostById(id){
    return this.aggregate([
      { "$match": { _id: mongoose.Types.ObjectId(id)} },//lớn hơn bằng 1000
      { "$lookup": {
        "localField": "userId" ,
        "from": "users",
        "foreignField": "_id",
        "as": "userinfo"
      } },
      { "$unwind": "$userinfo" },
      { "$lookup": {
        "localField": "tagId" ,
        "from": "tags",
        "foreignField": "_id",
        "as": "taginfo"
      } },
      { "$unwind": "$taginfo" },
      
    ]).exec();
  },
  updatePost(id, item) {
    return this.findByIdAndUpdate(id, item).exec(); // return old item after updated
  },
  getPostByIdToLike(id){
    return this.findById(id).exec();
  },
  updatePostLike(id,number,userId){
    return this.findByIdAndUpdate(id,{
      likeAmount : number,
      $push: { likes: [{"userId" : userId}] } ,
    }).exec();
  },
  updatePostComment(id,number){
    return this.findByIdAndUpdate(id,{
      commentAmount : number,
    }).exec();
  },
  deletePost(id){
    return this.findByIdAndDelete(id).exec();
  }

}



module.exports = mongoose.model("post",postSchema);
