const authController = require('./authController')
const homeController = require('./homeController')
const userController = require('./userController')
const contactController = require('./contactController')

module.exports = {
  home : homeController,
  auth : authController,
  user : userController,
  contact : contactController,
  
 }