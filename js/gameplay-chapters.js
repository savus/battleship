import {
  getRandomCell,
  goToMessageObj,
  resetPlayers,
  setUpBoards,
  setUpDemoBoards,
  setUpShips,
} from "./helper-functions.js";
import { computer, currentMessageObject, messageBoxHandler } from "./main.js";
import messageObjects from "./message-data-objects.js";

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
