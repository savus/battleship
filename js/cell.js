import { alphabet } from "./main.js";

export class Cell {
  htmlElement;
  constructor(type, id, status) {
    this.type = type;
    this.id = id;
    this.status = status;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);

  displayStatus = () => {
    this.htmlElement.setAttribute("data-status", this.getStatus());
  };
}

export const createCell = (type, id, status) => {
  const cell = new Cell(type, id, status);
  return cell;
};

export const getCell = (board, coords) => {
  const letter = coords.slice(0, 1);
  const number = coords.slice(1);
  return board.grid[letter][number];
};

export const getRandomCell = (board, boardSize) => {
  const randomXCoord = Math.floor(Math.random() * boardSize);
  const randomYCoord = Math.floor(Math.random() * boardSize);
  const convertedXCoord = alphabet[randomXCoord];
  const randomCoords = `${convertedXCoord}${randomYCoord}`;
  const randomCell = getCell(board, randomCoords);
  return { cell: randomCell, coords: randomCoords };
};

export const isCellOccupied = (cell) => cell.getStatus() !== "empty";

export const convertCoordsToNumber = (coords) => {
  const yCoords = coords.slice(0, 1).charCodeAt() - 65;
  const xCoords = parseInt(coords.slice(1));
  return { column: yCoords, row: xCoords };
};

export const isCellInsideOfBoard = (coords, boardSize) => {
  const { column, row } = convertCoordsToNumber(coords);
  console.log(column, row);
  return column < boardSize && row < boardSize;
};
