import React, { useEffect } from "react";

import { Button, Form } from "react-bootstrap";

const ProductSearch = ({
  searcher,
  searchVal,
  setSearchVal,
  resetPagination,
}) => {
  return (
    <>
      <Button
        variant="danger"
        className="search-filter-reset"
        onClick={() => {
          resetPagination();
          setSearchVal("");
          searcher("");
          localStorage.removeItem("searchQuery");
          localStorage.removeItem("filterQuery");
        }}
      >
        X
      </Button>
      <Form className="search-bar" variant="dark">
        <Form.Control
          type="text"
          value={searchVal}
          placeholder="Search..."
          onChange={(event) => {
            event.preventDefault();
            resetPagination();
            setSearchVal(event.target.value);
            searcher(event.target.value.toLowerCase());
            localStorage.setItem("searchQuery", event.target.value);
            localStorage.removeItem("filterQuery");
          }}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        />
      </Form>
    </>
  );
};

export default ProductSearch;
