import React, { useEffect, useState } from "react";

import { Form } from "react-bootstrap";

const ProductSearch = ({
  allProducts,
  setCurrentProducts,
  filterMessage,
  setFilterMessage,
  searchVal,
  setSearchVal,
}) => {
  // search function built to comb the product object for string matches in any of the given fields
  function searcher(val) {
    if (filterMessage != "Filter pokemon...") {
      setFilterMessage("Filter pokemon...");
    }
    let copy = [...allProducts];
    let filtered = [];
    copy.forEach((poke) => {
      let pokeName = poke.name.toLowerCase();
      let pokeType = poke.type.toString();
      let pokeDesc = poke.description.toLowerCase();
      let pokeHeight = poke.height.toString();
      let pokeWeight = poke.weight.toString();
      let pokePrice = poke.price.toString();
      if (pokeName.includes(val)) {
        filtered.push(poke);
      } else if (pokeType.match(val)) {
        filtered.push(poke);
      } else if (pokeDesc.match(val)) {
        filtered.push(poke);
      } else if (pokeHeight.match(val)) {
        filtered.push(poke);
      } else if (pokeWeight.match(val)) {
        filtered.push(poke);
      } else if (pokePrice.match(val)) {
        filtered.push(poke);
      }
    });
    setCurrentProducts(filtered);
  }

  return (
    <Form style={{ marginRight: "10px" }}>
      <Form.Control
        type="text"
        value={searchVal}
        placeholder="Search..."
        onChange={(event) => {
          event.preventDefault();
          setSearchVal(event.target.value);
          searcher(event.target.value);
        }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      />
    </Form>
  );
};

export default ProductSearch;
