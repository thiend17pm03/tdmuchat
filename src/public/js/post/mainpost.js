function nineScrollLeft() {
  $('.left').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}
function resizeNineScrollLeft() {
  $(".left").getNiceScroll().resize();
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

$(document).ready(function() {
   
  // Cấu hình thanh cuộn
  nineScrollLeft();
  nineScrollRight();

});