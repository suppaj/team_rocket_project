import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

const ProductSorter = ({
  allProducts,
  setAllProducts,
  currentProducts,
  setCurrentProducts,
}) => {
  const [sortMessage, setSortMessage] = useState("Sort pokemon...");

  function sortProductsByKey(productArray, key, sortMethod) {
    let sorted = [...productArray];
    // sorts keys high to low
    if (sortMethod === 1) {
      sorted.sort((a, b) => {
        a = parseInt(a[key]);
        b = parseInt(b[key]);
        return b - a;
      });

      //   sorts keys low to high
    } else if (sortMethod === 2) {
      sorted.sort((a, b) => {
        a = parseInt(a[key]);
        b = parseInt(b[key]);
        return a - b;
      });
    }
    setCurrentProducts(sorted);
    setAllProducts(sorted);
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {sortMessage}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {sortMessage === "Sort pokemon..." ? (
          ""
        ) : (
          <>
            <Dropdown.Item
              onClick={() => {
                setSortMessage("Sort pokemon...");
                setCurrentProducts(allProducts);
              }}
            >
              Clear sort
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        )}
        <Dropdown.Header>Sort by price...</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Price: High to Low");
            sortProductsByKey(currentProducts, "price", 1);
          }}
        >
          High to Low
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Price: Low to High");
            sortProductsByKey(currentProducts, "price", 2);
          }}
        >
          Low to High
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Sort by height...</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Height: High to Low");
            sortProductsByKey(currentProducts, "height", 1);
          }}
        >
          High to Low
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Height: Low to High");
            sortProductsByKey(currentProducts, "height", 2);
          }}
        >
          Low to High
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Sort by weight...</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Weight: High to Low");
            sortProductsByKey(currentProducts, "weight", 1);
          }}
        >
          High to Low
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Weight: Low to High");
            sortProductsByKey(currentProducts, "weight", 2);
          }}
        >
          Low to High
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductSorter;
