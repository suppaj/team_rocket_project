import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

const ProductSorter = ({
  allProducts,
  setAllProducts,
  currentProducts,
  setCurrentProducts,
  setSortMethod,
  alphabetize,
  resetPagination,
}) => {
  const [sortMessage, setSortMessage] = useState("Sort pokemon...");

  // sorts the given array based on a given object key
  // sortMethod is a callback function to signal setting all/current products
  function sortProductsByKey(productArray, key, sortMethod, setMethod) {
    let sorted = [...productArray];
    // sorts keys high to low (sortMethod === 1)
    if (sortMethod === 1) {
      sorted.sort((a, b) => {
        a = parseInt(a[key]);
        b = parseInt(b[key]);
        return b - a;
      });

      //   sorts keys low to high (sortMethod === 2)
    } else if (sortMethod === 2) {
      sorted.sort((a, b) => {
        a = parseInt(a[key]);
        b = parseInt(b[key]);
        return a - b;
      });
    } else if (sortMethod === 3) {
      sorted.sort(alphabetize);
    } else if (sortMethod === 4) {
      sorted.sort(alphabetize);
      sorted.reverse();
    }
    setMethod(sorted);
  }

  return (
    <Dropdown style={{ marginRight: "10px" }}>
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
                setSortMethod("");
                sortProductsByKey(
                  currentProducts,
                  "dex_id",
                  2,
                  setCurrentProducts
                );
                sortProductsByKey(allProducts, "dex_id", 2, setAllProducts);
                resetPagination();
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
            setSortMethod("price");
            sortProductsByKey(currentProducts, "price", 1, setCurrentProducts);
            sortProductsByKey(allProducts, "price", 1, setAllProducts);
            resetPagination();
          }}
        >
          High to Low
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Price: Low to High");
            setSortMethod("price");
            sortProductsByKey(currentProducts, "price", 2, setCurrentProducts);
            sortProductsByKey(allProducts, "price", 2, setAllProducts);
            resetPagination();
          }}
        >
          Low to High
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Sort by name...</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Name: A to Z");
            setSortMethod("name");
            sortProductsByKey(currentProducts, "name", 3, setCurrentProducts);
            sortProductsByKey(allProducts, "name", 3, setAllProducts);
            resetPagination();
          }}
        >
          A to Z
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Name: Z to A");
            setSortMethod("price");
            sortProductsByKey(currentProducts, "name", 4, setCurrentProducts);
            sortProductsByKey(allProducts, "name", 4, setAllProducts);
            resetPagination();
          }}
        >
          Z to A
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Sort by height...</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Height: High to Low");
            setSortMethod("height");
            sortProductsByKey(currentProducts, "height", 1, setCurrentProducts);
            sortProductsByKey(allProducts, "height", 1, setAllProducts);
            resetPagination();
          }}
        >
          High to Low
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Height: Low to High");
            setSortMethod("height");
            sortProductsByKey(currentProducts, "height", 2, setCurrentProducts);
            sortProductsByKey(allProducts, "height", 2, setAllProducts);
            resetPagination();
          }}
        >
          Low to High
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Sort by weight...</Dropdown.Header>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Weight: High to Low");
            setSortMethod("weight");
            sortProductsByKey(currentProducts, "weight", 1, setCurrentProducts);
            sortProductsByKey(allProducts, "weight", 1, setAllProducts);
            resetPagination();
          }}
        >
          High to Low
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortMessage("Weight: Low to High");
            setSortMethod("weight");
            sortProductsByKey(currentProducts, "weight", 2, setCurrentProducts);
            sortProductsByKey(allProducts, "weight", 2, setAllProducts);
            resetPagination();
          }}
        >
          Low to High
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductSorter;
