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

module.exports = {
  bufferToBase64 : bufferToBase64,
  lastItemOfArray : lastItemOfArray,
  convertTimestampToHumanTime: convertTimestampToHumanTime,


}
