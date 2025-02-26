import {
  clearText,
  removeActive,
  setActive,
  typeWords,
} from "./helper-functions.js";
import {
  currentMessageObj,
  dataButton,
  dataObjectIndex,
  setCurrentMessageObj,
  setDataObjectIndex,
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
  constructor(messageBox, controls, textField) {
    this.controls = controls;
    this.messageBox = messageBox;
    this.textField = textField;
  }

  openMessageBox = () => {
    setActive(this.messageBox);
    this.messageBox.classList.remove("close");
  };

  closeMessageBox = () => {
    removeActive(this.messageBox);
    this.messageBox.classList.add("close");
  };

  updateHeader = (string) => (messageBoxHeader.innerText = string);

  updateControlState = (messageObj) => {
    setControlState(this.controls, messageObj.dataState);
  };

  clearText = () => {
    clearText(this.textField);
  };

  setMessageListIndex = (num) => (this.messageListIndex = num);

  resetMessageListIndex = () => (this.messageListIndex = 0);

  readCurrentMessage = (messageObj) => {
    this.clearText();
    this.updateHeader(messageObj.header);
    this.updateControlState(messageObj);
    typeWords(
      this.textField,
      messageObj.messageList[this.messageListIndex],
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
}

export const messageHandler = new MessageHandler(
  messageBox,
  messageBoxControls,
  messageText
);

const goToPrevDataObject = (dataList, messageHandler) => {
  const isFirstObject = dataObjectIndex === 0;
  if (!isFirstObject) {
    setDataObjectIndex(dataObjectIndex - 1);
    setCurrentMessageObj(dataList[dataObjectIndex]);
    messageHandler.readCurrentMessage(currentMessageObj);
  }
};

const goToNextDataObject = (dataList, messageHandler) => {
  const isLastObject = dataObjectIndex === dataList.length;
  if (!isLastObject) {
    setDataObjectIndex(dataObjectIndex + 1);
    setCurrentMessageObj(dataList[dataObjectIndex]);
    messageHandler.readCurrentMessage(currentMessageObj);
  }
};

const goToDataObject = (dataList, indexNum, messageHandler) => {
  setDataObjectIndex(indexNum);
  setCurrentMessageObj(dataList[dataObjectIndex]);
  messageHandler.readCurrentMessage(currentMessageObj);
};

export const setControlState = (element, dataState) => {
  element.setAttribute("data-state", dataState);
};

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
export { goToPrevDataObject, goToNextDataObject, goToDataObject };
