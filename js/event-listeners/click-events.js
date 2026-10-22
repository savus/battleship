import { playGame } from "../gameplay-chapters.js";
import StartScreenUI from "../singleton/StartScreenUI.js";
import { removeActive } from "../utility-functions.js";

export const onStartButtonClick = () => {
  removeActive(StartScreenUI.startScreen);
  //   playGame();
};
