// import { Cell } from "./cell.js";
// import { setActive } from "./utility-functions.js";
// import { active, alphabet, computer, getCurrentTurn, user } from "./main.js";

import { alphabet, gameBoard } from "./main.js";

class GameBoard {
  grid;
  html;
  constructor(size, type) {
    this.size = size;
    this.type = type;
    this.createGridAndBoard();
  }

  createGridAndBoard = () => {
    const newGrid = {};
    const boardElement = document.createElement("div");

    boardElement.id = this.type;
    boardElement.setAttribute("data-size", "large");
    boardElement.classList.add("game-board");

    gameBoard.appendChild(boardElement);

    for (let i = 0; i < this.size; i++) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");
      newGrid[alphabet[i]] = [];
      for (let j = 0; j < this.size; j++) {
        const cell = {
          type: this.type,
          status: "empty",
        };

        const tileElement = document.createElement("div");
        tileElement.classList.add("tile");
        tileElement.setAttribute("data-status", "empty");
        tileElement.style.setProperty("--i", i);

        const buttonElement = document.createElement("button");
        buttonElement.className = "btn tile-button";
        buttonElement.innerHTML = "Confirm";

        const statusElement = document.createElement("div");
        statusElement.className = "status";

        tileElement.appendChild(buttonElement);
        tileElement.appendChild(statusElement);

        rowElement.appendChild(tileElement);
        boardElement.appendChild(rowElement);
        newGrid[alphabet[i]][j] = cell;
      }
    }
    this.grid = newGrid;
    this.board = boardElement;
    // <div id="player" data-size="large" class="game-board active hovering">
    //   <div class="row">
    //     <div class="tile" style="--i: 1;" data-status="empty">
    //       <button class="btn tile-button">Confirm</button>
    //       <div class="status"></div>
    //     </div>
    //     <div class="tile" style="--i: 2;" data-status="empty">
    //       <button class="btn tile-button">Confirm</button>
    //       <div class="status"></div>
    //     </div>
    //     <div class="tile" style="--i: 3;" data-status="empty">
    //       <button class="btn tile-button">Confirm</button>
    //       <div class="status"></div>
    //     </div>
    //     <div class="tile" style="--i: 4;" data-status="empty">
    //       <button class="btn tile-button">Confirm</button>
    //       <div class="status"></div>
    //     </div>
    //     <div class="tile" style="--i: 5;" data-status="occupied">
    //       <button class="btn tile-button">Confirm</button>
    //       <div class="status"></div>
    //     </div>
    //     <div class="tile" style="--i: 6;" data-status="occupied">
    //       <button class="btn tile-button">Confirm</button>
    //       <div class="status"></div>
    //     </div>
    //   </div>
  };
}

export default GameBoard;

//   <div class="row">
//     <div class="tile" style="--i: 8;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 9;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 10;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 11;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 12;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 13;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//   </div>
//   <div class="row">
//     <div class="tile" style="--i: 15;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 16;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 17;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 18;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 19;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 20;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//   </div>
//   <div class="row">
//     <div class="tile" style="--i: 22;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 23;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 24;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 25;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 26;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 27;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//   </div>
//   <div class="row">
//     <div class="tile" style="--i: 29;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 30;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 31;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 32;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 33;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 34;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//   </div>
//   <div class="row">
//     <div class="tile" style="--i: 36;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 37;" data-status="occupied">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 38;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 39;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 40;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//     <div class="tile" style="--i: 41;" data-status="empty">
//       <button class="btn tile-button">Confirm</button>
//       <div class="status"></div>
//     </div>
//   </div>
// </div>;
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
