import React, { useState, useEffect } from "react";
import clock from "../../assets/minesweeper/clock_icon.png";
import DIFFICULTY_LEVEL from "../../constants/minesweeper/constants";

const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval = null;
    if (
      props.active &&
      seconds < 999 &&
      props.game !== true &&
      props.showMines !== true
    ) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    } else if (!props.active && seconds !== 0) {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [seconds, props.active, props.game,props.showMines]);
  useEffect(() => {
    if (props.game === true) {
      window.localStorage.setItem("curScore", seconds);
      let hs;
      if (props.diff === DIFFICULTY_LEVEL.EASY.name) {
        hs = window.localStorage.getItem("HSE") || 999;
        if (seconds < hs) {
          window.localStorage.setItem("HSE", seconds);
        }
      } else if (props.diff === DIFFICULTY_LEVEL.MEDIUM.name) {
        hs = window.localStorage.getItem("HSM") || 999;
        if (seconds < hs) {
          window.localStorage.setItem("HSM", seconds);
        }
      } else if (props.diff === DIFFICULTY_LEVEL.HARD.name) {
        hs = window.localStorage.getItem("HSH") || 999;
        if (seconds < hs) {
          window.localStorage.setItem("HSH", seconds);
        }
      }
    }
  }, [props.game]);
  return (
    <div>
      <img src={clock} alt="clock" style={{ width: "38px" }} />
      <div className="counter">{("000" + seconds).slice(-3)}</div>
    </div>
  );
};

export default Timer;
