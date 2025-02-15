const active = "active";

const loadingClass = ".loading-screen";
const loader = document.querySelector(loadingClass);
const loadingScreenDuration = 5000;

const messageBoxClass = ".message-box";
const messageBox = document.querySelector(messageBoxClass);

console.log(messageBox);
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

const beginLoading = async () => {
  setActive(loader);
  await pause(loadingScreenDuration);
  removeActive(loader);
  await pause(300);
  setActive(messageBox);
};

beginLoading();

//DEBUGGING
let testState = false;
const testControls = () => {
  if (!testState) setActive(messageBox);
  else removeActive(messageBox);
  testState = !testState;
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
