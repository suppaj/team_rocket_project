import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

const ProductTypeFilter = ({
  allProducts,
  setCurrentProducts,
  allTypes,
  typeFilter,
  filterMessage,
  setFilterMessage,
}) => {
  function dropdownMapper(collection, key) {
    return collection.map((item) => {
      return (
        <Dropdown.Item
          key={item[key]}
          onClick={() => {
            setFilterMessage(`Type: ${item[key]}`);
            typeFilter(item[key]);
          }}
        >
          {item[key]}
        </Dropdown.Item>
      );
    });
  }

  return (
    <Dropdown style={{ marginRight: "10px" }}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {filterMessage}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {filterMessage === "Filter pokemon..." ? (
          ""
        ) : (
          <>
            <Dropdown.Item
              onClick={() => {
                setFilterMessage("Filter pokemon...");
                setCurrentProducts(allProducts);
              }}
            >
              Clear filter
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        )}
        <Dropdown.Header>Filter by type...</Dropdown.Header>
        {dropdownMapper(allTypes, "name")}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductTypeFilter;
