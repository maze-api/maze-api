function prims() {
  let currentCell = this.getRandomCell();
  currentCell.visited = true;

  const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
  const validDirections = potentialDirections.filter(dir => {
    return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
  });

  const neighbors = validDirections.map(dir => {
    const { x, y } = this.getDirectionOffset(dir)
    const neighbor = {
      coordinate: {
        x: currentCell.x + x,
        y: currentCell.y + y,
      },
      originator: {
        x: currentCell.x,
        y: currentCell.y
      },
      directionFromOriginator: dir
    };
    this.getCell(neighbor.coordinate.x, neighbor.coordinate.y).visited = true;
    return neighbor;
  });

  recur.bind(this)(neighbors);
}

function recur(neighbors) {

  while (neighbors.length) {

    const nextChosen = neighbors.splice([Math.floor(Math.random() * neighbors.length)], 1)[0];

    const currentCell = this.getCell(nextChosen.coordinate.x, nextChosen.coordinate.y);

    const originCell = this.getCell(nextChosen.originator.x, nextChosen.originator.y);

    currentCell.makeExit(this.getOppositeDirection(nextChosen.directionFromOriginator), originCell);

    originCell.makeExit(nextChosen.directionFromOriginator, currentCell);

    const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
    const validDirections = potentialDirections.filter(dir => {
      return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
    });

    validDirections.forEach(dir => {
      const neighbor = {
        coordinate: {
          x: currentCell.x + this.getDirectionOffset(dir).x,
          y: currentCell.y + this.getDirectionOffset(dir).y,
        },
        originator: {
          x: currentCell.x,
          y: currentCell.y
        },
        directionFromOriginator: dir
      };
      neighbors.push(neighbor);
      this.getCell(neighbor.coordinate.x, neighbor.coordinate.y).visited = true;
    });

    recur.bind(this)(neighbors);
  }

}

module.exports = {
  prims
};
