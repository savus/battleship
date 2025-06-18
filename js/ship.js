import { debugMode, userType } from "./main.js";
import {
  areCoordsWithinBoard,
  convertCoordsToNum,
  convertNumToCoords,
  getCell,
  getRandomCell,
} from "./helper-functions.js";

export class Ship {
  isHorizontal = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
  occupiedCells = [];
  isSunk = false;

  constructor({ name, lives, length }, board, type) {
    this.name = name;
    this.lives = lives;
    this.length = length;
    this.type = type;
    this.board = board;
  }

  resetLists = () => {
    this.occupiedCells.length = 0;
  };

  placeShipPieces = () => {
    this.resetLists();
    let startingPoint = getRandomCell(this.board.grid);
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

      const newCell = getCell(letter, number, this.board.grid);

      if (newCell.status === "occupied") return false;
      this.occupiedCells.push(newCell);
    }
    return true;
  };

  occupyAllCells = () => {
    for (let i = 0; i < this.occupiedCells.length; i++) {
      this.occupiedCells[i].setStatus("occupied");
      if (this.type === userType || debugMode)
        this.occupiedCells[i].displayStatus();
    }
  };

  reduceLives = (num) => {
    this.lives -= num;
    if (this.lives <= 0) this.setIsSunk(true);
  };

  setIsSunk = (bool) => (this.isSunk = bool);

  displayAllPieces = () => {
    this.occupiedCells.forEach((cell) => {
      if (cell.getStatus() === "occupied") cell.displayStatus();
    });
  };

  hideAllPieces = () => {
    this.occupiedCells.forEach((cell) => {
      if (cell.getStatus() === "occupied") cell.hideStatus();
    });
  };
}
