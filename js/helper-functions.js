import { beginGame, gameOver } from "./gameplay-chapters.js";
import {
  active,
  alphabet,
  boardClickableClass,
  boardSize,
  computer,
  computerType,
  controlButtons,
  currentMessageArray,
  currentMessageIndex,
  currentMessageObject,
  gameBoardContainer,
  hoveringClass,
  messageBoxHandler,
  players,
  setComputer,
  setCurrentMessageArray,
  setCurrentMessageIndex,
  setCurrentMessageObj,
  setUpClass,
  setUser,
  tilesClickableClass,
  tileSetupAnimLength,
  user,
  userType,
} from "./main.js";
import { Computer, Player } from "./player.js";

export const wait = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

export const setActive = (target = null, selector = null) => {
  removePreviousActive(selector);
  if (target !== null) target.classList.add(active);
};

export const removeActive = (target) => target.classList.remove(active);

export const removePreviousActive = (selector = null) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) removeActive(selectedElement);
};

const enableAllControlButtons = () =>
  controlButtons.forEach((btn) => btn.removeAttribute("disabled"));

const disableAllControlButtons = () =>
  controlButtons.forEach((btn) => btn.setAttribute("disabled", true));

export const goToPrevMessageObj = () => {
  setCurrentMessageIndex(currentMessageIndex - 1);
  setCurrentMessageObj(currentMessageArray[currentMessageIndex]);
  messageBoxHandler.readMessageObj(currentMessageObject);
};

export const goToNextMessageObj = () => {
  setCurrentMessageIndex(currentMessageIndex + 1);
  setCurrentMessageObj(currentMessageArray[currentMessageIndex]);
  messageBoxHandler.readMessageObj(currentMessageObject);
};

export const goToMessageObj = (array, index) => {
  setCurrentMessageIndex(index);
  setCurrentMessageArray(array);
  setCurrentMessageObj(currentMessageArray[currentMessageIndex]);
  messageBoxHandler.readMessageObj(currentMessageObject);
};

export const readCustomMessageObj = async (obj) => {
  setCurrentMessageObj(obj);
  return messageBoxHandler.readMessageObj(currentMessageObject);
};

export const typeWords = async (textField, message, typeSpeed = 5) => {
  disableAllControlButtons();
  const letters = message.split("");
  let text = "";
  for (let i = 0; i < letters.length; i++) {
    text += letters[i];
    textField.innerText = text;
    await wait(typeSpeed);
  }
  enableAllControlButtons();
  return;
};

export const enablePlayerBoards = (bool) => {
  players.forEach((player) => {
    if (bool) {
      player.addBoardClass(boardClickableClass);
      if (player.type === computerType)
        player.addBoardClass(tilesClickableClass);
    } else {
      player.removeBoardClass(boardClickableClass);
      player.removeBoardClass(tilesClickableClass);
    }
  });
};

export const swapPlayerBoards = (player1, player2, isDemo = false) => {
  const isComputer = player1.type === computerType;
  player1.addBoardClass(active);
  if (isComputer && !isDemo) player1.addBoardClass(tilesClickableClass);

  player2.removeBoardClass(active);
  player2.removeBoardClass(tilesClickableClass);
};

export const convertCoordsToNum = (coords) => {
  const yCoord = coords.slice(0, 1).toLowerCase().charCodeAt() - 97;
  const xCoord = parseInt(coords.slice(1));
  return [yCoord, xCoord];
};

export const convertNumToCoords = (y, x) => {
  const letter = alphabet[y];
  const num = x;
  return [letter, num];
};

export const areCoordsWithinBoard = (coords) => {
  const [yCoord, xCoord] = convertCoordsToNum(coords);
  return yCoord < boardSize && xCoord < boardSize;
};

export const getCell = (letter, number, grid) => grid[letter][number];

export const getRandomCell = (grid) => {
  const yCoord = alphabet[Math.floor(Math.random() * boardSize)];
  const xCoord = Math.floor(Math.random() * boardSize);
  return grid[yCoord][xCoord];
};

export const findPlayerByType = (type) =>
  players.find((player) => player.type === type);

export const findPlayerByCell = (cell) =>
  players.find((player) => player.type === cell.type);

export const findPlayerByOtherType = (type) =>
  players.find((player) => player.type !== type);

export const findShipByCell = (player, cell) =>
  player.ships.find((ship) =>
    ship.occupiedCells.find((item) => item.coords === cell.coords)
  );

export const resetPlayers = () => {
  gameBoardContainer.innerHTML = "";
  players.length = 0;
  setUser(new Player("player1", userType, boardSize));
  setComputer(new Computer("player2", computerType, boardSize));
  players.push(user, computer);
};

export const restartGame = () => {
  resetPlayers();
  beginGame();
};

export const clearGame = () => {
  document.body.innerHTML = "";
};

export const setUpDemoBoards = () => {
  user.addBoardClass(active);
};

export const setUpBoards = async () => {
  user.addBoardClass(setUpClass);

  computer.addBoardClass(active);
  computer.addBoardClass(setUpClass);

  //CSS ANIMATION CONFLICT:
  //Remove setUpClass before adding hoveringClass

  await wait(tileSetupAnimLength);

  user.removeBoardClass(setUpClass);
  computer.removeBoardClass(setUpClass);

  user.addBoardClass(boardClickableClass);
  user.addBoardClass(hoveringClass);

  computer.addBoardClass(tilesClickableClass);
  computer.addBoardClass(boardClickableClass);
  computer.addBoardClass(hoveringClass);
};

export const setUpShips = () => {
  user.ships.forEach((ship) => ship.placeShipPieces());
  computer.ships.forEach((ship) => ship.placeShipPieces());
};
