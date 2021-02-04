import React from "react";

const BouncingBall = () => {
  return (
    <div className="masterball-bounce-container">
      <img
        id="masterball-cart"
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
        }
        alt="masterball animation "
        width="75"
        height="75"
      />
    </div>
  );
};

export default BouncingBall;
