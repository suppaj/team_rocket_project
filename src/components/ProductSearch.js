import React, { useState } from "react";

import { Form } from "react-bootstrap";

const ProductSearch = ({
  allProducts,
  currentProducts,
  setCurrentProducts,
}) => {
  const [searchVal, setSearchVal] = useState("");

  function searcher(val) {
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
    <Form>
      <Form.Control
        type="text"
        value={searchVal}
        placeholder="Search..."
        onChange={(event) => {
          event.preventDefault();
          setSearchVal(event.target.value);
          searcher(event.target.value);
        }}
      />
    </Form>
  );
};

export default ProductSearch;

/**
 * KNOWN BUG
 *
 * replication:
 * search 'normal'
 * set sorter to price: high to low
 * backspace in search bar until there is no text left
 *
 * implication:
 * emptying search bar doesn't 'reset' the entries and only displays the old search results
 *
 * note:
 * this will happen when searching anything or using any of the sorters
 */
