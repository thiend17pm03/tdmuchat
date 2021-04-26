function textAndEmojiChat(divId) {
  $(".emojionearea").unbind("keyup").on("keyup", function(element) {
    let currentEmojoneArea = $(this);
    if (element.which === 13) {
      let targetId = $(`#write-chat-${divId}`).data("chat");
      let messageVal = $(`#write-chat-${divId}`).val();

      if (!targetId.length || !messageVal.length) {
        return false;
      }
 
      let dataTextEmojiForSend = {
        uid: targetId,
        messageVal: messageVal

      };

      if ($(`#write-chat-${divId}`).hasClass("chat-in-group")) {
        dataTextEmojiForSend.isChatGroup = true;
      }

      // call send message
      $.post("/message/add-new-text-emoji", dataTextEmojiForSend, function(data) {
        let dataToEmit = {
          message: data.message
        };

        // Step 01: handle message data before show
        let messageOfMe = $(`<div class="bubble me" data-mess-id="${data.message._id}"></div>`);
        messageOfMe.text(data.message.text);
        let converEmojiMessage = emojione.toImage(messageOfMe.html());

        if (dataTextEmojiForSend.isChatGroup) {
          let senderAvatar = `<img src="/images/users/${data.message.sender.avatar}" class="avatar-small" title="${data.message.sender.name}" />`;
          messageOfMe.html(`${senderAvatar} ${converEmojiMessage}`);
          
          increaseNumberMessageGroup(divId);
          dataToEmit.groupId = targetId;
        } else {
          messageOfMe.html(converEmojiMessage);
          dataToEmit.contactId = targetId;
        }

        // Step 02: append message data to screen
        $(`.right .chat[data-chat=${divId}]`).append(messageOfMe);
        nineScrollRight(divId);

        // Step 03: remove all data at input
        $(`#write-chat-${divId}`).val("");
        currentEmojoneArea.find(".emojionearea-editor").text("");

        // Step 04: change data preview & time in leftSide
        $(`.person[data-chat=${divId}]`).find("span.time").removeClass("message-time-realtime").html(moment(data.message.createdAt).locale("vi").startOf("seconds").fromNow());
        $(`.person[data-chat=${divId}]`).find("span.preview").html(emojione.toImage(data.message.text));

        // Step 05: Move conversation to the top
        $(`.person[data-chat=${divId}]`).on("x.moveConversationToTheTop", function() {
          let dataToMove = $(this).parent();
          $(this).closest("ul").prepend(dataToMove);
          $(this).off("x.moveConversationToTheTop");
        });
        $(`.person[data-chat=${divId}]`).trigger("x.moveConversationToTheTop");

        // Step 06: Emit real-time
        socket.emit("chat-text-emoji", dataToEmit);

        // Step 07: Emit remove typing real-time
        typingOff(divId);

        // Step 08: If this has typing, remove that immediate
        let checkTyping = $(`.chat[data-chat=${divId}]`).find("div.bubble-typing-gif");
        if (checkTyping.length) {
          checkTyping.remove();
        }
      }).fail(function(response) {
        alertify.notify(response.responseText, "error", 7);
      });
    } 
  });
}

$(document).ready(function () {
  socket.on("response-chat-text-emoji", function(response) {
    let divId = "";
    // Step 01: handle message data before show
    let messageOfYou = $(`<div class="bubble you" data-mess-id="${response.message._id}"></div>`);
    messageOfYou.text(response.message.text);
    let converEmojiMessage = emojione.toImage(messageOfYou.html());

    if (response.currentGroupId) {
      let senderAvatar = `<img src="/images/users/${response.message.sender.avatar}" class="avatar-small" title="${response.message.sender.name}" />`;
      messageOfYou.html(`${senderAvatar} ${converEmojiMessage}`);

      divId = response.currentGroupId;
      
      if (response.currentUserId !== $("#dropdown-navbar-user").data("uid")) {
        increaseNumberMessageGroup(divId);
      }
    } else {
      messageOfYou.html(converEmojiMessage);

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
    $(`.person[data-chat=${divId}]`).find("span.preview").html(emojione.toImage(response.message.text));

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
  });
});
