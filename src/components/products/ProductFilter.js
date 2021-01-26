import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

const ProductFilter = ({
  allProducts,
  setCurrentProducts,
  allTypes,
  typeFilter,
  filterMessage,
  setFilterMessage,
  resetPagination,
}) => {
  function dropdownMapper(collection, key) {
    return collection.map((item) => {
      return (
        <Dropdown.Item
          key={item[key]}
          onClick={() => {
            setFilterMessage(`${item[key]}`);
            typeFilter(item[key]);
            resetPagination();
          }}
          style={{
            textTransform: "capitalize",
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
        <span>
          {filterMessage
            ? filterMessage === "Featured products"
              ? ""
              : "Type: "
            : "Filter pokemon..."}
        </span>
        <span style={{ textTransform: "capitalize" }}>
          {filterMessage ? `${filterMessage}` : ""}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {filterMessage === "" ? (
          ""
        ) : (
          <>
            <Dropdown.Item
              onClick={() => {
                setFilterMessage("");
                setCurrentProducts(allProducts);
                resetPagination();
              }}
            >
              Clear filter
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        )}
        <Dropdown.Item
          key={"featured"}
          onClick={() => {
            setFilterMessage("Featured products");
            let copy = [];
            allProducts.forEach((product) => {
              if (product.is_featured) {
                copy.push(product);
              }
            });
            setCurrentProducts(copy);
            resetPagination();
          }}
          style={{
            textTransform: "capitalize",
          }}
        >
          Featured Products
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Filter by type...</Dropdown.Header>
        {dropdownMapper(allTypes, "name")}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductFilter;
