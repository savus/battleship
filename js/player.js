export class Player {
  score = 0;
  constructor(board, ships) {
    this.board = board;
    this.ships = ships;
  }

  placeAllShips = () => {
    this.ships.forEach((ship) => {
      ship.placeShipPieces(this.board.size);
    });
  };
}
