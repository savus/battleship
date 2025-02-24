export class Ship {
  isHorizontal = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
  pieceLocations = [];
  constructor({ name, lives, length }) {
    this.name = name;
    this.lives = lives;
    this.length = length;
  }

  placeShipPiece = (boardSize) => {
    const randomXCoord = Math.floor(Math.random() * boardSize) + 1;
    const randomYCoord = Math.floor(Math.random() * boardSize) + 1;
  };
}
