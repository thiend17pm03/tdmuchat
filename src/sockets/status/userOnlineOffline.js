const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} = require( "./../../helpers/socketHelper");

/**
 * @param io from socket.jo library 
 */ 
let userOnlineOffline = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
    socket.request.user.chatGroupIds.forEach(group => {
      clients = pushSocketIdToArray(clients, group._id, socket.id);
    });

    // When has new group chat
    socket.on("new-group-created", (data) => {
      clients = pushSocketIdToArray(clients, data.groupChat._id, socket.id);
    });
    socket.on("member-received-group-chat", (data) => {
      clients = pushSocketIdToArray(clients, data.groupChatId, socket.id);
    });

    socket.on("check-status", () => {
      let listUsersOnline = Object.keys(clients);
      // Step 01: Emit to user after login or f5 web page
      socket.emit("server-send-list-users-online", listUsersOnline);

      // Step 02: Emit to all another users when has new user online
      socket.broadcast.emit("server-send-when-new-user-online", socket.request.user._id);
    });

    socket.on("disconnect", () => {
      clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
      socket.request.user.chatGroupIds.forEach(group => {
        clients = removeSocketIdFromArray(clients, group._id, socket);
      });
      // Step 03: Emit to all another users when has new user offline
      socket.broadcast.emit("server-send-when-new-user-offline", socket.request.user._id);
    });
  });
};

module.exports = userOnlineOffline;
