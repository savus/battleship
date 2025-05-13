import { dataStatus } from "./main.js";

export class Cell {
  htmlElement;
  constructor(status, coords, type) {
    this.status = status;
    this.coords = coords;
    this.type = type;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);

  displayStatus = () =>
    this.htmlElement.setAttribute(dataStatus, this.getStatus());

  hideStatus = () => this.htmlElement.setAttribute(dataStatus, "empty");

  updateTile = (status) => {
    this.setStatus(status);
    this.displayStatus();
  };
}
