import {
  convertCoordsToNumber,
  getRandomCell,
  isCellInsideOfBoard,
  isCellOccupied,
} from "./cell.js";

export class Ship {
  isHorizontal = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
  pieceCoords = [];
  occupiedTiles = [];
  occupiedCells = [];

  constructor({ name, lives, length }) {
    this.name = name;
    this.lives = lives;
    this.length = length;
  }

  placeShipPieces = (board, boardSize) => {};
}

export const populateShips = (shipData, shipList) => {
  shipData.forEach((ship) => shipList.push(new Ship(ship)));
};
