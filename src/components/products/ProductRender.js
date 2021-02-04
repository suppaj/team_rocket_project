import React from "react";

import "./Product.css";
import TypeMapper from "./TypeMapper";

const Products = ({
  currentProducts,
  typeFilter,
  setFilterMessage,
  sortMethod,
  indexStart,
  indexEnd,
}) => {
  // randomizes the unknown image shown if there is nothing to display
  const unknownArray = "abcdefghijklmnopqrstuvwxyz".split("");
  unknownArray.push("exclamation");
  unknownArray.push("question");
  var unknownId = unknownArray[Math.floor(Math.random() * unknownArray.length)];

  // renders cards for all products in a given array
  function renderAllCards(productArray, start, end) {
    let current = [];
    for (let i = start; i < end; i++) {
      if (productArray[i]) {
        current.push(productArray[i]);
      }
    }
    return current.map((link) => {
      const newCard = renderCard(link);
      return newCard;
    });
  }

  // individually renders a product card
  function renderCard(poke) {
    const {
      prod_id,
      dex_id,
      name,
      type,
      price,
      height,
      weight,
      is_featured,
    } = poke;

    return (
      <div
        key={dex_id}
        className="pokemon-card nes-container with-title is-rounded is-centered"
      >
        <div className="nes-container is-rounded title">
          <span>#{dex_id} </span>
          <span className="pokemon-name">{name}</span>
        </div>
        <span>
          {is_featured ? (
            <i className="is-featured nes-icon star is-medium"></i>
          ) : (
            ""
          )}
        </span>
        <p>
          ${price}
          {sortMethod === "height" ? ` | ${height / 10}m` : ""}
          {sortMethod === "weight" ? ` | ${weight / 10}kg` : ""}
        </p>
        <a href={`/products/${prod_id}/${name}`}>
          <img
            className="nes-pointer pokemon-icon"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
            alt={`a very happy ${name}`}
          />
        </a>
        <TypeMapper
          typeArray={type}
          setFilterMessage={setFilterMessage}
          typeFilter={typeFilter}
        />
      </div>
    );
  }

  if (currentProducts.length) {
    // if there are products to display, render all of them
    return <>{renderAllCards(currentProducts, indexStart, indexEnd)}</>;
  } else {
    // if there are no propducts to display, shows a card with an apporpriate message
    return (
      <div className="no-cards-container">
        <div
          className={`no-pokemon-card nes-container with-title is-rounded is-centered`}
        >
          <p className="nes-container is-rounded title">
            There doesn't seem to be anything here...
          </p>
          <img
            className="unknown-icon"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-${unknownId}.png`}
            alt={`an unknown-${unknownId} appears...`}
          />
          <p>We're sorry, but there are no POKéMON to display</p>
        </div>
      </div>
    );
  }
};

export default Products;
