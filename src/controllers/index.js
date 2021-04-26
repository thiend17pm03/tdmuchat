const authController = require('./authController')
const homeController = require('./homeController')
const userController = require('./userController')
const contactController = require('./contactController')
const notificationController = require("./notificationController");
const messageController = require("./messageController");
const groupChatController = require("./groupChatController");
const extrasController = require("./extrasController");
const postController = require("./postController");


module.exports = {
  
  home : homeController,
  auth : authController,
  user : userController,
  contact : contactController,
  notification : notificationController,
  message : messageController,
  groupChat : groupChatController,
  extras : extrasController,
  post : postController,

  
 }