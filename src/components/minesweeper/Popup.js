import React from "react";
import refresh from "../../assets/minesweeper/refresh_white_24dp.png";
import clock from "../../assets/minesweeper/clock_icon.png";
import trophy from '../../assets/minesweeper/trophy_icon.png'
const Popup = (props) => {
  return (
    <div className="modalBody">
      <div className="float-right timesButton">&times;</div>
      <div className="stats">
        <div className="time">
          <img src={clock} alt="Clock" className="statsImg" />
          <div className="score">90</div>
        </div>
        <div className="time">
          <img src={trophy} alt="Clock" className="statsImg" />
          <div className="score">–––</div>
        </div>
      </div>
      <div className="tryAgain">
        <img src={refresh} alt="Refresh" className="refreshbtn" />
        <h2 className="btnheading">Try Again</h2>
      </div>
    </div>
  );
};

export default Popup;
