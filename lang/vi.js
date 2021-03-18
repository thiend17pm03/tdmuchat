module.exports =  {
  transValidation :  {
    email_incorrect : "Email phải có định dạng là abc@def.com !",
    gender_incorrect : "Muốn giỡn thiệc hả ???",
    password_incorrect : "Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm số, chữ hoa, chữ thường và kí tự đặc biệt",
    passwrod_confirmation_incorrect : "Nhập lại mật khẩu chưa chính xác !",
  
  },
  transErrors :{
      account_in_use  : "Email này đã được sử dụng.",
      account_remove  : "Tài khoản đã bị khóa",
      accout_not_active : "Tài khoản đã được đăng ký nhưng chưa kích hoạt"
  },
  transSuccess : {
    userCreated : (email) =>{
        return `Tạo tài khoản thành công. Vui lòng kiểm tra email : <strong>${email}</strong>`
    },
  }

}