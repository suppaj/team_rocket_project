import React, { useState, useEffect } from "react";

import { Row } from "react-bootstrap";

import ProductRender from "./ProductRender";
import ProductSearch from "./ProductSearch";
import ProductSorter from "./ProductSorter";
import ProductTypeFilter from "./ProductTypeFilter";

const Products = ({ getAllProducts, getAllTypes }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [filterMessage, setFilterMessage] = useState("Filter pokemon...");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    // grabs all pokemon entries from the database
    getAllProducts()
      .then((response) => {
        // default product sort by 'dex_id' key, ascending before setting states
        response.sort((a, b) => {
          a = a.dex_id;
          b = b.dex_id;
          return a - b;
        });
        setAllProducts(response);
        setCurrentProducts(response);
      })
      .catch((error) => {
        console.log("Error fetching products!");
        console.log(error);
      });

    // grabs all type entries from the database
    getAllTypes()
      .then((response) => {
        // sorts types alphabetically before setting state
        response.sort(alphabetize);
        setAllTypes(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getAllTypes, getAllProducts]);

  // function used to alphabetize the types object array, based on the key 'name'
  // sourced: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  function alphabetize(a, b) {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();

    let comparison = 0;
    if (a > b) {
      comparison = 1;
    } else if (a < b) {
      comparison = -1;
    }
    return comparison;
  }

  // function to filter product by types, passed into both ProductRender & ProductTypeFilter
  function typeFilter(val) {
    if (searchVal !== "") {
      console.log("its happening!");
      setSearchVal("");
    }
    let copy = [...allProducts];
    let filtered = [];
    copy.forEach((poke) => {
      let pokeType = poke.type.toString();
      if (pokeType.match(val)) {
        filtered.push(poke);
      }
    });
    setCurrentProducts(filtered);
  }

  return (
    <>
      <Row
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ProductSearch
          allProducts={allProducts}
          setCurrentProducts={setCurrentProducts}
          filterMessage={filterMessage}
          setFilterMessage={setFilterMessage}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
        <ProductTypeFilter
          allProducts={allProducts}
          setCurrentProducts={setCurrentProducts}
          allTypes={allTypes}
          typeFilter={typeFilter}
          filterMessage={filterMessage}
          setFilterMessage={setFilterMessage}
        />
        <ProductSorter
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          currentProducts={currentProducts}
          setCurrentProducts={setCurrentProducts}
        />
      </Row>
      <Row
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ProductRender
          currentProducts={currentProducts}
          typeFilter={typeFilter}
          setFilterMessage={setFilterMessage}
        />
      </Row>
    </>
  );
};

export default Products;
