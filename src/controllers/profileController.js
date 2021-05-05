const { stringify } = require("uuid");
const {user,post} = require("./../services/index");
const {convertTimestampToDMY} = require("./../helpers/clientHelper");

const viewProfile = async (req,res) =>{
  let profileId = req.params.profileId;
  let profile = await user.findUserById(profileId);
  let posts = await post.findPostByUserId(profileId);
  let update = false;
  let showPost =  false;
  if (profileId == req.user._id) update = true;
  if (posts.length) showPost = true;
  if (!profile)  return res.status(500).send("Không có dữ liệu người dùng");
  res.render('post/profile/index',{user : req.user,update,profile : profile,posts : posts,showPost,convertTimestampToDMY : convertTimestampToDMY});

}

module.exports = {
  viewProfile : viewProfile,
}

