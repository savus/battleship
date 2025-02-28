import { Cell, getCell } from "./cell.js";
import { removeSelectedActive, setActive } from "./helper-functions.js";
import {
  alphabet,
  computer,
  getCurrentTurn,
  setCurrentTurn,
  user,
} from "./main.js";

const tileButtonClass = "tile-button";
const tileClassName = "tile";

export class GameBoard {
  grid = {};
  constructor(size, type, controller) {
    this.size = size;
    this.type = type;
    this.controller = controller;
  }
}

const createTile = (tileDelay, controller) => {
  const tile = document.createElement("div");

  tile.className = tileClassName;
  tile.style.setProperty("--i", tileDelay);
  tile.addEventListener("click", () => {
    if (controller === "computer" && getCurrentTurn() === "player") {
      setActive(tile, `.${tileClassName}`);
    }
  });

  return tile;
};

const tileButtonOnClick = (cell) => {
  user.playTurn(computer, cell);
};

const createTileButton = (cell) => {
  const button = document.createElement("button");

  button.className = `btn ${tileButtonClass}`;
  button.innerText = "Confirm";
  button.addEventListener("click", () => {
    tileButtonOnClick(cell);
  });

  return button;
};

const createTileStatus = () => {
  const tileStatus = document.createElement("div");
  tileStatus.className = "status";
  return tileStatus;
};

const buildCellData = (controller, tileCount, i, j) => {
  const cell = new Cell("empty", `${alphabet[i]}${j}`);
  const tile = createTile(tileCount, controller);
  const button = createTileButton(cell);
  const tileStatus = createTileStatus();

  tile.appendChild(button);
  tile.appendChild(tileStatus);

  cell.htmlElement = tile;

  return [cell, tile];
};

export const buildBoardData = (size, type, controller) => {
  const boardHTML = document.createElement("div");
  const boardObj = new GameBoard(size, type, controller);

  boardHTML.id = controller;
  boardHTML.setAttribute("data-size", type);
  boardHTML.className = "game-board";

  let tileCount = 0;
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.className = "row";
    boardObj.grid[alphabet[i]] = [];
    tileCount++;
    for (let j = 0; j < size; j++) {
      const [cell, tile] = buildCellData(controller, tileCount, i, j);
      tileCount++;
      boardObj.grid[alphabet[i]][j] = cell;
      row.appendChild(tile);
    }
    boardHTML.appendChild(row);
  }

  return { element: boardHTML, object: boardObj };
};

export const getTile = (board, coords) => {
  const cell = getCell(board, coords);
  return cell.htmlElement;
};

export const toggleBoardTileClass = (boardID, className) => {
  const board = document.getElementById(boardID);
  board.classList.toggle(className);
};

export const displayAllBoardTiles = (board) => {
  const values = Object.values(board.grid);
  values.map((row) => row.map((cell) => cell.displayStatus()));
};

export const hideAllBoardTiles = (board) => {
  const values = Object.values(board.grid);
  values.map((row) => row.map((cell) => cell.hideStatus()));
};

export const displayAllShipTiles = (board) => {
  const values = Object.values(board.grid);
  values.map((row) =>
    row.map((cell) => {
      if (cell.getStatus() === "occupied") return cell.displayStatus();
    })
  );
};

export const hideAllShipTiles = (board) => {
  const values = Object.values(board.grid);
  values.map((row) =>
    row.map((cell) => {
      if (cell.getStatus() === "occupied") return cell.hideStatus();
    })
  );
};
