import { active, setUserInput, setUserInputField } from "./main.js";
import {
  disableAllControlButtons,
  enableAllControlButtons,
} from "./message-box.js";

export const setActive = (target, selector = null) => {
  removeSelectedActive(selector);
  target.classList.add(active);
};

export const removeSelectedActive = (selector) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) selectedElement.classList.remove(active);
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

export const clearText = (textField) => (textField.innerText = "");

const resetYesAndNo = () => {
  setUserSaidNo(false);
  setUserSaidYes(false);
};

const resetUserInput = () => {
  setUserInputField("");
  setUserInput("");
};
