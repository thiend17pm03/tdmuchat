function imageChat(divId) {
  $(`#image-chat-${divId}`).unbind("change").on("change", function() {
    let fileData = $(this).prop("files")[0];
    let math = ["image/png", "image/jpg", "image/jpeg"];
    let limit = 1048576; // byte = 1MB

    if ($.inArray(fileData.type, math) === -1) {
      alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg & png.", "error", 7);
      $(this).val(null);
      return false;
    }
    if (fileData.size > limit) {
      alertify.notify("Ảnh upload tối đa cho phép là 1MB", "error", 7);
      $(this).val(null);
      return false;
      
    }

    let targetId = $(this).data("chat");
    let isChatGroup = false;

    let messageFormData = new FormData();
    messageFormData.append("my-image-chat", fileData);
    messageFormData.append("uid", targetId);

    if ($(this).hasClass("chat-in-group")) {
      messageFormData.append("isChatGroup", true);
      isChatGroup = true;
    }

    $.ajax({
      url: "/message/add-new-image",
      type: "post",
      cache: false,
      contentType: false,
      processData: false,
      data: messageFormData,
      success: function(data) {
        let dataToEmit = {
          message: data.message
        };

        // Step 01: handle message data before show
        let messageOfMe = $(`<div class="bubble me bubble-image-file" data-mess-id="${data.message._id}"></div>`);
        let imageChat = `<img src="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}" class="show-image-chat">`;

        if (isChatGroup) {
          let senderAvatar = `<img src="/images/users/${data.message.sender.avatar}" class="avatar-small" title="${data.message.sender.name}" />`;
          messageOfMe.html(`${senderAvatar} ${imageChat}`);
          
          increaseNumberMessageGroup(divId);
          dataToEmit.groupId = targetId;
        } else {
          messageOfMe.html(imageChat);

          dataToEmit.contactId = targetId;
        }

        // Step 02: append message data to screen
        $(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
        nineScrollRight(divId);

        // Step 03: remove all data at input: nothing to code :)))

        // Step 04: change data preview & time in leftSide
        $(`.person[data-chat=${divId}]`).find("span.time").removeClass("message-time-realtime").html(moment(data.message.createdAt).locale("vi").startOf("seconds").fromNow());
        $(`.person[data-chat=${divId}]`).find("span.preview").html("Hình ảnh...");

        // Step 05: Move conversation to the top
        $(`.person[data-chat=${divId}]`).on("x.moveConversationToTheTop", function() {
          let dataToMove = $(this).parent();
          $(this).closest("ul").prepend(dataToMove);
          $(this).off("x.moveConversationToTheTop");
        });
        $(`.person[data-chat=${divId}]`).trigger("x.moveConversationToTheTop");

        // Step 06: Emit real-time
        socket.emit("chat-image", dataToEmit);

        // Step 07: Emit remove typing real-time: nothing to code :)))
        // Step 08: If this has typing, remove that immediate: nothing to code :)))

        // Step 09: Add to modal image
        let imageChatToAddModal = `<img src="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}">`;
        $(`#imagesModal_${divId}`).find("div.all-images").append(imageChatToAddModal);

        // extras step 10
        zoomImageChat();
      },
      error: function(error) {
        alertify.notify(error.responseText, "error", 7);
      },
    });
  });
}

$(document).ready(function() {
  socket.on("response-chat-image", function(response) {
    let divId = "";
  
    // Step 01: handle message data before show
    let messageOfYou = $(`<div class="bubble you bubble-image-file" data-mess-id="${response.message._id}"></div>`);
    let imageChat = `<img src="data:${response.message.file.contentType}; base64, ${bufferToBase64(response.message.file.data.data)}" class="show-image-chat">`;

    if (response.currentGroupId) {
      let senderAvatar = `<img src="/images/users/${response.message.sender.avatar}" class="avatar-small" title="${response.message.sender.name}" />`;
      messageOfYou.html(`${senderAvatar} ${imageChat}`);

      divId = response.currentGroupId;
      
      if (response.currentUserId !== $("#dropdown-navbar-user").data("uid")) {
        increaseNumberMessageGroup(divId);
      }
    } else {
      messageOfYou.html(imageChat);

      divId = response.currentUserId;
    }

    // Step 02: append message data to screen
    if (response.currentUserId !== $("#dropdown-navbar-user").data("uid")) {
      $(`.right .chat[data-chat=${divId}]`).append(messageOfYou);
      nineScrollRight(divId);
      $(`.person[data-chat=${divId}]`).find("span.time").addClass("message-time-realtime");
    }

    // Step 03: remove all data at input: nothing to code :|

    // Step 04: change data preview & time in leftSide
    $(`.person[data-chat=${divId}]`).find("span.time").html(moment(response.message.createdAt).locale("vi").startOf("seconds").fromNow());
    $(`.person[data-chat=${divId}]`).find("span.preview").html("Hình ảnh...");

    // Step 05: Move conversation to the top
    $(`.person[data-chat=${divId}]`).on("x.moveConversationToTheTop", function() {
      let dataToMove = $(this).parent();
      $(this).closest("ul").prepend(dataToMove);
      $(this).off("x.moveConversationToTheTop");
    });
    $(`.person[data-chat=${divId}]`).trigger("x.moveConversationToTheTop");

    // Step 06: Emit realtime: nothing to code :|
    // Step 07: Emit remove typing real-time : nothing to code :|
    // Step 08: If this has typing, remove that immediate : nothing to code :|

    // Step 09: Add to modal image
    if (response.currentUserId !== $("#dropdown-navbar-user").data("uid")) {
      let imageChatToAddModal = `<img src="data:${response.message.file.contentType}; base64, ${bufferToBase64(response.message.file.data.data)}">`;
      $(`#imagesModal_${divId}`).find("div.all-images").append(imageChatToAddModal);
    }

    // extras
    zoomImageChat();
  });
});
