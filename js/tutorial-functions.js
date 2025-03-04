import { gameBoardClass } from "./board-elements.js";
import { appendGameBoards, getCell, setActive } from "./utility-functions.js";

export const beginTutorial = (demoUser, demoComputer) => {
  appendGameBoards(demoUser, demoComputer);
  setActive(demoUser.boardHTML, `.${gameBoardClass}`);
};

export const placeDemoShips = (
  demoUser,
  demoComputer,
  demoUserShips,
  demoComputerShips
) => {
  demoUserShips.forEach((coord) => {
    const cell = getCell(demoUser.board, coord);
    cell.updateTile("occupied");
  });
  demoComputerShips.forEach((coord) => {
    const cell = getCell(demoComputer.board, coord);
    cell.updateTile("occupied");
  });
};

export const showComputerShips = (demoComputer, demoComputerShips) => {
  demoComputerShips.forEach((coord) => {
    const cell = getCell(demoComputer.board, coord);
    cell.updateTile("occupied");
  });
};

export const hideComputerShips = (demoComputer, demoComputerShips) => {
  demoComputerShips.forEach((coord) => {
    const cell = getCell(demoComputer.board, coord);
    cell.updateTile("empty");
  });
};

export const showMissedTile = (board, coord) => {
  const cell = getCell(board, coord);
  cell.updateTile("miss");
};

export const showHitTile = (board, coord) => {
  const cell = getCell(board, coord);
  cell.updateTile("hit");
};

export const showSunkShip = (board, coordsList) => {
  coordsList.forEach((coord) => {
    const cell = getCell(board, coord);
    cell.updateTile("hit");
  });
};

export const showGameLost = (board, coordsList) => {
  showSunkShip(board, coordsList);
};
