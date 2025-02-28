import DataObject from "./data-object-class.js";
import { buildGameBoards } from "./gameplay-chapters.js";
import { clearText } from "./helper-functions.js";
import {
  setUserInput,
  setUserInputField,
  userInput,
  userInputField,
} from "./main.js";
import {
  goToNextDataObject,
  goToPrevDataObject,
  messageHandler,
  messageText,
} from "./message-box.js";

const data = {
  introductions: [
    new DataObject(
      "prev-next",
      "Introduction",
      ["Hello, and welcome to my battleship game!", "Let's begin!"],
      {
        prevStep: () => {
          messageHandler.clearText();
          messageHandler.closeMessageBox();
        },
        nextStep: () => {
          messageHandler.clearText();
          messageHandler.closeMessageBox();
          buildGameBoards();
        },
      }
    ),
  ],
  gamePlay: [],
};

export default data;

//new DataObject(
//     "prev-next",
//     "Introduction",
//     [
//       "This is the first message",
//       "This is going to be the second message",
//       "And this here, hooooo boy, this is the third message",
//       "You still with me here? Fourth message up and comming",
//       "Aint no one stopping the fifth message",
//       "For programming purposes, this should be the last message",
//     ],
//     {
//       prevStep: () => {
//         messageHandler.clearText();
//         messageHandler.closeMessageBox();
//       },
//       nextStep: () => {
//         goToNextDataObject(data.introductions, messageHandler);
//       },
//     }
//   ),
//   new DataObject(
//     "prompt",
//     "Introduction",
//     ["What do you like for breakfast in the morning?"],
//     {
//       promptStep: () => {
//         setUserInput(userInputField.value);
//         console.log(`You like ${userInput}?`);
//         clearText(messageText);
//         setUserInputField("");
//         goToNextDataObject(data.introductions, messageHandler);
//       },
//     }
//   ),
//   new DataObject(
//     "prev-next",
//     "Introduction",
//     [
//       "This is another prev-next message list, like maybe for a warning or something",
//       "Like before you should be able to click back and forth between the texts",
//       "This is number 3",
//     ],
//     {
//       prevStep: () => {
//         goToPrevDataObject(data.introductions, messageHandler);
//       },
//       nextStep: () => {
//         goToNextDataObject(data.introductions, messageHandler);
//       },
//     }
//   ),
//   new DataObject(
//     "confirm",
//     "Introduction",
//     ["This is a confirm message, like maybe for a warning or something"],
//     {
//       confirmStep: () => {
//         goToNextDataObject(data.introductions, messageHandler);
//       },
//     }
//   ),
//   new DataObject(
//     "yes-no",
//     "Introduction",
//     ["Answer yes or no, do you like pancakes"],
//     {
//       noStep: () => {
//         console.log("You don't like pancakes!?");
//         messageHandler.clearText();
//         messageHandler.closeMessageBox();
//       },
//       yesStep: () => {
//         console.log("You actually DO like pancakes?!?!?!?");
//         messageHandler.clearText();
//         messageHandler.closeMessageBox();
//       },
//     }
//   ),
// ],
// miscellaneous: [],
