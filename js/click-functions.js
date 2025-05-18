import {
  boardClickableClass,
  currentMessageObject,
  gameBoardClass,
  messageBoxHandler,
  promptInput,
  rowClass,
  tileClass,
  tilesClickableClass,
} from "./main.js";
import { setActive } from "./utility-functions.js";

export const gameBoardClickHandler = ({ target }) => {
  const isGameBoard = target.matches(`.${gameBoardClass}`);
  const isRow = target.matches(`.${rowClass}`);
  const isTile = target.matches(`.${tileClass}`);
  const gameBoardHasBeenClicked = isGameBoard || isRow || isTile;
  if (gameBoardHasBeenClicked) {
    const gameBoard = target.closest(`.${gameBoardClass}`);
    const boardIsClickable = gameBoard.classList.contains(boardClickableClass);
    if (boardIsClickable) {
      const boards = document.querySelectorAll(`.${gameBoardClass}`);
      boards.forEach((board) => {
        board.classList.remove(tilesClickableClass);
      });
      setActive(gameBoard, `.${gameBoardClass}`);
      gameBoard.classList.add(tilesClickableClass);
    }
  }
};

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
