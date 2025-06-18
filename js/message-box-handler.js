import { close, dataState, messageTypingSpeed } from "./main.js";
import { removeActive, setActive, typeWords } from "./helper-functions.js";

export class MessageBoxHandler {
  textListIndex = 0;
  state = "none";
  canBeClicked = false;
  constructor(messageBoxElem, header, controls, textField) {
    this.messageBoxElement = messageBoxElem;
    this.header = header;
    this.controls = controls;
    this.textField = textField;
  }

  openMessage = () => {
    setActive(this.messageBoxElement);
    this.messageBoxElement.classList.remove(close);
  };

  closeMessage = () => {
    removeActive(this.messageBoxElement);
    this.messageBoxElement.classList.add(close);
    this.canBeClicked = false;
  };

  clearText = () => (this.textField.innerHTML = "");

  readMessageObj = async (messageObj) => {
    const { state, header, textList } = messageObj;
    this.openMessage();
    this.header.innerHTML = header;
    this.controls.setAttribute(dataState, state);
    this.canBeClicked = false;
    this.state = state;
    await typeWords(
      this.textField,
      textList[this.textListIndex],
      messageTypingSpeed
    );
    this.canBeClicked = true;
    return;
  };

  prevStep = (messageObj) => {
    const shouldCallPrevStep = this.textListIndex === 0;
    if (shouldCallPrevStep) {
      return messageObj.prevStep();
    } else {
      this.textListIndex--;
      return this.readMessageObj(messageObj);
    }
  };

  nextStep = (messageObj) => {
    const shouldCallNextStep =
      this.textListIndex === messageObj.textList.length - 1;
    if (shouldCallNextStep) {
      this.textListIndex = 0;
      return messageObj.nextStep();
    } else {
      this.textListIndex++;
      return this.readMessageObj(messageObj);
    }
  };
}
