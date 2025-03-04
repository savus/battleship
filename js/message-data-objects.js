import MessageData from "./message-data-class.js";
import { buildGameBoards, endGame } from "./gameplay-chapters.js";
import { messageHandler } from "./message-box.js";
import {
  computer,
  getCurrentTurn,
  pauseBetweenAnimations,
  user,
  userInputField,
  userSaidNo,
  userSaidYes,
} from "./main.js";
import { pause } from "./utility-functions.js";

const messageData = {
  testing: [
    new MessageData(
      "prev-next",
      "Testing",
      [
        "This is for testing purposes",
        "This is the next message in the sequence",
        "This is number 3",
      ],
      {
        prevStep: () => {
          messageHandler.clearText();
          messageHandler.closeMessageBox();
        },
        nextStep: () => {
          messageHandler.goToNextMessageData(messageData.testing);
        },
      }
    ),
    new MessageData(
      "confirm",
      "Testing",
      ["Now we're testing to make sure the confirm button works"],
      {
        confirmStep: () => {
          messageHandler.goToNextMessageData(messageData.testing);
        },
      }
    ),
    new MessageData(
      "prev-next",
      "Testing",
      [
        "This is to make sure that if we get another prev-next, it still works",
        "number 2",
        "number 3",
      ],
      {
        prevStep: () => {
          messageHandler.goToPrevMessageData(messageData.testing);
        },
        nextStep: () => {
          messageHandler.goToNextMessageData(messageData.testing);
        },
      }
    ),
    new MessageData(
      "prompt",
      "Testing",
      ["We have to make sure that the prompt works"],
      {
        promptStep: () => {
          console.log(`${userInputField.value} is what you typed`);
          messageHandler.goToNextMessageData(messageData.testing);
        },
      }
    ),
    new MessageData(
      "yes-no",
      "Testing",
      ["And finally we have our yes or no buttons"],
      {
        yesStep: () => {
          console.log(`You pressed ${userSaidYes ? "yes" : ""}`);
          messageHandler.clearText();
          messageHandler.closeMessageBox();
        },
        noStep: () => {
          console.log(`You pressed ${userSaidNo ? "no" : ""}`);
          messageHandler.clearText();
          messageHandler.closeMessageBox();
        },
      }
    ),
  ],
  introductions: [
    new MessageData(
      "prev-next",
      "Introduction",
      ["Hello, and welcome to my battleship game!", "Let's begin!"],
      {
        prevStep: () => {
          endGame();
        },
        nextStep: () => {
          messageHandler.clearText();
          messageHandler.closeMessageBox();
          buildGameBoards();
        },
      }
    ),
  ],
  computerThinking: [
    new MessageData("thinking", "Game Play", ["Computer is thinking..."]),
  ],
  alreadyAttempted: [
    new MessageData(
      "confirm",
      "Game Play",
      ["You have already attempted this location. Please choose another"],
      {
        confirmStep: () => {
          messageHandler.closeMessageBox();
        },
      }
    ),
  ],
  targetHit: [
    new MessageData("confirm", "Game Play", ["Custom Hit Message Failed"], {
      confirmStep: () => {
        if (getCurrentTurn() === "computer") {
          computer.playTurn(user);
        } else {
          messageHandler.closeMessageBox();
        }
      },
    }),
  ],
  targetMissed: [
    new MessageData("confirm", "Game Play", ["Custom Miss Message Failed"], {
      confirmStep: () => {
        if (getCurrentTurn() === "computer") {
          computer.playTurn(user);
        } else {
          messageHandler.closeMessageBox();
        }
      },
    }),
  ],
  targetSunk: [
    new MessageData("confirm", "Game Play", ["Custom sunk message failed"], {
      confirmStep: () => {
        if (user.lostGame() || computer.lostGame()) return;
        if (getCurrentTurn() === "computer") {
          computer.playTurn(user);
        } else {
          messageHandler.closeMessageBox();
        }
      },
    }),
  ],
  gameLostWon: [
    new MessageData(
      "confirm",
      "Game Play",
      ["custom won/lost message failed"],
      {
        confirmStep: () => {
          endGame();
        },
      }
    ),
  ],
  gamePlay: [],
  gameEnd: [
    new MessageData(
      "confirm",
      "Game Over",
      ["Thank you for playing! Good Bye!"],
      {
        confirmStep: async () => {
          messageHandler.clearText();
          messageHandler.closeMessageBox();
          await pause(pauseBetweenAnimations);
          document.querySelector("*").style.display = "none";
        },
      }
    ),
  ],
};

export default messageData;
