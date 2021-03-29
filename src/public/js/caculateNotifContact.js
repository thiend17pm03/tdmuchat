function increaseNumberNotifContact(className) {
  let currentValue = +$(`.${className}`).find("em").text() || 0;
  currentValue += 1;

  if (currentValue === 0) {
    $(`.${className}`).html("");
  } else {
    $(`.${className}`).html(`(<em>${currentValue}</em> )`);
  }
}

function decreaseNumberNotifContact(className) {
  let currentValue = +$(`.${className}`).find("em").text() || 0;
  currentValue -= 1;

  if (currentValue === 0) {
    $(`.${className}`).html("");
  } else {
    $(`.${className}`).html(`(<em>${currentValue}</em> )`);
  }
}
