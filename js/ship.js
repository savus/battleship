import {
  convertCoordsToNumber,
  convertCoordsToString,
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

  placeShipPieces = (board, boardSize) => {
    this.pieceCoords.length = 0;
    let cell = getRandomCell(board, boardSize);
    for (let i = 0; i < this.length; i++) {
      if (
        isCellOccupied(cell) ||
        !isCellInsideOfBoard(cell.coords, boardSize)
      ) {
        this.placeShipPieces(board, boardSize);
      }
    }
    // this.pieceCoords.push(cell.coords);
    // cell.setStatus("occupied");
    // cell.displayStatus();
  };
}

export const populateShips = (shipData, shipList) => {
  shipData.forEach((ship) => shipList.push(new Ship(ship)));
};
