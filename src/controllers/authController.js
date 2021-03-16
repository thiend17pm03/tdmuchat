const getLoginRegister = (req,res)=>{
    return res.render("auth/master");
}

const getLogout = (req,res)=>{
  res.send("Logout")
}

module.exports = {
  getLoginRegister : getLoginRegister,
  getLogout : getLogout
}
