import {
  clearText,
  currentMessageObj,
  dataObjectIndex,
  removeActive,
  setActive,
  setControlState,
  setCurrentMessageObj,
  setDataObjectIndex,
  textSpeed,
  typeWords,
} from "./main.js";

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

const goToPrevDataObject = (dataList, messageHandler) => {
  const isFirstObject = dataObjectIndex === 0;
  if (!isFirstObject) {
    setDataObjectIndex(dataObjectIndex - 1);
    currentMessageObj = dataList[dataObjectIndex];
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

export default MessageHandler;
export { goToPrevDataObject, goToNextDataObject, goToDataObject };
