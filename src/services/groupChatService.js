const  _ = require("lodash");
const  ChatGroupModel = require("./../models/chatGroupModel");
const  UserModel = require("./../models/userModel");

let addNewGroup = (currentUserId, arrayMemberIds, groupChatName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // add current userId to array members
      arrayMemberIds.unshift({userId: `${currentUserId}`});
      
      arrayMemberIds = _.uniqBy(arrayMemberIds, "userId");

      let newGroupItem = {
        name: groupChatName,
        userAmount: arrayMemberIds.length,
        userId: `${currentUserId}`,
        members: arrayMemberIds
      };

      let newGroup = await ChatGroupModel.createNew(newGroupItem);

      // extras get userInfo
      newGroup = newGroup.toObject();
      newGroup.membersInfo = [];
      for (let member of newGroup.members) {
        let userInfo = await UserModel.getNormalUserDataById(member.userId);
        newGroup.membersInfo.push(userInfo);
      }
      
      resolve(newGroup);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  addNewGroup: addNewGroup
};
