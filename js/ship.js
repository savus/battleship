import {
  areCoordsWithinBoard,
  convertCoordsToNumber,
  convertCoordsToString,
  getCell,
  getRandomCell,
  isCellOccupied,
} from "./cell.js";

export const shipData = [
  { name: "Carrier", lives: 5, length: 5 },
  { name: "Battleship", lives: 4, length: 4 },
  { name: "Cruiser", lives: 3, length: 3 },
  { name: "Submarine", lives: 3, length: 3 },
  { name: "Destroyer", lives: 2, length: 2 },
];

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
    this.occupiedCells.length = 0;
    this.occupiedTiles.length = 0;
    let startPoint = getRandomCell(this.board, boardSize);
    let { column, row } = convertCoordsToNumber(startPoint.coords);
    if (isCellOccupied(startPoint)) return this.placeShipPieces(boardSize);
    this.pieceCoords.push(startPoint.coords);
    this.occupiedCells.push(startPoint);
    this.occupiedTiles.push(startPoint.htmlElement);
    for (let i = 1; i < this.length; i++) {
      this.isHorizontal ? row++ : column++;
      let stringified = convertCoordsToString({ column, row });

      if (!areCoordsWithinBoard(stringified, boardSize))
        return this.placeShipPieces(boardSize);

      const newCell = getCell(this.board, stringified);

      if (isCellOccupied(newCell)) return this.placeShipPieces(boardSize);
      this.pieceCoords.push(newCell.coords);
      this.occupiedCells.push(newCell);
      this.occupiedTiles.push(newCell.htmlElement);
    }

    for (const cell of this.occupiedCells) {
      cell.setStatus("occupied");
      cell.displayStatus();
    }
  };
}

export const populateShips = (dataList, shipBoard) => {
  return dataList.map((shipData) => new Ship(shipData, shipBoard));
};
