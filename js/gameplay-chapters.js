import { pause, removeActive, setActive } from "./utility-functions.js";
import {
  computer,
  currentMessageObj,
  gameContainer,
  setCurrentTurn,
  user,
} from "./main.js";
import { messageHandler } from "./message-box.js";
import messageData from "./message-data-objects.js";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);

const loadingScreenDuration = 5000;
export const pauseBetweenAnimations = 500;
export const pauseBetweenSetup = pauseBetweenAnimations * 6;

/* APPLICATION GAMEPLAY */

export const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
};

export const beginIntroduction = async () => {
  await pause(pauseBetweenAnimations);
  messageHandler.openMessageBox();
  await pause(pauseBetweenAnimations);
  messageHandler.readCurrentMessage(currentMessageObj);
};

export const buildGameBoards = async () => {
  await pause(pauseBetweenAnimations);
  gameContainer.appendChild(user.boardHTML);
  gameContainer.appendChild(computer.boardHTML);
  user.placeAllShips();
  computer.placeAllShips();
  runBoardSetupAnimation();
};

export const runBoardSetupAnimation = async () => {
  user.board.toggleBoardTileClass("set-up");
  computer.board.toggleBoardTileClass("set-up");
  await pause(pauseBetweenSetup);
  user.board.toggleBoardTileClass("set-up");
  user.board.toggleBoardTileClass("hovering");
  computer.board.toggleBoardTileClass("set-up");
  computer.board.toggleBoardTileClass("hovering");
  setActive(user.boardHTML, "game-board");
  await pause(pauseBetweenAnimations);
  user.board.displayAllBoardTiles();
};

export const endGame = async () => {
  setCurrentTurn("end");
  messageHandler.openMessageBox();
  messageHandler.goToMessageData(messageData.gameEnd, 0);
};
