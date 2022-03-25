import { makeGrid, checkWin, openCell } from "../../utils/minesweeper/makeGrid";
import DIFFICULTY_LEVEL from "../../constants/minesweeper/constants";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import flag from "../../assets/minesweeper/flag_icon.png";
import "./minesweeper.css";
import React from "react";
import Cell from "./Cell";
import Popup from "./Popup";
import refresh from "../../assets/minesweeper/refresh_white_24dp.png";
const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [diff, setDiff] = useState(DIFFICULTY_LEVEL.EASY.name);
  const [start, setStart] = useState(true);
  const [flags, setFlags] = useState(DIFFICULTY_LEVEL.EASY.mines);
  const [game, setGame] = useState();
  const [showPopup, setShow] = useState(false);
  const [showMines, setShowMines] = useState();
  useEffect(() => {
    let interval = null;
    if (showMines === true) {
      interval = setInterval(() => {
        setShow(true);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [showMines]);
  useEffect(() => {
    Reset();
  }, [diff]);
  const handleChange = (e) => {
    setDiff(e.target.value);
    setGrid([...[]]);
  };
  const handleClick = (cell) => {
    if (!showMines) {
      if (!grid[cell.posX][cell.posY].flagged) {
        if (start) {
          setGrid([...openCell(grid, cell, start)]);
          setStart(false);
          setFlags(DIFFICULTY_LEVEL[diff].mines);
        } else {
          if (cell.value === "X") {
            setGame(false);
            setGrid([...grid], (grid[cell.posX][cell.posY].clicked = true));
            setShowMines(true);
          } else {
            setGrid([...openCell(grid, cell)]);
            let win = checkWin(grid, DIFFICULTY_LEVEL[diff].mines);
            if (win) {
              setGame(true);
              setShow(true);
            }
          }
        }
      }
    }
  };
  // if(showMines)
  // {
  //   console.log(grid);
  // }
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
    setStart(true);
    setFlags(DIFFICULTY_LEVEL[diff].mines);
    setGame();
    setShowMines();
    setShow(false);
  };
  const handleRightClick = (cell) => {
    if (!showMines) {
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
            <div className="d-flex">
              <div style={{ marginRight: "1rem" }}>
                <img src={flag} style={{ width: "38px" }} alt="Flag" />
                <div className="counter">{flags}</div>
              </div>
              <div>
                <Timer active={!start} game={game} diff={diff} />
              </div>
            </div>
            <div
              style={{ marginRight: "1rem", cursor: "pointer" }}
              onClick={Reset}
            >
              <img src={refresh} alt="Refresh" style={{ width: "38px" }} />
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
                              showMines={showMines}
                            />
                          );
                        })
                      : ""}
                  </div>
                );
              })
            : ""}
        </div>
        <Popup game={game} diff={diff} onClick={Reset} show={showPopup} />
      </div>
    </div>
  );
};

export default Grid;
