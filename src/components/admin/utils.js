// export function getMonth() {
//   const today = new Date();
//   const thisMonth = today.getMonth();
//   const filteredMonth = TOTALS.filter((item, index) => {
//     return index === thisMonth;
//   });

//   return filteredMonth[0].totals;
// }

export const getMonth = (monthInput) => {
  if (monthInput === 0) {
    return "January";
  } else if (monthInput === 1) {
    return "February";
  } else if (monthInput === 2) {
    return "March";
  } else if (monthInput === 3) {
    return "April";
  } else if (monthInput === 4) {
    return "May";
  } else if (monthInput === 5) {
    return "June";
  } else if (monthInput === 6) {
    return "July";
  } else if (monthInput === 7) {
    return "August";
  } else if (monthInput === 8) {
    return "September";
  } else if (monthInput === 9) {
    return "October";
  } else if (monthInput === 10) {
    return "November";
  } else if (monthInput === 11) {
    return "December";
  }
};

export const filterSales = (salesData) => {
  const filteredSales = salesData.filter((sale, index) => {
    const current_transaction = sale.transaction_date;
    const set_date = new Date(current_transaction);
    const today = new Date();
    const thisYear = today.getFullYear();
    const sales_year = set_date.getFullYear();
    return sales_year === thisYear;
  });

  if (filteredSales.length > 0) {
    const months_sales = [];
    filteredSales.map((sale, index) => {
      const saleValue = sale.price * sale.transaction_quantity;

      months_sales.push(saleValue);
      return months_sales;
    });

    const sumSales = months_sales.reduce(function (a, b) {
      return a + b;
    }, 0);

    return sumSales.toFixed(2);
  }
};

export const handleSales = (response) => {
  window.localStorage.setItem("sales_array", JSON.stringify(response));
};
export const handleTotalSales = (response) => {
  window.localStorage.setItem("total_sales", JSON.stringify(response));
};

export const handleRetrieveSales = () => {
  const sales = JSON.parse(window.localStorage.getItem("sales_array"));

  return sales;
};

export const checkMonth = (monthInput) => {
  if (monthInput === 1) {
    return "January";
  } else if (monthInput === 2) {
    return "February";
  } else if (monthInput === 3) {
    return "March";
  } else if (monthInput === 4) {
    return "April";
  } else if (monthInput === 5) {
    return "May";
  } else if (monthInput === 6) {
    return "June";
  } else if (monthInput === 7) {
    return "July";
  } else if (monthInput === 8) {
    return "August";
  } else if (monthInput === 9) {
    return "September";
  } else if (monthInput === 10) {
    return "October";
  } else if (monthInput === 11) {
    return "November";
  } else if (monthInput === 12) {
    return "December";
  }
};

// function prevMonth(){
//   var thisMonth = this.getMonth();
//   this.setMonth(thisMonth-1);
//   if(this.getMonth() != thisMonth-1 && (this.getMonth() != 11 || (thisMonth == 11 && this.getDate() == 1)))
//   this.setDate(0);
//   }

//   prevMonth()

export const getSalesMonth = () => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const previousMonth = thisMonth - 1 === -1 ? 11 : thisMonth - 1;
  console.log("this month", thisMonth);
  console.log(previousMonth);

  const initialData = [
    ["Month", "Volume", "Forecast"],
    [getMonth(thisMonth), 8175.0, 8008.0],
    [getMonth(thisMonth - 1), 3792.0, 3694000],
    [getMonth(thisMonth - 2 + 12), 2695.0, 2896.7],
    [getMonth(thisMonth - 3 + 12), 2090.0, 1953.8],
    [getMonth(thisMonth - 4 + 12), 1526.9, 1517.7],
  ];

  console.log("THIS IS INITIAL DATA", initialData);
  return initialData;
};
