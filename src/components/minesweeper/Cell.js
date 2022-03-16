import React, { useState, useEffect } from "react";
import "./minesweeper.css";

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
    if (!props.values.isOpened) {
      props.onContextMenu(e);
    }
  };
  return (
    <div
      className="cell"
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => handleRightClick(e)}
      onMouseEnter={() => {
        setBgc("#aaaaaa");
      }}
      onMouseLeave={() => {
        setBackGroundColor();
      }}
      style={{
        ...props.styles,
        backgroundColor: bgc,
      }}
    >
      <div className="text-center">
        {/* {flag ? "F" : open ? props.values.value : ""} */}
        {props.values.isOpened ? props.values.value : props.values.value}
      </div>
    </div>
  );
};

export default Cell;
