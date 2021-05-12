const {tag,post} = require("./../services/index");
const {convertTimestampToDMY,checkLikePost,convertTexarea,checkAllowDelete} = require("./../helpers/clientHelper");
const { dectectComment } = require('./../util/akismentSp');


const createPost = async (req,res) =>{
  try {
    
    
    let title = req.body.title  || "";
    let description = req.body.description  || "";
    let tagId = req.body.tagId  || "";
    let userId = req.user._id  || "";
    let newPostItem = {
      title,
      description,
      tagId,
      userId
    };
    
    let newPost = await post.addNew(newPostItem);
    //console.log(newPost);
    return res.status(200).send({success: !!newPost});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const getPost = async (req,res) =>{
  let posts = await post.getAllPost();
  let allTag = await tag.getAll();
  //console.log();
  res.render('post/content/index',{
    user : req.user,
    allTag,
    posts,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
    convertTexarea : convertTexarea,
  });
}

const getAllPostSortByLike = async (req,res) =>{
  

  let type = req.body.type;
  let posts = null;
  if (type == "like") {
    posts = await post.getAllPostSortByLike(type);
  } else {
    posts = await post.getAllPost();
  }

  
  res.render('post/content/dataRightSide',{
    posts,
    user : req.user,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
    convertTexarea: convertTexarea,
  });
}
const searchPost = async (req,res) =>{
  
  let key = req.body.key;
  let posts = null;
  posts = await post.searchPost(key);
  res.render('post/content/dataRightSide',{
    user : req.user,
    posts,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
    convertTexarea : convertTexarea,
  });
}

const getPostByTag = async (req,res) =>{
  
  let allTag = await tag.getAll();
  let tagId = req.params.id;
  let posts = await post.getPostByTag(tagId);
  res.render('post/content/index',{
    user : req.user,
    allTag,
    posts,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
    convertTexarea : convertTexarea
  });
}

const likePost = async(req,res) =>{
  try {
  postId = req.params.postId;
  let result = post.updatePostLike(postId,req.user._id);
   return res.status(200).send({success: !!result});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

}

const voteComment = async(req,res) =>{
  try {
  commentId = req.params.commentId;
  let result = post.updateVoteComment(commentId);
   return res.status(200).send({success: !!result});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

}

const viewPost = async (req,res) =>{
  let postId = req.params.postId;
  let postdata = await post.getPostById(postId);
  let commentdata = await post.getCommentByPostId(postId);
  //console.log(commentdata);
  if(!postdata) return res.send("Không có dữ liệu");
  res.render('post/viewpost/index',{
    user : req.user,
    convertTimestampToDMY: convertTimestampToDMY,
    postdata,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
    commentdata,
    convertTexarea,
  });
}

const getCommentByType = async (req,res) =>{
  let postId = req.body.postId;
  let type = req.body.type;
  //let postdata = await post.getPostById(postId);
  let commentdata = await post.getCommentByPostId(postId,type);
  //console.log(type);
  if(!commentdata) return res.send("Không có dữ liệu");
  res.render('post/viewpost/dataComment',{
    user : req.user,
    convertTimestampToDMY: convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
    commentdata,
    convertTexarea: convertTexarea,
  });
}



const updatepost =async ()=>{
    try {
      let updateUserItem = req.body;
      await user.updateUser(req.user._id, updateUserItem);
  
      let result = {
        message: transSuccess.user_info_updated,
      };
  
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
}

const deletePost = async (req,res) => {

  try {
    
    let postId = req.params.postId;
    let result = await post.deletePost(postId);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

let addNewComment= async (req,res)=>{
  
    try {
      let  userId = req.user._id;
      let data = req.body;
      postid = req.params.postId;
      let userAgent = req.headers['user-agent'];
      let userIp = req.ip;
      let permalink = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
      const commentCheck = {
        ip: userIp,
        useragent: userAgent,
        content: data.content,
        permalink : permalink,
        type : "comment",
      }
      let isSpam = false;
      isSpam = await dectectComment(commentCheck);
      
      let commentItem = {
        ...data,
        userId,
        isSpam,
      }
      let newComment = await post.addNewComment(commentItem);
      //console.log(newComment);
      let updateCommentCount = post.updatePostComment(postid);
      
      
      return res.status(200).send({success: !!newComment,newComment});
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  
}

let addNewCommentChild= async (req,res)=>{
  
  try {
    let  userId = req.user._id;
    let userName = req.user.username;
    let data = req.body;
    let content = data.content;
    let postid = data.postId;
    commentId = req.params.commentId
    let commentItem = {
      userId,
      userName,
      content,
    }
    let newComment = await post.addNewCommentChild(commentId,commentItem);
    let updateCommentCount = post.updatePostComment(postid);
    
    return res.status(200).send({success: !!newComment,newComment});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

}

module.exports = {
  getPost : getPost,
  viewPost : viewPost,
  createPost: createPost,
  updatepost : updatepost,
  likePost : likePost,
  deletePost : deletePost,
  addNewComment : addNewComment,
  voteComment : voteComment,
  addNewCommentChild : addNewCommentChild,
  getPostByTag: getPostByTag,
  getAllPostSortByLike : getAllPostSortByLike,
  searchPost : searchPost,
  getCommentByType : getCommentByType,
}

