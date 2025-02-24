import {
  convertCoordsToNumber,
  convertCoordsToString,
  getCell,
  getRandomCell,
  isCellInsideOfBoard,
  isCellOccupied,
} from "./cell.js";

export class Ship {
  isHorizontal = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
  pieceCoords = [];
  occupiedTiles = [];
  occupiedCells = [];

  constructor({ name, lives, length }, board) {
    this.name = name;
    this.lives = lives;
    this.length = length;
    this.board = board;
  }

  placeShipPieces = (boardSize) => {
    return;
  };
}

export const populateShips = (dataList, shipBoard) => {
  return dataList.map((shipData) => new Ship(shipData, shipBoard));
};
