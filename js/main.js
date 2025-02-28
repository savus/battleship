import { displayAllShipTiles, hideAllShipTiles } from "./board-elements.js";
import data from "./data-objects.js";
import { beginIntroduction, beginLoading } from "./gameplay-chapters.js";
import { removeSelectedActive } from "./helper-functions.js";
import { messageBoxControls, messageHandler } from "./message-box.js";
import { Player } from "./player.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const active = "active";
export const dataButton = "[data-button]";

const debugClass = ".debug-button";
const debugButton = document.querySelector(debugClass);
const userInputID = "user-input";
export const userInputField = document.getElementById(userInputID);

export const boardSize = 6;
const gameContainerClass = ".game-board-container";
export const gameContainer = document.querySelector(gameContainerClass);
export const user = new Player("player", boardSize, "large");
export const computer = new Player("computer", boardSize, "large");

export let textSpeed = 10;
export let messageListIndex = 0;
export let dataObjectIndex = 0;
export let currentMessageObj = data.introductions[dataObjectIndex];
export let userInput = "";
export let currentTurn = "player";
export let debugMode = false;
export let cheatingMode = true;
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
export const reverseCurrentTurn = () => {
  const oppositeTurn = getCurrentTurn() === "player" ? "computer" : "player";
  setCurrentTurn(oppositeTurn);
};
export const setDebugMode = (boolean) => (debugMode = boolean);
export const setCheatingMode = (boolean) => (cheatingMode = boolean);
export const getCurrentPlayer = (player, opponent) =>
  getCurrentTurn() === "player" ? player : opponent;
export const getOpposingPlayer = (player, opponent) =>
  getCurrentTurn() === "player" ? opponent : player;

// RUN APPLICATION

// beginLoading().then(beginIntroduction);

beginIntroduction();

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
