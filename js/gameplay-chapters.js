// import {
//   appendGameBoards,
//   displayBoardTilesOfPlayers,
//   endPlayersSetup,
//   pause,
//   placeShipsOfPlayers,
//   playersSetup,
//   removeActive,
//   setActive,
//   startPlayersHovering,
// } from "./utility-functions.js";
// import {
//   computer,
//   currentMessageObj,
//   hasPlayedBefore,
//   loadingScreenDuration,
//   pauseBetweenAnimations,
//   pauseBetweenSetup,
//   setCurrentTurn,
//   setTutorialMode,
//   user,
// } from "./main.js";
// import { messageHandler } from "./message-box.js";
// import messageData from "./message-data-objects.js";
// import { updateOptions } from "./options-menu.js";
// import { gameBoardClass } from "./board-elements.js";

import {
  getRandomCell,
  goToMessageObj,
  readCustomMessageObj,
  resetPlayers,
  setUpBoards,
  setUpDemoBoards,
  setUpShips,
} from "./helper-functions.js";
import { computer, currentMessageObject, messageBoxHandler } from "./main.js";
import messageObjects from "./message-data-objects.js";

// const loadingClass = ".loading-screen";
// const loader = document.querySelector(loadingClass);

// export const playGame = () => {
//   updateOptions();
//   shouldRunLoadingScreen().then(beginIntroduction);
// };

// export const checkIfPlayedBefore = () => {
//   let isLocalStorage = JSON.parse(
//     localStorage.getItem(hasPlayedBefore) || false
//   );
//   return isLocalStorage;
// };

// export const shouldRunLoadingScreen = async () => {
//   if (!checkIfPlayedBefore()) {
//     localStorage.setItem(hasPlayedBefore, JSON.stringify(true));
//     await beginLoading();
//   }
//   return;
// };

// export const beginLoading = async () => {
//   setActive(loader);
//   await pause(loadingScreenDuration);
//   removeActive(loader);
//   await pause(pauseBetweenAnimations);
//   return;
// };

// export const beginIntroduction = async () => {
//   messageHandler.openMessageBox();
//   await pause(pauseBetweenAnimations);
//   messageHandler.readCurrentMessage(currentMessageObj);
//   return;
// };

// export const buildGameBoards = async () => {
//   setTutorialMode(false);
//   appendGameBoards(user, computer);
//   placeShipsOfPlayers(user, computer);
//   setActive(user.boardHTML, gameBoardClass);
//   return runBoardSetupAnimation();
// };

// export const runBoardSetupAnimation = async () => {
//   playersSetup(user, computer);
//   await pause(pauseBetweenSetup);
//   endPlayersSetup(user, computer);
//   startPlayersHovering(user, computer);
//   await pause(pauseBetweenAnimations);
//   displayBoardTilesOfPlayers(user, computer);
// };

// export const endGame = async () => {
//   setCurrentTurn("end");
//   messageHandler.openMessageBox();
//   messageHandler.goToMessageData(messageData.gameEnd, 0);
// };

export const beginIntro = () => {
  messageBoxHandler.readMessageObj(currentMessageObject);
};

export const beginTutorial = () => {
  resetPlayers();
  setUpDemoBoards();
  setUpShips();
};

export const tutorialMissTile = () => {
  const cell = getRandomCell(computer.board.grid);
  cell.updateTile("miss");
};

export const tutorialHitPiece = (player) => {
  const tutorialCell = player.ships[0].occupiedCells[0];
  tutorialCell.updateTile("hit");
};

export const tutorialSunkShip = () => {
  const tutorialShip = computer.ships[0];
  tutorialShip.occupiedCells.forEach((cell) => {
    cell.updateTile("hit");
  });
};

export const tutorialSinkAllShips = () => {
  computer.ships.forEach((ship) => {
    ship.occupiedCells.forEach((cell) => {
      cell.updateTile("hit");
    });
  });
};

export const beginGame = () => {
  resetPlayers();

  setUpBoards();

  setUpShips();
};

export const gameOver = () => {
  goToMessageObj(messageObjects.replay, 0);
};
