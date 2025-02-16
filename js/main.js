const active = "active";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);
const loadingScreenDuration = 5000;

const messageBoxClass = ".message-box";
const messageBox = document.querySelector(messageBoxClass);
const messageControls = ".message-box-controls";
const messageBoxControls = document.querySelector(messageControls);
const messageTextClass = ".message-box-text";
const messageText = document.querySelector(messageTextClass);

messageBoxControls.addEventListener("click", ({ target }) => {
  if (target.dataset.button) {
    console.log(target.dataset.button);
  }
});

/* buttons */

// const btnYes = "btn-yes";
// const btnNo = "btn-no";
// const btnPrompt = "btn-prompt";
// const btnNext = "btn-next";
// const btnConfirm = "btn-confirm";

// const yesButton = document.querySelector(btnYes);
// const noButton = document.querySelector(btnNo);
// const promptButton = document.querySelector(btnPrompt);
// const nextButton = document.querySelector(btnNext);
// const confirmButton = document.querySelector(btnConfirm);

/* 
<div class="btn btn-prompt">Enter</div>
<div class="btn btn-prev">Prev</div>
<div class="btn btn-yes">Yes</div>
<div class="btn btn-no">No</div>
<div class="btn btn-next">Next</div>
<div class="btn btn-confirm">Ok</div>
*/

const setActive = (target, selector = null) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  if (selectedElement !== null) selectedElement.classList.remove(active);
  target.classList.add(active);
};

const removeActive = (target) => target.classList.remove(active);

const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

const typeWords = async (textField, message, typeSpeed = 50) => {
  const letters = message.split("");
  let text = "";
  for (let i = 0; i < letters.length; i++) {
    text += letters[i];
    textField.innerText = text;
    await pause(typeSpeed);
  }
};

const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
  await pause(300);
  setActive(messageBox);
};

// beginLoading();
setActive(messageBox);

//DEBUGGING
let testState = false;
let testMessage =
  "This is some text that I'm testing for the purposes of the text displayed to the user in my message box.";
const testControls = () => {
  // if (!testState) setActive(messageBox);
  // else removeActive(messageBox);
  // testState = !testState;
  typeWords(messageText, testMessage);
};

document.addEventListener("keyup", (e) => {
  const key = e.key;
  switch (key) {
    case "e":
      testControls();
      break;
    default:
      break;
  }
});
