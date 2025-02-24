import {
  clearText,
  messageHandler,
  messageText,
  setUserInput,
  setUserInputField,
  userInput,
  userInputField,
} from "./main.js";
import { goToNextDataObject, goToPrevDataObject } from "./message-box.js";

const data = {
  introductions: [
    {
      dataState: "prev-next",
      messageList: [
        "This is the first message",
        "This is going to be the second message",
        "And this here, hooooo boy, this is the third message",
        "You still with me here? Fourth message up and comming",
        "Aint no one stopping the fifth message",
        "For programming purposes, this should be the last message",
      ],
      prevStep: () => {
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
      nextStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "prompt",
      messageList: ["What do you like for breakfast in the morning?"],
      promptStep: () => {
        setUserInput(userInputField.value);
        console.log(`You like ${userInput}?`);
        clearText(messageText);
        setUserInputField("");
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "prev-next",
      messageList: [
        "This is another prev-next message list, like maybe for a warning or something",
        "Like before you should be able to click back and forth between the texts",
        "This is number 3",
      ],
      prevStep: () => {
        goToPrevDataObject(data.introductions, messageHandler);
      },
      nextStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "confirm",
      messageList: [
        "This is a confirm message, like maybe for a warning or something",
      ],
      confirmStep: () => {
        goToNextDataObject(data.introductions, messageHandler);
      },
    },
    {
      dataState: "yes-no",
      messageList: ["Answer yes or no, do you like pancakes"],
      noStep: () => {
        console.log("You don't like pancakes!?");
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
      yesStep: () => {
        console.log("You actually DO like pancakes?!?!?!?");
        messageHandler.clearText();
        messageHandler.closeMessageBox();
      },
    },
  ],
};

export default data;
