// react imports
import React, { useState, useEffect } from "react";

// react bootstrap imports
import { Button, Row } from "react-bootstrap";

// component imports
import ProductRender from "./ProductRender";
import ProductSearch from "./ProductSearch";
import ProductSorter from "./ProductSorter";
import ProductTypeFilter from "./ProductTypeFilter";

const Products = ({ getAllProducts, getAllTypes }) => {
  // product states
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);

  // search/sort/filter states
  const [allTypes, setAllTypes] = useState([]);
  const [filterMessage, setFilterMessage] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [sortMethod, setSortMethod] = useState("");

  // front-end pagination state, incrementing by 12
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(12);

  // front-end pagination next page
  function renderNextPage() {
    setIndexStart(indexStart + 12);
    setIndexEnd(indexEnd + 12);
  }
  // front-end pagination previous page
  function renderPrevPage() {
    setIndexStart(indexStart - 12);
    setIndexEnd(indexEnd - 12);
  }
  // resets pagination for search/sort/filters
  function resetPagination() {
    setIndexStart(0);
    setIndexEnd(12);
  }
  // scrolls to top of page when next/prev buttons are clicked
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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
        console.log("response:", response);
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
  }, []);

  // function used to alphabetize the types object array, based on the key 'name'
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
        {/** product search component*/}
        <ProductSearch
          allProducts={allProducts}
          setCurrentProducts={setCurrentProducts}
          filterMessage={filterMessage}
          setFilterMessage={setFilterMessage}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          resetPagination={resetPagination}
        />
        {/** product filter component*/}
        <ProductTypeFilter
          allProducts={allProducts}
          setCurrentProducts={setCurrentProducts}
          allTypes={allTypes}
          typeFilter={typeFilter}
          filterMessage={filterMessage}
          setFilterMessage={setFilterMessage}
          resetPagination={resetPagination}
        />
        {/** product sort component */}
        <ProductSorter
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          currentProducts={currentProducts}
          setCurrentProducts={setCurrentProducts}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
          alphabetize={alphabetize}
          resetPagination={resetPagination}
        />
      </Row>
      <Row
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/** render products component */}
        <ProductRender
          currentProducts={currentProducts}
          typeFilter={typeFilter}
          setFilterMessage={setFilterMessage}
          sortMethod={sortMethod}
          indexStart={indexStart}
          indexEnd={indexEnd}
        />
      </Row>
      <Row
        style={{
          width: "100vw",
          maxHeight: "38px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/** previous page pagination component, conditionally rendered */}
        {indexStart === 0 ? (
          ""
        ) : (
          <Button
            style={{ marginRight: "10px" }}
            variant="secondary"
            onClick={() => {
              scrollToTop();
              renderPrevPage();
            }}
          >
            Previous Page
          </Button>
        )}
        {/** next page pagination component, conditionally rendered */}
        {indexEnd >= currentProducts.length ? (
          ""
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              scrollToTop();
              renderNextPage();
            }}
          >
            Next Page
          </Button>
        )}
      </Row>
    </>
  );
};

export default Products;
