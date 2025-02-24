import { createBoardElement } from "./board-elements.js";
import {
  convertCoordsToNumber,
  getCell,
  getRandomCell,
  isCellOccupied,
  isCellInsideOfBoard,
  separateChars,
  convertCoordsToString,
} from "./cell.js";
import data from "./data-objects.js";
import { beginIntroduction, beginLoading } from "./gameplay-chapters.js";
import MessageHandler, {
  disableAllControlButtons,
  enableAllControlButtons,
} from "./message-box.js";
import { populateShips } from "./ship.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const active = "active";

const messageBoxClass = ".message-box";
const messageBox = document.querySelector(messageBoxClass);
const messageControls = ".message-box-controls";
export const messageBoxControls = document.querySelector(messageControls);
const messageTextClass = ".message-box-text";
export const messageText = document.querySelector(messageTextClass);
export const dataButton = "[data-button]";

const userInputID = "user-input";
export const userInputField = document.getElementById(userInputID);

export const messageHandler = new MessageHandler(
  messageBox,
  messageBoxControls,
  messageText
);

const boardSize = 6;
const gameContainerClass = ".game-board-container";
const gameContainer = document.querySelector(gameContainerClass);

const shipData = [{ name: "Carrier", lives: 5, length: 5 }];

export let textSpeed = 10;
export let messageListIndex = 0;
export let dataObjectIndex = 0;
export let currentMessageObj = data.introductions[dataObjectIndex];
export let userInput = "";
let userSaidYes = false;
let userSaidNo = false;

const playerBoardData = createBoardElement(boardSize, "large", "player");
const playerBoard = playerBoardData.object;
const playerBoardElement = playerBoardData.element;
const computerBoardData = createBoardElement(boardSize, "large", "computer");
const computerBoard = computerBoardData.object;
const computerBoardElement = computerBoardData.element;

export const setDataObjectIndex = (num) => (dataObjectIndex = num);

export const setCurrentMessageObj = (messageObj) =>
  (currentMessageObj = messageObj);

export const setUserInput = (value) => (userInput = value);

export const setUserInputField = (value) => (userInputField.value = value);

export const setUserSaidYes = (boolean) => (userSaidYes = boolean);

export const setUserSaidNo = (boolean) => (userSaidNo = boolean);

export const setActive = (target, selector = null) => {
  removeSelectedActive(selector);
  target.classList.add(active);
};

export const removeSelectedActive = (selector) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) selectedElement.classList.remove(active);
};

export const removeActive = (target) => target.classList.remove(active);

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
  setUserSaidNo(false);
  setUserSaidYes(false);
};

const resetUserInput = () => {
  setUserInputField("");
  setUserInput("");
};

// RUN APPLICATION

gameContainer.appendChild(playerBoardElement);
gameContainer.appendChild(computerBoardElement);

// beginLoading().then(beginIntroduction);
// getCell(playerBoard, "A0").displayStatus();
const ships = [];
populateShips(shipData, ships);

/* ============= */

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
        setUserSaidYes(true);
        currentMessageObj.yesStep();
        break;
      case "no":
        setUserSaidNo(true);
        currentMessageObj.noStep();
        break;
    }
  }
});

document.addEventListener("click", (e) => {
  const isTile = e.target.matches(".tile");

  if (!isTile) {
    removeSelectedActive(".tile");
  }

  if (isTile) {
    setActive(e.target, ".tile");
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
