// import { Cell } from "./cell.js";
// import { setActive } from "./utility-functions.js";
// import { active, alphabet, computer, getCurrentTurn, user } from "./main.js";

import { Cell } from "./cell.js";
import {
  alphabet,
  boardClickable,
  gameBoardClass,
  gameBoardContainer,
  rowClass,
  tileClass,
  tilesClickableClass,
} from "./main.js";
import { setActive } from "./utility-functions.js";

const dataSize = "data-size";
const gameBoardClass = "game-board";
const rowClass = "row";
const tileClass = "tile";
const cssIndex = "--i";
const buttonClassName = "btn tile-button";
export const dataStatus = "data-status";

class GameBoard {
  grid;
  html;
  opposingBoard;
  constructor(size, type) {
    this.size = size;
    this.type = type;
    this.createBoardData();
  }

  createBoardData = () => {
    const newGrid = {};
    const boardElement = this.createBoard();
    let tileIndex = 0;
    gameBoardContainer.appendChild(boardElement);

    for (let i = 0; i < this.size; i++) {
      const rowElement = this.createRow();
      newGrid[alphabet[i]] = [];
      for (let j = 0; j < this.size; j++) {
        const cell = new Cell(this.type, "empty", `${alphabet[i]}${j}`);

        tileIndex++;

        const tileElement = this.createTile(tileIndex);

        rowElement.appendChild(tileElement);
        boardElement.appendChild(rowElement);

        cell.tile = tileElement;

        cell.tile.addEventListener("click", ({ target }) => {
          const classList = this.html.classList;
          const isClickable = classList.contains(tilesClickableClass);
        });

        newGrid[alphabet[i]][j] = cell;
      }
    }
    this.grid = newGrid;
    this.html = boardElement;
  };

  createBoard = () => {
    const boardElement = document.createElement("div");

    boardElement.id = this.type;
    boardElement.classList.add(gameBoardClass);
    boardElement.style.width = `${
      0.625 * 2 + 0.9375 * (this.size - 1) + 4 * this.size
    }rem`;

    boardElement.addEventListener("click", function ({ target }) {
      const isClickable = target.classList.contains(boardClickable);
      console.log(isClickable);
      if (isClickable) setActive(target, `.${gameBoardClass}`);
    });
    return boardElement;
  };

  createRow = () => {
    const rowElement = document.createElement("div");
    rowElement.classList.add(rowClass);
    return rowElement;
  };

  createTile = (index) => {
    const tileElement = document.createElement("div");
    const statusElement = this.createStatusElement();

    tileElement.classList.add(tileClass);
    tileElement.setAttribute(dataStatus, "empty");
    tileElement.style.setProperty(cssIndex, index);

    tileElement.appendChild(statusElement);

    return tileElement;
  };

  createStatusElement = () => {
    const statusElement = document.createElement("div");
    statusElement.className = "status";
    return statusElement;
  };
}

export default GameBoard;

// const tileButtonClass = "tile-button";
// export const tileClassName = "tile";
// export const gameBoardClass = "game-board";
// const rowClass = "row";

// export default class GameBoard {
//   grid = {};
//   constructor(size, type, controller, html) {
//     this.size = size;
//     this.type = type;
//     this.controller = controller;
//     this.boardHTML = html;
//   }

//   toggleBoardTileClass = (className) => {
//     this.boardHTML.classList.toggle(className);
//   };

//   swapBoardClasses = (classToAdd, classToRemove) => {
//     this.boardHTML.classList.add(classToAdd);
//     this.boardHTML.classList.remove(classToRemove);
//   };

//   displayAllBoardTiles = () => {
//     const values = Object.values(this.grid);
//     values.map((row) => row.map((cell) => cell.displayStatus()));
//   };

//   hideAllBoardTiles = () => {
//     const values = Object.values(this.grid);
//     values.map((row) => row.map((cell) => cell.hideStatus()));
//   };

//   displayAllShipTiles = () => {
//     const values = Object.values(this.grid);
//     values.map((row) =>
//       row.map((cell) => {
//         if (cell.getStatus() === "occupied") return cell.displayStatus();
//       })
//     );
//   };

//   hideAllShipTiles = () => {
//     const values = Object.values(this.grid);
//     values.map((row) =>
//       row.map((cell) => {
//         if (cell.getStatus() === "occupied") return cell.hideStatus();
//       })
//     );
//   };
// }

// const createTile = (tileDelay, controller) => {
//   const tile = document.createElement("div");

//   const tileOnClick = (e) => {
//     const gameBoardParent = e.target.closest(`.${gameBoardClass}`);

//     if (
//       controller === "computer" &&
//       gameBoardParent.classList.contains(active) &&
//       !gameBoardParent.classList.contains("demo")
//     ) {
//       setActive(tile, `.${tileClassName}`);
//     }
//   };

//   tile.className = tileClassName;
//   tile.style.setProperty("--i", tileDelay);
//   tile.addEventListener("click", tileOnClick);

//   return tile;
// };

// const createTileButton = (cell) => {
//   const button = document.createElement("button");

//   const tileButtonOnClick = (cell) => {
//     user.playTurn(computer, cell);
//   };

//   button.className = `btn ${tileButtonClass}`;
//   button.innerText = "Confirm";
//   button.addEventListener("click", () => {
//     tileButtonOnClick(cell);
//   });

//   return button;
// };

// const createTileStatus = () => {
//   const tileStatus = document.createElement("div");
//   tileStatus.className = "status";
//   return tileStatus;
// };

// const buildCellData = (controller, tileCount, coords) => {
//   const cell = new Cell("empty", coords);
//   const tile = createTile(tileCount, controller);
//   const button = createTileButton(cell);
//   const tileStatus = createTileStatus();

//   tile.appendChild(button);
//   tile.appendChild(tileStatus);

//   cell.htmlElement = tile;

//   return [cell, tile];
// };

// export const buildBoardData = (size, type, controller, demo) => {
//   const boardHTML = document.createElement("div");
//   const boardObj = new GameBoard(size, type, controller, boardHTML);

//   boardHTML.id = controller;
//   boardHTML.setAttribute("data-size", type);
//   boardHTML.classList.add(gameBoardClass);
//   if (demo) boardHTML.classList.add("demo");

//   let tileCount = 0;
//   for (let i = 0; i < size; i++) {
//     const row = document.createElement("div");
//     row.className = rowClass;
//     boardObj.grid[alphabet[i]] = [];
//     tileCount++;
//     for (let j = 0; j < size; j++) {
//       const [cell, tile] = buildCellData(
//         controller,
//         tileCount,
//         `${alphabet[i]}${j}`
//       );
//       tileCount++;
//       boardObj.grid[alphabet[i]][j] = cell;
//       row.appendChild(tile);
//     }
//     boardHTML.appendChild(row);
//   }

//   return { element: boardHTML, object: boardObj };
// };
