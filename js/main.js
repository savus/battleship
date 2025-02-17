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
const userInputField = document.getElementById("user-input");

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

const data = {
  introductions: [
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
      prevStep: () => {
        clearText(messageBox);
        removeActive(messageBox);
      },
      nextStep: () => {
        nextStep();
      },
    },
    {
      dataState: "prompt",
      messageList: ["What do you like for breakfast in the morning?"],
      promptStep: () => {
        userInput = userInputField.value;
        console.log(`You like ${userInput}?`);
        clearText(messageText);
        userInputField.value = "";
        nextStep();
      },
    },
    {
      dataState: "confirm",
      messageList: [
        "This is a confirm message, like maybe for a warning or something",
      ],
      confirmStep: () => {
        clearText(messageText);
        nextStep();
      },
    },
    {
      dataState: "yes-no",
      messageList: ["Answer yes or no, do you like pancakes"],
      yesNoStep: () => {
        if (userSaidNo) {
          console.log("You don't like pancakes!?");
        }
        if (userSaidYes) {
          console.log("You actually DO like pancakes?!?!?!?");
        }
        removeActive(messageBox);
      },
    },
  ],
};

let dataObjectIndex = 0;
let messageListIndex = 0;
let userInput = "";
let userSaidYes = false;
let userSaidNo = false;

const setActive = (target, selector = null) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) selectedElement.classList.remove(active);
  target.classList.add(active);
};

const removeActive = (target) => target.classList.remove(active);

const setControlState = (element, dataState) => {
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

const clearText = (textField) => (textField.innerText = "");

const resetYesAndNo = () => {
  userSaidNo = false;
  userSaidYes = false;
};

const resetUserInput = () => {
  userInputField.value = "";
  userInput = "";
};

/* APPLICATION FLOW */

const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
  await pause(300);
  setActive(messageBox);
};

const beginIntroduction = async () => {
  await pause(1000);
};

/* EVENT LISTENERS: CLICK */

// =========

// RUN APPLICATION
class MessageHandler {
  messageListIndex = 0;
  constructor(messageBox, controls, textField) {
    this.controls = controls;
    this.messageBox = messageBox;
    this.textField = textField;
  }

  openMessageBox = () => {
    setActive(this.messageBox);
  };

  updateControlState = (messageObj) => {
    setControlState(this.controls, messageObj.dataState);
  };

  readCurrentMessage = (messageObj) => {
    typeWords(
      this.textField,
      messageObj.messageList[this.messageListIndex],
      20
    );
  };

  readPrevMessage = (messageObj) => {
    const isFirstMessage = this.messageListIndex === 0;
    if (!isFirstMessage) {
      this.messageListIndex--;
      this.readCurrentMessage(messageObj);
    } else {
      messageObj.prevStep();
    }
  };

  readNextMessage = (messageObj) => {
    this.messageListIndex++;
    const isLastMessage =
      this.messageListIndex === messageObj.messageList.length;
    if (!isLastMessage) {
      this.readCurrentMessage(messageObj);
    } else {
      messageObj.nextStep();
    }
  };
}

const messageHandler = new MessageHandler(
  messageBox,
  messageBoxControls,
  messageText
);

// beginLoading().then(beginIntroduction);
let currentMessageObj = data.introductions[dataObjectIndex];

const handleMessage = (messageObj) => {
  typeWords(messageText, messageObj.messageList[messageListIndex], 10);
};

const nextStep = () => {
  clearText(messageText);
  dataObjectIndex += 1;
  messageListIndex = 0;
  currentMessageObj = dataObjects[dataObjectIndex];
  setControlState(messageBoxControls, currentMessageObj.dataState);
  handleMessage(currentMessageObj);
};

messageHandler.openMessageBox();
messageHandler.updateControlState(currentMessageObj);
messageHandler.readCurrentMessage(currentMessageObj);

nextButton.addEventListener("click", () => {
  messageHandler.readNextMessage(currentMessageObj);
  // const isLastMessage =
  //   messageListIndex === currentMessageObj.messageList.length - 1;
  // if (isLastMessage) currentMessageObj.nextStep();
  // else {
  //   messageListIndex += 1;
  //   handleMessage(currentMessageObj);
  // }
});

prevButton.addEventListener("click", () => {
  messageHandler.readPrevMessage(currentMessageObj);
  // const isFirstMessage = messageListIndex === 0;
  // if (isFirstMessage) currentMessageObj.prevStep();
  // else {
  //   messageListIndex -= 1;
  //   handleMessage(currentMessageObj);
  // }
});

promptButton.addEventListener("click", () => {
  // currentMessageObj.promptStep();
});

confirmButton.addEventListener("click", () => {
  // currentMessageObj.confirmStep();
});

yesButton.addEventListener("click", () => {
  // userSaidYes = true;
  // currentMessageObj.yesNoStep();
});

noButton.addEventListener("click", () => {
  // userSaidNo = true;
  // currentMessageObj.yesNoStep();
});

// messageHandler.setMessageBoxState("prev-next");
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
