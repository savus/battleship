import {
  boardClickableClass,
  currentMessageObject,
  gameBoardClass,
  messageBoxHandler,
  promptInput,
  rowClass,
  startScreen,
  tileClass,
  tilesClickableClass,
} from "./main.js";
import {
  findPlayerByOtherType,
  findPlayerByType,
  removeActive,
  swapPlayerBoards,
} from "./helper-functions.js";
import { beginIntro } from "./gameplay-chapters.js";

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

export const documentClickHandler = () => {
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
