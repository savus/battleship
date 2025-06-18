import { Cell } from "./cell.js";
import { gameBoardClickHandler } from "./click-functions.js";
import {
  alphabet,
  computer,
  gameBoardClass,
  gameBoardContainer,
  rowClass,
  tileClass,
  tilesClickableClass,
  user,
} from "./main.js";

const cssIndex = "--i";
export const dataStatus = "data-status";

class GameBoard {
  grid;
  html;
  opposingBoard;
  boardPadding = 0.625 * 2;
  tileWidth = 4;
  flexGapWidth;
  numOfTiles;
  boardWidth;

  //0.625 * 2 = padding on both sides
  //0.9375 = width of flex gap
  // this.size - 1 = number of gaps
  // 4 * this.size = number of tiles at 4 rem

  constructor(size, type, getLives) {
    this.size = size;
    this.type = type;
    this.createBoardData();
    this.flexGapWidth = 0.9375 * this.size - 1;
    this.numOfTiles = this.size;
    this.boardWidth =
      this.boardPadding +
      this.tileWidth +
      this.flexGapWidth +
      this.numOfTiles * this.tileWidth;
    this.getLives = getLives;
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

        cell.tile.addEventListener("click", () => {
          const classList = this.html.classList;
          const isClickable = classList.contains(tilesClickableClass);
          if (isClickable) {
            user.attack(computer, cell);
          }
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
    boardElement.style.width = `${this.boardWidth}rem`;

    boardElement.addEventListener("click", gameBoardClickHandler);

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
