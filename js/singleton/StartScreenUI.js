import { onStartButtonClick } from "../event-listeners/click-events.js";

export const startScreen = document.querySelector(".start-screen");
export const startButton = startScreen.querySelector(`.btn`);

const StartScreenUI = {
  startScreen,
  startButton,
};

startButton.addEventListener("click", onStartButtonClick);

export default StartScreenUI;
