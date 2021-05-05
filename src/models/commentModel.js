const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
  postId : mongoose.Types.ObjectId,
  userId : mongoose.Types.ObjectId,
  content : String,
  voteAmout : {type:Number, default : 0},
  childComent : [
    {
      userId : mongoose.Types.ObjectId,
      userName : String,
      content : String,
    },
  ],
  createdAt : {type: Number, default: Date.now},
  updatedAt : {type: Number, default: null},
  deletedAt : {type: Number, default: null}, 
});


commentSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  getCommentByPostId(id){
    return this.aggregate([
      { "$match": { postId: mongoose.Types.ObjectId(id)} },
      { "$sort": { "createdAt": -1 } },
      { "$lookup": {
        "localField": "userId" ,
        "from": "users",
        "foreignField": "_id",
        "as": "userinfo"
      } },
      { "$unwind": "$userinfo" },
      
      
    ]).exec();
  },
  addNewCommentChild(id, item) {
    return this.findByIdAndUpdate(id,{
      $push: { childComent: [item] } ,
    }).exec();
  },
  getCommenttByIdToVote(id){
    return this.findById(id).exec();
  },
  updateVoteComment(id,number){
    return this.findByIdAndUpdate(id,{
      voteAmout : number,
    }).exec();
  },
}





module.exports = mongoose.model("comment",commentSchema);
