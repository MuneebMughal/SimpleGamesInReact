import { makeGrid, checkWin, openCell } from "../../utils/minesweeper/makeGrid";
import DIFFICULTY_LEVEL from "../../constants/minesweeper/constants";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import flag from "../../assets/minesweeper/flag_icon.png";
import "./minesweeper.css";
import React from "react";
import Cell from "./Cell";
import Popup from "./Popup";
const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [diff, setDiff] = useState(DIFFICULTY_LEVEL.EASY.name);
  const [firstClick, setFirstClick] = useState(true);
  const [flags, setFlags] = useState(DIFFICULTY_LEVEL.EASY.mines);
  const [game, setGame] = useState();
  useEffect(() => {
    const getGrid = () => {
      const _grid = makeGrid(
        DIFFICULTY_LEVEL[diff].row,
        DIFFICULTY_LEVEL[diff].col,
        DIFFICULTY_LEVEL[diff].mines
      );
      setGrid(_grid);
    };
    getGrid();
    setFirstClick(true);
    setFlags(DIFFICULTY_LEVEL[diff].mines);
    setGame();
  }, [diff]);
  const handleChange = (e) => {
    setDiff(e.target.value);
    setGrid([...[]]);
  };
  const handleClick = (cell) => {
    if (!grid[cell.posX][cell.posY].flagged) {
      if (firstClick) {
        setGrid([...openCell(grid, cell, firstClick)]);
        setFirstClick(false);
        setFlags(DIFFICULTY_LEVEL[diff].mines);
      } else {
        if (cell.value === "X") {
          setGame(false);
        } else {
          setGrid([...openCell(grid, cell)]);
          let win = checkWin(grid, DIFFICULTY_LEVEL[diff].mines);
          if (win) {
            setGame(true);
          }
        }
      }
    }
  };
  const Reset = () => {
    const getGrid = () => {
      const _grid = makeGrid(
        DIFFICULTY_LEVEL[diff].row,
        DIFFICULTY_LEVEL[diff].col,
        DIFFICULTY_LEVEL[diff].mines
      );
      setGrid(_grid);
    };
    getGrid();
    setFirstClick(true);
    setFlags(DIFFICULTY_LEVEL[diff].mines);
    setGame();
  };
  const handleRightClick = (cell) => {
    if (!grid[cell.posX][cell.posY].isOpened) {
      if (!grid[cell.posX][cell.posY].flagged) {
        setFlags(flags - 1);
      } else {
        setFlags(flags + 1);
      }
      setGrid(
        [...grid],
        (grid[cell.posX][cell.posY].flagged =
          !grid[cell.posX][cell.posY].flagged)
      );
    }
  };
  return (
    <div className="mainContainer">
      <h1 className="heading text-center">Minesweeper</h1>
      <div
        className="boardContainer"
        style={{ width: DIFFICULTY_LEVEL[diff].styles.width }}
      >
        <div className="gridHeader">
          <div className="d-flex justify-content-between">
            <div>
              <select
                onChange={(e) => {
                  handleChange(e);
                }}
                style={{ padding: "0.2rem", marginTop: "0.2rem" }}
              >
                <option value={DIFFICULTY_LEVEL.EASY.name}>Easy</option>
                <option value={DIFFICULTY_LEVEL.MEDIUM.name}>Medium</option>
                <option value={DIFFICULTY_LEVEL.HARD.name}>Hard</option>
              </select>
            </div>
            <div>
              <img src={flag} style={{ width: "38px" }} alt="Flag" />
              <div className="counter">{flags}</div>
            </div>
            <div style={{ marginRight: "1rem" }}>
              <Timer active={!firstClick} game={game} diff={diff} />
            </div>
          </div>
        </div>
        <div
          style={{
            height: DIFFICULTY_LEVEL[diff].styles.height,
            width: DIFFICULTY_LEVEL[diff].styles.width,
          }}
        >
          {grid
            ? grid.map((row, index) => {
                return (
                  <div className="d-flex flex-row" key={index}>
                    {row
                      ? row.map((col) => {
                          return (
                            <Cell
                              onClick={() => handleClick(col)}
                              values={col}
                              onContextMenu={() => handleRightClick(col)}
                              styles={{
                                ...col.styles,
                              }}
                              dimension={DIFFICULTY_LEVEL[diff].cellDimension}
                              key={col.key}
                            />
                          );
                        })
                      : ""}
                  </div>
                );
              })
            : ""}
        </div>
        <Popup game={game} diff={diff} onClick={Reset} />
      </div>
    </div>
  );
};

export default Grid;
