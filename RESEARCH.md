# RESEARCH

## MAZE DIFFICULTY

  ### Propositions for factors in maze difficulty:
  Sources: 
  [The Complexity and Difficulty of a Maze ](http://t.archive.bridgesmathart.org/2001/bridges2001-213.pdf)
    
  [On the concepts of complex networks to quantify the difficulty in finding the way out of labyrinths](https://www.sciencedirect.com/science/article/pii/S0378437111005267)

  *  Number of forks leading into dead ends or loops
  *  Number of forks along the correct path
  *  Length of incorrect paths
  *  Path of solution - number of times you turn away from the end of the maze 
  *  Size of the maze
  *  Shape of the maze



  ### An algorithm for incorperating the factors above into our difficulty score. 

  Start at the beginning of the maze, stepping in all directions and incrementing an integer. For each step, label the cell with the integer. Once the end maze is found, read the integer to determine solution length.
  Backtrack through the cells by following the path of constantly decreasing numbers. For each cell you backtrack through, count the number of neighbors and subtract by 2, keep a total of those numbers. Thats the number of incorrect paths connected to the solution path.
  If a dead end (a cell whose only neighbor is the previous cell) is found, read the integer and save it to an array. 