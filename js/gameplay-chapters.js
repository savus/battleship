import { pause, removeActive, setActive } from "./utility-functions.js";
import {
  computer,
  currentMessageObj,
  debugMode,
  gameContainer,
  hasPlayedBefore,
  loadingScreenDuration,
  pauseBetweenAnimations,
  pauseBetweenSetup,
  setCurrentTurn,
  setHasPlayedBefore,
  user,
} from "./main.js";
import { messageHandler } from "./message-box.js";
import messageData from "./message-data-objects.js";
import { updateOptions } from "./options-menu.js";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);

/* APPLICATION GAMEPLAY */
export const playGame = () => {
  updateOptions();
  shouldRunLoadingScreen().then(beginIntroduction);
};

export const checkIfPlayedBefore = () => {
  let isLocalStorage = JSON.parse(
    localStorage.getItem("hasPlayedBefore") || false
  );
  return isLocalStorage;
};

export const shouldRunLoadingScreen = async () => {
  if (!checkIfPlayedBefore()) {
    localStorage.setItem("hasPlayedBefore", JSON.stringify(true));
    await beginLoading();
  }
  return;
};

export const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
  await pause(pauseBetweenAnimations);
  return;
};

export const beginIntroduction = async () => {
  messageHandler.openMessageBox();
  await pause(pauseBetweenAnimations);
  messageHandler.readCurrentMessage(currentMessageObj);
};

export const buildGameBoards = async () => {
  gameContainer.appendChild(user.boardHTML);
  gameContainer.appendChild(computer.boardHTML);
  user.placeAllShips();
  computer.placeAllShips();
  setActive(user.boardHTML, "game-board");
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
  await pause(pauseBetweenAnimations);
  user.board.displayAllBoardTiles();
  if (debugMode) {
    computer.board.displayAllBoardTiles();
  }
};

export const endGame = async () => {
  setCurrentTurn("end");
  messageHandler.openMessageBox();
  messageHandler.goToMessageData(messageData.gameEnd, 0);
};
