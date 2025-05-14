import { dataStatus } from "./board-elements.js";

export class Cell {
  tile;
  constructor(type, status, coords) {
    this.type = type;
    this.status = status;
    this.coords = coords;
    this.type = type;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);

  displayStatus = () => this.tile.setAttribute(dataStatus, this.status);

  hideStatus = () => this.tile.setAttribute(dataStatus, "empty");

  updateTile = () => {
    this.setStatus(this.status);
    this.displayStatus();
  };

  getCoords = () => this.coords;
}
