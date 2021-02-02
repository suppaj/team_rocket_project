import React from "react";

const ProductsReturn = () => {
  if (window.location.pathname != "/") {
    return (
      <a href="/">
        <button type="button" className="nes-btn">
          Search
        </button>
      </a>
    );
  } else {
    return "";
  }
};

// todo look into <Link> component, this will mess with conditional rendering of the page but will allow us to potentially keep the existing search/sort/filter parameters of the page
export default ProductsReturn;
