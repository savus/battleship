const active = "active";

const loaderContainer = ".loader-container";
const loader = document.querySelector(loaderContainer);

const messageBoxClass = ".message-box";
const messageBox = document.querySelector(messageBoxClass);

const loadAnimationDelay = 1200;
const loadAnimationResolve = 1800;

const setActive = (target, selector) => {
  const activeSelector = document.querySelector(`${selector}.${active}`);
  if (activeSelector !== null) activeSelector.classList.remove(active);
  target.classList.add(active);
};

const removeActive = (target) => target.classList.remove(active);

const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

const displayMessageBox = async () => {
  await pause(500);
  setActive(messageBox, messageBoxClass);
};

const beginLoading = async () => {
  await pause(loadAnimationDelay);
  setActive(loader, loaderContainer);
  await pause(loadAnimationDelay + loadAnimationResolve);
  removeActive(loader);
  displayMessageBox();
};

beginLoading();
