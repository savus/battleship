// import MessageData from "./message-data-class.js";
// import { buildGameBoards, endGame } from "./gameplay-chapters.js";
// import { messageHandler } from "./message-box.js";
// import {
//   computer,
//   demoComputer,
//   demoComputerShips,
//   demoUser,
//   demoUserShips,
//   getCurrentTurn,
//   pauseBetweenAnimations,
//   user,
//   userInputField,
//   userSaidNo,
//   userSaidYes,
// } from "./main.js";
// import { pause, removeGameBoards, setActive } from "./utility-functions.js";
// import {
//   beginTutorial,
//   hideComputerShips,
//   placeDemoShips,
//   showGameLost,
//   showHitTile,
//   showMissedTile,
//   showSunkShip,
// } from "./tutorial-functions.js";
// import { shipData } from "./ship.js";
// import { gameBoardClass } from "./board-elements.js";

import {
  beginGame,
  beginTutorial,
  tutorialHitPiece,
  tutorialMissTile,
  tutorialSinkAllShips,
  tutorialSunkShip,
} from "./gameplay-chapters.js";
import {
  goToMessageObj,
  goToNextMessageObj,
  goToPrevMessageObj,
  restartGame,
  swapPlayerBoards,
} from "./helper-functions.js";
import { computer, messageBoxHandler, user } from "./main.js";

// const messageData = {
//   testing: [
//     new MessageData(
//       "prev-next",
//       "Testing",
//       [
//         "This is for testing purposes",
//         "This is the next message in the sequence",
//         "This is number 3",
//       ],
//       {
//         prevStep: () => {
//           messageHandler.clearText();
//           messageHandler.closeMessageBox();
//         },
//         nextStep: () => {
//           messageHandler.goToNextMessageData(messageData.testing);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Testing",
//       ["Now we're testing to make sure the confirm button works"],
//       {
//         confirmStep: () => {
//           messageHandler.goToNextMessageData(messageData.testing);
//         },
//       }
//     ),
//     new MessageData(
//       "prev-next",
//       "Testing",
//       [
//         "This is to make sure that if we get another prev-next, it still works",
//         "number 2",
//         "number 3",
//       ],
//       {
//         prevStep: () => {
//           messageHandler.goToPrevMessageData(messageData.testing);
//         },
//         nextStep: () => {
//           messageHandler.goToNextMessageData(messageData.testing);
//         },
//       }
//     ),
//     new MessageData(
//       "prompt",
//       "Testing",
//       ["We have to make sure that the prompt works"],
//       {
//         promptStep: () => {
//           console.log(`${userInputField.value} is what you typed`);
//           messageHandler.goToNextMessageData(messageData.testing);
//         },
//       }
//     ),
//     new MessageData(
//       "yes-no",
//       "Testing",
//       ["And finally we have our yes or no buttons"],
//       {
//         yesStep: () => {
//           console.log(`You pressed ${userSaidYes ? "yes" : ""}`);
//           messageHandler.clearText();
//           messageHandler.closeMessageBox();
//         },
//         noStep: () => {
//           console.log(`You pressed ${userSaidNo ? "no" : ""}`);
//           messageHandler.clearText();
//           messageHandler.closeMessageBox();
//         },
//       }
//     ),
//   ],
//   introductions: [
//     new MessageData(
//       "prev-next",
//       "Introduction",
//       ["Hello, and welcome to my battleship game!"],
//       {
//         prevStep: () => {
//           endGame();
//         },
//         nextStep: () => {
//           messageHandler.goToNextMessageData(messageData.introductions);
//         },
//       }
//     ),
//     new MessageData(
//       "yes-no",
//       "Introduction",
//       ["Would you like a tutorial on how to play?"],
//       {
//         yesStep: () => {
//           messageHandler.goToMessageData(messageData.tutorials, 0);
//           beginTutorial(demoUser, demoComputer);
//         },
//         noStep: () => {
//           messageHandler.goToNextMessageData(messageData.introductions);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Introductions",
//       ["Very well! Then let us begin!"],
//       {
//         confirmStep: () => {
//           messageHandler.closeMessageBox();
//           buildGameBoards();
//         },
//       }
//     ),
//   ],
//   tutorials: [
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       ["You and the computer will each have a board filled with tiles"],
//       {
//         confirmStep: () => {
//           placeDemoShips(
//             demoUser,
//             demoComputer,
//             demoUserShips,
//             demoComputerShips
//           );
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       [
//         `You will be given ${shipData.length} ships of different lengths that will occupy the board`,
//       ],
//       {
//         confirmStep: () => {
//           setActive(demoComputer.boardHTML, `.${gameBoardClass}`);
//           hideComputerShips(demoComputer, demoComputerShips);
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "prev-next",
//       "Tutorials",
//       [
//         "You can swap views between your board and your opponent's board by clicking on them",
//         "You must select a tile that you think one of your opponent's ships might be hiding in",
//         "You and your opponent will take turns trying to find each other's pieces",
//       ],
//       {
//         prevStep: () => {
//           messageHandler.goToPrevMessageData(messageData.tutorials);
//         },
//         nextStep: () => {
//           showMissedTile(demoComputer.board, "B2");
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       [
//         "If an unoccupied tile is selected, a black X will appear, and then the next player will get a turn ",
//       ],
//       {
//         confirmStep: () => {
//           setActive(demoUser.boardHTML, `.${gameBoardClass}`);
//           showHitTile(demoUser.board, "B2");
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       [
//         "If a tile with a ship piece is selected, a red X will appear, indicating that piece was hit, and then the next player will get a turn",
//       ],
//       {
//         confirmStep: () => {
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       [
//         "You will not lose your turn if you accidentally select a tile that has already been selected",
//       ],
//       {
//         confirmStep: () => {
//           showSunkShip(demoUser.board, ["B2", "B3", "B4", "B5"]);
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       [
//         "If all the occupied tiles belonging to a single ship are hit, that ship is considered to be sunk",
//       ],
//       {
//         confirmStep: () => {
//           setActive(demoComputer.boardHTML, `.${gameBoardClass}`);
//           showGameLost(demoComputer.board, demoComputerShips);
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       [
//         "The object of the game is to sink all of your opponents pieces before they have a chance to sink yours",
//       ],
//       {
//         confirmStep: () => {
//           setActive(demoComputer.boardHTML, `.${gameBoardClass}`);
//           showGameLost(demoComputer.board, demoComputerShips);
//           messageHandler.goToNextMessageData(messageData.tutorials);
//         },
//       }
//     ),
//     new MessageData(
//       "confirm",
//       "Tutorials",
//       ["That concludes the tutorial! Let us begin a real game!"],
//       {
//         confirmStep: () => {
//           removeGameBoards(demoUser, demoComputer);
//           messageHandler.closeMessageBox();
//           buildGameBoards();
//         },
//       }
//     ),
//   ],
//   computerThinking: [
//     new MessageData("thinking", "Game Play", ["Computer is thinking..."]),
//   ],
//   alreadyAttempted: [
//     new MessageData(
//       "confirm",
//       "Game Play",
//       ["You have already attempted this location. Please choose another"],
//       {
//         confirmStep: () => {
//           messageHandler.closeMessageBox();
//         },
//       }
//     ),
//   ],
//   targetHit: [
//     new MessageData("confirm", "Game Play", ["Custom Hit Message Failed"], {
//       confirmStep: () => {
//         if (getCurrentTurn() === "computer") {
//           computer.playTurn(user);
//         } else {
//           messageHandler.closeMessageBox();
//         }
//       },
//     }),
//   ],
//   targetMissed: [
//     new MessageData("confirm", "Game Play", ["Custom Miss Message Failed"], {
//       confirmStep: () => {
//         if (getCurrentTurn() === "computer") {
//           computer.playTurn(user);
//         } else {
//           messageHandler.closeMessageBox();
//         }
//       },
//     }),
//   ],
//   targetSunk: [
//     new MessageData("confirm", "Game Play", ["Custom sunk message failed"], {
//       confirmStep: () => {
//         if (user.lostGame() || computer.lostGame()) return;
//         if (getCurrentTurn() === "computer") {
//           computer.playTurn(user);
//         } else {
//           messageHandler.closeMessageBox();
//         }
//       },
//     }),
//   ],
//   gameLostWon: [
//     new MessageData(
//       "confirm",
//       "Game Play",
//       ["custom won/lost message failed"],
//       {
//         confirmStep: () => {
//           endGame();
//         },
//       }
//     ),
//   ],
//   gamePlay: [],
//   gameEnd: [
//     new MessageData(
//       "confirm",
//       "Game Over",
//       ["Thank you for playing! Good Bye!"],
//       {
//         confirmStep: async () => {
//           messageHandler.clearText();
//           messageHandler.closeMessageBox();
//           await pause(pauseBetweenAnimations);
//           document.querySelector("*").style.display = "none";
//         },
//       }
//     ),
//   ],
// };

// export default messageData;

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
        restartGame();
      },
      noStep: () => {},
    },
  ],
  gameOver: [
    {
      state: "confirm",
      header: "Game Over",
      textList: ["Thank you for playing! Have a nice day!"],
    },
  ],
};

export default messageObjects;
