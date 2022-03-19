const DIFFICULTY_LEVEL = {
  EASY: {
    name: "EASY",
    row: 8,
    col: 10,
    mines: 10,
    styles: { height: "400px", width: "500px" },
    cellDimension: "50",
  },
  MEDIUM: {
    name: "MEDIUM",
    row: 14,
    col: 18,
    mines: 40,
    styles: { height: "420px", width: "540px" },
    cellDimension: "30",
  },
  HARD: {
    name: "HARD",
    row: 20,
    col: 24,
    mines: 99,
    styles: { height: "500px", width: "600px" },
    cellDimension: "25",
  },
};
export default DIFFICULTY_LEVEL;
