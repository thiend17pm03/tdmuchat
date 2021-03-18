const {validationResult} = require('express-validator');
const {auth} = require('./../services/index')

const getLoginRegister = (req,res)=>{
    return res.render("auth/master",{
      errors : req.flash('errors'),
      success : req.flash('success')
    });
}

const getLogout = (req,res)=>{
  res.send("Logout")
}

const postRegister = async (req,res)=>{

    let errArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty())
      {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
          errArr.push(item.msg);
        })
        //conole.log(errArr);
        req.flash('errors',errArr);
        return res.redirect('/auth');
      }
    
      try {
        let status = await auth.register(req.body.email,req.body.gender,req.body.password,req.protocol,req.get("host"));
        successArr.push(status);
        req.flash('success',successArr);
        return res.redirect('/auth');

      } catch (error) {
        errArr.push(error)
        req.flash('errors',errArr);
        return res.redirect('/auth');
        
      }
    
  
}



const verifyAccount = async (req,res)=>{
  let errArr = [];
  let successArr = [];
  try {

    let status = await auth.verifyAccount(req.params.token);
      successArr.push(status);
      req.flash('success',successArr);
      return res.redirect('/auth');
    
  } catch (error) {

    errArr.push(error)
    req.flash('errors',errArr);
    return res.redirect('/auth');
    
  }


}

module.exports = {
  getLoginRegister : getLoginRegister,
  getLogout : getLogout,
  postRegister : postRegister,
  verifyAccount : verifyAccount 
}
