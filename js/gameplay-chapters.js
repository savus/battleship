import {
  pause,
  removeActive,
  setActive,
  messageHandler,
  currentMessageObj,
} from "./main.js";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);
const loadingScreenDuration = 5000;
const pauseBetweenAnimations = 500;

/* APPLICATION GAMEPLAY */

export const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
};

export const beginIntroduction = async () => {
  await pause(pauseBetweenAnimations);
  messageHandler.openMessageBox();
  await pause(pauseBetweenAnimations);
  messageHandler.readCurrentMessage(currentMessageObj);
};
