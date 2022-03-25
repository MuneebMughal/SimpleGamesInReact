export const generateRandomNumber = (lowerLimit, upperLimit) => {
  return Math.floor(
    Math.random() * (upperLimit - lowerLimit) - Math.random() * lowerLimit
  );
};
const makeMines = (grid, mines) => {
  let createdMines = 0;
  let rows = grid.length;
  let cols = grid[0].length;
  while (createdMines !== mines) {
    let mineX = generateRandomNumber(0, rows);
    let mineY = generateRandomNumber(0, cols);
    if (grid[mineX][mineY].value === "B") {
      grid[mineX][mineY].value = "X";
      createdMines++;
    }
  }
  return grid;
};
const makeFlaggedFalse = (grid) => {
  let rows = grid.length;
  let cols = grid[0].length;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid[row][col].flagged = false;
    }
  }
  return grid;
};
const calSurroundingMines = (grid) => {
  if (grid) {
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
export const makeGrid = (rows, cols, mines) => {
  let grid = [];
  let tog = false;
  let index = 0;
  for (let row = 0; row < rows; row++) {
    let subGrid = [];
    for (let col = 0; col < cols; col++) {
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
        styles: {},
      };
      index++;
    }
    tog = !tog;
    grid[row] = subGrid;
  }
  grid = makeMines(grid, mines);
  return grid;
};
const openSurroundingCells = (grid, cell) => {
  let row = cell.posX;
  let col = cell.posY;
  if (cell.value === 0 && cell.isOpened === false && cell.flagged === false) {
    grid[row][col].isOpened = true;
    if (grid[row - 1] && grid[row - 1][col - 1]) {
      grid = [...openSurroundingCells(grid, grid[row - 1][col - 1])];
    }
    if (grid[row - 1] && grid[row - 1][col]) {
      grid = [...openSurroundingCells(grid, grid[row - 1][col])];
    }
    if (grid[row - 1] && grid[row - 1][col + 1]) {
      grid = [...openSurroundingCells(grid, grid[row - 1][col + 1])];
    }
    if (grid[row][col - 1]) {
      grid = [...openSurroundingCells(grid, grid[row][col - 1])];
    }
    if (grid[row][col + 1]) {
      grid = [...openSurroundingCells(grid, grid[row][col + 1])];
    }
    if (grid[row + 1] && grid[row + 1][col - 1]) {
      grid = [...openSurroundingCells(grid, grid[row + 1][col - 1])];
    }
    if (grid[row + 1] && grid[row + 1][col]) {
      grid = [...openSurroundingCells(grid, grid[row + 1][col])];
    }
    if (grid[row + 1] && grid[row + 1][col + 1]) {
      grid = [...openSurroundingCells(grid, grid[row + 1][col + 1])];
    }
  } else {
    if (grid[row][col].flagged === false) {
      grid[row][col].isOpened = true;
    }
  }
  return grid;
};
const calSideBorder = (grid) => {
  if (grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          grid[row - 1] &&
          grid[row - 1][col] &&
          grid[row - 1][col].isOpened === true
        ) {
          if (!grid[row][col].isOpened) {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderTop: "3px solid rgb(138 175 62)",
            };
          } else {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderTop: "none",
            };
          }
        }

        if (grid[row][col - 1] && grid[row][col - 1].isOpened === true) {
          if (!grid[row][col].isOpened) {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderLeft: "3px solid rgb(138 175 62)",
            };
          } else {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderLeft: "none",
            };
          }
        }
        if (grid[row][col + 1] && grid[row][col + 1].isOpened === true) {
          if (!grid[row][col].isOpened) {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderRight: "3px solid rgb(138 175 62)",
            };
          } else {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderRight: "none",
            };
          }
        }
        if (
          grid[row + 1] &&
          grid[row + 1][col] &&
          grid[row + 1][col].isOpened === true
        ) {
          if (!grid[row][col].isOpened) {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderBottom: "3px solid rgb(138 175 62)",
            };
          } else {
            grid[row][col].styles = {
              ...grid[row][col].styles,
              borderBottom: "none",
            };
          }
        }
      }
    }
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
    grid = [...makeFlaggedFalse(grid)];
  }
  grid = [...calSurroundingMines(grid)];
  grid = [...openSurroundingCells(grid, cell)];
  return (grid = [...calSideBorder(grid)]);
};
export const checkWin = (grid, mines) => {
  let rows = grid.length;
  let cols = grid[0].length;
  let openedCells = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col].isOpened === true) {
        openedCells++;
      }
    }
  }
  if (openedCells + mines === rows * cols) {
    return true;
  } else return false;
};
