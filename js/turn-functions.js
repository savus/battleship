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

export const playTurn = (playersBoard, computersBoard, cell) => {};

const computersDecision = (playersBoard) => {
  const randomCell = getRandomCell(playersBoard, playersBoard.size);
  if (isCellAlreadyAttempted(randomCell))
    return computersDecision(playersBoard);
  return randomCell;
};
