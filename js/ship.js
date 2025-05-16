// import {
//   areCoordsWithinBoard,
//   convertCoordsToNumber,
//   convertCoordsToString,
//   getCell,
//   getRandomCell,
//   isCellOccupied,
// } from "./utility-functions.js";

import { convertCoordsToNum } from "./utility-functions.js";

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

  resetLists = () => {
    this.pieceCoords.length = 0;
    this.occupiedTiles.length = 0;
    this.occupiedCells.length = 0;
  };

  placeShipPiece = () => {
    this.resetLists();
    let startingPoint = this.board.getRandomCell();
    const [yCoord, xCoord] = convertCoordsToNum(startingPoint.coords);
    if (startingPoint.status === "occupied") return this.placeShipPiece();

    startingPoint.setStatus("occupied");

    //convert startpoint to numbers ie: A0 = 0 0;
    //increase those numbers by 1 ie: A1 = 0 1 / B0 = 1 0
    //set the cell at those new coordinates to occupied
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
