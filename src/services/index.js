const authService = require('./authService')
const userService = require('./userService')
const contactService = require('./contactService')

module.exports = {
  auth : authService,
  user : userService,
  contact : contactService,
  
}

