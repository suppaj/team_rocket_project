import React, { useState, useEffect } from "react";

import { getSomething, getAllProducts } from "../api";
import Products from "./Products";

const App = () => {
  const [message, setMessage] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });

    getAllProducts()
      .then((response) => {
        setAllProducts(response);
        console.log("response:", response);
      })
      .catch((error) => {
        console.log("Error fetching products!");
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{message}</h2>
      <Products allProducts={allProducts} />
    </div>
  );
};

export default App;
