const authService = require('./authService')
const userService = require('./userService')
const contactService = require('./contactService')
const notificationService = require("./notificationService");
const messageService = require("./messageService");
const groupChatService = require("./groupChatService");
const extrasService = require("./extrasService");
const tagService = require("./tagService");
const postService = require("./postService");
const adminService = require("./adminService");
const commentService = require("./commentService");
const profileService = require("./profileService");

module.exports = {
  auth : authService,
  user : userService,
  contact : contactService,
  notification : notificationService,
  message : messageService,
  groupChat : groupChatService,
  extras : extrasService,
  post : postService,
  admin : adminService,
  tag : tagService,
  comment : commentService,
  profile : profileService,
  
  
}

