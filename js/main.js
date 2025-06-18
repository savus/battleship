import {
  documentClickHandler,
  exitGameClick,
  messageBoxControlsHandler,
  startButtonClick,
  toggleDebugMode,
} from "./click-functions.js";
import { removeActive, setActive, wait } from "./helper-functions.js";

import { MessageBoxHandler } from "./message-box-handler.js";
import messageObjects from "./message-data-objects.js";

export const close = "close";
export const open = "open";
export const enabled = "enabled";
export const active = "active";
export const dataState = "data-state";
export const dataStatus = "data-status";
export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 6;
export const rowClass = "row";
export const tileClass = "tile";
export const hoveringClass = "hovering";
export const setUpClass = "set-up";
export const tilesClickableClass = "tiles-clickable";
export const boardClickableClass = "board-clickable";
export const userType = "user";
export const computerType = "computer";
export const computerThinkingDuration = 680;

export let debugMode = false;
export let hardMode = false;

export const setDebugMode = (bool) => (debugMode = bool);
export const setHardMode = (bool) => (hardMode = bool);

const root = document.documentElement;

export const gameBoardClass = "game-board";
export const messageBoxDur =
  getComputedStyle(root).getPropertyValue("--message-box-dur") * 500;
export const messageTypingSpeed = 12;

export const tileSetupDuration =
  getComputedStyle(root).getPropertyValue("--tile-setup-dur") * 1000;
export const tileSetupDelay =
  getComputedStyle(root).getPropertyValue("--tile-setup-del") * 1000;

export const tileSetupAnimLength =
  boardSize ** 2 * tileSetupDelay + tileSetupDuration;

const messageBoxClass = "message-box";
const headerClass = "message-box-header";
const messageControls = "message-box-controls";
const messageTextClass = "message-box-text";

const messageBox = document.querySelector(`.${messageBoxClass}`);
const messageBoxHeader = document.querySelector(`.${headerClass}`);
const messageBoxControls = document.querySelector(`.${messageControls}`);
const messageText = document.querySelector(`.${messageTextClass}`);

export const messageBoxHandler = new MessageBoxHandler(
  messageBox,
  messageBoxHeader,
  messageBoxControls,
  messageText
);

const controlButtonSelector = "[data-button]";
export const controlButtons = document.querySelectorAll(controlButtonSelector);

const promptInputSelector = "#user-input";
export const promptInput = document.querySelector(promptInputSelector);

export let currentMessageIndex = 0;
export let currentMessageArray = messageObjects.introduction;
export let currentMessageObject = currentMessageArray[currentMessageIndex];

export const setCurrentMessageIndex = (num) => (currentMessageIndex = num);
export const setCurrentMessageArray = (array) => (currentMessageArray = array);
export const setCurrentMessageObj = (obj) => (currentMessageObject = obj);

export const gameBoardContainerClass = "game-board-container";
export const gameBoardContainer = document.querySelector(
  `.${gameBoardContainerClass}`
);

export let user;
export let computer;

export const setUser = (obj) => (user = obj);
export const setComputer = (obj) => (computer = obj);

export const players = [];

const loadingScreenClass = ".loading-screen";
const loadingScreen = document.querySelector(loadingScreenClass);
const loadingDuration = 6000;
const playedGameBefore = "playedGameBefore";
let hasPlayedBefore =
  JSON.parse(localStorage.getItem(playedGameBefore)) || false;

const startScreenClass = ".start-screen";
export const startScreen = document.querySelector(startScreenClass);
const startButtonId = "start-button";
const startButton = document.getElementById(startButtonId);

export const optionsMenuClass = ".options-menu";
export const optionsMenu = document.querySelector(optionsMenuClass);
export const optionsTabSelector = "[data-open]";
export const optionsTab = document.querySelector(optionsTabSelector);
const debugSelector = ".debug-button";
export const debugButton = document.querySelector(debugSelector);
const hardModeSelector = ".hard-mode-button";
export const hardModeButton = document.querySelector(hardModeSelector);
const exitGameSelector = ".exit-game-button";
export const exitGameButton = document.querySelector(exitGameSelector);

/* BEGIN LOADING ANIMATION */

if (!hasPlayedBefore) {
  setActive(loadingScreen);

  await wait(loadingDuration);

  hasPlayedBefore = true;

  localStorage.setItem(playedGameBefore, JSON.stringify(hasPlayedBefore));
  removeActive(loadingScreen);
}

setActive(startScreen);

messageBoxControls.addEventListener("click", messageBoxControlsHandler);

startButton.addEventListener("click", startButtonClick);

debugButton.addEventListener("click", ({ target }) => {
  toggleDebugMode(target);
});

hardModeButton.addEventListener("click", ({ target }) => {
  target.classList.toggle(enabled);
  setHardMode(!hardMode, target);
});

exitGameButton.addEventListener("click", async ({ target }) => {
  exitGameClick(target);
});

document.addEventListener("click", documentClickHandler);
