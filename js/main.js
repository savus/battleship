import { beginIntroduction, endGame } from "./gameplay-chapters.js";
import {
  autoConfirmMessageBox,
  removePreviousActive,
  setActive,
} from "./utility-functions.js";
import { messageBoxControls, messageHandler } from "./message-box.js";
import { Player } from "./player.js";
import messageData from "./message-data-objects.js";
import {
  debugButton,
  exitGameButton,
  hardModeButton,
  openTab,
  toggleOption,
  updateOptions,
} from "./options-menu.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const active = "active";
export const dataButton = "[data-button]";
export const root = document.documentElement;

const userInputID = "user-input";
export const userInputField = document.getElementById(userInputID);

export const boardSize = 6;
const gameContainerClass = ".game-board-container";
export const gameContainer = document.querySelector(gameContainerClass);
const boardControlsClass = ".board-controls";
const boardControls = document.querySelector(boardControlsClass);
export const user = new Player("player", boardSize, "large");
export const computer = new Player("computer", boardSize, "large");
const players = [user, computer];

export let textSpeed = 10;
export let messageListIndex = 0;
export let messageObjIndex = 0;
export let currentMessageObj = messageData.introductions[messageObjIndex];
export let userInput = "";
export let currentTurn = "player";
export let debugMode = false;
export let hardMode = false;
let playerIndex = 1;
export let userSaidYes = false;
export let userSaidNo = false;

export const setMessageObjIndex = (num) => (messageObjIndex = num);
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
export const setHardMode = (boolean) => (hardMode = boolean);
export const getCurrentPlayer = (player, opponent) =>
  getCurrentTurn() === "player" ? player : opponent;
export const getOpposingPlayer = (player, opponent) =>
  getCurrentTurn() === "player" ? opponent : player;
const setPlayerIndex = (num) => (playerIndex = num);
const incrementPlayerIndex = () => {
  const isLastIndex = playerIndex === players.length - 1;
  setPlayerIndex(isLastIndex ? 0 : playerIndex + 1);
  console.log(playerIndex);
};
const decrementPlayerIndex = () => {
  const isFirstIndex = playerIndex === 0;
  setPlayerIndex(isFirstIndex ? players.length - 1 : playerIndex - 1);
  console.log(playerIndex);
};

// RUN APPLICATION

updateOptions();

beginIntroduction();

/* ============= */

/* EVENT HANDLERS */
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
        setUserInput(userInputField.value);
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

openTab.addEventListener("click", ({ target }) => {
  const menu = target.closest(".options-menu");
  menu.classList.toggle("open");
});

boardControls.addEventListener("click", ({ target }) => {
  const leftButton = target.classList.contains("left");
  const rightbutton = target.classList.contains("right");
  if (leftButton) decrementPlayerIndex();
  if (rightbutton) incrementPlayerIndex();
  setActive(players[playerIndex].boardHTML, ".game-board");
});

debugButton.addEventListener("click", () => {
  if (!debugMode) {
    user.board.displayAllShipTiles();
    computer.board.displayAllShipTiles();
  } else {
    computer.board.hideAllShipTiles();
  }
  setDebugMode(!debugMode);
  updateOptions();
});

hardModeButton.addEventListener("click", () => {
  setHardMode(!hardMode);
  updateOptions();
});

exitGameButton.addEventListener("click", () => {
  endGame();
});

document.addEventListener("click", (e) => {
  const isTile = e.target.matches(".tile");

  if (!isTile) {
    removePreviousActive(".tile");
  }

  autoConfirmMessageBox(true);

  // if (isTile) {
  //   setActive(e.target, ".tile");
  // }
});

//DEBUGGING
let controlsToggle = false;
// const board1 = document.getElementById("player");
// const board2 = document.getElementById("computer");
// setActive(board1, ".game-board");
// console.log(board1, board2);
const testControls = () => {};

document.addEventListener("keyup", (e) => {
  const key = e.key;
  switch (key) {
    case "e":
      testControls();
      break;
    case "Enter":
      break;
    default:
      break;
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  switch (key) {
    case "Enter":
      e.preventDefault();
      autoConfirmMessageBox(false);
      break;
  }
});
