const authValidation  = require('./authValidation')
const userValidation  = require('./userValidation')
const contactValidation  = require('./contactValidation')

module.exports = {
  authValid : authValidation,
  userValid : userValidation,
  contactValid : contactValidation,
  
}