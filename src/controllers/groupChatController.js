const {validationResult} = require("express-validator");
const {groupChat} = require("./../services/index");
// extras
const ejs = require("ejs");
const {promisify} = require("util");

// Make renderFile available with async await
const renderFile = promisify(ejs.renderFile).bind(ejs); // extras
 
let addNewGroup = async (req, res) => {
  //console.log(req.body);
  let errorArr = [];
  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    // Logging
    // console.log(errorArr);
    return res.status(500).send(errorArr);
  }

  try {
    let currentUserId = req.user._id;
    let arrayMemberIds = req.body.arrayIds;
    let groupChatName = req.body.groupChatName;

    let newGroupChat = await groupChat.addNewGroup(currentUserId, arrayMemberIds, groupChatName);
    // extras
    let membersModalData = await renderFile("src/views/main/extras/_newMembersModal.ejs", {
      newGroupChat: newGroupChat,
      user: req.user
    });

    return res.status(200).send({
      groupChat: newGroupChat,
      membersModalData: membersModalData, //extras
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  addNewGroup: addNewGroup
};
