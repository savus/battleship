export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const active = "active";
export const dataButton = "[data-button]";

export const root = document.documentElement;
export const boardSize = 6;
const gameContainerClass = ".game-board-container";
export const gameContainer = document.querySelector(gameContainerClass);
// export const user = new Player("player", boardSize, "large", false);
// export const computer = new Player("computer", boardSize, "large", false);
// export const demoUser = new Player("player", 6, "large", true);
// export const demoComputer = new Player("computer", 6, "large", true);
export const demoUserShips = ["B2", "B3", "B4", "B5", "A0", "B0", "C0", "D0"];
export const demoComputerShips = ["C2", "C3", "C4", "C5", "E0", "F0"];
export const hasPlayedBefore = "hasPlayedBefore";
export let textSpeed = 10;
export let messageListIndex = 0;
export let messageObjIndex = 0;
// export let currentMessageObj = messageData.introductions[messageObjIndex];
export let userInput = "";
export let currentTurn = "player";

export const setMessageObjIndex = (num) => (messageObjIndex = num);
export const setCurrentMessageObj = (messageObj) =>
  (currentMessageObj = messageObj);
export const setUserInput = (value) => (userInput = value);
export const setUserInputField = (value) => (userInputField.value = value);
export const setUserSaidYes = (boolean) => (userSaidYes = boolean);
export const setUserSaidNo = (boolean) => (userSaidNo = boolean);
export const getCurrentTurn = () => currentTurn;
export const setCurrentTurn = (string) => (currentTurn = string);
export const reverseCurrentTurn = () => {
  const oppositeTurn = getCurrentTurn() === "player" ? "computer" : "player";
  setCurrentTurn(oppositeTurn);
};
export const setDebugMode = (boolean) => (debugMode = boolean);
export const setHardMode = (boolean) => (hardMode = boolean);
export const getCurrentPlayer = (player, opponent) =>
  getCurrentTurn() === "player" ? player : opponent;
export const getOpposingPlayer = (player, opponent) =>
  getCurrentTurn() === "player" ? opponent : player;
export const setTutorialMode = (boolean) => (tutorialMode = boolean);
