function resizeNineScrollViewPost() {
  $(".view-post-box-content").getNiceScroll().resize();
}
function resizeNineScrollLeft() {
  $(".right").getNiceScroll().resize();
}

function nineScrollLeft() {
  $('.left').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}

function nineScrollRight() {
  $('.right').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}
function nineScrollProfilePost() {
  $('.profile-box-post-detail').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}
function nineScrollAdminBox() {
  $('.admin-box-detail').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}



function nineScrollComment() {
  $('.comment-box-small').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}
function nineScrollViewPost() {
  $('.view-post-box-content').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}


$(document).ready(function() {
   
  // Cấu hình thanh cuộn
  nineScrollLeft();
  nineScrollRight();
  nineScrollComment();
  nineScrollViewPost();
  nineScrollProfilePost();
  nineScrollAdminBox();

});