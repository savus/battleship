// import { buildBoardData, gameBoardClass } from "./board-elements.js";

import GameBoard from "./board-elements.js";

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

class Player {
  board;
  constructor(name, type, boardSize) {
    this.name = name;
    this.type = type;
    this.boardSize = boardSize;
    this.initializeBoard();
  }

  initializeBoard = () => {
    const board = new GameBoard(this.boardSize, this.type);

    this.board = board;
  };

  addBoardClass = (className) => {
    this.board.html.classList.add(className);
  };

  removeBoardClass = (className) => {
    this.board.html.classList.remove(className);
  };
}

export default Player;

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

//   assessDamage = (cell, opponent) => {
//     this.ships.forEach((ship) => {
//       if (ship.doesCellBelongToShip(cell)) {
//         opponent.lastHitShip = ship;
//         ship.takeDamage(1);
//         if (ship.checkIfSunk()) {
//           this.subtractShipsLeft(1);
//           opponent.lastHitShip = undefined;
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

//   computersDecision = (opponent) => {
//     let cell;
//     if (hardMode) {
//       const notSunkShip = this.lastHitShip || opponent.getUnsunkShip();
//       cell = notSunkShip.getUnhitCell();
//     } else {
//       cell = this.lastHitShip
//         ? this.lastHitShip.getUnhitCell()
//         : getRandomCell(opponent.board, opponent.board.size);

//       if (isCellAlreadyAttempted(cell)) return this.computersDecision(opponent);
//     }

//     return cell;
//   };

//   playTurn = async (opponent, cell = null) => {
//     const isPlayer = this.type === "player";
//     const playerReference = isPlayer ? "You" : "The Computer";
//     const decidedCell = isPlayer ? cell : this.computersDecision(opponent);

//     if (isPlayer && isCellAlreadyAttempted(decidedCell)) {
//       messageHandler.openMessageBox();
//       messageHandler.goToMessageData(messageData.alreadyAttempted, 0);
//       return;
//     }

//     if (!isPlayer) {
//       setActive(opponent.boardHTML, `.${gameBoardClass}`);
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
//       if (opponent.assessDamage(decidedCell, this)) return;
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
