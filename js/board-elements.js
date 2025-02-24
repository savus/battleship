import { alphabet } from "./main.js";

const tileButtonClass = "tile-button";

export class Cell {
  constructor(type, id, status) {
    this.type = type;
    this.id = id;
    this.status = status;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);
}

const createCell = (type, id, status) => {
  const cell = new Cell(type, id, status);
  return cell;
};

export const createGrid = (size, controller) => {
  const grid = {};
  for (let i = 0; i < size; i++) {
    grid[alphabet[i]] = [];
    for (let j = 0; j < size; j++) {
      grid[alphabet[i]][j] = createCell(controller, i + j, "empty");
    }
  }
  return grid;
};

export class GameBoard {
  grid = {};
  constructor(size, type, controller) {
    this.size = size;
    this.type = type;
    this.controller = controller;
  }
}

const createTile = (tileCount) => {
  const tile = document.createElement("div");

  tile.className = "tile";
  tile.style.setProperty("--i", tileCount);
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
      const cell = new Cell(controller, `${alphabet[i]}:${j}`, "empty");
      const tile = createTile(tileCount);
      const button = createTileButton(cell);
      const tileStatus = createTileStatus();

      tile.appendChild(button);
      tile.appendChild(tileStatus);

      cell.htmlElement = tile;

      cell.displayStatus = function () {
        this.htmlElement.setAttribute("data-status", this.getStatus());
      };

      cell.displayStatus();
      board.grid[alphabet[i]][j] = cell;
      row.appendChild(tile);
    }
    boardHTML.appendChild(row);
  }

  return { element: boardHTML, object: board };
};

const getCell = (board, coords) => {
  const letter = coords.slice(0, 1);
  const number = coords.slice(1);
  return board.grid[letter][number];
};

export const getTile = (board, coords) => {
  const cell = getCell(board, coords);
  return cell.htmlElement;
};

export const setAllBoardTilesClass = (boardID, className) => {
  const tiles = Array.from(document.querySelectorAll(`#${boardID} .tile`));
  tiles.map((tile) => tile.classList.toggle(className));
};
