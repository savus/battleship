import { alphabet } from "./main.js";

export class Cell {
  htmlElement;
  constructor(type, status, coords) {
    this.type = type;
    this.status = status;
    this.coords = coords;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);

  displayStatus = () => {
    this.htmlElement.setAttribute("data-status", this.getStatus());
  };
}

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

export const convertCoordsToString = ({ col, row }) => `${alphabet[col]}${row}`;

export const getRandomCell = (board, boardSize) => {
  const randomYCoord = alphabet[Math.floor(Math.random() * boardSize)];
  const randomXCoord = Math.floor(Math.random() * boardSize);
  return getCell(board, `${randomYCoord}${randomXCoord}`);
};

export const isCellOccupied = (cell) => cell.getStatus() !== "empty";

export const isCellInsideOfBoard = (cell, boardSize) => {
  const { column, row } = convertCoordsToNumber(cell.coords);
  return column < boardSize && row < boardSize;
};
