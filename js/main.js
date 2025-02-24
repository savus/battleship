const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const active = "active";
const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);
const loadingScreenDuration = 5000;
const pauseBetweenAnimations = 500;

const messageBoxClass = ".message-box";
const messageControls = ".message-box-controls";
const messageTextClass = ".message-box-text";
const messageBox = document.querySelector(messageBoxClass);
const messageBoxControls = document.querySelector(messageControls);
const messageText = document.querySelector(messageTextClass);

const userInputID = "user-input";
const userInputField = document.getElementById(userInputID);

const btnPrompt = ".btn-prompt";
const btnPrev = ".btn-prev";
const btnYes = ".btn-yes";
const btnNo = ".btn-no";
const btnNext = ".btn-next";
const btnConfirm = ".btn-confirm";
const dataButton = "[data-button]";

const promptButton = document.querySelector(btnPrompt);
const prevButton = document.querySelector(btnPrev);
const yesButton = document.querySelector(btnYes);
const noButton = document.querySelector(btnNo);
const nextButton = document.querySelector(btnNext);
const confirmButton = document.querySelector(btnConfirm);

const data = {
  introductions: [
    {
      dataState: "prev-next",
      messageList: [
        "This is the first message",
        "This is going to be the second message",
        "And this here, hooooo boy, this is the third message",
        "You still with me here? Fourth message up and comming",
        "Aint no one stopping the fifth message",
        "For programming purposes, this should be the last message",
      ],
      prevStep: () => {
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
      nextStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "prompt",
      messageList: ["What do you like for breakfast in the morning?"],
      promptStep: () => {
        userInput = userInputField.value;
        console.log(`You like ${userInput}?`);
        clearText(messageText);
        userInputField.value = "";
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "prev-next",
      messageList: [
        "This is another prev-next message list, like maybe for a warning or something",
        "Like before you should be able to click back and forth between the texts",
        "This is number 3",
      ],
      prevStep: () => {
        goToPrevDataObject(data.introductions, messageHandler);
      },
      nextStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "confirm",
      messageList: [
        "This is a confirm message, like maybe for a warning or something",
      ],
      confirmStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "yes-no",
      messageList: ["Answer yes or no, do you like pancakes"],
      noStep: () => {
        console.log("You don't like pancakes!?");
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
      yesStep: () => {
        console.log("You actually DO like pancakes?!?!?!?");
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
    },
  ],
};

const gameContainerClass = ".game-board-container";
const gameContainer = document.querySelector(gameContainerClass);
console.log(gameContainer);

const shipData = [{ name: "Carrier", lives: 5, length: 5 }];

let textSpeed = 10;
let dataObjectIndex = 0;
let messageListIndex = 0;
let userInput = "";
let userSaidYes = false;
let userSaidNo = false;
let currentMessageObj = data.introductions[dataObjectIndex];

const setActive = (target, selector = null) => {
  removeSelectedActive(selector);
  target.classList.add(active);
};

const removeSelectedActive = (selector) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) selectedElement.classList.remove(active);
};

const removeActive = (target) => target.classList.remove(active);

const setControlState = (element, dataState) => {
  element.setAttribute("data-state", dataState);
};

const disableButton = (btn) => (btn.disabled = true);

const enableButton = (btn) => (btn.disabled = false);

const disableAllControlButtons = () =>
  document
    .querySelectorAll(dataButton)
    .forEach((button) => disableButton(button));

const enableAllControlButtons = () =>
  document
    .querySelectorAll(dataButton)
    .forEach((button) => enableButton(button));

const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

const typeWords = async (textField, message, typeSpeed = 50) => {
  disableAllControlButtons();
  const letters = message.split("");
  let text = "";
  for (let i = 0; i < letters.length; i++) {
    text += letters[i];
    textField.innerText = text;
    await pause(typeSpeed);
  }
  enableAllControlButtons();
};

const clearText = (textField) => (textField.innerText = "");

const resetYesAndNo = () => {
  userSaidNo = false;
  userSaidYes = false;
};

const resetUserInput = () => {
  userInputField.value = "";
  userInput = "";
};

class MessageHandler {
  messageListIndex = 0;
  constructor(messageBox, controls, textField) {
    this.controls = controls;
    this.messageBox = messageBox;
    this.textField = textField;
  }

  openMessageBox = () => {
    setActive(this.messageBox);
    this.messageBox.classList.remove("close");
  };

  closeMessageBox = () => {
    removeActive(this.messageBox);
    this.messageBox.classList.add("close");
  };

  updateControlState = (messageObj) => {
    setControlState(this.controls, messageObj.dataState);
  };

  clearText = () => {
    clearText(this.textField);
  };

  setMessageListIndex = (num) => (this.messageListIndex = num);

  resetMessageListIndex = () => (this.messageListIndex = 0);

  readCurrentMessage = (messageObj) => {
    this.clearText();
    this.updateControlState(messageObj);
    typeWords(
      this.textField,
      messageObj.messageList[this.messageListIndex],
      textSpeed
    );
  };

  readPrevMessage = (messageObj) => {
    const isFirstMessage = this.messageListIndex === 0;
    if (!isFirstMessage) {
      this.messageListIndex--;
      this.readCurrentMessage(messageObj);
    } else {
      messageObj.prevStep();
    }
  };

  readNextMessage = (messageObj) => {
    this.messageListIndex++;
    const isLastMessage =
      this.messageListIndex === messageObj.messageList.length;
    if (!isLastMessage) {
      this.readCurrentMessage(messageObj);
    } else {
      this.resetMessageListIndex();
      messageObj.nextStep();
    }
  };
}

const goToPrevDataObject = (dataList, messageHandler) => {
  const isFirstObject = dataObjectIndex === 0;
  if (!isFirstObject) {
    dataObjectIndex--;
    currentMessageObj = dataList[dataObjectIndex];
    messageHandler.readCurrentMessage(currentMessageObj);
  }
};

const goToNextDataObject = (dataList, messageHandler) => {
  const isLastObject = dataObjectIndex === dataList.length;
  if (!isLastObject) {
    dataObjectIndex++;
    currentMessageObj = dataList[dataObjectIndex];
    messageHandler.readCurrentMessage(currentMessageObj);
  }
};

const goToDataObject = (dataList, indexNum, messageHandler) => {
  dataObjectIndex = indexNum;
  currentMessageObj = dataList[dataObjectIndex];
  messageHandler.readCurrentMessage(currentMessageObj);
};

messageBoxControls.addEventListener("click", ({ target }) => {
  if (target.dataset.button) {
    switch (target.dataset.button) {
      case "next":
        messageHandler.readNextMessage(currentMessageObj);
        break;
      case "prev":
        messageHandler.readPrevMessage(currentMessageObj);
        break;
      case "prompt":
        currentMessageObj.promptStep();
        break;
      case "confirm":
        currentMessageObj.confirmStep();
        break;
      case "yes":
        userSaidYes = true;
        currentMessageObj.yesStep();
        break;
      case "no":
        userSaidNo = true;
        currentMessageObj.noStep();
        break;
    }
  }
});

const messageHandler = new MessageHandler(
  messageBox,
  messageBoxControls,
  messageText
);

/* BOARD ELEMENTS */

class Cell {
  constructor(type, id, status) {
    this.type = type;
    this.id = id;
    this.status = status;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);
}

const createCell = (type, id, status) => {
  const cell = new Cell(type, id, status);
  return cell;
};

const createGrid = (size, controller) => {
  const grid = {};
  for (let i = 0; i < size; i++) {
    grid[alphabet[i]] = [];
    for (let j = 0; j < size; j++) {
      grid[alphabet[i]][j] = createCell(controller, i + j, "empty");
    }
  }
  return grid;
};

const tileButtonClass = "tile-button";

class GameBoard {
  grid = {};
  constructor(size, type, controller) {
    this.size = size;
    this.type = type;
    this.controller = controller;
  }
}

const createTile = (tileCount) => {
  const tile = document.createElement("div");

  tile.className = "tile";
  tile.style.setProperty("--i", tileCount);
  return tile;
};

const createTileButton = (cell) => {
  const button = document.createElement("button");
  button.className = `btn ${tileButtonClass}`;
  button.innerText = "Confirm!";
  button.addEventListener("click", () => {
    cell.displayStatus();
  });
  return button;
};

const createTileStatus = () => {
  const tileStatus = document.createElement("div");
  tileStatus.className = "status";
  return tileStatus;
};

const createBoardElement = (size, type, controller) => {
  const boardHTML = document.createElement("div");
  const board = new GameBoard(size, type, controller);
  let tileCount = 0;

  boardHTML.id = controller;
  boardHTML.setAttribute("data-size", type);
  boardHTML.className = "game-board";

  for (let i = 0; i < size; i++) {
    tileCount++;
    const row = document.createElement("div");
    row.className = "row";
    board.grid[alphabet[i]] = [];
    for (let j = 0; j < size; j++) {
      tileCount++;
      const cell = new Cell(controller, `${alphabet[i]}:${j}`, "empty");
      const tile = createTile(tileCount);
      const button = createTileButton(cell);
      const tileStatus = createTileStatus();

      tile.appendChild(button);
      tile.appendChild(tileStatus);

      cell.htmlElement = tile;

      cell.displayStatus = function () {
        this.htmlElement.setAttribute("data-status", this.getStatus());
      };

      cell.displayStatus();
      board.grid[alphabet[i]][j] = cell;
      row.appendChild(tile);
    }
    boardHTML.appendChild(row);
  }

  return { element: boardHTML, object: board };
};

const getCell = (board, coords) => {
  const letter = coords.slice(0, 1);
  const number = coords.slice(1);
  return board.grid[letter][number];
};

const getTile = (board, coords) => {
  const cell = getCell(board, coords);
  return cell.htmlElement;
};

const setAllBoardTilesClass = (boardID, className) => {
  const tiles = Array.from(document.querySelectorAll(`#${boardID} .tile`));
  tiles.map((tile) => tile.classList.toggle(className));
};

class Ship {
  isHorizontal = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
  pieceLocations = [];
  constructor({ name, lives, length }) {
    this.name = name;
    this.lives = lives;
    this.length = length;
  }
}

/* APPLICATION GAMEPLAY */

const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
};

const beginIntroduction = async () => {
  await pause(pauseBetweenAnimations);
  messageHandler.openMessageBox();
  await pause(pauseBetweenAnimations);
  messageHandler.readCurrentMessage(currentMessageObj);
};

// RUN APPLICATION
const playerBoardData = createBoardElement(6, "large", "player");
const playerBoard = playerBoardData.object;
const playerBoardElement = playerBoardData.element;
const computerBoardData = createBoardElement(6, "large", "computer");
const computerBoard = computerBoardData.object;
const computerBoardElement = computerBoardData.element;
gameContainer.appendChild(playerBoardElement);
gameContainer.appendChild(computerBoardElement);

// beginLoading().then(beginIntroduction);
/* ============= */

//DEBUGGING
let controlsToggle = false;
const testControls = () => {
  if (!controlsToggle) setAllBoardTilesClass("player", "hovering");
  else {
    setAllBoardTilesClass("player", "hovering");
  }
  controlsToggle = !controlsToggle;
};

document.addEventListener("keyup", (e) => {
  const key = e.key;
  switch (key) {
    case "e":
      testControls();
      break;
    default:
      break;
  }
});

document.addEventListener("click", (e) => {
  const isTile = e.target.matches(".tile");

  if (!isTile) {
    removeSelectedActive(".tile");
  }

  if (isTile) {
    setActive(e.target, ".tile");
  }
});
