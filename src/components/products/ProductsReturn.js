import React from "react";
import { useHistory } from "react-router-dom";

const ProductsReturn = () => {
  const history = useHistory();
  if (window.location.pathname != "/") {
    return (
      <div>
        <button
          type="button"
          className="nes-btn"
          onClick={() => history.push("/")}
        >
          Return to Search
        </button>
      </div>
    );
  } else {
    return "";
  }
};

// todo look into <Link> component, this will mess with conditional rendering of the page but will allow us to potentially keep the existing search/sort/filter parameters of the page
export default ProductsReturn;
