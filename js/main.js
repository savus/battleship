import { createBoardElement } from "./board-elements.js";
import data from "./data-objects.js";
import { beginIntroduction, beginLoading } from "./gameplay-chapters.js";
import { removeSelectedActive, setActive } from "./helper-functions.js";
import MessageHandler, {
  messageBox,
  messageBoxControls,
  messageHandler,
  messageText,
} from "./message-box.js";
import { populateShips, shipData } from "./ship.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const active = "active";

export const dataButton = "[data-button]";

const userInputID = "user-input";
export const userInputField = document.getElementById(userInputID);

const boardSize = 6;
const gameContainerClass = ".game-board-container";
const gameContainer = document.querySelector(gameContainerClass);

export let textSpeed = 10;
export let messageListIndex = 0;
export let dataObjectIndex = 0;
export let currentMessageObj = data.introductions[dataObjectIndex];
export let userInput = "";
let userSaidYes = false;
let userSaidNo = false;

export const setDataObjectIndex = (num) => (dataObjectIndex = num);

export const setCurrentMessageObj = (messageObj) =>
  (currentMessageObj = messageObj);

export const setUserInput = (value) => (userInput = value);

export const setUserInputField = (value) => (userInputField.value = value);

export const setUserSaidYes = (boolean) => (userSaidYes = boolean);

export const setUserSaidNo = (boolean) => (userSaidNo = boolean);

// RUN APPLICATION

const playerBoardData = createBoardElement(boardSize, "large", "player");
const playerBoard = playerBoardData.object;
const playerBoardElement = playerBoardData.element;
const computerBoardData = createBoardElement(boardSize, "large", "computer");
const computerBoard = computerBoardData.object;
const computerBoardElement = computerBoardData.element;

gameContainer.appendChild(playerBoardElement);
gameContainer.appendChild(computerBoardElement);

beginLoading().then(beginIntroduction);
// getCell(playerBoard, "A0").displayStatus();
// const playerShips = populateShips(shipData, playerBoard);
// const computerShips = populateShips(shipData, computerBoard);
// playerShips.forEach((ship) => ship.placeShipPieces(boardSize));
// computerShips.forEach((ship) => ship.placeShipPieces(boardSize));

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
