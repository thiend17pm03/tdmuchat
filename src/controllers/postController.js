

const getPost = async (req,res) =>{
  res.render('post/content/index',{user : req.user,});
}

const viewPost = async (req,res) =>{
  res.render('post/viewpost/index',{user : req.user,});
}

module.exports = {
  getPost : getPost,
  viewPost : viewPost,
}

