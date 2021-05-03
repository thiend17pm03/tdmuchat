
const viewProfile = async (req,res) =>{
  res.render('post/profile/index',{user : req.user,});
}

module.exports = {
  viewProfile : viewProfile,
}

