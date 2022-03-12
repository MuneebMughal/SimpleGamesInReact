import { makeGrid ,openCell} from "../../utils/minesweeper/makeGrid";
import DIFFICULTY_LEVEL from "../../constants/minesweeper/constants";
import { useEffect, useState } from "react";
import "./minesweeper.css";
import React from "react";
import Cell from "./Cell";
const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [diff, setDiff] = useState(DIFFICULTY_LEVEL.EASY);
  const [height, setHeight] = useState("400px");
  const [width, setWidth] = useState("500px");
  const [cellDimension, setCellDimension] = useState("50px");
  const [firstClick,setFirstClick] = useState(true);
  useEffect(() => {
    const getGrid = () => {
      const _grid = makeGrid(diff);
      setGrid(_grid);
    };
    getGrid();
  }, [diff]);
  const handleChange = (e) => {
    setDiff(DIFFICULTY_LEVEL[e.target.value]);
    setGrid([]);
    if (e.target.value === "EASY") {
      setHeight("400px");
      setWidth("500px");
      setCellDimension("50px");
    } else if (e.target.value === "MEDIUM") {
      setWidth("540px");
      setHeight("420px");
      setCellDimension("30px");
    } else {
      setWidth("600px");
      setHeight("500px");
      setCellDimension("25px");
    }
  };
  const handleClick = (cell, e) => {
    if (!grid[cell.posX][cell.posY].flagged) {
      setGrid([...grid], (grid[cell.posX][cell.posY].isOpened = true));
    }
  };
  const handleRightClick = (cell, e) => {
    e.preventDefault();
    if (!grid[cell.posX][cell.posY].isOpened) {
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
      <div className="boardContainer" style={{ width: width }}>
        <div className="gridHeader">
          <div className="d-flex justify-content-between">
            <div>
              <select
                onChange={(e) => {
                  // setDiff(DIFFICULTY_LEVEL[e.target.value]);
                  handleChange(e);
                }}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            {/* <div class="p-2">Flex item 2</div>
              <div class="p-2">Flex item 3</div> */}
          </div>
        </div>
        <div style={{ height, width }}>
          {grid
            ? grid.map((row, index) => {
                return (
                  <div className="d-flex flex-row" key={index}>
                    {row
                      ? row.map((col) => {
                          return (
                            <Cell
                              onClick={(e) => handleClick(col, e)}
                              values={col}
                              onContextMenu={(e) => handleRightClick(col, e)}
                              styles={{
                                height: cellDimension,
                                width: cellDimension,
                              }}
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
      </div>
    </div>
  );
};

export default Grid;
