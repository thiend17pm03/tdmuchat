

const getPost = async (req,res) =>{
  res.render('admin/post/index',{user : req.user,});
}

const getUser = async (req,res) =>{
  res.render('admin/user/index',{user : req.user,});
}

const getAd = async (req,res) =>{
  res.render('admin/ad/index',{user : req.user,});
}

module.exports = {
  getPost : getPost,
  getAd : getAd,
  getUser : getUser,
}

