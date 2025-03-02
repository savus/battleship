import { buildBoardData } from "./board-elements.js";

import { endGame } from "./gameplay-chapters.js";
import { cheatingMode, reverseCurrentTurn } from "./main.js";
import { messageHandler } from "./message-box.js";
import messageData from "./message-data-objects.js";
import { populateShips, shipData } from "./ship.js";
import {
  getRandomCell,
  isCellAlreadyAttempted,
  isCellOccupied,
} from "./utility-functions.js";

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

  subtractShipsLeft = (num) => (this.shipsLeft -= num);

  hasLost = () => this.shipsLeft === 0;

  assessDamage = (cell, opponent) => {
    this.ships.forEach((ship) => {
      if (ship.doesCellBelongToShip(cell)) {
        opponent.lastHitShip = ship;
        ship.takeDamage(1);
        if (ship.checkIfSunk()) {
          this.subtractShipsLeft(1);
          opponent.lastHitShip = undefined;
          const sunkMessage =
            this.type === "player"
              ? "The enemy sunk your "
              : `You sunk the enemy's`;
          console.log(`${sunkMessage} ${ship.name}`);
          if (this.hasLost()) {
            const endGameMessage =
              this.type === "player"
                ? "The enemy sunk all your ships! You lost!"
                : "You sunk all ships! You won!";
            console.log(endGameMessage);
            endGame();
            return;
          }
        }
      }
    });

    return this.hasLost();
  };

  computersDecision = (opponent) => {
    let cell;
    if (cheatingMode) {
      const notSunkShip = this.lastHitShip || opponent.getUnsunkShip();
      cell = notSunkShip.getUnhitCell();
    } else {
      cell = this.lastHitShip
        ? this.lastHitShip.getUnhitCell()
        : getRandomCell(opponent.board, opponent.board.size);

      if (isCellAlreadyAttempted(cell)) return this.computersDecision(opponent);
    }
    return cell;
  };

  playTurn = (opponent, cell = null) => {
    const isPlayer = this.type === "player";
    const playerReference = isPlayer ? "You" : "The Computer";
    const decidedCell = isPlayer ? cell : this.computersDecision(opponent);

    if (isPlayer && isCellAlreadyAttempted(decidedCell)) {
      messageHandler.openMessageBox();
      messageHandler.goToMessageData(messageData.alreadyAttempted, 0);
      return;
    }

    if (isCellOccupied(decidedCell)) {
      messageHandler.openMessageBox();
      messageHandler.goToMessageData(
        messageData.targetHit,
        0,
        `${playerReference} scored a hit`
      );
      decidedCell.updateTile("hit");
      if (opponent.assessDamage(decidedCell, this)) return;
    }

    if (decidedCell.getStatus() === "empty") {
      messageHandler.openMessageBox();
      messageHandler.goToMessageData(
        messageData.targetMissed,
        0,
        `${playerReference} missed!`
      );
      decidedCell.updateTile("miss");
    }

    reverseCurrentTurn();
  };

  getUnsunkShip = () => this.ships.find((ship) => !ship.checkIfSunk());
}
