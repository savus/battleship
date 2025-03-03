import { debugMode, hardMode } from "./main.js";

const dataOpen = "[data-open]";
const openTab = document.querySelector(dataOpen);
const debugClass = ".debug-button";
const debugButton = document.querySelector(debugClass);
const hardModeClass = ".hard-mode-button";
const hardModeButton = document.querySelector(hardModeClass);
const exitGameClass = ".exit-game-button";
const exitGameButton = document.querySelector(exitGameClass);

export const setButtonText = (button, text) => (button.innerText = text);

export const enableOption = (button) => button.classList.add("enabled");

export const disableOption = (button) => button.classList.remove("enabled");

export const toggleOption = (button) => button.classList.toggle("enabled");

export const updateOptions = () => {
  const debugText = !debugMode ? "Enable Debug Mode" : "Disable Debug Mode";
  const hardModeText = !hardMode ? "Enable Hard Mode" : "Disable Hard Mode";
  setButtonText(debugButton, debugText);
  !debugMode ? disableOption(debugButton) : enableOption(debugButton);
  setButtonText(hardModeButton, hardModeText);
  !hardMode ? disableOption(hardModeButton) : enableOption(hardModeButton);
};

export { openTab, debugButton, hardModeButton, exitGameButton };
