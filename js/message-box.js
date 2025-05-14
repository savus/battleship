import { removeActive, setActive, typeWords } from "./utility-functions.js";
import {
  currentMessageObj,
  dataButton,
  messageObjIndex,
  setCurrentMessageObj,
  setMessageObjIndex,
  textSpeed,
} from "./main.js";

const messageBoxClass = ".message-box";
const headerClass = ".message-box-header";
const messageControls = ".message-box-controls";
const messageTextClass = ".message-box-text";

export const messageBox = document.querySelector(messageBoxClass);
export const messageBoxHeader = document.querySelector(headerClass);
export const messageBoxControls = document.querySelector(messageControls);
export const messageText = document.querySelector(messageTextClass);

class MessageHandler {
  messageListIndex = 0;
  isOpen = false;
  delayOpenConfirm = false;
  constructor(messageBox, controls, textField) {
    this.controls = controls;
    this.messageBox = messageBox;
    this.textField = textField;
  }

  openMessageBox = () => {
    setActive(this.messageBox);
    this.messageBox.classList.remove("close");
    this.isOpen = true;
  };

  closeMessageBox = () => {
    removeActive(this.messageBox);
    this.messageBox.classList.add("close");
    this.isOpen = false;
    this.delayOpenConfirm = false;
  };

  updateHeader = (string) => (messageBoxHeader.innerText = string);

  updateControlBox = (dataState) => {
    this.controls.setAttribute("data-state", dataState);
  };

  clearText = () => (this.textField.innerText = "");

  setMessageListIndex = (num) => (this.messageListIndex = num);

  resetMessageListIndex = () => (this.messageListIndex = 0);

  readCurrentMessage = (messageObj, customMessage = null) => {
    if (messageObj.dataState === "thinking") {
      this.messageBox.classList.add("thinking");
    } else {
      this.messageBox.classList.remove("thinking");
    }
    this.clearText();
    this.updateHeader(messageObj.header);
    this.updateControlBox(messageObj.dataState);
    typeWords(
      this.textField,
      customMessage || messageObj.messageList[this.messageListIndex],
      textSpeed
    );
  };

  readPrevMessage = (messageObj) => {
    const isFirstMessage = this.messageListIndex === 0;
    if (!isFirstMessage) {
      this.messageListIndex--;
      this.readCurrentMessage(messageObj);
    } else {
      messageObj.prevStep();
    }
  };

  readNextMessage = (messageObj) => {
    this.messageListIndex++;
    const isLastMessage =
      this.messageListIndex === messageObj.messageList.length;
    if (!isLastMessage) {
      this.readCurrentMessage(messageObj);
    } else {
      this.resetMessageListIndex();
      messageObj.nextStep();
    }
  };

  goToPrevMessageData = (dataList) => {
    const isFirstObject = messageObjIndex === 0;
    if (!isFirstObject) {
      setMessageObjIndex(messageObjIndex - 1);
      setCurrentMessageObj(dataList[messageObjIndex]);
      this.readCurrentMessage(currentMessageObj);
    }
  };

  goToNextMessageData = (dataList) => {
    const isLastObject = messageObjIndex === dataList.length;
    if (!isLastObject) {
      setMessageObjIndex(messageObjIndex + 1);
      setCurrentMessageObj(dataList[messageObjIndex]);
      this.readCurrentMessage(currentMessageObj);
    }
  };

  goToMessageData = (dataList, indexNum, customMessage = null) => {
    setMessageObjIndex(indexNum);
    setCurrentMessageObj(dataList[messageObjIndex]);
    this.readCurrentMessage(currentMessageObj, customMessage);
  };
}

export const messageHandler = new MessageHandler(
  messageBox,
  messageBoxControls,
  messageText
);

const disableButton = (btn) => (btn.disabled = true);

const enableButton = (btn) => (btn.disabled = false);

export const disableAllControlButtons = () =>
  document
    .querySelectorAll(dataButton)
    .forEach((button) => disableButton(button));

export const enableAllControlButtons = () =>
  document
    .querySelectorAll(dataButton)
    .forEach((button) => enableButton(button));

export default MessageHandler;
