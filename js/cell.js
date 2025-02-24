export class Cell {
  constructor(type, id, status) {
    this.type = type;
    this.id = id;
    this.status = status;
  }

  getStatus = () => this.status;

  setStatus = (status) => (this.status = status);
}

export const createCell = (type, id, status) => {
  const cell = new Cell(type, id, status);
  return cell;
};

export const getCell = (board, coords) => {
  const letter = coords.slice(0, 1);
  const number = coords.slice(1);
  return board.grid[letter][number];
};
