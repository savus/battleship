const loaderContainerClass = ".loader-container";
const loaderContainer = document.querySelector(loaderContainerClass);

console.log(loaderContainer);

const setActive = (target, selector) => {
  const activeSelector = document.querySelector(`${selector}.active`);
  if (activeSelector !== null) activeSelector.classList.remove("active");
  target.classList.add("active");
};

setActive(loaderContainer, ".loader-container");
