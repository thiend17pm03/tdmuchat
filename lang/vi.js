module.exports =  {
  transValidation :  {
    email_incorrect : "Email phải có định dạng là abc@def.com !",
    gender_incorrect : "Muốn giỡn thiệc hả ???",
    password_incorrect : "Mật khẩu phải chứa ít nhất 8 kí tự, bao gồm số, chữ hoa, chữ thường và kí tự đặc biệt",
    passwrod_confirmation_incorrect : "Nhập lại mật khẩu chưa chính xác !",
    update_username: "Username bao gồm chữ, số và nằm từ 3 - 17 kí tự",
    update_gender: "Are you bedue ???",
    update_address: "Địa chỉ từ 3 - 30 kí tự",
    update_phone: "Vui lòng nhập chính xác số điện thoại",
    keyword_find_user: "Lỗi từ khóa tìm kiếm, chỉ cho phép ký tự chữ cái và số, cho phép khoảng trống.",
    message_text_emoji_incorrect: "Tin nhắn không hợp lệ. Đảm bảo tối thiểu 1 ký tự, tối đa 400 ký tự.",
    add_new_group_users_incorrect: "Vui lòng chọn bạn bè để thêm vào nhóm, tối thiểu 2 người.",
    add_new_group_name_incorrect: "Vui lòng nhập tên cuộc trò chuyện, giới hạn 5-30 ký tự và không chữa các ký tự đặc biệt.",
  
  },
  transErrors :{
      account_in_use  : "Email này đã được sử dụng.",
      account_remove  : "Tài khoản đã bị khóa",
      accout_not_active : "Tài khoản đã được đăng ký nhưng chưa kích hoạt",
      token_undefined : 'Token không tồn tại',
      login_failed : "Sai tài khoản hoặc mật khẩu",
      server_error : "Có lỗi ở phía server",
      avatar_type: "Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.",
      avatar_size: "Ảnh upload tối đa cho phép là 1MB",
      user_current_password_failed: "Mật khẩu hiện tại không chính xác.",
      conversation_not_found: "Cuộc trò chuyện không tồn tại.",
      image_message_type: "Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.",
      image_message_size: "Ảnh upload tối đa cho phép là 1MB",
      attachment_message_size: "Tệp tin đính kèm upload tối đa cho phép là 1MB",
  },
  transSuccess : {
    userCreated : (email) =>{
        return `Tạo tài khoản thành công. Vui lòng kiểm tra email : <strong>${email}</strong>`
    },
    account_actived : "Kích hoạt tài khoản thành công. Bạn có thể đăng nhập vào ứng dụng." ,
    loginSuccess : (username)=>{
      return `Xin chào ${username}`;
    },
    logout_success: "Đăng xuất tài khoản thành công!",
    user_info_updated: "Cập nhật thông tin người dùng thành công.",
    user_password_updated: "Cập nhật mật khẩu thành công."
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