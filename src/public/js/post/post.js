


function addNewPost() {
  $("#post-createNew-btn").unbind("click").on("click", function() {

    let title = $("#post-createNew-title").val();
    let description = $("#post-createNew-description").val();
    let tagId = $('select[name =post-createNew-Tag ] option').filter(':selected').val()
    postItem = {
      title,
      description,
      tagId
    }
    let checkNewPost = true;
    if (title.length < 10 )
      {
        alertify.notify("Vui lòng nhập Tiêu đề lớn hơn 10 kí tự", "error", 7);
        checkNewPost = false;
      }
    if (description.length < 10 )
      {
        alertify.notify("Vui lòng nhập Mô tả lớn hơn 10 kí tự", "error", 7);
        checkNewPost = false;
      }
      
    if ( !tagId)
      {
        alertify.notify("Tag không hợp lệ", "error", 7);
        checkNewPost = false;
      }
    if(checkNewPost){
      $.post("/post/new", postItem, function(data) {
        if(data.success){
          alertify.notify("Tạo bài đăng thành công", "success", 7);
          
          setTimeout(function(){location.reload(); }, 1000);
        }
        else{
          alertify.notify("Tạo bài đăng không thành công", "error", 7);
        }
      })
    }
    
  });
  
};

function updateUserInfoProfile() {
  $("#profile-update-btn").unbind("click").on("click", function() {
    let username= $("#profile-update-username").val() || "";
    let address= $("#profile-update-address").val() || "";
    let phone= $("#profile-update-phone").val() || "";
    let gender = $("input[name='gender']:checked").val();
    let userItem = {
      username,
      address,
      phone,
      gender
    }
    if(userItem){
      $.ajax({
        url: "/user/update-info2",
        type: "put",
        data: userItem,
        success: function(result) {
           
          alertify.notify("Cập nhật thông tin thành công", "success", 7);

           setTimeout(function(){location.reload(); }, 1000);
          },
          error: function(error) {
            alertify.notify("Cập nhật thông tin KHÔNG thành công", "error", 7);
          },
      });
      }

  })

  $("#profile-update-btn-cancel").unbind("click").on("click", function() {
     location.reload();
  })
}

function postLike() {
  $(".post-btn-like").unbind("click").on("click", function() {
    
    try {
      let targetId = $(this).data("postid");
      let likeCount = $(`.like-amount[data-postid=${targetId}]`).text();
      likeCount = +likeCount+1;
      $(`.like-amount[data-postid=${targetId}]`).text(likeCount);
      alertify.notify("Like thành công", "success", 7);
      $(`.post-btn-like[data-postid=${targetId}]`).prop('disabled', true);
      $.ajax({
        url: `/post/like/${targetId}`,
        type: "put",
        data: {postId: targetId},
        success: function(data) {
          if (data.success) {}
        }
      });
      
    } catch (error) {
      
    }


    
  });
}

function postDelete() {
  $(".post-btn-delete").unbind("click").on("click", function() {
    
    try {
      let targetId = $(this).data("postid");
      let rel = $(this).data("profile")
      $.ajax({
        url: `/post/${targetId}`,
        type: "delete",
        data: {postId: targetId},
        success: function(data) {
          if (data.success) {}
          if(rel) location.reload();
          else window.location.href = '/post';
        }
      });
      
    } catch (error) {
      
    }


    
  });
  
}

function postAdminDelete() {
  $(".admin-btn-delete-post").unbind("click").on("click", function() {
    
    try {
      let targetId = $(this).data("postid");
      let rel = $(this).data("profile")
      $.ajax({
        url: `/post/${targetId}`,
        type: "delete",
        data: {postId: targetId},
        success: function(data) {
          if (data.success) {}
          if(rel) location.reload();
          else window.location.href = '/admin/post';
        }
      });
      
    } catch (error) {
      
    }


    
  });
  
}


function postComment() {
  $(".post-btn-comment").unbind("click").on("click", function() {
    
    try {
      let targetId = $(this).data("postid");
      let commentCount = $(`.comment-amount[data-postid=${targetId}]`).text();
      commentCount = +commentCount+1;
      $(`.comment-amount[data-postid=${targetId}]`).text(commentCount);
      
      let content = $(`#post-text-comment[data-postid=${targetId}]`).val().trim();
      if (content.length < 1) alertify.notify("Vui lòng nhập nội dung", "error", 7);
     else {
      alertify.notify("Bình luận thành công thành công", "success", 7);
      $(`#post-text-comment[data-postid=${targetId}]`).val("");
      let d = new Date().toLocaleDateString();
      $.ajax({
        url: `/post/comment/${targetId}`,
        type: "post",
        data: {
          postId: targetId,
          content : content,
        },
        success: function(data) {
          if (data.success) {
            console.log(data);
            let commentId = data.newComment._id;
            let avt = $('#navbar-avatar').attr('src');
            let userName =  $(`#navbar-username`).text().trim();
            let userId = data.newComment.userId;
            
            $(`#row-post-comment[data-postid=${targetId}]`).prepend(`
            <div class="row view-post-comment">
            <div class="col-sm-2 view-post-comment-left">
              <div class="row no-margin vote-count">
                <i class='fas fa-check-double' style='font-size:30px;color:#44bd32'></i>
                <span class="comment-vote-amount" data-commentid="${commentId}">0</span>
              </div>
              <div class="row no-margin"><span>Votes</span></div>
              <div class="row no-margin">
                <button
                type="button"
                class="btn btn-custom btn-primary post-btn-comment-vote" data-commentid="${commentId}" style="width: 100px; margin-top: 50px;"
                >Bình chọn</button> 
              </div>
            </div>
            <div class="col-sm-10  view-post-comment-right">
              <div class="row view-comment-info">
                <div class="col-sm-1 no-padding">
                  <img class="avt-img" src="${avt}" alt="avt-user-comment-post">
                </div>
                <div class="col-sm-2 no-padding">
                  <a href="/profile/${userId}">@${userName}</a>
                </div>
                <div class="col-sm-3">
                  <i class="fa fa-calendar">&nbsp;</i><span>${d}</span>&Tab;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div class="col-sm-7">
                </div>
              </div>
              <div class="row no-margin view-comment-content">
                <span>
                  ${content}  
                </span>
              </div>
              <div data-commentid="${commentId}" class="comment-box-small">
                 
                
              </div>
              <div class="row no-margin " style="margin-top: 10px;">
                <div class="col-sm-1"></div>
                <div class="col-sm-9 no-padding">
                  <textarea class="form-control post-comment-text-child" rows="1" data-commentid="${commentId}"  placeholder="Nhập câu trả lời của bạn"></textarea>
                </div>
                <div class="col-sm-2">
                  <button
                  type="button"
                  data-commentid="${commentId}"
                  class="btn btn-custom btn-success post-btn-comment-child" style="width: 100px;"
                  >Gửi</button> 
                </div>
              </div>
            </div>
          </div>
            `);
          }
        },
      });
     }
      
    } catch (error) {
      
    }


    
  });
}

function postVoteComment(){
  $(".post-btn-comment-vote").unbind("click").on("click", function() {
    
    try {
      let targetId = $(this).data("commentid");
      let voteCount = $(`.comment-vote-amount[data-commentid=${targetId}]`).text();
      voteCount = +voteCount+1;
      $(`.comment-vote-amount[data-commentid=${targetId}]`).text(voteCount);
      $(`.post-btn-comment-vote[data-commentid=${targetId}]`).prop('disabled', true);
     
      $.ajax({
        url: `/post/comment/vote/${targetId}`,
        type: "post",
        data: {
          commentId: targetId,
        },
        success: function(data) {
          if(data.success)
          alertify.notify("Vote thành công", "success", 7);
        },
        error : function(data) {
          
          alertify.notify("Vote không thành công", "error", 7);
        },
      });
     
      
    } catch (error) {
      alertify.notify("Vote không thành công", "error", 7);
    }


    
  });

}

function postCommentChild() {
  $(".post-btn-comment-child").unbind("click").on("click", function() {
    try {
      let targetId = $(this).data("commentid");
      let postid = $('#post-text-comment').data("postid");
      let commentCount = $(`.comment-amount[data-postid=${postid}]`).text();
      commentCount = +commentCount+1;
      $(`.comment-amount[data-postid=${postid}]`).text(commentCount);
      let content = $(`.post-comment-text-child[data-commentid=${targetId}]`).val().trim();
      if (content.length < 1) alertify.notify("Vui lòng nhập nội dung", "error", 7);
     else {
      alertify.notify("Bình luận thành công", "success", 7);
      $(`.post-comment-text-child[data-commentid=${targetId}]`).val("");
      
      $.ajax({
        url: `/post/comment/child/${targetId}`,
        type: "post",
        data: {
          commentId: targetId,
          content : content,
          postId : postid,
        },
        success: function(data) {
          if (data.success) {
            let commentId = data.newComment._id;
            let avt = $('#navbar-avatar').attr('src');
            let userName =  $(`#navbar-username`).text().trim();
            let userId = data.newComment.userId;
            userName = userName.trim();
            
            $(`.comment-box-small[data-commentid=${targetId}]`).prepend(`
            <div class="row view-comment-small">
              <a href="/profile/${userId}">@${userName}</a>
              <span>:&nbsp;&nbsp;&nbsp;</span>
              <span>${content}
              </span>
            </div>
            `);

          }
        },
      });
     }
      
    } catch (error) {
      
    }
  
  });
}
 
function userAdminDelete() {
  $(".admin-btn-delete-user").unbind("click").on("click", function() { 
    try {
      let targetId = $(this).data("uid");
      $.ajax({
        url: `/admin/user/delete/${targetId}`,
        type: "delete",
        data: {userId: targetId},
        success: function(data) {
          
          window.location.href = '/admin/user';
        }
      });
      
    } catch (error) {
      
    }
  });
  
}
function adminAddAdmin() {
  $(".admin-btn-add-qtv").unbind("click").on("click", function() { 
    try {
      let targetId = $(this).data("uid");
      $.ajax({
        url: `/admin/user/addad/${targetId}`,
        type: "put",
        data: {userId: targetId},
        success: function(data) {
          alertify.notify("Thêm admin thành công", "success", 7);
          $(`.admin-btn-add-qtv[data-uid=${targetId}]`).prop('disabled', true);
        }
      });
      
    } catch (error) {
      
    }
  });
  
}
function adminRemoveAdmin() {
  $(".admin-btn-remove-qtv").unbind("click").on("click", function() { 
    try {
      let targetId = $(this).data("uid");
      $.ajax({
        url: `/admin/ad/delete/${targetId}`,
        type: "put",
        data: {userId: targetId},
        success: function(data) {
          window.location.href = '/admin/ad';
        }
      });
      
    } catch (error) {
      
    }
  });
  
}


adminRemoveAdmin()
adminAddAdmin()
userAdminDelete();
addNewPost();
postLike();
updateUserInfoProfile();
postDelete();
postComment();
postCommentChild();
postVoteComment();  
postAdminDelete();
