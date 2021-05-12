
const {tag,post,admin} = require("./../services/index");
const {convertTimestampToDMY,checkLikePost,checkAllowDelete} = require("./../helpers/clientHelper");

const getPost = async (req,res) =>{
  let posts = await post.getAllPost();
  res.render('admin/post/index',{
    user : req.user,
    posts,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
  });
}
const searchPost = async (req,res) =>{
  let key = req.body.key;
  let posts = await post.searchPost(key);
  //console.log(posts);
  
  res.render('admin/post/dataAdmin',{
    user : req.user,
    posts,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
  });
}

const getUser = async (req,res) =>{
  let users = await admin.getAllUser();
  res.render('admin/user/index',{
    user : req.user,
    users,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
  });
}
const searchUser = async (req,res) =>{
  let key = req.body.key;
  let users = await admin.searchUser(key);
  res.render('admin/user/dataUser',{
    user : req.user,
    users,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
  });
}

const getAd = async (req,res) =>{
  let users = await admin.getAllUser();
  res.render('admin/ad/index',{
    user : req.user,
    users,
    convertTimestampToDMY:convertTimestampToDMY,
    checkLikePost : checkLikePost,
    checkAllowDelete : checkAllowDelete,
  });
}

const deleteAd = async (req,res) => {

  try {
    
    let id = req.params.id;
    let result = await admin.deleteAdmin(id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const addAd = async (req,res) => {

  try {
    
    let id = req.params.id;
    let result = await admin.addNewAdmin(id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const deleteUser = async (req,res) => {

  try {
    
    let id = req.params.id;
    
    let result = await admin.deleteUser(id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  getPost : getPost,
  getAd : getAd,
  getUser : getUser,
  deleteAd : deleteAd,
  addAd : addAd,
  deleteUser : deleteUser,
  searchPost : searchPost,
  searchUser : searchUser,
}

