import {
  getRandomCell,
  isCellAlreadyAttempted,
  isCellOccupied,
} from "./cell.js";
import {
  cheatingMode,
  currentTurn,
  getCurrentTurn,
  reverseCurrentTurn,
  setCurrentTurn,
} from "./main.js";

export const playerTurn = (player, computer, cell) => {
  console.clear();
  if (isCellAlreadyAttempted(cell)) {
    console.log("You have already tried this location");
  }

  if (isCellOccupied(cell)) {
    console.log("You scored a hit");
    cell.updateTile("hit");
    if (computer.assessDamage(cell, player)) return;
    reverseCurrentTurn();
    computersTurn(player, computer);
  }

  if (cell.getStatus() === "empty") {
    console.log("You missed");
    cell.updateTile("miss");
    reverseCurrentTurn();
    computersTurn(player, computer);
  }
};

const computersDecision = (player, computer) => {
  let cell;
  let notSunkShip;
  if (cheatingMode) {
    notSunkShip =
      computer.lastHitShip || player.ships.find((ship) => !ship.checkIfSunk());
    cell = notSunkShip.occupiedCells.find((cell) => cell.getStatus() !== "hit");
  } else {
    cell = computer.lastHitShip
      ? computer.lastHitShip.occupiedCells.find(
          (cell) => cell.getStatus() !== "hit"
        )
      : getRandomCell(player.board, player.board.size);
    if (isCellAlreadyAttempted(cell))
      return computersDecision(player, computer);
  }
  return cell;
};

const computersTurn = (player, computer) => {
  console.log(computer.lastHitShip);
  console.log(`It is now computer's turn`);
  const cell = computersDecision(player, computer);
  if (isCellOccupied(cell)) {
    console.log("Computer scored a hit");
    cell.updateTile("hit");
    if (player.assessDamage(cell, computer)) return;
    reverseCurrentTurn();
    return;
  }

  if (cell.getStatus() === "empty") {
    console.log("Computer missed!");
    cell.setStatus("miss");
    cell.displayStatus();
    reverseCurrentTurn();
    return;
  }
};
