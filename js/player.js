import GameBoard from "./game-board.js";
import {
  computerThinkingDuration,
  computerType,
  hardMode,
  messageBoxHandler,
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
  { name: "Carrier", lives: 5, length: 5 },
  { name: "Battleship", lives: 4, length: 4 },
  { name: "Cruiser", lives: 3, length: 3 },
  { name: "Submarine", lives: 3, length: 3 },
  { name: "Destroyer", lives: 2, length: 2 },
];

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

    // console.log(
    //   `
    //     Current turn: ${isUser ? "player's turn" : "computer's turn"}
    //     Chosen cell: ${JSON.stringify(chosenCell)}
    //     Ship: name: ${JSON.stringify(
    //       ship.name
    //     )} occupiedCells: ${JSON.stringify(ship.occupiedCells)}
    //     ${
    //       !isUser
    //         ? `Last ship hit: Name: ${
    //             !this.lastShipHit
    //               ? { name: "no ship" }
    //               : JSON.stringify(this.lastShipHit.name)
    //           }`
    //         : ``
    //     }
    //   `
    // );

    enablePlayerBoards(false);

    this.handleReclickedTile(chosenCell, this, opponent, isUser);

    if (!isUser) {
      readCustomMessageObj({
        state: "none",
        header: "Game Play",
        textList: ["Computer is thinking..."],
      });

      await wait(computerThinkingDuration);
    }

    this.handleEmptyTile(chosenCell, this, opponent);

    this.handleOccupiedTile(chosenCell, this, ship, opponent, isUser);
  };

  handleReclickedTile = (chosenCell, currentPlayer, opponent, isUser) => {
    if (chosenCell.status === "miss" || chosenCell.status === "hit") {
      //target already hit
      if (!isUser) return this.attack(opponent);

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
      //target is empty
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
}
