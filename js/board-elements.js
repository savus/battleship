import { Cell, convertCoordsToString, getCell } from "./cell.js";
import { alphabet } from "./main.js";

const tileButtonClass = "tile-button";

export class GameBoard {
  grid = {};
  constructor(size, type, controller) {
    this.size = size;
    this.type = type;
    this.controller = controller;
  }
}

const createTile = (tileDelay) => {
  const tile = document.createElement("div");

  tile.className = "tile";
  tile.style.setProperty("--i", tileDelay);
  return tile;
};

const createTileButton = (cell) => {
  const button = document.createElement("button");
  button.className = `btn ${tileButtonClass}`;
  button.innerText = "Confirm!";
  button.addEventListener("click", () => {
    cell.displayStatus();
  });
  return button;
};

const createTileStatus = () => {
  const tileStatus = document.createElement("div");
  tileStatus.className = "status";
  return tileStatus;
};

export const createBoardElement = (size, type, controller) => {
  const boardHTML = document.createElement("div");
  const board = new GameBoard(size, type, controller);
  let tileCount = 0;

  boardHTML.id = controller;
  boardHTML.setAttribute("data-size", type);
  boardHTML.className = "game-board";

  for (let i = 0; i < size; i++) {
    tileCount++;
    const row = document.createElement("div");
    row.className = "row";
    board.grid[alphabet[i]] = [];
    for (let j = 0; j < size; j++) {
      tileCount++;
      const cell = new Cell(controller, "empty", `${alphabet[i]}${j}`);
      const tile = createTile(tileCount);
      const button = createTileButton(cell);
      const tileStatus = createTileStatus();

      tile.appendChild(button);
      tile.appendChild(tileStatus);

      cell.htmlElement = tile;

      cell.displayStatus();
      board.grid[alphabet[i]][j] = cell;
      row.appendChild(tile);
    }
    boardHTML.appendChild(row);
  }

  return { element: boardHTML, object: board };
};

export const getTile = (board, coords) => {
  const cell = getCell(board, coords);
  return cell.htmlElement;
};

export const setAllBoardTilesClass = (boardID, className) => {
  const tiles = Array.from(document.querySelectorAll(`#${boardID} .tile`));
  tiles.map((tile) => tile.classList.toggle(className));
};
