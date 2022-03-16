import React, { useState, useEffect } from "react";
import clock from "../../assets/minesweeper/clock_icon.png";
const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval = null;
    if (props.active && seconds<999) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
        clearInterval(interval)
      }, 1000);
    }
    else if(!props.active)
    {
        setSeconds(0);
    }
  }, [seconds, props.active]);

  return (
    <div>
      <img src={clock} alt="clock" style={{ width: "38px" }} />
      <div className="counter">{("000" + seconds).slice(-3)}</div>
    </div>
  );
};

export default Timer;
