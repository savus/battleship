export class Cell {
  htmlElement;
  constructor(status, coords) {
    this.status = status;
    this.coords = coords;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);

  displayStatus = () =>
    this.htmlElement.setAttribute("data-status", this.getStatus());

  hideStatus = () => this.htmlElement.setAttribute("data-status", "empty");

  updateTile = (status) => {
    this.setStatus(status);
    this.displayStatus();
  };
}
