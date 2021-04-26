const addNewContact = require("./contact/addNewContact");
const removeRequestContactSent = require("./contact/removeRequestContactSent");
const removeRequestContactReceived = require("./contact/removeRequestContactReceived");
const approveRequestContactReceived = require("./contact/approveRequestContactReceived");
const removeContact = require("./contact/removeContact");
const chatTextEmoji = require("./chat/chatTextEmoji");
const typingOn = require("./chat/typingOn");
const typingOff = require("./chat/typingOff");
const chatImage = require("./chat/chatImage");
const chatAttachment = require("./chat/chatAttachment");
const userOnlineOffline = require("./status/userOnlineOffline");
const newGroupChat = require("./group/newGroupChat");
require('events').EventEmitter.defaultMaxListeners = 0

/**
 * @param io from socket.jo library
 */
let initSockets = (io) => {
  addNewContact(io);
  removeRequestContactSent(io);
  removeRequestContactReceived(io);
  approveRequestContactReceived(io);
  removeContact(io);
  chatTextEmoji(io);
  typingOn(io);
  typingOff(io);
  chatImage(io); 
  chatAttachment(io);
  userOnlineOffline(io);
  newGroupChat(io);
};

module.exports = initSockets;
