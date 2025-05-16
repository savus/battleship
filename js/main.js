// import { endGame, playGame } from "./gameplay-chapters.js";
// import {
//   autoConfirmMessageBox,
//   removeActive,
//   removePreviousActive,
//   setActive,
// } from "./utility-functions.js";
// import { messageBoxControls, messageHandler } from "./message-box.js";
// import { Player } from "./player.js";
// import messageData from "./message-data-objects.js";
// import {
//   debugButton,
//   exitGameButton,
//   hardModeButton,
//   openTab,
//   optionsClass,
//   optionsMenu,
//   updateOptions,
// } from "./options-menu.js";
// import { gameBoardClass, tileClassName } from "./board-elements.js";

import { MessageBoxHandler } from "./message-box.js";
import messageObjects from "./message-data-objects.js";
import Player from "./player.js";
import {
  convertCoordsToNum,
  convertNumToCoords,
  setActive,
} from "./utility-functions.js";

// export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// export const active = "active";
// export const dataButton = "[data-button]";
// export const root = document.documentElement;

// export const loadingScreenDuration = 5000;
// export const pauseBetweenAnimations = 500;
// export const pauseBetweenSetup = pauseBetweenAnimations * 5.5;
// export const computerThinkingDuration = 1500;

// const startScreenClass = ".start-screen";
// const startScreen = document.querySelector(startScreenClass);
// const startButton = document.querySelector(`${startScreenClass} .btn`);

// const userInputID = "user-input";
// export const userInputField = document.getElementById(userInputID);

// export const boardSize = 6;
// const gameContainerClass = ".game-board-container";
// export const gameContainer = document.querySelector(gameContainerClass);

// export const user = new Player("player", boardSize, "large", false);
// export const computer = new Player("computer", boardSize, "large", false);

// export const demoUser = new Player("player", 6, "large", true);
// export const demoComputer = new Player("computer", 6, "large", true);
// export const demoUserShips = ["B2", "B3", "B4", "B5", "A0", "B0", "C0", "D0"];
// export const demoComputerShips = ["C2", "C3", "C4", "C5", "E0", "F0"];

// export let hasPlayedBefore = "hasPlayedBefore";
// export let textSpeed = 10;
// export let messageListIndex = 0;
// export let messageObjIndex = 0;
// export let currentMessageObj = messageData.introductions[messageObjIndex];
// export let userInput = "";
// export let currentTurn = "player";
// export let debugMode = false;
// export let hardMode = false;
// export let userSaidYes = false;
// export let userSaidNo = false;
// export let tutorialMode = false;

// export const setMessageObjIndex = (num) => (messageObjIndex = num);
// export const setCurrentMessageObj = (messageObj) =>
//   (currentMessageObj = messageObj);
// export const setUserInput = (value) => (userInput = value);
// export const setUserInputField = (value) => (userInputField.value = value);
// export const setUserSaidYes = (boolean) => (userSaidYes = boolean);
// export const setUserSaidNo = (boolean) => (userSaidNo = boolean);
// export const getCurrentTurn = () => currentTurn;
// export const setCurrentTurn = (string) => (currentTurn = string);
// export const reverseCurrentTurn = () => {
//   const oppositeTurn = getCurrentTurn() === "player" ? "computer" : "player";
//   setCurrentTurn(oppositeTurn);
// };
// export const setDebugMode = (boolean) => (debugMode = boolean);
// export const setHardMode = (boolean) => (hardMode = boolean);
// export const getCurrentPlayer = (player, opponent) =>
//   getCurrentTurn() === "player" ? player : opponent;
// export const getOpposingPlayer = (player, opponent) =>
//   getCurrentTurn() === "player" ? opponent : player;
// export const setTutorialMode = (boolean) => (tutorialMode = boolean);
// // RUN APPLICATION

// localStorage.removeItem(hasPlayedBefore);
// updateOptions();
// setActive(startScreen);

// /* ============= */

// /* EVENT HANDLERS */

// startButton.addEventListener("click", () => {
//   removeActive(startScreen);
//   playGame();
// });

// messageBoxControls.addEventListener("click", ({ target }) => {
//   if (target.dataset.button) {
//     switch (target.dataset.button) {
//       case "next":
//         messageHandler.readNextMessage(currentMessageObj);
//         break;
//       case "prev":
//         messageHandler.readPrevMessage(currentMessageObj);
//         break;
//       case "prompt":
//         setUserInput(userInputField.value);
//         currentMessageObj.promptStep();
//         break;
//       case "confirm":
//         currentMessageObj.confirmStep();
//         break;
//       case "yes":
//         setUserSaidYes(true);
//         currentMessageObj.yesStep();
//         break;
//       case "no":
//         setUserSaidNo(true);
//         currentMessageObj.noStep();
//         break;
//     }
//   }
// });

// openTab.addEventListener("click", () => {
//   optionsMenu.classList.toggle("open");
// });

// debugButton.addEventListener("click", () => {
//   if (!debugMode) {
//     user.board.displayAllShipTiles();
//     computer.board.displayAllShipTiles();
//   } else {
//     computer.board.hideAllShipTiles();
//   }
//   setDebugMode(!debugMode);
//   updateOptions();
// });

// hardModeButton.addEventListener("click", () => {
//   setHardMode(!hardMode);
//   updateOptions();
// });

// exitGameButton.addEventListener("click", () => {
//   endGame();
// });

// gameContainer.addEventListener("click", ({ target }) => {
//   const isGameBoard = target.matches(`.${gameBoardClass}`);
//   const isRow = target.matches(`.row`);
//   const isTile = target.matches(`.${tileClassName}`);

//   if (isGameBoard || isTile || isRow) {
//     const gameBoard = target.closest(`.${gameBoardClass}`);
//     if (
//       !gameBoard.classList.contains("set-up") &&
//       !gameBoard.classList.contains("demo")
//     ) {
//       setActive(gameBoard, `.${gameBoardClass}`);
//     }
//   }
// });

// /* GLOBAL HANDLERS */
// document.addEventListener("click", (e) => {
//   const isTile = e.target.matches(`.${tileClassName}`);
//   const isOptionsMenu = e.target.closest(optionsClass);
//   const isConfirmButton = e.target.matches(`[data-button="confirm"]`);
//   if (!isTile) {
//     removePreviousActive(`.${tileClassName}`);
//   }

//   if (!isConfirmButton && !tutorialMode) {
//     autoConfirmMessageBox(true);
//   }

//   if (!isOptionsMenu) {
//     optionsMenu.classList.remove("open");
//   }
// });

// document.addEventListener("keydown", (e) => {
//   const key = e.key;
//   switch (key) {
//     case "Enter":
//       e.preventDefault();
//       autoConfirmMessageBox(false);
//       break;
//   }
// });

export const close = "close";
export const active = "active";
export const dataState = "data-state";
export const dataStatus = "data-status";
export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 6;
export const rowClass = "row";
export const tileClass = "tile";
export const hoveringClass = "hovering";
export const tilesClickableClass = "tiles-clickable";
export const boardClickableClass = "board-clickable";

const root = document.documentElement;

export const gameBoardClass = "game-board";
export const messageBoxDur =
  getComputedStyle(root).getPropertyValue("--message-box-dur") * 500;

const messageBoxClass = "message-box";
const headerClass = "message-box-header";
const messageControls = "message-box-controls";
const messageTextClass = "message-box-text";

const messageBox = document.querySelector(`.${messageBoxClass}`);
const messageBoxHeader = document.querySelector(`.${headerClass}`);
const messageBoxControls = document.querySelector(`.${messageControls}`);
const messageText = document.querySelector(`.${messageTextClass}`);

export const messageBoxHandler = new MessageBoxHandler(
  messageBox,
  messageBoxHeader,
  messageBoxControls,
  messageText
);

const controlButtonSelector = "[data-button]";
export const controlButtons = document.querySelectorAll(controlButtonSelector);

const promptInputSelector = "#user-input";
const promptInput = document.querySelector(promptInputSelector);

export let currentMessageIndex = 0;
export let currentMessageObject = messageObjects[currentMessageIndex];

export const setCurrentMessageIndex = (num) => (currentMessageIndex = num);
export const setCurrentMessageObj = (index) =>
  (currentMessageObject = messageObjects[currentMessageIndex]);

export const gameBoardContainerClass = "game-board-container";
export const gameBoardContainer = document.querySelector(
  `.${gameBoardContainerClass}`
);

const testPlayer = new Player("player1", "player", boardSize);
const testPlayer2 = new Player("player2", "computer", boardSize);

testPlayer.addBoardClass(active);
testPlayer.addBoardClass(hoveringClass);
testPlayer.addBoardClass(tilesClickableClass);
testPlayer.addBoardClass(boardClickableClass);
testPlayer2.addBoardClass(hoveringClass);
testPlayer2.addBoardClass(tilesClickableClass);
testPlayer2.addBoardClass(boardClickableClass);

testPlayer.ships.forEach((ship) => ship.placeShipPieces());
testPlayer2.ships.forEach((ship) => ship.placeShipPieces());

// wait(100).then(() => {
//   return messageBoxHandler.readMessageObj(currentMessageObject);
// });

gameBoardContainer.addEventListener("click", ({ target }) => {
  const isGameBoard = target.matches(`.${gameBoardClass}`);
  const isRow = target.matches(`.${rowClass}`);
  const isTile = target.matches(`.${tileClass}`);
  const gameBoardHasBeenClicked = isGameBoard || isRow || isTile;

  if (gameBoardHasBeenClicked) {
    const gameBoard = target.closest(`.${gameBoardClass}`);
    const boardIsClickable = gameBoard.classList.contains(boardClickableClass);
    if (boardIsClickable) setActive(gameBoard, `.${gameBoardClass}`);
  }
});

messageBoxControls.addEventListener("click", ({ target }) => {
  switch (target.dataset.button) {
    case "confirm":
      currentMessageObject.confirmStep();
      break;
    case "prev":
      messageBoxHandler.prevStep(currentMessageObject);
      break;
    case "next":
      messageBoxHandler.nextStep(currentMessageObject);
      break;
    case "prompt":
      currentMessageObject.promptStep(promptInput.value);
      break;
    case "yes":
      currentMessageObject.yesStep();
      break;
    case "no":
      currentMessageObject.noStep();
      break;
  }
});
