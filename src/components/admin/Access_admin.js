import React from "react";

const Access = ({ isAdmin }) => {
  return isAdmin ? (
    <button type="button" className="nes-btn is-normal">
      Admin
    </button>
  ) : null;
};

export default Access;
