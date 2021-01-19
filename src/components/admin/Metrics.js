import React from "react";
import pokeball from "./pokeball.png";
const Metrics = ({ isAdmin }) => {
  return (
    <div id="metrics">
      {isAdmin ? (
        <div id="metrics_display">
          <img className="admin-pokeballs" src={pokeball}></img>
          <div className="admin-title">Metrics Placeholder</div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Metrics;
