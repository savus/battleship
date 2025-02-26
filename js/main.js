import { buildBoardData } from "./board-elements.js";
import data from "./data-objects.js";
import { beginIntroduction, beginLoading } from "./gameplay-chapters.js";
import { removeSelectedActive, setActive } from "./helper-functions.js";
import MessageHandler, {
  messageBox,
  messageBoxControls,
  messageHandler,
  messageText,
} from "./message-box.js";
import { Player } from "./player.js";
import { populateShips, shipData } from "./ship.js";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const active = "active";
export const dataButton = "[data-button]";

const userInputID = "user-input";
export const userInputField = document.getElementById(userInputID);

const boardSize = 6;
const gameContainerClass = ".game-board-container";
const gameContainer = document.querySelector(gameContainerClass);

export let textSpeed = 10;
export let messageListIndex = 0;
export let dataObjectIndex = 0;
export let currentMessageObj = data.introductions[dataObjectIndex];
export let userInput = "";
export let currentTurn = "player";
let userSaidYes = false;
let userSaidNo = false;

export const setDataObjectIndex = (num) => (dataObjectIndex = num);
export const setCurrentMessageObj = (messageObj) =>
  (currentMessageObj = messageObj);
export const setUserInput = (value) => (userInput = value);
export const setUserInputField = (value) => (userInputField.value = value);
export const setUserSaidYes = (boolean) => (userSaidYes = boolean);
export const setUserSaidNo = (boolean) => (userSaidNo = boolean);
export const setCurrentTurn = (string) => (currentTurn = string);
export const getCurrentTurn = () => currentTurn;

const { element: playerHTML, object: playerBoard } = buildBoardData(
  boardSize,
  "large",
  "player"
);

const { element: computerHTML, object: computerBoard } = buildBoardData(
  boardSize,
  "large",
  "computer"
);

const user = new Player(playerBoard, populateShips(shipData, playerBoard));
const computer = new Player(
  computerBoard,
  populateShips(shipData, computerBoard)
);

// RUN APPLICATION

// const playerShips = populateShips(shipData, playerBoard);
// const computerShips = populateShips(shipData, computerBoard);

gameContainer.appendChild(playerHTML);
gameContainer.appendChild(computerHTML);

user.placeAllShips();
computer.placeAllShips();

// beginLoading().then(beginIntroduction);
// beginIntroduction();
// getCell(playerBoard, "A0").displayStatus();
// playerShips.forEach((ship) => ship.placeShipPieces(boardSize));
// computerShips.forEach((ship) => ship.placeShipPieces(boardSize));

/* ============= */

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
        setUserSaidYes(true);
        currentMessageObj.yesStep();
        break;
      case "no":
        setUserSaidNo(true);
        currentMessageObj.noStep();
        break;
    }
  }
});

document.addEventListener("click", (e) => {
  const isTile = e.target.matches(".tile");

  if (!isTile) {
    removeSelectedActive(".tile");
  }

  // if (isTile) {
  //   setActive(e.target, ".tile");
  // }
});

//DEBUGGING
let controlsToggle = false;
const testControls = () => {};

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
