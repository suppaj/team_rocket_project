import React from "react";

const Access = ({ isAdmin }) => {
  return isAdmin ? (
    <button
      type="button"
      className="nes-btn is-normal"
      //  onClick={handleShowLogin}
    >
      Admin
    </button>
  ) : null;
};

export default Access;
