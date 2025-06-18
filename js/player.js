// import { buildBoardData, gameBoardClass } from "./board-elements.js";

import GameBoard from "./game-board.js";
import {
  computer,
  computerThinkingDuration,
  computerType,
  hardMode,
  messageBoxHandler,
  user,
  userType,
} from "./main.js";
import { Ship } from "./ship.js";
import {
  enablePlayerBoards,
  findShipByCell,
  getRandomCell,
  readCustomMessageObj,
  wait,
} from "./helper-functions.js";
import { gameOver } from "./gameplay-chapters.js";

export const shipData = [
  // { name: "Carrier", lives: 5, length: 5 },
  // { name: "Battleship", lives: 4, length: 4 },
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

  initializeShips = () => {
    shipData.forEach((data) => {
      const ship = new Ship(data, this.board, this.type);
      this.ships.push(ship);
    });
    this.lives = this.ships.length;
  };

  displayAllShips = () => {
    this.ships.forEach((ship) => ship.displayAllPieces());
  };

  hideAllShips = () => {
    this.ships.forEach((ship) => ship.hideAllPieces());
  };

  reduceLives = (num) => (this.lives -= num);

  getLives = () => this.lives;

  getShipsRemaining = () => this.ships.filter((ship) => !ship.isSunk).length;

  shipsRemainingMessage = () => {
    const isUser = this.type === userType;
    const isLastShip = this.getShipsRemaining() === 1;
    const message =
      (isUser ? "You have " : "Your opponent has ") +
      this.getShipsRemaining() +
      " " +
      (isLastShip ? "ship" : "ships") +
      " remaining!";
    return message;
  };

  checkIfLost = () => this.lives === 0;

  hitMessage = () => `You made a hit!`;

  alreadyTargetedMessage = `You've already picked this!`;

  missMessage = `You missed!`;

  sunkMessage = (ship) => `You sunk the enemy ${ship.name}`;

  gameLostMessage = `You won!`;

  attack = async (opponent, cell = null) => {
    const isUser = this.type === userType;
    let chosenCell = isUser ? cell : this.chooseCell(opponent);
    const ship = findShipByCell(opponent, chosenCell) || {
      name: "no ship",
      occupiedCells: [],
    };

    console.log(
      `
        Current turn: ${isUser ? "player's turn" : "computer's turn"}
        Chosen cell: ${JSON.stringify(chosenCell)}  
        Ship: name: ${JSON.stringify(
          ship.name
        )} occupiedCells: ${JSON.stringify(ship.occupiedCells)}
        ${
          !isUser
            ? `Last ship hit: Name: ${
                !this.lastShipHit
                  ? { name: "no ship" }
                  : JSON.stringify(this.lastShipHit.name)
              }`
            : ``
        } 
      `
    );

    enablePlayerBoards(false);

    if (chosenCell.status === "miss" || chosenCell.status === "hit") {
      //target already hit
      if (!isUser) return this.attack(opponent);

      readCustomMessageObj({
        state: "confirm",
        header: "Game Play",
        textList: [this.alreadyTargetedMessage],
        confirmStep: () => {
          messageBoxHandler.closeMessage();
          enablePlayerBoards(true);
        },
      });
    }

    if (!isUser) {
      readCustomMessageObj({
        state: "none",
        header: "Game Play",
        textList: ["Computer is thinking..."],
      });

      await wait(computerThinkingDuration);
    }

    if (chosenCell.status === "empty") {
      chosenCell.updateTile("miss");
      readCustomMessageObj({
        state: "confirm",
        header: "Game Play",
        textList: [this.missMessage],
        confirmStep: () => {
          messageBoxHandler.closeMessage();
          if (opponent.type === computerType) {
            opponent.attack(this);
          } else {
            enablePlayerBoards(true);
          }
        },
      });
    }

    if (chosenCell.status === "occupied") {
      chosenCell.updateTile("hit");
      if (!isUser) this.lastShipHit = ship;
      ship.reduceLives(1);
      if (ship.isSunk) {
        opponent.reduceLives(1);
        if (this.type === computerType) this.lastShipHit = null;
        if (opponent.checkIfLost()) {
          readCustomMessageObj({
            state: "confirm",
            header: "Game Play",
            textList: [this.gameLostMessage],
            confirmStep: async () => {
              messageBoxHandler.closeMessage();
              return gameOver();
            },
          });
        } else {
          readCustomMessageObj({
            state: "confirm",
            header: "Game Play",
            textList: [this.sunkMessage(ship)],
            confirmStep: () => {
              readCustomMessageObj({
                state: "confirm",
                header: "Game Play",
                textList: [opponent.shipsRemainingMessage()],
                confirmStep: () => {
                  messageBoxHandler.closeMessage();
                  if (opponent.type === computerType) {
                    opponent.attack(this);
                  } else {
                    enablePlayerBoards(true);
                  }
                },
              });
            },
          });
        }
      } else {
        //hit but not sunk
        readCustomMessageObj({
          state: "confirm",
          header: "Game Play",
          textList: [this.hitMessage(ship)],
          confirmStep: () => {
            messageBoxHandler.closeMessage();
            if (opponent.type === computerType) {
              opponent.attack(this);
            } else {
              enablePlayerBoards(true);
            }
          },
        });
      }
    }
  };

  handleReclickedTile = (chosenCell, currentPlayer, opponent, isUser) => {
    if (chosenCell.status === "miss" || chosenCell.status === "hit") {
      //target already hit
      if (!isUser) return currentPlayer.attack(opponent);

      readCustomMessageObj({
        state: "confirm",
        header: "Game Play",
        textList: [currentPlayer.alreadyTargetedMessage],
        confirmStep: () => {
          messageBoxHandler.closeMessage();
          enablePlayerBoards(true);
        },
      });
    }
  };

  handleEmptyTile = (chosenCell, currentPlayer, opponent) => {
    if (chosenCell.status === "empty") {
      chosenCell.updateTile("miss");
      readCustomMessageObj({
        state: "confirm",
        header: "Game Play",
        textList: [currentPlayer.missMessage],
        confirmStep: () => {
          messageBoxHandler.closeMessage();
          if (opponent.type === computerType) {
            opponent.attack(currentPlayer);
          } else {
            enablePlayerBoards(true);
          }
        },
      });
    }
  };

  handleOccupiedTile = (chosenCell, currentPlayer, ship, opponent, isUser) => {
    if (currentPlayer.hasShipBeenHit(chosenCell, isUser, ship)) {
      if (currentPlayer.hasShipSunk(ship, currentPlayer, opponent)) {
        if (currentPlayer.isGameOver(opponent)) {
          readCustomMessageObj({
            state: "confirm",
            header: "Game Play",
            textList: [currentPlayer.gameLostMessage],
            confirmStep: async () => {
              messageBoxHandler.closeMessage();
              gameOver();
            },
          });
          return;
        } else {
          readCustomMessageObj({
            state: "confirm",
            header: "Game Play",
            textList: [currentPlayer.sunkMessage(ship)],
            confirmStep: () => {
              readCustomMessageObj({
                state: "confirm",
                header: "Game Play",
                textList: [opponent.shipsRemainingMessage()],
                confirmStep: () => {
                  messageBoxHandler.closeMessage();
                  if (opponent.type === computerType) {
                    opponent.attack(currentPlayer);
                  } else {
                    enablePlayerBoards(true);
                  }
                },
              });
            },
          });
        }
      } else {
        readCustomMessageObj({
          state: "confirm",
          header: "Game Play",
          textList: [this.hitMessage(ship)],
          confirmStep: () => {
            messageBoxHandler.closeMessage();
            if (opponent.type === computerType) {
              opponent.attack(this);
            } else {
              enablePlayerBoards(true);
            }
          },
        });
      }
    }
  };

  hasShipBeenHit = (chosenCell, isUser, ship) => {
    if (chosenCell.status === "occupied") {
      chosenCell.updateTile("hit");
      if (!isUser) this.lastShipHit = ship;
      ship.reduceLives(1);
      return true;
    }
  };

  hasShipSunk = (ship, currentPlayer, opposingPlayer) => {
    if (ship.isSunk) {
      opposingPlayer.reduceLives(1);
      if (currentPlayer.type === computerType) this.lastShipHit = null;
      return true;
    }
  };

  isGameOver = (opponent) => {
    return opponent.checkIfLost();
  };
}

export class Computer extends Player {
  lastShipHit = null;
  constructor(name, type, boardSize) {
    super(name, type, boardSize);
  }

  hitMessage = (ship) => `Your ${ship.name} has been hit!`;

  missMessage = `The opponent missed!`;

  sunkMessage = (ship) => `Your ${ship.name} has been sunk!`;

  gameLostMessage = `You lost!`;

  chooseCell = (opponent) => {
    if (hardMode) {
      const usersPieces = [];

      opponent.ships.forEach((ship) => {
        ship.occupiedCells.forEach((cell) => usersPieces.push(cell));
      });

      return usersPieces.find((piece) => piece.status === "occupied");
    } else {
      if (!this.lastShipHit) {
        return getRandomCell(opponent.board.grid);
      } else {
        return this.lastShipHit.occupiedCells.find(
          (cell) => cell.status === "occupied"
        );
      }
    }
  };

  // attack = async (opponent) => {
  //   const opponentGrid = opponent.board.grid;
  //   const randomCell = getRandomCell(opponentGrid);

  //   if (randomCell.status === "miss" || randomCell.status === "hit")
  //     return this.attack(opponent);

  //   this.addBoardClass(active);
  //   opponent.removeBoardClass(active);
  //   opponent.removeBoardClass(boardClickableClass);
  //   opponent.removeBoardClass(tilesClickableClass);

  //   if (randomCell.status === "empty") {
  //     randomCell.setStatus("miss");
  //     randomCell.displayStatus();
  //     console.log(this.missMessage());
  //   }

  //   if (randomCell.status === "occupied") {
  //     const ship = findShipByCell(opponent, randomCell);
  //     //display hit message
  //     randomCell.setStatus("hit");
  //     randomCell.displayStatus();
  //     console.log(opponent.hitMessage(ship));
  //     ship.reduceLives(1);
  //     if (ship.checkIfSunk()) {
  //       console.log(opponent.sunkMessage(ship));
  //       opponent.reduceLives(1);
  //       if (opponent.checkIfLost()) {
  //         return console.log(opponent.gameLostMessage());
  //       }
  //       console.log(`${opponent.getShipsRemaining()} ships remaining!`);
  //       opponent.addBoardClass(boardClickableClass);
  //       opponent.addBoardClass(tilesClickableClass);
  //       this.removeBoardClass(tilesClickableClass);
  //     }
  //     opponent.addBoardClass(boardClickableClass);
  //     opponent.addBoardClass(tilesClickableClass);
  //     this.removeBoardClass(tilesClickableClass);
  //   }
  // };
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
//             this.type === userType
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
//     const isPlayer = this.type === userType;
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
//         this.type === userType
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
