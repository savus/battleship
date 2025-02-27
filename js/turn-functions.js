import {
  getRandomCell,
  isCellAlreadyAttempted,
  isCellOccupied,
} from "./cell.js";
import {
  currentTurn,
  getCurrentTurn,
  reverseCurrentTurn,
  setCurrentTurn,
} from "./main.js";

export const playerTurn = (playersBoard, computersBoard, cell) => {
  if (isCellAlreadyAttempted(cell)) {
    console.log("You have already tried this location");
    return playerTurn(playersBoard, computersBoard, cell);
  }

  if (isCellOccupied(cell)) {
    console.log("You scored a hit");
    cell.setStatus("hit");
    cell.displayStatus();
  } else if (cell.getStatus() === "empty") {
    console.log("You missed");
    cell.setStatus("miss");
    cell.displayStatus();
  }

  reverseCurrentTurn();
  computersTurn(playersBoard, computersBoard);
};

const computersDecision = (playersBoard) => {
  const randomCell = getRandomCell(playersBoard, playersBoard.size);
  if (isCellAlreadyAttempted(randomCell))
    return computersDecision(playersBoard);
  return randomCell;
};

const computersTurn = (playersBoard) => {
  console.log(`It is now computer's turn`);
  const compDec = computersDecision(playersBoard);
  if (isCellOccupied(compDec)) {
    console.log("Computer scored a hit");
    compDec.setStatus("hit");
    compDec.displayStatus();
    reverseCurrentTurn();
    return;
  }

  if (compDec.getStatus() === "empty") {
    console.log("Computer missed!");
    compDec.setStatus("miss");
    compDec.displayStatus();
    reverseCurrentTurn();
    return;
  }
};
