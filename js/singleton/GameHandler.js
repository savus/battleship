import OptionsMenuUI from "./OptionsMenuUI.js";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);

/* APPLICATION GAMEPLAY */
const playGame = () => {
  OptionsMenuUI.updateOptions();
  // shouldRunLoadingScreen().then(beginIntroduction);
};

const checkIfPlayedBefore = () => {
  let isLocalStorage = JSON.parse(
    localStorage.getItem(hasPlayedBefore) || false,
  );
  return isLocalStorage;
};

const shouldRunLoadingScreen = async () => {
  if (!checkIfPlayedBefore()) {
    localStorage.setItem(hasPlayedBefore, JSON.stringify(true));
    await beginLoading();
  }
  return;
};

const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
  await pause(pauseBetweenAnimations);
  return;
};

const beginIntroduction = async () => {
  messageHandler.openMessageBox();
  await pause(pauseBetweenAnimations);
  messageHandler.readCurrentMessage(currentMessageObj);
  return;
};

const buildGameBoards = async () => {
  setTutorialMode(false);
  appendGameBoards(user, computer);
  placeShipsOfPlayers(user, computer);
  setActive(user.boardHTML, gameBoardClass);
  return runBoardSetupAnimation();
};

const runBoardSetupAnimation = async () => {
  playersSetup(user, computer);
  await pause(pauseBetweenSetup);
  endPlayersSetup(user, computer);
  startPlayersHovering(user, computer);
  await pause(pauseBetweenAnimations);
  displayBoardTilesOfPlayers(user, computer);
};

const endGame = async () => {
  setCurrentTurn("end");
  messageHandler.openMessageBox();
  messageHandler.goToMessageData(messageData.gameEnd, 0);
};

const GameHandler = {
  playGame,
};

export default GameHandler;
