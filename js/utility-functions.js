import {
  active,
  alphabet,
  currentMessageObj,
  debugMode,
  gameContainer,
  setUserInput,
  setUserInputField,
} from "./main.js";
import {
  disableAllControlButtons,
  enableAllControlButtons,
  messageHandler,
} from "./message-box.js";
import { Ship } from "./ship.js";

export const setActive = (target, selector = null) => {
  removePreviousActive(selector);
  target.classList.add(active);
};

export const removePreviousActive = (selector) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) removeActive(selectedElement);
};

export const removeActive = (target) => target.classList.remove(active);

export const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

export const typeWords = async (textField, message, typeSpeed = 50) => {
  disableAllControlButtons();
  const letters = message.split("");
  let text = "";
  for (let i = 0; i < letters.length; i++) {
    text += letters[i];
    textField.innerText = text;
    await pause(typeSpeed);
  }
  enableAllControlButtons();
};

const resetYesAndNo = () => {
  setUserSaidNo(false);
  setUserSaidYes(false);
};

const resetUserInput = () => {
  setUserInputField("");
  setUserInput("");
};

export const separateChars = (coords) => {
  const letter = coords.slice(0, 1);
  const number = coords.slice(1);
  return { letter: letter, number: number };
};

export const getCell = (board, coords) => {
  const { letter: yCoord, number: xCoord } = separateChars(coords);
  return board.grid[yCoord][xCoord];
};

export const convertCoordsToNumber = (coords) => {
  const { letter, number } = separateChars(coords);
  const column = letter.charCodeAt() - 65;
  const row = parseInt(number);
  return { column: column, row: row };
};

export const convertCoordsToString = (coordsData) => {
  const { column, row } = coordsData;
  return `${alphabet[column]}${row}`;
};

export const getRandomCell = (board, boardSize) => {
  const randomYCoord = alphabet[Math.floor(Math.random() * boardSize)];
  const randomXCoord = Math.floor(Math.random() * boardSize);
  return getCell(board, `${randomYCoord}${randomXCoord}`);
};

export const isCellOccupied = (cell) => cell.getStatus() === "occupied";

export const isCellAlreadyAttempted = (cell) =>
  cell.getStatus() === "miss" || cell.getStatus() === "hit";

export const areCoordsWithinBoard = (string, boardSize) => {
  const { column, row } = convertCoordsToNumber(string);
  return column < boardSize && row < boardSize;
};

export const displayCellStatus = (board, coords) => {
  const cell = getCell(board, coords);
  cell.displayStatus();
};

export const autoConfirmMessageBox = (isClicked) => {
  if (isClicked) {
    if (messageHandler.isOpen && currentMessageObj.dataState === "confirm") {
      if (!messageHandler.delayOpenConfirm) {
        messageHandler.delayOpenConfirm = true;
      } else {
        currentMessageObj.confirmStep();
      }
    }
  } else {
    if (messageHandler.isOpen && currentMessageObj.dataState === "confirm") {
      currentMessageObj.confirmStep();
    }
  }
};

export const appendGameBoards = (user, computer) => {
  gameContainer.appendChild(user.boardHTML);
  gameContainer.appendChild(computer.boardHTML);
};

export const placeShipsOfPlayers = (user, computer) => {
  user.placeAllShips();
  computer.placeAllShips();
};

export const playersSetup = (user, computer) => {
  user.board.toggleBoardTileClass("set-up");
  computer.board.toggleBoardTileClass("set-up");
};

export const endPlayersSetup = (user, computer) => {
  user.board.toggleBoardTileClass("set-up");
  computer.board.toggleBoardTileClass("set-up");
};

export const startPlayersHovering = (user, computer) => {
  user.board.toggleBoardTileClass("hovering");
  computer.board.toggleBoardTileClass("hovering");
};

export const displayBoardTilesOfPlayers = (user, computer) => {
  user.board.displayAllBoardTiles();
  if (debugMode) {
    computer.board.displayAllBoardTiles();
  }
};

export const populateShips = (dataList, shipBoard) => {
  return dataList.map((shipData) => new Ship(shipData, shipBoard));
};
