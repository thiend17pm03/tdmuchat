const authController = require('./authController')
const homeController = require('./homeController')
const userController = require('./userController')

module.exports = {
  home : homeController,
  auth : authController,
  user : userController,
 }