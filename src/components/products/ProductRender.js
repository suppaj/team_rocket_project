import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./Product.css";

const Products = ({
  currentProducts,
  typeFilter,
  setFilterMessage,
  sortMethod,
}) => {
  // randomizes the unknown image shown if there is nothing to display
  const unknownArray = "abcdefghijklmnopqrstuvwxyz".split("");
  unknownArray.push("exclamation");
  unknownArray.push("question");
  var unknownId = unknownArray[Math.floor(Math.random() * unknownArray.length)];

  // renders cards for all products in a given array
  function renderAllCards(productArray) {
    return productArray.map((link) => {
      const newCard = renderCard(link);
      return newCard;
    });
  }

  // individually renders a product card
  function renderCard(poke) {
    const { prod_id, dex_id, name, type, price, height, weight } = poke;
    // maps the type badges for a given product
    function typeMapper(typeArray) {
      return typeArray.map((type, index) => {
        return (
          <span
            className={`${type} nes-container is-rounded nes-pointer`}
            style={{
              marginRight: "10px",
              marginLeft: "10px",
              padding: "2px",
            }}
            key={index}
            onClick={() => {
              setFilterMessage(`Type: ${type}`);
              typeFilter(type);
            }}
          >
            {type}
          </span>
        );
      });
    }

    return (
      <div
        key={dex_id}
        style={{
          marginBottom: "30px",
          marginLeft: "30px",
          marginRight: "30px",
          width: "310px",
          height: "310px",
          display: "inline-block",
          textAlign: "center",
          backgroundColor: "#abbbd1",
        }}
        className={`pokemon-card nes-container with-title is-rounded is-centered`}
      >
        <p className="nes-container is-rounded title">
          #{dex_id} {name}
        </p>
        <p>
          {sortMethod === "height" ? `${height / 10}m | ` : ""}
          {sortMethod === "weight" ? `${weight / 10}kg | ` : ""}${price}
        </p>
        <Button variant="link" href={`/products/${prod_id}/${name}`}>
          <img
            style={{
              height: "200px",
              marginTop: "-25px",
            }}
            className="nes-pointer"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
            alt={`a very happy ${name}`}
          />
        </Button>
        <div>{typeMapper(type)}</div>
      </div>
    );
  }

  if (currentProducts.length) {
    // if there are products to display, render all of them
    return <>{renderAllCards(currentProducts)}</>;
  } else {
    // if there are no propducts to display, shows a card with an apporpriate message
    return (
      <div
        style={{
          marginBottom: "30px",
          marginLeft: "30px",
          marginRight: "30px",
          height: "300px",
          display: "inline-block",
          textAlign: "center",
          backgroundColor: "#abbbd1",
        }}
        className={`nes-container with-title is-rounded is-centered`}
      >
        <p className="nes-container is-rounded title">
          There doesn't seem to be anything here...
        </p>
        <img
          style={{ height: "200px", marginTop: "-25px" }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-${unknownId}.png`}
          alt={`an unknown-${unknownId} appears...`}
        />
        <p>We're sorry, but there are no POKéMON to display</p>
      </div>
    );
  }
};

export default Products;
