const active = "active";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);
const loadingScreenDuration = 5000;

const messageBoxClass = ".message-box";
const messageBox = document.querySelector(messageBoxClass);
const messageControls = ".message-box-controls";
const messageBoxControls = document.querySelector(messageControls);
const messageTextClass = ".message-box-text";
const messageText = document.querySelector(messageTextClass);

const btnPrompt = ".btn-prompt";
const btnPrev = ".btn-prev";
const btnYes = ".btn-yes";
const btnNo = ".btn-no";
const btnNext = ".btn-next";
const btnConfirm = ".btn-confirm";

const promptButton = document.querySelector(btnPrompt);
const prevButton = document.querySelector(btnPrev);
const yesButton = document.querySelector(btnYes);
const noButton = document.querySelector(btnNo);
const nextButton = document.querySelector(btnNext);
const confirmButton = document.querySelector(btnConfirm);

const messages = [
  {
    dataState: "prev-next",
    messageList: [
      "This is the first message",
      "This is going to be the second message",
      "And this here, hooooo boy, this is the third message",
      "You still with me here? Fourth message up and comming",
      "Aint no one stopping the fifth message",
      "For programming purposes, this should be the last message",
    ],
  },
];

let messageIndex = 0;

const setActive = (target, selector = null) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) selectedElement.classList.remove(active);
  target.classList.add(active);
};

const removeActive = (target) => target.classList.remove(active);

const setMessageBoxControlsState = (element, dataState) => {
  element.setAttribute("data-state", dataState);
};

const disableButton = (btn) => (btn.disabled = true);

const enableButton = (btn) => (btn.disabled = false);

const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

const typeWords = async (textField, message, typeSpeed = 50) => {
  const letters = message.split("");
  let text = "";
  for (let i = 0; i < letters.length; i++) {
    text += letters[i];
    textField.innerText = text;
    await pause(typeSpeed);
  }
};

const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
  await pause(300);
  setActive(messageBox);
};

const beginIntroduction = async () => {
  await pause(1000);
  messageHandler.displayMessage(messages[messageIndex]);
};

/* EVENT LISTENERS: CLICK */

messageBoxControls.addEventListener("click", ({ target }) => {
  if (target.dataset.button) {
    console.log(target.dataset.button);
  }
});

class MessageHandler {
  messageIndex = 0;
  constructor(messageBox, textField, messageControls) {
    this.messageBox = messageBox;
    this.textField = textField;
    this.messageControls = messageControls;
  }
}

const messageHandler = new MessageHandler(
  messageBox,
  messageText,
  messageBoxControls
);

// =========

// RUN APPLICATION

// beginLoading().then(beginIntroduction);

/* ============= */

//DEBUGGING
let testState = false;
let testMessage =
  "This is some text that I'm testing for the purposes of the text displayed to the user in my message box.";
const testControls = () => {
  if (!testState) setActive(messageBox);
  else removeActive(messageBox);
  testState = !testState;
  // typeWords(messageText, testMessage);
  // const currentMessageObj = messages[messageIndex];
  // messageHandler.setControlsState(currentMessageObj);
  // messageHandler.typeMessage(currentMessageObj);
  // messageIndex++;
};

document.addEventListener("keyup", (e) => {
  const key = e.key;
  switch (key) {
    case "e":
      testControls();
      break;
    default:
      break;
  }
});
