import {
  beginGame,
  beginTutorial,
  tutorialHitPiece,
  tutorialMissTile,
  tutorialSinkAllShips,
  tutorialSunkShip,
} from "./gameplay-chapters.js";
import {
  clearGame,
  goToMessageObj,
  goToNextMessageObj,
  goToPrevMessageObj,
  restartGame,
  swapPlayerBoards,
  wait,
} from "./helper-functions.js";
import { computer, messageBoxHandler, user } from "./main.js";

const messageObjects = {
  introduction: [
    {
      state: "confirm",
      header: "Introduction",
      textList: ["Hello, and welcome to my battleship game!"],
      confirmStep: () => {
        goToNextMessageObj();
      },
    },
    {
      state: "yes-no",
      header: "Introduction",
      textList: ["Would you like a tutorial on how to play?"],
      yesStep: () => {
        beginTutorial();
        goToMessageObj(messageObjects.tutorials, 0);
      },
      noStep: () => {
        goToNextMessageObj();
      },
    },
    {
      state: "prev-next",
      header: "Introduction",
      textList: ["Very well, then let us begin!"],
      prevStep: () => {
        goToPrevMessageObj();
      },
      nextStep: () => {
        messageBoxHandler.closeMessage();
        beginGame();
      },
    },
  ],
  tutorials: [
    {
      state: "confirm",
      header: "Tutorial",
      textList: [
        "You and your opponent each start with a board populated by ship pieces",
      ],
      confirmStep: () => {
        goToNextMessageObj(messageObjects.tutorials);
        swapPlayerBoards(computer, user, true);
      },
    },
    {
      state: "confirm",
      header: "Tutorial",
      textList: [
        "Your pieces are represented by these circles, while your opponent's pieces are hidden",
      ],
      confirmStep: () => {
        tutorialMissTile();
        goToNextMessageObj();
      },
    },
    {
      state: "confirm",
      header: "Tutorial",
      textList: [
        "If you click an unoccupied tile, it's a miss, and your opponent gets to try to find your pieces.",
      ],
      confirmStep: () => {
        tutorialHitPiece(computer);
        goToNextMessageObj();
      },
    },
    {
      state: "confirm",
      header: "Tutorial",
      textList: [
        "If you click on a tile occupied by one of the enemy ships, you will land a hit!",
      ],
      confirmStep: () => {
        tutorialSunkShip();
        goToNextMessageObj();
      },
    },
    {
      state: "confirm",
      header: "Tutorial",
      textList: [
        "If you click all of the pieces belonging to the same ship, you sink that ship!",
      ],
      confirmStep: () => {
        tutorialSinkAllShips();
        goToNextMessageObj();
      },
    },
    {
      state: "confirm",
      header: "Tutorial",
      textList: [
        "If you sink all of your opponents ships before they sink yours, you win!",
      ],
      confirmStep: () => {
        goToNextMessageObj();
      },
    },
    {
      state: "confirm",
      header: "Tutorial",
      textList: ["Alright! Let's begin!"],
      confirmStep: () => {
        messageBoxHandler.closeMessage();
        beginGame();
      },
    },
  ],
  replay: [
    {
      state: "yes-no",
      header: "Game Over",
      textList: ["Would you like to play again?"],
      yesStep: () => {
        messageBoxHandler.closeMessage();
        restartGame();
      },
      noStep: async () => {
        goToMessageObj(messageObjects.gameOver, 0);
        await wait(1000);
        clearGame();
        messageBoxHandler.closeMessage();
      },
    },
  ],
  gameOver: [
    {
      state: "confirm",
      header: "Game Over",
      textList: ["Thank you for playing! Have a nice day!"],
      confirmStep: () => {
        clearGame();
        messageBoxHandler.closeMessage();
      },
    },
  ],
};

export default messageObjects;
