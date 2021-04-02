const authService = require('./authService')
const userService = require('./userService')
const contactService = require('./contactService')
const notificationService = require("./notificationService");
// const messageService = require("./messageService");
// const groupChatService = require("./groupChatService");
// const extrasService = require("./extrasService");

module.exports = {
  auth : authService,
  user : userService,
  contact : contactService,
  notification : notificationService,
  
}

