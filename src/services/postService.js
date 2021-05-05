const tagModel = require("./../models/tagModel");
const postModel = require("./../models/postModel");
const commentModel = require("./../models/commentModel");
const _ = require("lodash");

const LIMIT_NUMBER_TAKEN = 15;

let addNew = (postItem ) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newPost = await postModel.createNew(postItem);
      resolve(newPost);
    }
    catch(err) {
      reject(err);
    }
  });
};

let findPostByUserId = (userId)=>{
  return new Promise(async (resolve, reject) => {
    let Posts = await postModel.findPostByUserId(userId);
    resolve(Posts);
  });
}

let getAllPost = (limit = 50)=>{
  return new Promise(async (resolve, reject) => {
    let Posts = await postModel.getAllPost(limit);
    resolve(Posts);
  });
}

let getPostById = (id)=>{
  return new Promise(async (resolve, reject) => {
    let postItem = null
    try {
       postItem = await postModel.getPostById(id);
    } catch (error) {
      resolve(postItem);
    }
    resolve(postItem);
  });
} 

let getCommentByPostId = (id)=>{
  return new Promise(async (resolve, reject) => {
    let commentItem = null;
    try {
       commentItem = await commentModel.getCommentByPostId(id);
    } catch (error) {
      resolve(commentItem);
    }
    resolve(commentItem);
  });
} 
let updatePostLike = (id,userId) =>{
  return new Promise(async (resolve, reject) => {
    try {
      let postItem = await postModel.getPostByIdToLike(id);
      postItem =postItem.toObject();
      let number = +postItem.likeAmount + 1;
      let result = postModel.updatePostLike(id,number,userId)
      resolve(result);
    } catch (error) {
      
    }
  });
}

let updateVoteComment = (id) =>{
  return new Promise(async (resolve, reject) => {
    try {
      let commentItem = await commentModel.getCommenttByIdToVote(id);
      commentItem =commentItem.toObject();
      let number = +commentItem.voteAmout + 1;
      let result = commentModel.updateVoteComment(id,number)
      resolve(result);
    } catch (error) {
      
    }
  });
}

let addNewCommentChild = (id,item) =>{
  return new Promise(async (resolve, reject) => {
    try {
      let commentItem = await commentModel.addNewCommentChild(id,item);
      //commentItem =commentItem.toObject();
      resolve(commentItem);
    } catch (error) {
      
    }
  });
}

let deletePost = (id) =>{
  return new Promise(async (resolve, reject) => {
    try {
      let status = await postModel.deletePost(id);
      //console.log(status);
      resolve(status);
    } catch (error) {
      
    }
  });

}

let addNewComment = (item) =>{
  return new Promise(async (resolve, reject) => {
    try {
      let newComment = await commentModel.createNew(item);
      resolve(newComment);
    }
    catch(err) {
      reject(err);
    }
  });

}

let updatePostComment = (id) =>{
  return new Promise(async (resolve, reject) => {
    try {
      let postItem = await postModel.getPostByIdToLike(id);
      postItem = postItem.toObject();
      let number = +postItem.commentAmount + 1;
      let result = postModel.updatePostComment(id,number)
    resolve(result);
    } catch (err) {
      
    }
  });
}

let updatePost = (id, item) => {
  return postModel.updatePost(id, item);
};
module.exports = {
  addNew : addNew,
  getAllPost : getAllPost,
  findPostByUserId : findPostByUserId,
  getPostById : getPostById,
  updatePost : updatePost,
  updatePostLike : updatePostLike,
  updatePostComment : updatePostComment,
  deletePost : deletePost,
  addNewComment : addNewComment,
  getCommentByPostId : getCommentByPostId,
  addNewCommentChild : addNewCommentChild,
  updateVoteComment : updateVoteComment,
}