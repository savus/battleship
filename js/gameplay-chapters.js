import {
  appendGameBoards,
  displayBoardTilesOfPlayers,
  endPlayersSetup,
  pause,
  placeShipsOfPlayers,
  playersSetup,
  removeActive,
  setActive,
  startPlayersHovering,
} from "./utility-functions.js";
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
  return;
};

export const buildGameBoards = async () => {
  appendGameBoards(user, computer);
  placeShipsOfPlayers(user, computer);
  setActive(user.boardHTML, "game-board");
  return runBoardSetupAnimation();
};

export const runBoardSetupAnimation = async () => {
  playersSetup(user, computer);
  await pause(pauseBetweenSetup);
  endPlayersSetup(user, computer);
  startPlayersHovering(user, computer);
  await pause(pauseBetweenAnimations);
  displayBoardTilesOfPlayers(user, computer);
};

export const endGame = async () => {
  setCurrentTurn("end");
  messageHandler.openMessageBox();
  messageHandler.goToMessageData(messageData.gameEnd, 0);
};
