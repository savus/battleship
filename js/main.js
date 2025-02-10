const active = "active";
const loaderContainer = ".loader-container";
const loader = document.querySelector(loaderContainer);

const setActive = (target, selector) => {
  const activeSelector = document.querySelector(`${selector}.active`);
  if (activeSelector !== null) activeSelector.classList.remove("active");
  target.classList.add("active");
};

const removeActive = (target) => target.classList.remove("active");

const pause = (ms) =>
  new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });

const beginLoading = async () => {
  await pause(2000);
  setActive(loader, loaderContainer);
  await pause(5000);
  removeActive(loader);
};

beginLoading();
