import { buildBoardData } from "./board-elements.js";
import { populateShips, shipData } from "./ship.js";

export class Player {
  score = 0;
  board;
  boardHTML;
  ships;
  shipsLeft = 0;

  constructor(type, boardSize, boardType) {
    this.type = type;
    this.boardSize = boardSize;
    this.boardType = boardType;
    this.buildBoard();
    this.ships = populateShips(shipData, this.board);
    this.shipsLeft = this.ships.length;
  }

  buildBoard = () => {
    const { element, object } = buildBoardData(
      this.boardSize,
      this.boardType,
      this.type
    );

    this.board = object;
    this.boardHTML = element;
  };

  placeAllShips = () => {
    this.ships.forEach((ship) => {
      ship.placeShipPieces(this.board.size);
    });
  };

  checkIfShipSunk = (ship) => {
    if (ship.checkIfSunk()) this.subtractShipsLeft(1);
  };

  subtractShipsLeft = (num) => (this.shipsLeft -= num);

  hasLost = () => this.shipsLeft === 0;
}
