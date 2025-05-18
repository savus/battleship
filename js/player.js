// import { buildBoardData, gameBoardClass } from "./board-elements.js";

import GameBoard from "./board-elements.js";
import { Ship } from "./ship.js";
import { findShipByCell } from "./utility-functions.js";

export const shipData = [
  { name: "Carrier", lives: 5, length: 5 },
  { name: "Battleship", lives: 4, length: 4 },
  { name: "Cruiser", lives: 3, length: 3 },
  { name: "Submarine", lives: 3, length: 3 },
  { name: "Destroyer", lives: 2, length: 2 },
];

// import {
//   computerThinkingDuration,
//   hardMode,
//   reverseCurrentTurn,
// } from "./main.js";
// import { messageHandler } from "./message-box.js";
// import messageData from "./message-data-objects.js";
// import { shipData } from "./ship.js";
// import {
//   getRandomCell,
//   isCellAlreadyAttempted,
//   isCellOccupied,
//   pause,
//   populateShips,
//   setActive,
// } from "./utility-functions.js";

export class Player {
  board;
  ships = [];
  constructor(name, type, boardSize) {
    this.name = name;
    this.type = type;
    this.boardSize = boardSize;
    this.initializeBoard();
    this.initializeShips();
  }

  initializeBoard = () => {
    const board = new GameBoard(this.boardSize, this.type, this.getLives);
    board.reduceLives = this.reduceLives;
    this.board = board;
  };

  addBoardClass = (className) => {
    this.board.html.classList.add(className);
  };

  removeBoardClass = (className) => {
    this.board.html.classList.remove(className);
  };

  buildShip = (shipData) => {
    const ship = new Ship(shipData, this.board, this.type);

    return ship;
  };

  initializeShips = () => {
    shipData.forEach((data) => {
      const newShip = this.buildShip(data);
      this.ships.push(newShip);
    });
    this.lives = this.ships.length;
  };

  reduceLives = (num) => (this.lives -= num);

  getLives = () => this.lives;

  getShipsRemaining = () => this.ships.filter((ship) => !ship.isSunk).length;

  checkIfLost = () => this.lives === 0;

  hitMessage = (ship) => `Your ${ship.name} has been hit!`;

  missMessage = () => `You missed!`;

  sunkMessage = (ship) => `Your ${ship.name} has been sunk!`;

  gameLostMessage = () => `You lost!`;

  attack = (opponent, cell) => {
    switch (cell.status) {
      case "miss":
        console.log("you've already picked this");
        break;
      case "hit":
        console.log("you've already picked this");
        break;
      case "empty":
        cell.setStatus("miss");
        console.log("missed");
        opponent.attack(this);
        break;
      case "occupied":
        const ship = findShipByCell(opponent, cell);
        cell.setStatus("hit");
        ship.reduceLives(1);
        if (ship.checkIfSunk()) {
          console.log(opponent.sunkMessage(ship));
          opponent.reduceLives(1);
          if (opponent.checkIfLost())
            return console.log(opponent.gameLostMessage());
          console.log(`${opponent.getShipsRemaining()} ships remaining!`);
        } else {
          console.log(opponent.hitMessage(ship));
        }
        opponent.attack(this);
        break;
    }
  };
}

export class Computer extends Player {
  constructor(name, type, boardSize) {
    super(name, type, boardSize);
  }

  hitMessage = (ship) => `You hit the enemy ${ship.name}`;

  missMessage = () => `The opponent missed!`;

  sunkMessage = (ship) => `You sunk the enemy ${ship.name}`;

  gameLostMessage = () => `You won!`;

  attack = (opponent) => {
    console.log("the opponent attacked");
  };
}

// export class Player {
//   score = 0;
//   board;
//   boardHTML;
//   ships;
//   shipsLeft = 0;
//   lastHitShip;
//   constructor(type, boardSize, boardType, isDemo) {
//     this.type = type;
//     this.boardSize = boardSize;
//     this.boardType = boardType;
//     this.isDemo = isDemo;
//     this.buildBoard();
//     this.ships = populateShips(shipData, this.board);
//     this.shipsLeft = this.ships.length;
//   }

//   buildBoard = () => {
//     const { element, object } = buildBoardData(
//       this.boardSize,
//       this.boardType,
//       this.type,
//       this.isDemo
//     );

//     this.board = object;
//     this.boardHTML = element;
//   };

//   placeAllShips = () => {
//     this.ships.forEach((ship) => {
//       ship.placeShipPieces(this.board.size);
//     });
//   };

//   subtractShipsLeft = (num) => (this.shipsLeft -= num);

//   hasLost = () => this.shipsLeft === 0;

//   assessDamage = (cell, this) => {
//     this.ships.forEach((ship) => {
//       if (ship.doesCellBelongToShip(cell)) {
//         this.lastHitShip = ship;
//         ship.takeDamage(1);
//         if (ship.checkIfSunk()) {
//           this.subtractShipsLeft(1);
//           this.lastHitShip = undefined;
//           const sunkMessage =
//             this.type === "player"
//               ? "The enemy sunk your "
//               : `You sunk the enemy's `;
//           const shipsRemainingMessage =
//             this.shipsLeft > 0 ? `, ${this.shipsLeft} ships remaining!` : ``;
//           messageHandler.openMessageBox();
//           messageHandler.goToMessageData(
//             messageData.targetSunk,
//             0,
//             `${sunkMessage}${ship.name}${shipsRemainingMessage}`
//           );
//           if (this.hasLost()) return;
//         }
//       }
//     });

//     return this.hasLost();
//   };

//   computersDecision = (this) => {
//     let cell;
//     if (hardMode) {
//       const notSunkShip = this.lastHitShip || this.getUnsunkShip();
//       cell = notSunkShip.getUnhitCell();
//     } else {
//       cell = this.lastHitShip
//         ? this.lastHitShip.getUnhitCell()
//         : getRandomCell(this.board, this.board.size);

//       if (isCellAlreadyAttempted(cell)) return this.computersDecision(this);
//     }

//     return cell;
//   };

//   playTurn = async (this, cell = null) => {
//     const isPlayer = this.type === "player";
//     const playerReference = isPlayer ? "You" : "The Computer";
//     const decidedCell = isPlayer ? cell : this.computersDecision(this);

//     if (isPlayer && isCellAlreadyAttempted(decidedCell)) {
//       messageHandler.openMessageBox();
//       messageHandler.goToMessageData(messageData.alreadyAttempted, 0);
//       return;
//     }

//     if (!isPlayer) {
//       setActive(this.boardHTML, `.${gameBoardClass}`);
//       messageHandler.openMessageBox();
//       messageHandler.goToMessageData(messageData.computerThinking, 0);
//       await pause(computerThinkingDuration);
//     }

//     if (isCellOccupied(decidedCell)) {
//       messageHandler.openMessageBox();
//       messageHandler.goToMessageData(
//         messageData.targetHit,
//         0,
//         `${playerReference} scored a hit`
//       );
//       decidedCell.updateTile("hit");
//       if (this.assessDamage(decidedCell, this)) return;
//     }

//     if (decidedCell.getStatus() === "empty") {
//       messageHandler.openMessageBox();
//       messageHandler.goToMessageData(
//         messageData.targetMissed,
//         0,
//         `${playerReference} missed!`
//       );
//       decidedCell.updateTile("miss");
//     }

//     reverseCurrentTurn();
//   };

//   getUnsunkShip = () => this.ships.find((ship) => !ship.checkIfSunk());

//   lostGame = () => {
//     if (this.hasLost()) {
//       const endGameMessage =
//         this.type === "player"
//           ? "The enemy sunk all your ships! You lost!"
//           : "You sunk all ships! You won!";
//       messageHandler.openMessageBox();
//       messageHandler.goToMessageData(
//         messageData.gameLostWon,
//         0,
//         endGameMessage
//       );
//       return true;
//     }
//     return false;
//   };
// }
