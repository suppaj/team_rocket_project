import React, { useEffect, useState } from "react";

import "./Product.css";
import ProductModal from "./ProductModal";

import ProducModal from "./ProductModal";

const Products = ({ currentProducts, typeFilter, setFilterMessage }) => {
  const [currentPoke, setCurrentPoke] = useState({
    dex_id: 1,
    name: "bulbasaur",
    type: ["grass", "poison"],
    description:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
    height: 7,
    weight: 69,
    price: 96.66,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    const { dex_id, name, type, price } = poke;
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
        <p>${price}</p>
        <img
          style={{
            height: "200px",
            marginTop: "-25px",
          }}
          className="nes-pointer"
          onClick={() => {
            setCurrentPoke(poke);
            handleShow();
          }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
        />
        <div>{typeMapper(type)}</div>
      </div>
    );
  }

  if (currentProducts.length) {
    // if there are products to display, render all of them
    return (
      <>
        {renderAllCards(currentProducts)}
        <ProductModal
          currentPoke={currentPoke}
          handleClose={handleClose}
          show={show}
        />
      </>
    );
    // return <ProducModal />;
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
        />
        <p>We're sorry, but there are no POKéMON to display</p>
      </div>
    );
  }
};

export default Products;
