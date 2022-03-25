import React, { useState, useEffect, useRef } from "react";
import DIFFICULTY_LEVEL from "../../constants/minesweeper/constants";
import "./minesweeper.css";
import flag from "../../assets/minesweeper/flag_icon.png";
const Cell = (props) => {
  const [bgc, setBgc] = useState("#a2d149");
  const [open, setOpen] = useState(false);
  const opentime = useRef(0);
  const openClass = useRef(0);
  function generateRandom(min = 0, max = 100) {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  }
  useEffect(() => {
    let interval = null;
    if (props.showMines === true && props.values.value === "X") {
      console.log("useEffect Called");
      if (!props.values.clicked) {
        opentime.current = generateRandom(1, 5);
      }
      openClass.current = generateRandom(1, 9);
      interval = setInterval(() => {
        setOpen(true);
      }, opentime.current * 1000);
      console.log(
        "openTime==>>",
        opentime.current,
        "openClass==>>",
        openClass.current
      );
    }

    return () => {
      clearInterval(interval);
    };
  }, [props.showMines]);
  useEffect(() => {
    if (open === true) {
      console.log("rendered");
    }
    if (props.showMines === true) {
      console.log("renderedSS");
    }
  }, [open]);
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
      <div
        className="text-center"
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
      >
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
        ) : open ? (
          <div className={`cellBg${openClass.current} mineCell`} >
            <div className={`mineBg${openClass.current} mine`}></div>
          </div>
        ) : (
          ""
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
