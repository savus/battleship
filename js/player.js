import { buildBoardData } from "./board-elements.js";
import { populateShips, shipData } from "./ship.js";

export class Player {
  score = 0;
  board;
  boardHTML;
  ships;
  shipsLeft = 0;
  lastHitShip;
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

  assessDamage = (cell, opponent) => {
    this.ships.forEach((ship) => {
      if (ship.doesCellBelongToShip(cell)) {
        opponent.lastHitShip = ship;
        ship.takeDamage(1);
        if (ship.checkIfSunk()) {
          opponent.lastHitShip = undefined;
          const sunkMessage =
            this.type === "player"
              ? "The enemy sunk your "
              : `You sunk the enemy's`;
          console.log(`${sunkMessage} ${ship.name}`);
          this.checkIfShipSunk(ship);
          if (this.hasLost()) {
            const endGameMessage =
              this.type === "player"
                ? "The enemy sunk all your ships! You lost!"
                : "You sunk all ships! You won!";
            console.log(endGameMessage);
            return;
          }
        }
      }
    });

    return this.hasLost();
  };

  getUnsunkShip = () => this.ships.find((ship) => !ship.checkIfSunk());
}
