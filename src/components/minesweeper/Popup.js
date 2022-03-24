import React, { useState, useEffect,useRef } from "react";
import refresh from "../../assets/minesweeper/refresh_white_24dp.png";
import clock from "../../assets/minesweeper/clock_icon.png";
import trophy from "../../assets/minesweeper/trophy_icon.png";
import DIFFICULTY_LEVEL from "../../constants/minesweeper/constants";
const Popup = (props) => {
  const [show, setShow] = useState(false);
  const hs=useRef(0); 
  const curS=useRef(0);
  useEffect(() => {
    if (props.show === true) {
      setShow(true);
      if (props.game === true) {
        if (props.diff === DIFFICULTY_LEVEL.EASY.name) {
          hs.current = window.localStorage.getItem("HSE") || 999;
        } else if (props.diff === DIFFICULTY_LEVEL.MEDIUM.name) {
          hs.current = window.localStorage.getItem("HSM") || 999;
        } else if (props.diff === DIFFICULTY_LEVEL.HARD.name) {
          hs.current = window.localStorage.getItem("HSH") || 999;
        }
        curS.current = window.localStorage.getItem("curScore");
      }
    } else setShow(false);
  }, [props.game,props.show]);
  return (
    <div
      className="modalBody"
      style={show === true ? { display: "block" } : { display: "none" }}
    >
      <div className="float-right timesButton" onClick={props.onClick}>
        &times;
      </div>
      <div className="stats">
        <div className="time">
          <img src={clock} alt="Clock" className="statsImg" />
          <div className="score">{props.game === true ?  curS.current  : "–––"}</div>
        </div>
        <div className="time">
          <img src={trophy} alt="Clock" className="statsImg" />
          <div className="score">{props.game === true ?  hs.current  : "–––"}</div>
        </div>
      </div>
      <div className="tryAgain" onClick={props.onClick}>
        <img src={refresh} alt="Refresh" className="refreshbtn" />
        <h2 className="btnheading">Try Again</h2>
      </div>
    </div>
  );
};

export default Popup;
