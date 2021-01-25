import React, { useState, useEffect } from "react";
import pokeball from "./pokeball.png";
import { Modal, Form, Button } from "react-bootstrap";
import { Filter, Search } from "./index";
import {
  getSalesData,
  getSalesDatabyProductID,
  getSalesDatabyMonth,
  getTopSalesDatabyMonth,
} from "../../api/index";
const Metrics = ({ isAdmin }) => {
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [salesArr, setSalesArr] = useState([]);
  const [updateFilter, setUpdateFilter] = useState(false);
  const [topSalesArr, setTopSalesArr] = useState([]);
  const [showMetrics, setShowMetrics] = useState(true);

  const handleClose = () => setShowMetrics(false);
  const handleShow = () => {
    setShowMetrics(true);
    const sales = JSON.parse(window.localStorage.getItem("sales_array"));
    setSalesArr(sales);
  };

  useEffect(() => {
    if (month !== null && year !== null) {
      getTopSalesDatabyMonth(month, year)
        .then((response) => {
          console.log("inside of getTopSales DATA", response.topMonthlySales);
          const topSales = response.topMonthlySales;
          setTopSalesArr(topSales);
        })
        .catch((error) => {
          throw error;
        });

      getSalesDatabyMonth(month, year)
        .then((response) => {
          console.log("inside of GET SALES DATA BY MONTH", response);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [updateFilter]);

  return (
    <div id="metrics">
      {isAdmin ? (
        <div id="metrics_display">
          <img
            className="admin-pokeballs"
            src={pokeball}
            onClick={handleShow}
          ></img>
          <div className="admin-title">
            <div className={showMetrics === true ? "show" : "hide"}>
              <div id="metrics-body">
                <button className="close-button" onClick={handleClose}>
                  X
                </button>
                <div id="metrics-pokedex-screen">
                  <div id="top-sales">Top Sales by Product </div>
                  <div id="trends">Monthly Trends</div>
                  <div id="forecast">Forecasted Sales</div>
                  <div id="total-sales">Sales Totals</div>
                  <div id="sales-list">
                    Sales Data
                    <div className="admin-filter">
                      <Search />
                      <Filter
                        setMonth={setMonth}
                        setYear={setYear}
                        month={month}
                        year={year}
                        setUpdateFilter={setUpdateFilter}
                      />
                    </div>
                    <table className="nes-table is-bordered is-centered">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Product</th>
                          <th>Quantity Sold</th>
                          <th>Value</th>
                        </tr>
                        {salesArr
                          ? salesArr.map((sale, index) => {
                              // console.log("I am the sale", index, sale);

                              const {
                                prod_id,
                                transaction_id,
                                transaction_date,
                                transaction_quantity,
                                name,
                                description,
                                price,
                              } = sale;
                              return (
                                <tr className="sales-rows" key={index}>
                                  <td>{transaction_id}</td>
                                  <td>{transaction_date}</td>
                                  <td>{name}</td>
                                  <td>{transaction_quantity}</td>
                                  <td>{price * transaction_quantity}</td>
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
            Metrics
          </div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Metrics;
