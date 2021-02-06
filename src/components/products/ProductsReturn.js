import React from "react";
import { useHistory } from "react-router-dom";

const ProductsReturn = () => {
  const history = useHistory();
  
    return (
      <div>
        <button
          type="button"
          className="nes-btn"
          onClick={() => {
            history.push("/");
          }}
        >
          Search
        </button>
      </div>
    );
};

export default ProductsReturn;
