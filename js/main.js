import { createBoardElement } from "./board-elements.js";
import MessageHandler, {
  goToNextDataObject,
  goToPrevDataObject,
} from "./message-box.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const active = "active";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);
const loadingScreenDuration = 5000;
const pauseBetweenAnimations = 500;

const messageBoxClass = ".message-box";
const messageControls = ".message-box-controls";
const messageTextClass = ".message-box-text";
const messageBox = document.querySelector(messageBoxClass);
const messageBoxControls = document.querySelector(messageControls);
const messageText = document.querySelector(messageTextClass);
const dataButton = "[data-button]";

const userInputID = "user-input";
const userInputField = document.getElementById(userInputID);

const messageHandler = new MessageHandler(
  messageBox,
  messageBoxControls,
  messageText
);

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
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
      nextStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
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
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "prev-next",
      messageList: [
        "This is another prev-next message list, like maybe for a warning or something",
        "Like before you should be able to click back and forth between the texts",
        "This is number 3",
      ],
      prevStep: () => {
        goToPrevDataObject(data.introductions, messageHandler);
      },
      nextStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "confirm",
      messageList: [
        "This is a confirm message, like maybe for a warning or something",
      ],
      confirmStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "yes-no",
      messageList: ["Answer yes or no, do you like pancakes"],
      noStep: () => {
        console.log("You don't like pancakes!?");
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
      yesStep: () => {
        console.log("You actually DO like pancakes?!?!?!?");
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
    },
  ],
};

const gameContainerClass = ".game-board-container";
const gameContainer = document.querySelector(gameContainerClass);

const shipData = [{ name: "Carrier", lives: 5, length: 5 }];

export let textSpeed = 10;
export let messageListIndex = 0;
export let dataObjectIndex = 0;
export let currentMessageObj = data.introductions[dataObjectIndex];
let userInput = "";
let userSaidYes = false;
let userSaidNo = false;

const playerBoardData = createBoardElement(6, "large", "player");
const playerBoard = playerBoardData.object;
const playerBoardElement = playerBoardData.element;
const computerBoardData = createBoardElement(6, "large", "computer");
const computerBoard = computerBoardData.object;
const computerBoardElement = computerBoardData.element;

export const setDataObjectIndex = (num) => (dataObjectIndex = num);

export const setCurrentMessageObj = (messageObj) =>
  (currentMessageObj = messageObj);

export const setActive = (target, selector = null) => {
  removeSelectedActive(selector);
  target.classList.add(active);
};

export const removeSelectedActive = (selector) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) selectedElement.classList.remove(active);
};

export const removeActive = (target) => target.classList.remove(active);

export const setControlState = (element, dataState) => {
  element.setAttribute("data-state", dataState);
};

const disableButton = (btn) => (btn.disabled = true);

const enableButton = (btn) => (btn.disabled = false);

export const disableAllControlButtons = () =>
  document
    .querySelectorAll(dataButton)
    .forEach((button) => disableButton(button));

export const enableAllControlButtons = () =>
  document
    .querySelectorAll(dataButton)
    .forEach((button) => enableButton(button));

export const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

export const typeWords = async (textField, message, typeSpeed = 50) => {
  disableAllControlButtons();
  const letters = message.split("");
  let text = "";
  for (let i = 0; i < letters.length; i++) {
    text += letters[i];
    textField.innerText = text;
    await pause(typeSpeed);
  }
  enableAllControlButtons();
};

export const clearText = (textField) => (textField.innerText = "");

const resetYesAndNo = () => {
  userSaidNo = false;
  userSaidYes = false;
};

const resetUserInput = () => {
  userInputField.value = "";
  userInput = "";
};

/* APPLICATION GAMEPLAY */

const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
};

const beginIntroduction = async () => {
  await pause(pauseBetweenAnimations);
  messageHandler.openMessageBox();
  await pause(pauseBetweenAnimations);
  messageHandler.readCurrentMessage(currentMessageObj);
};

// RUN APPLICATION

gameContainer.appendChild(playerBoardElement);
gameContainer.appendChild(computerBoardElement);

beginLoading().then(beginIntroduction);
/* ============= */

document.addEventListener("click", (e) => {
  const isTile = e.target.matches(".tile");

  if (!isTile) {
    removeSelectedActive(".tile");
  }

  if (isTile) {
    setActive(e.target, ".tile");
  }
});

messageBoxControls.addEventListener("click", ({ target }) => {
  if (target.dataset.button) {
    switch (target.dataset.button) {
      case "next":
        messageHandler.readNextMessage(currentMessageObj);
        break;
      case "prev":
        messageHandler.readPrevMessage(currentMessageObj);
        break;
      case "prompt":
        currentMessageObj.promptStep();
        break;
      case "confirm":
        currentMessageObj.confirmStep();
        break;
      case "yes":
        userSaidYes = true;
        currentMessageObj.yesStep();
        break;
      case "no":
        userSaidNo = true;
        currentMessageObj.noStep();
        break;
    }
  }
});

//DEBUGGING
let controlsToggle = false;
const testControls = () => {};

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
