// import {
//   areCoordsWithinBoard,
//   convertCoordsToNumber,
//   convertCoordsToString,
//   getCell,
//   getRandomCell,
//   isCellOccupied,
// } from "./utility-functions.js";

import { boardSize } from "./main.js";
import {
  areCoordsWithinBoard,
  convertCoordsToNum,
  convertNumToCoords,
} from "./utility-functions.js";

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
  constructor({ name, lives, length }, board, type) {
    this.name = name;
    this.lives = lives;
    this.length = length;
    this.board = board;
    this.type = type;
  }

  resetLists = () => {
    this.pieceCoords.length = 0;
    this.occupiedTiles.length = 0;
    this.occupiedCells.length = 0;
  };

  placeShipPieces = () => {
    this.resetLists();
    let startingPoint = this.board.getRandomCell();
    let [yCoord, xCoord] = convertCoordsToNum(startingPoint.coords);
    if (startingPoint.status === "occupied") return this.placeShipPieces();

    this.occupiedCells.push(startingPoint);

    if (!this.areAllCellsValid(yCoord, xCoord)) return this.placeShipPieces();

    this.occupyAllCells();
  };

  areAllCellsValid = (yCoord, xCoord) => {
    for (let i = 1; i < this.length; i++) {
      this.isHorizontal === true ? xCoord++ : yCoord++;
      const [letter, number] = convertNumToCoords(yCoord, xCoord);
      const stringified = `${letter}${number}`;
      if (!areCoordsWithinBoard(stringified)) return false;
      const newCell = this.board.getCell(letter, number);
      if (newCell.status === "occupied") return false;
      this.occupiedCells.push(newCell);
    }
    return true;
  };

  occupyAllCells = () => {
    for (let i = 0; i < this.occupiedCells.length; i++) {
      this.occupiedCells[i].setStatus("occupied");
      if (this.type === "player") this.occupiedCells[i].displayStatus();
    }
  };

  // recordCellData = (cell) => {
  //   this.pieceCoords.push(cell.coords);
  //   this.occupiedCells.push(cell);
  //   this.occupiedTiles.push(cell.htmlElement);
  // };
  // resetLists = () => {
  //   this.pieceCoords.length = 0;
  //   this.occupiedCells.length = 0;
  //   this.occupiedTiles.length = 0;
  // };
  // occupyListedCells = () => {
  //   for (const cell of this.occupiedCells) {
  //     cell.setStatus("occupied");
  //   }
  // };
  // areAllCellsValid = (column, row, boardSize) => {
  //   for (let i = 1; i < this.length; i++) {
  //     this.isHorizontal ? row++ : column++;
  //     let stringified = convertCoordsToString({ column, row });
  //     if (!areCoordsWithinBoard(stringified, boardSize)) return false;
  //     const newCell = getCell(this.board, stringified);
  //     if (isCellOccupied(newCell)) return false;
  //     this.recordCellData(newCell);
  //   }
  //   return true;
  // };
  // placeShipPieces = (boardSize) => {
  //   this.resetLists();
  //   let startPoint = getRandomCell(this.board, boardSize);
  //   let { column, row } = convertCoordsToNumber(startPoint.coords);
  //   if (isCellOccupied(startPoint)) return this.placeShipPieces(boardSize);
  //   this.recordCellData(startPoint);
  //   if (!this.areAllCellsValid(column, row, boardSize))
  //     return this.placeShipPieces(boardSize);
  //   this.occupyListedCells();
  // };
  // doesCellBelongToShip = (cell) => this.occupiedCells.includes(cell);
  // takeDamage = (num) => (this.lives -= num);
  // checkIfSunk = () => this.lives === 0;
  // getUnhitCell = () =>
  //   this.occupiedCells.find((cell) => cell.getStatus() !== "hit");
}
