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
      accout_not_active : "Tài khoản đã được đăng ký nhưng chưa kích hoạt",
      token_undefined : 'Token không tồn tại',
  },
  transSuccess : {
    userCreated : (email) =>{
        return `Tạo tài khoản thành công. Vui lòng kiểm tra email : <strong>${email}</strong>`
    },
    account_actived : "Kích hoạt tài khoản thành công. Bạn có thể đăng nhập vào ứng dụng." 
  },
  transMail : {
    subject : "TDMU Chat : Xác nhận kích hoạt tài khoản ",
    template : (linkVerify)=>{
      return `
        <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng TDMU Chat</h2>
        <h3>Vui lòng click vào liên kết bên dưới để kích hoạt tài khoản</h3>
        <h3><a href = "${linkVerify}" target = "blank">${linkVerify}</a></h3>
        <h4>Nếu tin rằng email này là nhầm lẫn. Vui lòng bỏ qua.</h4>
        <h4>Trân trọng! </h4>
      `;

    },
    send_failed : "Có lỗi trong quá trình gửi email xác nhận. Vui lòng thực hiện lại"
  },

}