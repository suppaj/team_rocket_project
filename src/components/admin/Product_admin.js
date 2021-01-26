import React, { useState } from "react";
import ultraball from "./ultraball.png";
import { Modal, Form, Button } from "react-bootstrap";
import { Search, Rejected } from "./index";

const Product_admin = ({ isAdmin }) => {
  const [showMetrics, setShowMetrics] = useState(false);
  const [productsArr, setProductsArr] = useState([]);
  const handleClose = () => setShowMetrics(false);
  const handleShow = () => {
    setShowMetrics(true);
    const products = JSON.parse(window.localStorage.getItem("prod_array"));
    setProductsArr(products);
  };
  return (
    <div id="product_admin">
      {isAdmin ? (
        <div id="product_admin_display">
          <img
            className="admin-pokeballs"
            src={ultraball}
            onClick={handleShow}
          ></img>
          <div className="admin-title">
            <div className={showMetrics === true ? "show" : "hide"}>
              <button className="close-button" onClick={handleClose}>
                X
              </button>
              <div id="products-display">
                <div className="active-products">
                  <p>Active Products</p>
                  <p>Pending</p>
                </div>
                <div className="inactive-products">
                  <p>Inactive Products</p>
                  <p>Pending</p>
                </div>

                <div id="all-products">
                  <p>Product Table</p>
                  <div id="product-details" className="nes-table-responsive">
                    <table
                      id="product-admin-table"
                      className="nes-table is-bordered is-centered"
                    >
                      <tbody>
                        <tr>
                          <th>Product ID</th>
                          <th>DEX ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Type</th>
                          <th>Active?</th>
                        </tr>
                        {productsArr.length > 0
                          ? productsArr.map((product, index) => {
                              const {
                                prod_id,
                                dex_id,
                                name,
                                price,
                                quantity,
                                type,
                              } = product;
                              return (
                                <tr className="product-rows" key={index}>
                                  <td>{prod_id}</td>
                                  <td>{dex_id}</td>
                                  <td>{name}</td>
                                  <td>{price}</td>
                                  <td>{quantity}</td>
                                  <td>{type}</td>
                                  <td>pending</td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            Products
          </div>
        </div>
      ) : (
        <Rejected />
      )}
    </div>
  );
};

export default Product_admin;
