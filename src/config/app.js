module.exports = {
   app : {
  max_event_listeners: 30,
  avatar_directory: "src/public/images/users",
  avatar_type: ["image/png", "image/jpg", "image/jpeg"],
  avatar_limit_size: 1048576, // byte = 1MB
  general_avatar_group_chat: "group-avatar.png",
  image_message_directory: "src/public/images/chat/message",
  image_message_type: ["image/png", "image/jpg", "image/jpeg"],
  image_message_limit_size: 1048576, // byte = 1MB
  attachment_message_directory: "src/public/images/chat/message",
  attachment_message_limit_size: 1048576, // byte = 1MB
  api_akisment_key : "899929cbcbc7",
},
};
