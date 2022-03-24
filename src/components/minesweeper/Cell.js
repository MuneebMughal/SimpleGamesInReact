import React, { useState, useEffect } from "react";
import DIFFICULTY_LEVEL from "../../constants/minesweeper/constants";
import "./minesweeper.css";
import flag from "../../assets/minesweeper/flag_icon.png";
const Cell = (props) => {
  const [bgc, setBgc] = useState("#a2d149");
  useEffect(() => {
    if (props.values.toggle && !props.values.isOpened) {
      setBgc("#aad752");
    } else if (!props.values.toggle && !props.values.isOpened) {
      setBgc("#a2d149");
    } else if (props.values.isOpened && props.values.toggle) {
      setBgc("#e6c1a0");
    } else if (props.values.isOpened && !props.values.toggle) {
      setBgc("#d7b899");
    }
  }, [props.values.isOpened, props.values.toggle]);
  const setBackGroundColor = () => {
    if (props.values.isOpened && props.values.toggle) {
      setBgc("#e6c1a0");
    } else if (props.values.isOpened && !props.values.toggle) {
      setBgc("#d7b899");
    } else if (!props.values.isOpened && props.values.toggle) {
      setBgc("#aad752");
    } else {
      setBgc("#a2d149");
    }
  };
  const handleClick = (e) => {
    if (!props.values.flagged) {
      props.onClick(e);
    }
  };
  const handleRightClick = (e) => {
    e.preventDefault();
    if (!props.values.isOpened) {
      props.onContextMenu(e);
    }
  };
  const renderNonMinedCells = () => {
    return (
      <div className="text-center">
        {props.values.flagged ? (
          <img
            src={flag}
            alt="flag"
            style={{
              width: props.dimension - 6 + "px",
              position: "absolute",
              top: 3,
              left: 3,
            }}
          />
        ) : (
          <div
            className={
              props.dimension === DIFFICULTY_LEVEL.EASY.cellDimension
                ? "mineValueEasy"
                : props.dimension === DIFFICULTY_LEVEL.MEDIUM.cellDimension
                ? "mineValueMedium"
                : "mineValueHard"
            }
          >
            <div
              className={
                props.values.value === 1
                  ? "one"
                  : props.values.value === 2
                  ? "two"
                  : props.values.value === 3
                  ? "three"
                  : props.values.value === 4
                  ? "four"
                  : "other"
              }
            >
              {props.values.isOpened
                ? props.values.value !== 0
                  ? props.values.value
                  : ""
                : ""}
            </div>
          </div>
        )}
      </div>
    );
  };
  const renderMinedCells = () => {
    return (
      <>
        {props.values.flagged && props.values.value !== "X" ? (
          <div
            className={
              props.dimension === DIFFICULTY_LEVEL.EASY.cellDimension
                ? "mineValueEasy"
                : props.dimension === DIFFICULTY_LEVEL.MEDIUM.cellDimension
                ? "mineValueMedium"
                : "mineValueHard"
            }
          >
            <div className="other text-center">X</div>
          </div>
        ) : (
          "X"
        )}
      </>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        height: props.dimension + "px",
        width: props.dimension + "px",
      }}
    >
      <div
        onClick={(e) => handleClick(e)}
        onContextMenu={(e) => handleRightClick(e)}
        onMouseEnter={() => {
          if (!props.values.isOpened) {
            setBgc("#bfe17d");
          } else if (props.values.isOpened && props.values.value !== 0) {
            setBgc("#ebd1b7");
          }
        }}
        onMouseLeave={() => {
          setBackGroundColor();
        }}
        style={{
          ...props.styles,
          height: "100%",
          width: "100%",
          backgroundColor: bgc,
        }}
      >
        {!props.values.isOpened && !props.values.flagged
          ? !props.showMines
            ? renderNonMinedCells()
            : props.values.value !== "X"
            ? renderNonMinedCells()
            : renderMinedCells()
          : props.values.isOpened
          ? renderNonMinedCells()
          : props.values.flagged
          ? !props.showMines
            ? renderNonMinedCells()
            : props.values.value === "X"
            ? renderNonMinedCells()
            : renderMinedCells()
          : renderMinedCells()}
      </div>
    </div>
  );
};

export default Cell;
