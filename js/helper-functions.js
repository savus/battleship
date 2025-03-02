import { active, setUserInput, setUserInputField } from "./main.js";
import {
  disableAllControlButtons,
  enableAllControlButtons,
} from "./message-box.js";

export const setActive = (target, selector = null) => {
  removePreviousActive(selector);
  target.classList.add(active);
};

export const removePreviousActive = (selector) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) removeActive(selectedElement);
};

export const removeActive = (target) => target.classList.remove(active);

export const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

export const typeWords = async (textField, message, typeSpeed = 50) => {
  disableAllControlButtons();
  const letters = message.split("");
  let text = "";
  for (let i = 0; i < letters.length; i++) {
    text += letters[i];
    textField.innerText = text;
    await pause(typeSpeed);
  }
  enableAllControlButtons();
};

const resetYesAndNo = () => {
  setUserSaidNo(false);
  setUserSaidYes(false);
};

const resetUserInput = () => {
  setUserInputField("");
  setUserInput("");
};
