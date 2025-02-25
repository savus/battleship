import {
  areCoordsWithinBoard,
  convertCoordsToNumber,
  convertCoordsToString,
  getCell,
  getRandomCell,
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
    this.pieceCoords.length = 0;
    let cell = getRandomCell(this.board, boardSize);
    let { column, row } = convertCoordsToNumber(cell.coords);
    let string;
    for (let i = 0; i < this.length; i++) {
      if (isCellOccupied(cell)) return this.placeShipPieces(boardSize);

      this.pieceCoords.push(cell.coords);
      this.isHorizontal ? row++ : column++;
      string = convertCoordsToString({ column, row });

      if (!areCoordsWithinBoard(string, boardSize))
        return this.placeShipPieces(boardSize);

      cell = getCell(this.board, string);
    }

    for (const string of this.pieceCoords) {
      cell = getCell(this.board, string);
      cell.setStatus("occupied");
      cell.displayStatus();
      this.occupiedCells.push(cell);
      this.occupiedTiles.push(cell.htmlElement);
    }
  };
}

export const populateShips = (dataList, shipBoard) => {
  return dataList.map((shipData) => new Ship(shipData, shipBoard));
};
