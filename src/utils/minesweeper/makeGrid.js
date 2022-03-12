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
export const clickCellFirstTime = (grid, cell) => {
  let mineX, mineY;
  do {
    mineX = generateRandomNumber(0, grid.length);
    mineY = generateRandomNumber(0, grid[0].length);
  } while (grid[mineX][mineY].value !== "B");
  return { mineX, mineY };
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
      //console.log(grid);
    }
    return grid;
  } else {
    return grid;
  }
};
