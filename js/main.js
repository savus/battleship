import {
  displayAllShipTiles,
  hideAllShipTiles,
  swapBoardClasses,
  toggleBoardTileClass,
} from "./board-elements.js";
import data from "./data-objects.js";
import {
  beginIntroduction,
  beginLoading,
  endGame,
  pauseBetweenAnimations,
  pauseBetweenSetup,
} from "./gameplay-chapters.js";
import { pause, removeSelectedActive, setActive } from "./helper-functions.js";
import { messageBoxControls, messageHandler } from "./message-box.js";
import { Player } from "./player.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const active = "active";
export const dataButton = "[data-button]";

const dataOpen = "[data-open]";
const openTab = document.querySelector(dataOpen);
const debugClass = ".debug-button";
const debugButton = document.querySelector(debugClass);
const cheatClass = ".cheat-mode-button";
const cheatModeButton = document.querySelector(cheatClass);
const exitGameClass = ".exit-game-button";
const exitGameButton = document.querySelector(exitGameClass);
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
// beginLoading();

// beginLoading().then(beginIntroduction);

// beginIntroduction();

gameContainer.appendChild(user.boardHTML);
gameContainer.appendChild(computer.boardHTML);

const testFunc = async () => {
  toggleBoardTileClass(user.boardHTML.id, "set-up");
  setActive(computer.boardHTML, ".game-board");
  toggleBoardTileClass(computer.boardHTML.id, "set-up");
  await pause(pauseBetweenSetup);
  swapBoardClasses(user.boardHTML, "hovering", "set-up");
  swapBoardClasses(computer.boardHTML, "hovering", "set-up");
};

testFunc();

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

openTab.addEventListener("click", ({ target }) => {
  const menu = target.closest(".options-menu");
  menu.classList.toggle("open");
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

cheatModeButton.addEventListener("click", () => {
  setCheatingMode(!cheatingMode);
});

exitGameButton.addEventListener("click", () => {
  endGame();
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
    default:
      break;
  }
});
