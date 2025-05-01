// import { removeActive, setActive, typeWords } from "./utility-functions.js";
// import {
//   currentMessageObj,
//   dataButton,
//   messageObjIndex,
//   setCurrentMessageObj,
//   setMessageObjIndex,
//   textSpeed,
// } from "./main.js";

import { close, dataState, messageBoxDur } from "./main.js";
import {
  removeActive,
  setActive,
  typeWords,
  wait,
} from "./utility-functions.js";

export class MessageBoxHandler {
  textListIndex = 0;
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
  };

  clearText = () => (this.textField.innerHTML = "");

  readMessageObj = async (messageObj) => {
    console.log(messageObj, this.textListIndex);
    const { state, header, textList } = messageObj;
    this.openMessage();
    this.header.innerHTML = header;
    this.controls.setAttribute(dataState, state);
    await typeWords(this.textField, textList[this.textListIndex]);
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

// class MessageHandler {
//   messageListIndex = 0;
//   isOpen = false;
//   delayOpenConfirm = false;
//   constructor(messageBox, controls, textField) {
//     this.controls = controls;
//     this.messageBox = messageBox;
//     this.textField = textField;
//   }

//   openMessageBox = () => {
//     setActive(this.messageBox);
//     this.messageBox.classList.remove("close");
//     this.isOpen = true;
//   };

//   closeMessageBox = () => {
//     removeActive(this.messageBox);
//     this.messageBox.classList.add("close");
//     this.isOpen = false;
//     this.delayOpenConfirm = false;
//   };

//   updateHeader = (string) => (messageBoxHeader.innerText = string);

//   updateControlBox = (dataState) => {
//     this.controls.setAttribute("data-state", dataState);
//   };

//   clearText = () => (this.textField.innerText = "");

//   setMessageListIndex = (num) => (this.messageListIndex = num);

//   resetMessageListIndex = () => (this.messageListIndex = 0);

//   readCurrentMessage = (messageObj, customMessage = null) => {
//     if (messageObj.dataState === "thinking") {
//       this.messageBox.classList.add("thinking");
//     } else {
//       this.messageBox.classList.remove("thinking");
//     }
//     this.clearText();
//     this.updateHeader(messageObj.header);
//     this.updateControlBox(messageObj.dataState);
//     typeWords(
//       this.textField,
//       customMessage || messageObj.messageList[this.messageListIndex],
//       textSpeed
//     );
//   };

//   readPrevMessage = (messageObj) => {
//     const isFirstMessage = this.messageListIndex === 0;
//     if (!isFirstMessage) {
//       this.messageListIndex--;
//       this.readCurrentMessage(messageObj);
//     } else {
//       messageObj.prevStep();
//     }
//   };

//   readNextMessage = (messageObj) => {
//     this.messageListIndex++;
//     const isLastMessage =
//       this.messageListIndex === messageObj.messageList.length;
//     if (!isLastMessage) {
//       this.readCurrentMessage(messageObj);
//     } else {
//       this.resetMessageListIndex();
//       messageObj.nextStep();
//     }
//   };

//   goToPrevMessageData = (dataList) => {
//     const isFirstObject = messageObjIndex === 0;
//     if (!isFirstObject) {
//       setMessageObjIndex(messageObjIndex - 1);
//       setCurrentMessageObj(dataList[messageObjIndex]);
//       this.readCurrentMessage(currentMessageObj);
//     }
//   };

//   goToNextMessageData = (dataList) => {
//     const isLastObject = messageObjIndex === dataList.length;
//     if (!isLastObject) {
//       setMessageObjIndex(messageObjIndex + 1);
//       setCurrentMessageObj(dataList[messageObjIndex]);
//       this.readCurrentMessage(currentMessageObj);
//     }
//   };

//   goToMessageData = (dataList, indexNum, customMessage = null) => {
//     setMessageObjIndex(indexNum);
//     setCurrentMessageObj(dataList[messageObjIndex]);
//     this.readCurrentMessage(currentMessageObj, customMessage);
//   };
// }

// export const messageHandler = new MessageHandler(
//   messageBox,
//   messageBoxControls,
//   messageText
// );

// const disableButton = (btn) => (btn.disabled = true);

// const enableButton = (btn) => (btn.disabled = false);

// export const disableAllControlButtons = () =>
//   document
//     .querySelectorAll(dataButton)
//     .forEach((button) => disableButton(button));

// export const enableAllControlButtons = () =>
//   document
//     .querySelectorAll(dataButton)
//     .forEach((button) => enableButton(button));

// export default MessageHandler;
