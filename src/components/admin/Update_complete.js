import React from "react";

const Update_admin = ({ updateCompleteShow }) => {
  return (
    <div
      className={
        updateCompleteShow === true
          ? "update-show nes-container is-rounded is-dark"
          : "hide"
      }
    >
      <img
        className="edit-prod-success"
        src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/31.png?raw=true"
      ></img>
      <p className="update-message">Update Complete!</p>
      <img
        className="edit-prod-success"
        src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/26.png?raw=true"
      ></img>
    </div>
  );
};

export default Update_admin;
