import React from "react";
import { useHistory } from "react-router-dom";

const ProductsReturn = () => {
  const history = useHistory();
  if (window.location.pathname != "/") {
    console.log(
      "hello the pathname is NOT '/' and the button SHOULD BE rendered!"
    );
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
    console.log("this is the current pathname:", window.location.pathname);
    console.log("the button should NOT be rendering!");
    return "";
  }
};

export default ProductsReturn;
