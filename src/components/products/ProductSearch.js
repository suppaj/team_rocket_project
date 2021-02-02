import React, { useEffect } from "react";

import { Form } from "react-bootstrap";

const ProductSearch = ({
  searcher,
  searchVal,
  setSearchVal,
  resetPagination,
}) => {
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
          localStorage.setItem("searchQuery", event.target.value);
          localStorage.removeItem("filterQuery");
        }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      />
    </Form>
  );
};

export default ProductSearch;
