import React from "react";

import { Form } from "react-bootstrap";

const ProductSearch = ({
  allProducts,
  setCurrentProducts,
  filterMessage,
  setFilterMessage,
  searchVal,
  setSearchVal,
  resetPagination,
}) => {
  // search function built to comb the product object for string matches in any of the given fields
  function searcher(val) {
    if (filterMessage !== "") {
      setFilterMessage("");
    }
    let copy = [...allProducts];
    let filtered = [];
    copy.forEach((poke) => {
      let pokeDex = poke.dex_id.toString();
      let pokeName = poke.name.toLowerCase();
      let pokeType = poke.type.toString();
      let pokeDesc = poke.description.toLowerCase();
      let pokeHeight = poke.height.toString();
      let pokeWeight = poke.weight.toString();
      let pokePrice = poke.price.toString();
      if (pokeDex.includes(val)) {
        filtered.push(poke);
      } else if (pokeName.includes(val)) {
        filtered.push(poke);
      } else if (pokeType.includes(val)) {
        filtered.push(poke);
      } else if (pokeDesc.includes(val)) {
        filtered.push(poke);
      } else if (pokeHeight.includes(val)) {
        filtered.push(poke);
      } else if (pokeWeight.includes(val)) {
        filtered.push(poke);
      } else if (pokePrice.includes(val)) {
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
          resetPagination();
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
