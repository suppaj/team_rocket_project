import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

const ProductSorter = ({
  allProducts,
  setAllProducts,
  currentProducts,
  setCurrentProducts,
  sortMessage,
  setSortMethod,
  setSortMessage,
  resetPagination,
  sortProductsByKey,
}) => {
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
                localStorage.removeItem("sortQuery");
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({
                message: "Price: High to Low",
                key: "price",
                type: 1,
              })
            );
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({
                message: "Price: Low to High",
                key: "price",
                type: 2,
              })
            );
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({ message: "Name: A to Z", key: "name", type: 3 })
            );
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({ message: "Name: Z to A", key: "name", type: 4 })
            );
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({
                message: "Height: High to Low",
                key: "height",
                type: 1,
              })
            );
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({
                message: "Height: Low to high",
                key: "height",
                type: 2,
              })
            );
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({
                message: "Weight: High to Low",
                key: "weight",
                type: 1,
              })
            );
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
            localStorage.setItem(
              "sortQuery",
              JSON.stringify({
                message: "Weight: Low to High",
                key: "weight",
                type: 2,
              })
            );
          }}
        >
          Low to High
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductSorter;
