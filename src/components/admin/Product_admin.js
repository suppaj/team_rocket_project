import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RollingBall } from "../index";
import ultraball from "./ultraball.png";
import { Rejected } from "./index";
import { updateProduct, getActive, getInactive } from "../../api/index";

const Product_admin = ({ isAdmin, setProductEdited, productEdited }) => {
  const [showMetrics, setShowMetrics] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [productsArr, setProductsArr] = useState([]);
  const [activeProducts, setActiveProducts] = useState(null);
  const [inactiveProducts, setInactiveProducts] = useState(null);
  const [priceData, setPriceData] = useState([]);

  const [editPrice, setEditPrice] = useState(null);
  const [editQuantity, setEditQuantity] = useState(null);
  const [editActive, setEditActive] = useState(false);

  const handleClose = () => setShowMetrics(false);
  const handleShow = () => {
    setShowMetrics(true);
    const products = JSON.parse(window.localStorage.getItem("prod_array"));
    setProductsArr(products);

    const prices = JSON.parse(window.localStorage.getItem("price_details"));
    setPriceData(prices);
    //
  };

  useEffect(() => {
    getActive()
      .then((response) => {
        console.log(
          "test purps this is the active response",
          response[0].count
        );
        const active = response[0].count;
        setActiveProducts(active);
      })
      .catch((error) => {
        throw error;
      });
  }, [productEdited]);

  useEffect(() => {
    getInactive()
      .then((response) => {
        console.log(
          "test purps this is the inactive response",
          response[0].count
        );
        const inactive = response[0].count;
        setInactiveProducts(inactive);
      })
      .catch((error) => {
        throw error;
      });
  }, [productEdited]);

  useEffect(() => {
    // productEdited === true ? setProductEdited(false) : null;
    if (productEdited === true) {
      setProductEdited(false);
    }
  });

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
            <div
              className={
                showMetrics === true ? "show-admin products-show" : "hide"
              }
            >
              <button className="close-button" onClick={handleClose}>
                X
              </button>
              <div id="products-display">
                <div className="active-products">
                  <p>Active Products</p>
                  {activeProducts ? (
                    <p className="active-count">{activeProducts}</p>
                  ) : (
                    <p className="active-count">0</p>
                  )}
                </div>
                <div className="inactive-products">
                  <p>Inactive Products</p>
                  {inactiveProducts ? (
                    <p className="inactive-count">{inactiveProducts}</p>
                  ) : (
                    <p className="inactive-count">0</p>
                  )}
                </div>

                <div className="product-metrics">
                  <p>Activity Ratio</p>
                  <div className="product-ratio" id="piechart">
                    <Chart
                      width={"300px"}
                      height={"120px"}
                      chartType="PieChart"
                      loader={
                        <div>
                          <RollingBall />
                        </div>
                      }
                      data={[
                        ["Product-Status", "Number"],
                        ["Active", 50],
                        ["Inactive", 2],
                      ]}
                      options={{
                        backgroundColor: "transparent",
                        animation: {
                          startup: true,
                          easing: "linear",
                          duration: 1500,
                        },
                      }}
                      chartEvents={[
                        {
                          eventName: "animationfinish",
                          callback: () => {
                            console.log("Animation Finished");
                          },
                        },
                      ]}
                      rootProps={{ "data-testid": "1" }}
                    />
                  </div>
                </div>

                <div className="price-histo">
                  <p>Price Details</p>
                  <Chart
                    width={"300px"}
                    height={"120px"}
                    chartType="Histogram"
                    loader={<div>Loading Chart</div>}
                    data={priceData}
                    options={{
                      legend: { position: "none" },
                      backgroundColor: "transparent",
                      animation: {
                        startup: true,
                        easing: "linear",
                        duration: 1500,
                      },
                    }}
                    chartEvents={[
                      {
                        eventName: "animationfinish",
                        callback: () => {
                          console.log("Animation Finished");
                        },
                      },
                    ]}
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>

                <div className="prod-admin-instructions">
                  <div
                    className="nes-container is-rounded is-dark"
                    id="prod-instructions"
                  >
                    <p className="prod-instructions-title">
                      {" "}
                      {"Instructions".toUpperCase()}{" "}
                    </p>
                    <p>
                      {"Active Products".toUpperCase()}: The number of products
                      that are listed on the {"products".toUpperCase()} page for
                      customers to purchase, depending on their preference.
                    </p>
                    <p>
                      {"Inactive Products".toUpperCase()}: The count of products
                      that are {"not".toUpperCase()} available for customers to
                      purchase.
                    </p>
                    <p>
                      {"Activity Ratio".toUpperCase()}: The number of{" "}
                      {"active".toUpperCase()} products compared to the number
                      of {"inactive".toUpperCase()} products.
                    </p>
                    <p>
                      Price Details: Summarizes the{" "}
                      {"distribution".toUpperCase()} of prices across all{" "}
                      {"active".toUpperCase()}
                      and {"inactive".toUpperCase()} products.
                    </p>
                    <p>
                      Product List: To view or change a product's settings use
                      the {"product list".toUpperCase()} table. products can be
                      updated by
                      {"price".toUpperCase()}, {"quantity".toUpperCase()}, and
                      {"active status".toUpperCase()}.
                    </p>
                    <p>
                      To save your updates click the {"submit".toUpperCase()}{" "}
                      button.
                    </p>
                  </div>
                </div>

                <div id="all-products">
                  <p>Product List</p>
                  <div id="product-details" className="nes-table-responsive">
                    <table
                      id="product-admin-table"
                      className="nes-table is-bordered is-centered"
                    >
                      <tbody>
                        <tr className="product-table-header">
                          <th>Product ID</th>
                          <th>Dex ID</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Type</th>
                          <th>Active?</th>
                          <th>Featured?</th>
                          <th>Submit</th>
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
                                is_active,
                                is_featured,
                              } = product;
                              return (
                                <tr
                                  className="product-rows"
                                  key={index}
                                  onMouseEnter={() => {
                                    console.log(
                                      "FOR TESTING, WILL BACK TO THIS",
                                      name,
                                      prod_id,
                                      Number(price),
                                      quantity,
                                      is_active
                                    );

                                    setEditPrice(Number(price));
                                    setEditQuantity(quantity);
                                    setEditActive(is_active);
                                  }}
                                >
                                  {prod_id ? (
                                    <td className="prod-id-data">{prod_id}</td>
                                  ) : null}
                                  {dex_id ? (
                                    <td className="dex-id-data">{dex_id}</td>
                                  ) : null}
                                  {name ? (
                                    <td className="name-data">{name}</td>
                                  ) : null}
                                  {dex_id ? (
                                    <td className="dex-id-data">
                                      <img
                                        className="prod-admin-image-poke"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
                                        alt={`${name}`}
                                      ></img>
                                    </td>
                                  ) : null}

                                  {price ? (
                                    <td>
                                      <input
                                        className="price-input"
                                        placeholder={price}
                                        onChange={(e) => {
                                          setEditPrice(e.target.value);
                                        }}
                                      ></input>
                                    </td>
                                  ) : null}

                                  {quantity ? (
                                    <td className="quantity-data">
                                      <input
                                        className="quantity-input"
                                        // value={quantity}
                                        placeholder={quantity}
                                        onChange={(e) => {
                                          setEditQuantity(e.target.value);
                                        }}
                                      ></input>
                                    </td>
                                  ) : null}

                                  {type ? (
                                    <td className="type-data">
                                      {type.map((item, index) => {
                                        return <p key={index}>{item}</p>;
                                      })}
                                    </td>
                                  ) : null}

                                  <td className="active-data">
                                    <input
                                      className="product-active-input"
                                      type="checkbox"
                                      defaultChecked={is_active}
                                      onChange={(e) => {
                                        setEditActive(e.target.checked);
                                      }}
                                    ></input>
                                  </td>

                                  <td className="featured-data">
                                    <input
                                      className="product-featured-input"
                                      type="checkbox"
                                      disabled
                                      defaultChecked={is_featured}
                                    ></input>
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => {
                                        updateProduct(prod_id, {
                                          price: editPrice,
                                          quantity: editQuantity,
                                          is_active: editActive,
                                        })
                                          .then((response) => {
                                            console.log(
                                              "WILL COME BACK TO THIS",
                                              response
                                            );
                                          })
                                          .catch((error) => {
                                            throw error;
                                          });

                                        setProductEdited(true);
                                      }}
                                    >
                                      submit
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div></div>
              </div>
              <div
                className={
                  showUpdate === true
                    ? "update-show nes-container is-rounded is-dark"
                    : "hide"
                }
              >
                <img
                  className="edit-prod-success"
                  src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/31.png?raw=true"
                ></img>
                <p className="update-message">Update Complete!</p>
                <img
                  className="edit-prod-success"
                  src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/26.png?raw=true"
                ></img>
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
