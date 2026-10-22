import { hasPlayedBefore } from "./constants.js";
import StartScreenUI from "./singleton/StartScreenUI.js";
import { setActive } from "./utility-functions.js";

localStorage.removeItem(hasPlayedBefore);
// updateOptions();
setActive(StartScreenUI.startScreen);

// /* ============= */

// /* EVENT HANDLERS */

// messageBoxControls.addEventListener("click", ({ target }) => {
//   if (target.dataset.button) {
//     switch (target.dataset.button) {
//       case "next":
//         messageHandler.readNextMessage(currentMessageObj);
//         break;
//       case "prev":
//         messageHandler.readPrevMessage(currentMessageObj);
//         break;
//       case "prompt":
//         setUserInput(userInputField.value);
//         currentMessageObj.promptStep();
//         break;
//       case "confirm":
//         currentMessageObj.confirmStep();
//         break;
//       case "yes":
//         setUserSaidYes(true);
//         currentMessageObj.yesStep();
//         break;
//       case "no":
//         setUserSaidNo(true);
//         currentMessageObj.noStep();
//         break;
//     }
//   }
// });

// openTab.addEventListener("click", () => {
//   optionsMenu.classList.toggle("open");
// });

// debugButton.addEventListener("click", () => {
//   if (!debugMode) {
//     user.board.displayAllShipTiles();
//     computer.board.displayAllShipTiles();
//   } else {
//     computer.board.hideAllShipTiles();
//   }
//   setDebugMode(!debugMode);
//   updateOptions();
// });

// hardModeButton.addEventListener("click", () => {
//   setHardMode(!hardMode);
//   updateOptions();
// });

// exitGameButton.addEventListener("click", () => {
//   endGame();
// });

// gameContainer.addEventListener("click", ({ target }) => {
//   const isGameBoard = target.matches(`.${gameBoardClass}`);
//   const isRow = target.matches(`.row`);
//   const isTile = target.matches(`.${tileClassName}`);

//   if (isGameBoard || isTile || isRow) {
//     const gameBoard = target.closest(`.${gameBoardClass}`);
//     if (
//       !gameBoard.classList.contains("set-up") &&
//       !gameBoard.classList.contains("demo")
//     ) {
//       setActive(gameBoard, `.${gameBoardClass}`);
//     }
//   }
// });

// /* GLOBAL HANDLERS */
// document.addEventListener("click", (e) => {
//   const isTile = e.target.matches(`.${tileClassName}`);
//   const isOptionsMenu = e.target.closest(optionsClass);
//   const isConfirmButton = e.target.matches(`[data-button="confirm"]`);
//   if (!isTile) {
//     removePreviousActive(`.${tileClassName}`);
//   }

//   if (!isConfirmButton && !tutorialMode) {
//     autoConfirmMessageBox(true);
//   }

//   if (!isOptionsMenu) {
//     optionsMenu.classList.remove("open");
//   }
// });

// document.addEventListener("keydown", (e) => {
//   const key = e.key;
//   switch (key) {
//     case "Enter":
//       e.preventDefault();
//       autoConfirmMessageBox(false);
//       break;
//   }
// });
