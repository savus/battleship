import { buildBoardData } from "./board-elements.js";
import { populateShips, shipData } from "./ship.js";

export class Player {
  score = 0;
  board;
  boardHTML;
  ships;

  constructor(type, boardSize, boardType) {
    this.type = type;
    this.boardSize = boardSize;
    this.boardType = boardType;
    this.buildBoard();
    this.ships = populateShips(shipData, this.board);
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
}
