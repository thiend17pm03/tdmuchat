const authValidation  = require('./authValidation')
const userValidation  = require('./userValidation')
const contactValidation  = require('./contactValidation')
const messageValidation = require("./messageValidation");
const groupChatValidation = require("./groupChatValidation");
const extrasValidation = require("./extrasValidation");

module.exports = {
  authValid : authValidation,
  userValid : userValidation,
  contactValid : contactValidation,
  messageValid : messageValidation,
  groupChatValid : groupChatValidation,
  extrasValid : extrasValidation,
}
