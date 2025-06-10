import {
  boardClickableClass,
  computer,
  currentMessageObject,
  debugMode,
  enabled,
  gameBoardClass,
  messageBoxHandler,
  open,
  optionsMenu,
  optionsMenuClass,
  optionsTab,
  optionsTabSelector,
  promptInput,
  rowClass,
  setDebugMode,
  startScreen,
  tileClass,
} from "./main.js";
import {
  clearGame,
  findPlayerByOtherType,
  findPlayerByType,
  goToMessageObj,
  removeActive,
  swapPlayerBoards,
  wait,
} from "./helper-functions.js";
import { beginIntro } from "./gameplay-chapters.js";
import messageObjects from "./message-data-objects.js";

export function gameBoardClickHandler({ target }) {
  const isGameBoard = target.matches(`.${gameBoardClass}`);
  const isRow = target.matches(`.${rowClass}`);
  const isTile = target.matches(`.${tileClass}`);
  const gameBoardHasBeenClicked = isGameBoard || isRow || isTile;
  if (gameBoardHasBeenClicked) {
    const boardIsClickable = this.classList.contains(boardClickableClass);
    if (boardIsClickable) {
      const player = findPlayerByType(this.id);
      const opposingPlayer = findPlayerByOtherType(this.id);
      swapPlayerBoards(player, opposingPlayer);
    }
  }
}

export const messageBoxControlsHandler = ({ target }) => {
  switch (target.dataset.button) {
    case "confirm":
      currentMessageObject.confirmStep();
      break;
    case "prev":
      messageBoxHandler.prevStep(currentMessageObject);
      break;
    case "next":
      messageBoxHandler.nextStep(currentMessageObject);
      break;
    case "prompt":
      currentMessageObject.promptStep(promptInput.value);
      break;
    case "yes":
      currentMessageObject.yesStep();
      break;
    case "no":
      currentMessageObject.noStep();
      break;
  }
};

// export const tileClickHandler = (html, cell, cb) => {
//   const classList = html.classList;
//   const isClickable = classList.contains(tilesClickableClass);

//   if (isClickable) {
//     switch (cell.status) {
//       case "empty":
//         cell.setStatus("miss");
//         break;
//       case "occupied":
//         cell.setStatus("hit");
//         cb(1);
//     }
//     cell.displayStatus();
//   }
// };

export const startButtonClick = () => {
  removeActive(startScreen);
  beginIntro();
};

export const toggleDebugMode = (target) => {
  target.classList.toggle(enabled);
  if (!debugMode) {
    setDebugMode(true);
    if (computer) computer.displayAllShips();
  } else {
    setDebugMode(false);
    if (computer) computer.hideAllShips();
  }
};

export const exitGameClick = async (target) => {
  target.classList.toggle(enabled);
  goToMessageObj(messageObjects.gameOver, 0);
  await wait(1000);
  clearGame();
  messageBoxHandler.closeMessage();
};

export const documentClickHandler = ({ target }) => {
  const isOptionsTab = target === optionsTab;
  const isOptionsMenu = target.closest(optionsMenuClass);

  if (isOptionsTab) {
    optionsMenu.classList.toggle(open);
  } else {
    if (!isOptionsMenu) {
      optionsMenu.classList.remove(open);
    }
  }

  if (messageBoxHandler.canBeClicked) {
    switch (messageBoxHandler.state) {
      case "confirm":
        currentMessageObject.confirmStep();
        break;
      case "prev-next":
        currentMessageObject.nextStep();
        break;
    }
  }
};
