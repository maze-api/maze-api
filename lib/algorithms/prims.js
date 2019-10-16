function prims() {
//choose a random coordinate
  const randomX = Math.floor(Math.random() * this.maxX) + 1;
  const randomY = Math.floor(Math.random() * this.maxY) + 1;

  let currentCell = this.getCell(1, 1);
  if(!currentCell) currentCell = this.getCell(randomX, randomY + 1);
  if(!currentCell) currentCell = this.getCell(randomX, randomY - 1);
  if(!currentCell) throw `Exception: the address (${randomX}, ${randomY}) is invalid for this maze.`;

  const neighbors = [];

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
      }
    };
    neighbors.push(neighbor);
  });
  console.log(neighbors);
  
  recur.bind(this)(neighbors);
}

function recur(neighbors) {
//while no neighbors exit
  while(neighbors.length) {
  //choose a neighbor
    Math.random();
  //make exits in both neighbor and originator
    //look for new neighbors
  //remove chosen neighbor from neighbor array
  //check length of neighbor array

  }
  
}

module.exports = {
  prims
};