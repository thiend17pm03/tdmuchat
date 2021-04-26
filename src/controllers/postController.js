

const getPost = async (req,res) =>{
  res.render('post/content/index',{user : req.user,});
}

module.exports = {
  getPost : getPost,
}

