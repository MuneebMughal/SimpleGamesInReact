import React, { useState, useEffect } from "react";
import "./minesweeper.css";

const Cell = (props) => {
  const [bgc, setBgc] = useState("#a2d149");
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (props.values.toggle) {
      setBgc("#aad752");
    } else {
      setBgc("#a2d149");
    }
    setOpen(props.values.isOpened);
    setFlag(props.values.flag);
  }, [props.values]);
//   useEffect(()=>{
//       console.log('UseEffect of Cell Called');
//   },[props.values.value])
  useEffect(() => {
    if (open && props.values.toggle) {
      setBgc("#e6c1a0");
    } else if (open && !props.values.toggle) {
      setBgc("#d7b899");
    }
  }, [open, props.values.toggle]);
  const setBackGroundColor = () => {
    if (open && props.values.toggle) {
      setBgc("#e6c1a0");
    } else if (open && !props.values.toggle) {
      setBgc("#d7b899");
    } else if (!open && props.values.toggle) {
      setBgc("#aad752");
    } else {
      setBgc("#a2d149");
    }
  };
  const handleClick = (e) => {
    if (!flag) {
      props.onClick(e);
      setOpen(true);
    }
  };
  const handleRightClick = (e) => {
    if (!open) {
      setFlag(!flag);
    }
    props.onContextMenu(e);
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
      style={{ ...props.styles, backgroundColor: bgc }}
    >
      <div className="text-center">
        {/* {flag ? "F" : open ? props.values.value : ""} */}
        {props.values.value}
      </div>
    </div>
  );
};

export default Cell;
