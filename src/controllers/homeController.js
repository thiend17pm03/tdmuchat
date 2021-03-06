const {notification, contact,message} = require('../services/index');
const {bufferToBase64, lastItemOfArray, convertTimestampToHumanTime} = require("./../helpers/clientHelper");
const request = require("request");

let getICETurnServer = () => {
  return new Promise(async (resolve, reject) => {
     
    resolve([]);
  });
};

const getHome = async (req,res) =>{
  // only (10 items one time)
   let notifications = await notification.getNotifications(req.user._id);

  // get amount notifications unread
   let countNotifUnread = await notification.countNotifUnread(req.user._id);

  // get contacts (10 item one time)
  let contacts = await contact.getContacts(req.user._id);
  // get contacts sent (10 item one time)
  let contactsSent = await contact.getContactsSent(req.user._id);
  // get contacts received (10 item one time)
  let contactsReceived = await contact.getContactsReceived(req.user._id);

  //count contacts
  let countAllContacts = await contact.countAllContacts(req.user._id);
  let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
  let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);

  let getAllConversationItems = await message.getAllConversationItems(req.user._id);
  // all messages with conversations, max 30 item
  let allConversationWithMessages = getAllConversationItems.allConversationWithMessages;

  // get ICE list from xirsys turn server
  let iceServerList = await getICETurnServer();

  return res.render("main/home/home",{
    errors : req.flash('errors'),
    success : req.flash('success'),
    user : req.user,
    notifications : notifications,
    countNotifUnread : countNotifUnread,
    contacts: contacts,
    contactsSent: contactsSent,
    contactsReceived: contactsReceived,
    countAllContacts: countAllContacts,
    countAllContactsSent: countAllContactsSent,
    countAllContactsReceived: countAllContactsReceived,
    allConversationWithMessages: allConversationWithMessages,
    bufferToBase64: bufferToBase64,
    lastItemOfArray: lastItemOfArray,
    convertTimestampToHumanTime: convertTimestampToHumanTime,
    iceServerList: JSON.stringify(iceServerList)
    

  });
 
}

module.exports = {
  getHome : getHome,
}

