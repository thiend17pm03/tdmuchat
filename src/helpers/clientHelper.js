const moment = require("moment");

const bufferToBase64 = (bufferFrom) => {
  return Buffer.from(bufferFrom).toString("base64");
};

const lastItemOfArray = (array) => {
  if (!array.length) {
    return [];
  }
  return array[array.length - 1];
};

const convertTimestampToHumanTime = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  return moment(timestamp).locale("vi").startOf("seconds").fromNow();
};

const convertTimestampToDMY = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  return moment(timestamp).locale("vi").format('L');;
};

const checkLikePost = (arr,userId) =>{
  let check = false;
  if(arr){
    arr.forEach(item=>{
      userId = userId +"";
      item.userId = item.userId+"";
      if(item.userId == userId ) check = true;

    });
  }
  return check;
}

const checkAllowDelete = (postId, userId) =>{
  postId = postId+ "";
  userId = userId +"";
  if(postId == userId ) return true;
  return false;
}

const convertTexarea = (text = " ") =>{
  text = text.replace(/\n/gi, "<br/>" );
  //console.log(text);
  return text;
}

module.exports = {
  bufferToBase64 : bufferToBase64,
  lastItemOfArray : lastItemOfArray,
  convertTimestampToHumanTime: convertTimestampToHumanTime,
  convertTimestampToDMY : convertTimestampToDMY,
  checkLikePost : checkLikePost,
  checkAllowDelete : checkAllowDelete,
  convertTexarea : convertTexarea,

}
