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
          onClick={() => {
            history.push("/");
            window.location.pathname = "/";
          }}
        >
          Search
        </button>
      </div>
    );
  } else {
    return "";
  }
};

export default ProductsReturn;
