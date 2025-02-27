import {
  buildBoardData,
  displayAllBoardTiles,
  displayAllShipTiles,
  hideAllShipTiles,
} from "./board-elements.js";
import { displayCellStatus, getCell, getRandomCell } from "./cell.js";
import data from "./data-objects.js";
import { beginIntroduction, beginLoading } from "./gameplay-chapters.js";
import { removeSelectedActive, setActive } from "./helper-functions.js";
import MessageHandler, {
  messageBox,
  messageBoxControls,
  messageHandler,
  messageText,
} from "./message-box.js";
import { Player } from "./player.js";
import { populateShips, shipData } from "./ship.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const active = "active";
export const dataButton = "[data-button]";

const debugClass = ".debug-button";
const debugButton = document.querySelector(debugClass);
const userInputID = "user-input";
export const userInputField = document.getElementById(userInputID);

export const boardSize = 6;
const gameContainerClass = ".game-board-container";
const gameContainer = document.querySelector(gameContainerClass);

export let textSpeed = 10;
export let messageListIndex = 0;
export let dataObjectIndex = 0;
export let currentMessageObj = data.introductions[dataObjectIndex];
export let userInput = "";
export let currentTurn = "player";
export let debugMode = false;
let userSaidYes = false;
let userSaidNo = false;

export const setDataObjectIndex = (num) => (dataObjectIndex = num);
export const setCurrentMessageObj = (messageObj) =>
  (currentMessageObj = messageObj);
export const setUserInput = (value) => (userInput = value);
export const setUserInputField = (value) => (userInputField.value = value);
export const setUserSaidYes = (boolean) => (userSaidYes = boolean);
export const setUserSaidNo = (boolean) => (userSaidNo = boolean);
export const getCurrentTurn = () => currentTurn;
export const setCurrentTurn = (string) => (currentTurn = string);
export const reverseCurrentTurn = () =>
  currentTurn === "player" ? "computer" : "player";
export const setDebugMode = (boolean) => (debugMode = boolean);

export const user = new Player("player", boardSize, "large");
export const computer = new Player("computer", boardSize, "large");
// RUN APPLICATION

gameContainer.appendChild(user.boardHTML);
gameContainer.appendChild(computer.boardHTML);

user.placeAllShips();
computer.placeAllShips();

displayAllShipTiles(user.board);
// displayAllShipTiles(computer.board);

// beginLoading().then(beginIntroduction);
// beginIntroduction();

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

debugButton.addEventListener("click", () => {
  if (!debugMode) {
    displayAllShipTiles(user.board);
    displayAllShipTiles(computer.board);
  } else {
    hideAllShipTiles(computer.board);
  }
  setDebugMode(!debugMode);
  console.log(debugMode);
});

document.addEventListener("click", (e) => {
  const isTile = e.target.matches(".tile");

  if (!isTile) {
    removeSelectedActive(".tile");
  }

  // if (isTile) {
  //   setActive(e.target, ".tile");
  // }
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
