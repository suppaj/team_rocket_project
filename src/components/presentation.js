
//  Tiffany Code

async function db_getSalesDatabyMonth(month, year) {
    try {
      const { rows } = await client.query(
        `
        SELECT *
        FROM sales
        NATURAL JOIN product
        WHERE EXTRACT(MONTH FROM transaction_date) = $1
        AND EXTRACT(Year FROM transaction_date) = $2;
      `,
        [month, year]
      );
  
      // console.log(rows);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  async function db_getTopSalesDatabyMonth(month, year) {
    try {
      const { rows } = await client.query(
        `
        SELECT  sum(order_quantity), prod_id 
        FROM sales
        WHERE EXTRACT(MONTH FROM transaction_date) = $1
        AND EXTRACT(Year FROM transaction_date) = $2
        group by prod_id
        Order by sum(order_quantity) desc
        limit 5;
      `,
        [month, year]
      );
  
      console.log(rows);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  async function db_joinTopSales(month, year) {
    const topSales = await db_getTopSalesDatabyMonth(month, year);
  
    try {
      const { rows } = await client.query(
        `
        SELECT *
        FROM product  
      `
      );
      const topSalesArr = [];
      const result = rows.map((row, index) => {
        console.log("this is the prod id", row.prod_id);
        const topItem = topSales.map((sale, index) => {
          if (row.prod_id === sale.prod_id) {
            topSalesArr.push({
              prodID: row.prod_id,
              poke_name: row.name,
              DEX: row.dex_id,
            });
  
            return topSalesArr;
          }
        });
      });
  
      console.log("FINAL TEST OF TOP SALES ARR", topSalesArr);
      return topSalesArr;
    } catch (error) {
      throw error;
    }
  }
  
  async function db_getTotalSales(month, year) {
    const totalSales = await db_getSalesDatabyMonth(month, year);
  
    try {
      const salesArr = [];
  
      totalSales.map((sale) => {
        const values = salesArr.push(sale.order_quantity * sale.price);
  
        return values;
      });
  
      var sum = salesArr.reduce(function (a, b) {
        return a + b;
      }, 0);
  
      console.log("THIS IS THE SUM", sum.toFixed(2));
      return sum.toFixed(2);
    } catch (error) {
      throw error;
    }
  }
  
  async function db_getLastSixMonths(month, year) {
    console.log("I just ran XXXXXXXXXX");
    const month2 = parseInt(month) === 1 ? 12 : month - 1;
    const year2 = month === 1 ? year - 1 : year;
  
    const month3 = month2 === 1 ? 12 : month2 - 1;
    const year3 = month2 === 1 ? year - 1 : year2;
  
    const month4 = month3 === 1 ? 12 : month3 - 1;
    const year4 = month3 === 1 ? year - 1 : year3;
  
    const month5 = month4 === 1 ? 12 : month4 - 1;
    const year5 = month4 === 1 ? year - 1 : year4;
  
    const month6 = month5 === 1 ? 12 : month5 - 1;
    const year6 = month5 === 1 ? year - 1 : year5;
  
    try {
      const value_one = await db_getTotalSales(month, year);
      const forecast_one = await db_getSalesForecast(month, year);
      const value_two = await db_getTotalSales(month2, year2);
      const forecast_two = await db_getSalesForecast(month2, year2);
      const value_three = await db_getTotalSales(month3, year3);
      const forecast_three = await db_getSalesForecast(month3, year3);
      const value_four = await db_getTotalSales(month4, year4);
      const forecast_four = await db_getSalesForecast(month4, year4);
      const value_five = await db_getTotalSales(month5, year5);
      const forecast_five = await db_getSalesForecast(month5, year5);
      const value_six = await db_getTotalSales(month6, year6);
      const forecast_six = await db_getSalesForecast(month6, year6);
  
      return [
        { value: value_one, forecast: forecast_one, month: month, year: year },
        { value: value_two, forecast: forecast_two, month: month2, year: year2 },
        {
          value: value_three,
          forecast: forecast_three,
          month: month3,
          year: year3,
        },
        {
          value: value_four,
          forecast: forecast_four,
          month: month4,
          year: year4,
        },
        {
          value: value_five,
          forecast: forecast_five,
          month: month5,
          year: year5,
        },
        { value: value_six, forecast: forecast_six, month: month6, year: year6 },
      ];
    } catch (error) {
      throw error;
    }
  }
  
  async function db_getSalesForecast(month, year) {
    const totalSales = await db_getSalesDatabyMonth(month, year);
  
    try {
      const salesArr = [];
  
      totalSales.map((sale) => {
        const values = salesArr.push(sale.forecast_quantity * sale.price);
  
        return values;
      });
  
      var sum = salesArr.reduce(function (a, b) {
        return a + b;
      }, 0);
  
      console.log("THIS IS THE SUM", sum.toFixed(2));
      return sum.toFixed(2);
    } catch (error) {
      throw error;
    }
  }

  async function db_generateSale(order_id, prod_id, order_quantity, order_price) {
    try {
      await client.query(
        `
        INSERT INTO sales(order_id, prod_id, order_quantity, order_price)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
      `,
        [order_id, prod_id, order_quantity, order_price]
      );
    } catch (error) {
      throw error;
    }
  }


  useEffect(() => {
    if (month !== null && year !== null) {
      getTopSalesDatabyMonth(month, year, token)
        .then((response) => {
          const topSales = response.topMonthlySales;
          setTopSalesArr(topSales);
        })
        .catch((error) => {
          throw error;
        });

      getSalesDatabyMonth(month, year, token)
        .then((response) => {
          const monthlySales = response.monthlySales;
          handleSales(monthlySales);
          setSalesArr(handleRetrieveSales);
        })

        .catch((error) => {
          throw error;
        });

      getTotalSalesValue(month, year, token)
        .then((response) => {
          setTotalSales(response.totalSales);
        })
        .catch((error) => {
          throw error;
        });

      getSalesForecast(month, year, token)
        .then((response) => {
          setForecast(response.forecast);
        })
        .catch((error) => {
          throw error;
        });

      getSalesDataLastSixMonths(month, year, token)
        .then((response) => {
          const historicVolume = response.historic;
          const data = [["Month", "Volume", "Forecast"]];
          historicVolume.map((sale) => {
            const { month, year, value, forecast } = sale;
            data.push([
              checkMonth(parseInt(month)),
              parseInt(value),
              parseInt(forecast),
            ]);
          });

          setChartData(data);
        })
        .catch((error) => {
          throw error;
        });

      setUpdateFilter(false);
    }
  }, [updateFilter]);






//   Josh Code

// function used to alphabetize the types object array, based on the key 'name'
function alphabetize(a, b) {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();

    let comparison = 0;
    if (a > b) {
      comparison = 1;
    } else if (a < b) {
      comparison = -1;
    }
    return comparison;
  }

  // function to filter product by types, passed into both ProductRender & ProductTypeFilter
  function typeFilter(val, array) {
    if (searchVal !== "") {
      setSearchVal("");
    }
    let copy = array ? [...array] : [...allProducts];
    let filtered = [];
    copy.forEach((poke) => {
      let pokeType = poke.type.toString();
      if (pokeType.match(val)) {
        filtered.push(poke);
      }
    });
    setCurrentProducts(filtered);
  }

  // search function built to comb the product object for string matches in any of the given fields
  function searcher(val, array) {
    if (filterMessage !== "") {
      setFilterMessage("");
    }
    let copy = array ? [...array] : [...allProducts];
    let filtered = [];
    copy.forEach((poke) => {
      let pokeDex = poke.dex_id.toString();
      let pokeName = poke.name.toLowerCase();
      let pokeType = poke.type.toString();
      let pokeDesc = poke.description.toLowerCase();
      let pokeHeight = poke.height.toString();
      let pokeWeight = poke.weight.toString();
      let pokePrice = poke.price.toString();
      if (pokeDex.includes(val)) {
        filtered.push(poke);
      } else if (pokeName.includes(val)) {
        filtered.push(poke);
      } else if (pokeType.includes(val)) {
        filtered.push(poke);
      } else if (pokeDesc.includes(val)) {
        filtered.push(poke);
      } else if (pokeHeight.includes(val)) {
        filtered.push(poke);
      } else if (pokeWeight.includes(val)) {
        filtered.push(poke);
      } else if (pokePrice.includes(val)) {
        filtered.push(poke);
      }
    });
    setCurrentProducts(filtered);
  }

  // sorts the given array based on a given object key
  // sortMethod is a callback function to signal setting all/current products
  function sortProductsByKey(productArray, key, sortType, setProductsMethod) {
    let sorted = [...productArray];
    // sorts keys high to low (sortMethod === 1)
    if (sortType === 1) {
      sorted.sort((a, b) => {
        a = parseInt(a[key]);
        b = parseInt(b[key]);
        return b - a;
      });

      //   sorts keys low to high (sortMethod === 2)
    } else if (sortType === 2) {
      sorted.sort((a, b) => {
        a = parseInt(a[key]);
        b = parseInt(b[key]);
        return a - b;
      });
    } else if (sortType === 3) {
      sorted.sort(alphabetize);
    } else if (sortType === 4) {
      sorted.sort(alphabetize);
      sorted.reverse();
    }
    setProductsMethod(sorted);
    return sorted;
  }

    // individually renders a product card
    function renderCard(poke) {
        const {
          prod_id,
          dex_id,
          name,
          type,
          price,
          height,
          weight,
          is_featured,
        } = poke;
    
        return (
          <div
            key={dex_id}
            className="pokemon-card nes-container with-title is-rounded is-centered"
          >
            <div className="nes-container is-rounded title">
              <span>#{dex_id} </span>
              <span className="pokemon-name">{name}</span>
            </div>
            <span>
              {is_featured ? (
                <i className="is-featured nes-icon star is-medium"></i>
              ) : (
                ""
              )}
            </span>
            <p>
              ${price}
              {sortMethod === "height" ? ` | ${height / 10}m` : ""}
              {sortMethod === "weight" ? ` | ${weight / 10}kg` : ""}
            </p>
            <a href={`/products/${prod_id}/${name}`}>
              <img
                className="nes-pointer pokemon-icon"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
                alt={`a very happy ${name}`}
              />
            </a>
            <TypeMapper
              typeArray={type}
              setFilterMessage={setFilterMessage}
              typeFilter={typeFilter}
            />
          </div>
        );
      }
      const b ={
        dex_id: 1,
        name: "bulbasaur",
        type: [12, 4],
        description:
          "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
        height: 7,
        weight: 69,
        price: 96.66,
        is_feature : false
      },


    //   component
        <ContributorCard
          name="Tiff"
          imageUrl="/Jessie-whiteBG.png"
          altText="Jessie Icon"
          linkedInUrl="https://www.linkedin.com/in/tiffanyrkennedy"
          githubUrl="https://github.com/teerkay"
        />

      const ContributorCard = ({
        name,
        imageUrl,
        altText,
        githubUrl,
        linkedInUrl,
      }) => {
        return (
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            <p style={{ marginTop: "1vh", marginRight: "10px" }}>{name}</p>
            {linkedInUrl ? (
              <a href={linkedInUrl} target="_blank" style={{ marginRight: "10px" }}>
                <i className="nes-icon is-medium linkedin"></i>
              </a>
            ) : (
              ""
            )}
            {githubUrl ? (
              <a href={githubUrl} target="_blank" style={{ marginRight: "10px" }}>
                <i className="nes-icon is-medium github"></i>
              </a>
            ) : (
              ""
            )}
            <img
              className="profile-pic"
              src={imageUrl}
              alt={altText}
              height="48px"
              style={{
                borderRadius: "5px",
                border: "2px solid black",
                marginRight: "10px",
              }}
            />
          </div>
        );
      };
//  Kyle Code

//checkout function using stripe
const handlePayment = async (e, formInfo) => {
    const { contactInfo } = formInfo;
    e.preventDefault();
    setShow(true)
    try {
      const { clientSecret, ckoutToken } = await postPaymentIntent(cart, user);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${contactInfo.firstName} ${contactInfo.lastName}`,
          },
        },
      });
      setShow(false)
      if (result.error) {
        setMessage(result.error.message);
      } else {
        await recordGuestOrder(cart, formInfo, ckoutToken);
        localStorage.setItem('user', JSON.stringify({...user, cart : []}));
        setUser({...user, cart : []});
        history.push({
          pathname: '/checkout/success',
          state: { formInfo },
        });
      }
    } catch (error) {
      setShow(false)
      setMessage(error.message);
      throw error;
    }
  };
//   adjust quantity for purchase
  useEffect(() => {
    if (currentPoke.quantity) {
      setMaxQuantity(currentPoke.quantity);
      for (let item of cart) {
        if (item.prod_id === parseInt(product_id)) {
          setMaxQuantity(currentPoke.quantity - parseInt(item.cart_quantity));
          if (currentPoke.quantity === parseInt(item.cart_quantity)) {
            setTookEmAll(true);
          } else {
            setTookEmAll(false);
          }
          break;
        }
      }
    }
  }, [currentPoke, cart]);

  const handleChange = (e) => {
    if (parseInt(e.target.value) < 1) {
      setOrderAmount(1);
    } else if (parseInt(e.target.value) > maxQuantity) {
      setOrderAmount(maxQuantity);
    } else {
      setOrderAmount(parseInt(e.target.value));
    }
  };