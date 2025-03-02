import { active, alphabet, setUserInput, setUserInputField } from "./main.js";
import {
  disableAllControlButtons,
  enableAllControlButtons,
} from "./message-box.js";

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
