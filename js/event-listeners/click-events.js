import GameHandler from "../singleton/GameHandler.js";
import StartScreenUI from "../singleton/StartScreenUI.js";
import { removeActive } from "../utility-functions.js";

export const onStartButtonClick = () => {
  removeActive(StartScreenUI.startScreen);
  GameHandler.playGame();
};
