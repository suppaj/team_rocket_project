import React from "react";
import "./Product.css";

const Products = ({ allProducts }) => {
  function renderAllCards(productArray) {
    return productArray.map((link) => {
      const newCard = renderCard(link);
      return newCard;
    });
  }

  function renderCard({
    dex_id,
    name,
    type,
    description,
    height,
    weight,
    price,
  }) {
    function typeMapper(typeArray) {
      return typeArray.map((type, index) => {
        return (
          <span
            className={`${type} typing nes-container is-rounded`}
            style={{
              marginRight: "10px",
              marginLeft: "10px",
              padding: "2px",
            }}
            key={index}
          >
            {type}
          </span>
        );
      });
    }

    {
    }

    return (
      <div
        key={dex_id}
        style={{
          marginBottom: "30px",
          marginLeft: "30px",
          marginRight: "30px",
          width: "310px",
          display: "inline-block",
          textAlign: "center",
          backgroundColor: "#abbbd1",
        }}
        className={`nes-container with-title is-rounded is-centered`}
      >
        <p className="nes-container is-rounded title">
          #{dex_id} {name}
        </p>
        <img
          style={{ height: "200px" }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
        />
        <div>{typeMapper(type)}</div>
      </div>
    );
  }

  return <>{renderAllCards(allProducts)}</>;
};

export default Products;
