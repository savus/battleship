import GameSettings from "./GameSettings.js";

const debugButton = document.querySelector(".debug-button");
const hardModeButton = document.querySelector(".hard-mode-button");

const setButtonText = (button, text) => (button.innerText = text);

const enableOption = (button) => button.classList.add("enabled");

const disableOption = (button) => button.classList.remove("enabled");

const toggleOption = (button) => button.classList.toggle("enabled");

const updateOptions = () => {
  const { debugMode, hardMode } = GameSettings;
  const debugText = !debugMode ? "Enable Debug Mode" : "Disable Debug Mode";
  const hardModeText = !hardMode ? "Enable Hard Mode" : "Disable Hard Mode";
  setButtonText(debugButton, debugText);
  !debugMode ? disableOption(debugButton) : enableOption(debugButton);
  setButtonText(hardModeButton, hardModeText);
  !hardMode ? disableOption(hardModeButton) : enableOption(hardModeButton);
};

const OptionsMenuUI = { updateOptions };

export default OptionsMenuUI;
