import {
  displayAllBoardTiles,
  toggleBoardTileClass,
} from "./board-elements.js";
import data from "./data-objects.js";
import { pause, removeActive, setActive } from "./helper-functions.js";
import {
  computer,
  currentMessageObj,
  gameContainer,
  setCurrentTurn,
  user,
} from "./main.js";
import { goToDataObject, messageHandler } from "./message-box.js";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);
const loadingScreenDuration = 5000;
const pauseBetweenAnimations = 500;
const pauseBetweenSetup = pauseBetweenAnimations * 6;

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

export const runBoardSetupAnimation = async () => {
  toggleBoardTileClass(user.boardHTML.id, "set-up");
  toggleBoardTileClass(computer.boardHTML.id, "set-up");
  await pause(pauseBetweenSetup);
  toggleBoardTileClass(user.boardHTML.id, "set-up");
  toggleBoardTileClass(user.boardHTML.id, "hovering");
  toggleBoardTileClass(computer.boardHTML.id, "set-up");
  toggleBoardTileClass(computer.boardHTML.id, "hovering");
  await pause(pauseBetweenAnimations);
  displayAllBoardTiles(user.board);
};

export const buildGameBoards = async () => {
  await pause(pauseBetweenAnimations);
  gameContainer.appendChild(user.boardHTML);
  gameContainer.appendChild(computer.boardHTML);
  user.placeAllShips();
  computer.placeAllShips();
  runBoardSetupAnimation();
};

export const endGame = async () => {
  setCurrentTurn("end");
  messageHandler.openMessageBox();
  await pause(pauseBetweenAnimations);
  goToDataObject(data.gameEnd, 0, messageHandler);
};
