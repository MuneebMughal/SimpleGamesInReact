export const generateRandomNumber = (lowerLimit, upperLimit) => {
  return Math.floor(
    Math.random() * (upperLimit - lowerLimit) - Math.random() * lowerLimit
  );
};
const makeMines = (grid, diff) => {
  let createdMines = 0;
  while (createdMines !== diff.mines) {
    let mineX = generateRandomNumber(0, diff.row);
    let mineY = generateRandomNumber(0, diff.col);
    if (grid[mineX][mineY].value === "B") {
      grid[mineX][mineY].value = "X";
      createdMines++;
    }
  }
  return grid;
};
const calSurroundingMines = (grid) => {
  if (grid) {
    // console.log("Grid Consoling===>>", grid);
    let rows = grid.length;
    let cols = grid[0].length;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col].value !== "X") {
          let surMines = 0;
          if (
            grid[row - 1] &&
            grid[row - 1][col - 1] &&
            grid[row - 1][col - 1].value === "X"
          ) {
            surMines++;
          }
          if (
            grid[row - 1] &&
            grid[row - 1][col] &&
            grid[row - 1][col].value === "X"
          ) {
            surMines++;
          }
          if (
            grid[row - 1] &&
            grid[row - 1][col + 1] &&
            grid[row - 1][col + 1].value === "X"
          ) {
            surMines++;
          }
          if (grid[row][col - 1] && grid[row][col - 1].value === "X") {
            surMines++;
          }
          if (grid[row][col + 1] && grid[row][col + 1].value === "X") {
            surMines++;
          }
          if (
            grid[row + 1] &&
            grid[row + 1][col - 1] &&
            grid[row + 1][col - 1].value === "X"
          ) {
            surMines++;
          }
          if (
            grid[row + 1] &&
            grid[row + 1][col] &&
            grid[row + 1][col].value === "X"
          ) {
            surMines++;
          }
          if (
            grid[row + 1] &&
            grid[row + 1][col + 1] &&
            grid[row + 1][col + 1].value === "X"
          ) {
            surMines++;
          }
          grid[row][col].value = surMines;
        }
      }
    }
  }
  return grid;
};
export const makeGrid = (diff) => {
  let grid = [];
  let tog = false;
  let index = 0;
  for (let row = 0; row < diff.row; row++) {
    let subGrid = [];
    for (let col = 0; col < diff.col; col++) {
      tog = !tog;
      // Make blanck blocks Objects
      subGrid[col] = {
        value: "B",
        flagged: false,
        isOpened: false,
        posX: row,
        posY: col,
        toggle: tog,
        key: index,
      };
      index++;
    }
    tog = !tog;
    grid[row] = subGrid;
  }
  grid = makeMines(grid, diff);
  return grid;
};
const openSurroundingCells = (grid, cell) => {
  let row = cell.posX;
  let col = cell.posY;
  if (cell.value === 0 && cell.isOpened === false) {
    grid[row][col].isOpened = true;
    if (
      grid[row - 1] &&
      grid[row - 1][col - 1] &&
      grid[row - 1][col - 1].value === 0 &&
      grid[row - 1][col - 1].isOpened === false
    ) {
      
      grid = [...openSurroundingCells(grid, grid[row - 1][col - 1])];
    }
    if (
      grid[row - 1] &&
      grid[row - 1][col] &&
      grid[row - 1][col].value === 0 &&
      grid[row - 1][col].isOpened === false
    ) {
      grid = [...openSurroundingCells(grid, grid[row - 1][col])];
    }
    if (
      grid[row - 1] &&
      grid[row - 1][col + 1] &&
      grid[row - 1][col + 1].value === 0 &&
      grid[row - 1][col + 1].isOpened === false
    ) {
      grid = [...openSurroundingCells(grid, grid[row - 1][col + 1])];
    }
    if (
      grid[row][col - 1] &&
      grid[row][col - 1].value === 0 &&
      grid[row][col - 1].isOpened === false
    ) {
      grid = [...openSurroundingCells(grid, grid[row][col - 1])];
    }
    if (
      grid[row][col + 1] &&
      grid[row][col + 1].value === 0 &&
      grid[row][col + 1].isOpened === false
    ) {
      grid = [...openSurroundingCells(grid, grid[row][col + 1])];
    }
    if (
      grid[row + 1] &&
      grid[row + 1][col - 1] &&
      grid[row + 1][col - 1].value === 0 &&
      grid[row + 1][col - 1].isOpened === false
    ) {
      grid = [...openSurroundingCells(grid, grid[row + 1][col - 1])];
    }
    if (
      grid[row + 1] &&
      grid[row + 1][col] &&
      grid[row + 1][col].value === 0 &&
      grid[row + 1][col].isOpened === false
    ) {
      grid = [...openSurroundingCells(grid, grid[row + 1][col])];
    }
    if (
      grid[row + 1] &&
      grid[row + 1][col + 1] &&
      grid[row + 1][col + 1].value === 0 &&
      grid[row + 1][col + 1].isOpened === false
    ) {
      grid = [...openSurroundingCells(grid, grid[row + 1][col + 1])];
    }
  } else {
    grid[row][col].isOpened = true;
  }
  return grid;
};
export const openCell = (grid, cell, firstClick = false) => {
  if (firstClick) {
    if (cell.value === "X") {
      let mineX, mineY;
      do {
        mineX = generateRandomNumber(0, grid.length);
        mineY = generateRandomNumber(0, grid[0].length);
        if (grid[mineX][mineY].value === "B") {
          grid[mineX][mineY].value = "X";
          cell.value = "B";
          grid[cell.posX][cell.posY].value = "B";
        }
      } while (cell.value !== "B");
    }
  }
  grid = [...calSurroundingMines(grid)];
  return (grid = [...openSurroundingCells(grid, cell)]);
};
