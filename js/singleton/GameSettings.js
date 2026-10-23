let debugMode = false;
let hardMode = false;
let userSaidYes = false;
let userSaidNo = false;
let tutorialMode = false;
let loadingScreenDuration = 5000;
let pauseBetweenAnimations = 500;
let pauseBetweenSetup = pauseBetweenAnimations * 5.5;
let computerThinkingDuration = 1500;

const GameSettings = {
  debugMode,
  hardMode,
  userSaidNo,
  userSaidYes,
  tutorialMode,
  loadingScreenDuration,
  pauseBetweenAnimations,
  pauseBetweenSetup,
  computerThinkingDuration,
};

export default GameSettings;
