import React from "react";

const Rejected = () => {
  return (
    <div id="rejected" className="who-this-container">
      <img
        className="rej-img"
        src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/12.png?raw=true"
      ></img>
      <div id="reject-label" className="nes-container is-rounded is-dark">
        <p id="reject-message">
          You do not have {"access".toUpperCase()} to this
          <br /> area of the {"site".toUpperCase()}!
        </p>
        <img
          className="rej-img"
          src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/3.png?raw=true"
        ></img>
      </div>
      <img
        className="rej-img"
        src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/6.png?raw=true"
      ></img>
    </div>
  );
};

export default Rejected;
