import React from "react";
// import { getSalesDatabyMonth, getTopSalesDatabyMonth } from "../../api/index";
const Filter = ({ setMonth, setYear, setUpdateFilter, month, year }) => {
  return (
    <div id="filters">
      <div className="month-div">
        {/* <label for="month-div">Month</label> */}
        <div className="nes-select">
          <select
            required
            id="month-div"
            onChange={(event) => {
              setMonth(parseInt(event.target.value));
            }}
          >
            <option value="" defaultValue hidden>
              Select month...
            </option>
            <option value="0"></option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>

      <div className="year-div">
        {/* <label for="year-select">Year</label> */}
        <div className="nes-select">
          <select
            required
            id="year-select"
            onChange={(event) => {
              setYear(parseInt(event.target.value));
            }}
          >
            <option value="" defaultValue hidden>
              Select year...
            </option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        className="nes-btn is-primary"
        id="filter-button"
        onClick={() => {
          if (
            month === null ||
            year === null ||
            (month === null && year === null)
          ) {
            console.log("please enter a month and year to procdeed");
          } else {
            setUpdateFilter(true);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Filter;
