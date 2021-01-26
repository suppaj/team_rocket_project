const TOTALS = [
  {
    month: "January",
    totals: "₽7066.42K",
  },
  {
    month: "February",
    totals: "₽5230.85K",
  },
  {
    month: "March",
    totals: "₽7765.65K",
  },
  {
    month: "April",
    totals: "₽7519.0K",
  },
  {
    month: "May",
    totals: "₽8695.55K",
  },
  {
    month: "June",
    totals: "₽6990.1K",
  },
  {
    month: "July",
    totals: "₽7517.53K",
  },
  {
    month: "August",
    totals: "₽5927.85K",
  },
  {
    month: "September",
    totals: "₽5955.65K",
  },
  {
    month: "October",
    totals: "₽7211.89K",
  },
  {
    month: "November",
    totals: "₽6102.78K",
  },
  {
    month: "December",
    totals: "₽9047.36K",
  },
];

export function getMonth() {
  const today = new Date();
  const thisMonth = today.getMonth();
  const filteredMonth = TOTALS.filter((item, index) => {
    return index === thisMonth;
  });

  return filteredMonth[0].totals;
}

// getMonth();

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

export const filterSalesbyMonthAndYear = (salesData, month, year) => {
  const filteredSales = salesData.filter((sale, index) => {
    const current_transaction = sale.transaction_date;
    const set_date = new Date(current_transaction);
    const sales_year = set_date.getFullYear();
    const sales_month = set_date.getMonth();

    return sales_year === year && sales_month === month;
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

export const handleRetrieveTotalSales = () => {
  const sales = JSON.parse(window.localStorage.getItem("total_sales"));

  return sales;
};
