const {validationResult} = require('express-validator');

const getLoginRegister = (req,res)=>{
    return res.render("auth/master");
}

const getLogout = (req,res)=>{
  res.send("Logout")
}

const postRegister = (req,res)=>{

    let errArr = [];
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty())
      {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
          errArr.push(item.msg);
        })
        console.log(errArr);

        return;
      }
    console.log(req.body);
    
  
}





module.exports = {
  getLoginRegister : getLoginRegister,
  getLogout : getLogout,
  postRegister : postRegister
}
