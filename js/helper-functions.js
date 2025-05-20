import {
  active,
  alphabet,
  boardClickableClass,
  boardSize,
  computerType,
  controlButtons,
  currentMessageIndex,
  currentMessageObject,
  messageBoxHandler,
  players,
  setCurrentMessageIndex,
  setCurrentMessageObj,
  tilesClickableClass,
} from "./main.js";

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

export const goToPrevMessageObj = (array) => {
  setCurrentMessageIndex(currentMessageIndex - 1);
  setCurrentMessageObj(array[currentMessageIndex]);
  messageBoxHandler.readMessageObj(currentMessageObject);
};

export const goToNextMessageObj = (array) => {
  setCurrentMessageIndex(currentMessageIndex + 1);
  setCurrentMessageObj(array[currentMessageIndex]);
  messageBoxHandler.readMessageObj(currentMessageObject);
};

export const goToMessageObj = (array, index) => {
  setCurrentMessageIndex(index);
  setCurrentMessageObj(array[currentMessageIndex]);
  messageBoxHandler.readMessageObj(currentMessageObject);
};

export const readCustomMessageObj = (obj) => {
  setCurrentMessageObj(obj);
  messageBoxHandler.readMessageObj(currentMessageObject);
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

export const swapPlayerBoards = (player1, player2) => {
  const isComputer = player1.type === computerType;
  player1.addBoardClass(active);
  if (isComputer) player1.addBoardClass(tilesClickableClass);

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

// export const getRandomCell = (board, boardSize) => {
//   const randomYCoord = alphabet[Math.floor(Math.random() * boardSize)];
//   const randomXCoord = Math.floor(Math.random() * boardSize);
//   return getCell(board, `${randomYCoord}${randomXCoord}`);
// };

// const resetYesAndNo = () => {
//   setUserSaidNo(false);
//   setUserSaidYes(false);
// };

// const resetUserInput = () => {
//   setUserInputField("");
//   setUserInput("");
// };

// export const separateChars = (coords) => {
//   const letter = coords.slice(0, 1);
//   const number = coords.slice(1);
//   return { letter: letter, number: number };
// };

// export const getCell = (board, coords) => {
//   const { letter: yCoord, number: xCoord } = separateChars(coords);
//   return board.grid[yCoord][xCoord];
// };

// export const convertCoordsToNumber = (coords) => {
//   const { letter, number } = separateChars(coords);
//   const column = letter.charCodeAt() - 65;
//   const row = parseInt(number);
//   return { column: column, row: row };
// };

// export const convertCoordsToString = (coordsData) => {
//   const { column, row } = coordsData;
//   return `${alphabet[column]}${row}`;
// };

// export const getRandomCell = (board, boardSize) => {
//   const randomYCoord = alphabet[Math.floor(Math.random() * boardSize)];
//   const randomXCoord = Math.floor(Math.random() * boardSize);
//   return getCell(board, `${randomYCoord}${randomXCoord}`);
// };

// export const isCellOccupied = (cell) => cell.getStatus() === "occupied";

// export const isCellAlreadyAttempted = (cell) =>
//   cell.getStatus() === "miss" || cell.getStatus() === "hit";

// export const areCoordsWithinBoard = (string, boardSize) => {
//   const { column, row } = convertCoordsToNumber(string);
//   return column < boardSize && row < boardSize;
// };

// export const displayCellStatus = (board, coords) => {
//   const cell = getCell(board, coords);
//   cell.displayStatus();
// };

// export const autoConfirmMessageBox = (isClicked) => {
//   if (isClicked) {
//     if (messageHandler.isOpen && currentMessageObj.dataState === "confirm") {
//       if (!messageHandler.delayOpenConfirm) {
//         messageHandler.delayOpenConfirm = true;
//       } else {
//         currentMessageObj.confirmStep();
//       }
//     }
//   } else {
//     if (messageHandler.isOpen && currentMessageObj.dataState === "confirm") {
//       currentMessageObj.confirmStep();
//     }
//   }
// };

// export const appendGameBoards = (user, computer) => {
//   gameContainer.appendChild(user.boardHTML);
//   gameContainer.appendChild(computer.boardHTML);
// };

// export const removeGameBoards = (user, computer) => {
//   gameContainer.removeChild(user.boardHTML);
//   gameContainer.removeChild(computer.boardHTML);
// };

// export const placeShipsOfPlayers = (user, computer) => {
//   user.placeAllShips();
//   computer.placeAllShips();
// };

// export const playersSetup = (user, computer) => {
//   user.board.toggleBoardTileClass("set-up");
//   computer.board.toggleBoardTileClass("set-up");
// };

// export const endPlayersSetup = (user, computer) => {
//   user.board.toggleBoardTileClass("set-up");
//   computer.board.toggleBoardTileClass("set-up");
// };

// export const startPlayersHovering = (user, computer) => {
//   user.board.toggleBoardTileClass("hovering");
//   computer.board.toggleBoardTileClass("hovering");
// };

// export const displayBoardTilesOfPlayers = (user, computer) => {
//   user.board.displayAllBoardTiles();
//   if (debugMode) {
//     computer.board.displayAllBoardTiles();
//   }
// };

// export const populateShips = (dataList, shipBoard) => {
//   return dataList.map((shipData) => new Ship(shipData, shipBoard));
// };
