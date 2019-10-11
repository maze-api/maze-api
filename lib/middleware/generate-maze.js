// import Algo 1
// import Algo 2
// import Algo 3
// import Algo 4
// import Algo 5

//Pre Algo Step

//Algo

//Post Algo Difficulty Analysis

//Populate Document


module.exports = () => {
  return {
    topologyName: 'Rectangular',
    algorithm: 'Recursive Back Tracker',
    dimensions: { height: 4, width: 4 },
    difficulty: 'Easier',
    connectivity: 12,
    averagePathLength: 3,
    solutionLength: 12,
    start: { x: 1, y: 1 },
    end: { x: 4, y: 4 },
    solutionPath: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
    cellMap: [
      [
        {
          coordinates: { x: 1, y: 1 },
          exits: { x: 1, y: 2 },
          overpass: false
        },
        {
          coordinates: { x: 2, y: 1 },
          exits: { x: 2, y: 2 },
          overpass: false
        }
      ],
      [
        {
          coordinates: { x: 1, y: 2 },
          exits: { x: 2, y: 2 },
          overpass: false
        },
        {
          coordinates: { x: 2, y: 2 },
          exits: { x: 1, y: 2 },
          overpass: false
        }
      ]
    ]
  };
};
