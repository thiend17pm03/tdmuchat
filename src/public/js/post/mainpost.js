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

$(document).ready(function() {
   
  // Cấu hình thanh cuộn
  nineScrollLeft();


});