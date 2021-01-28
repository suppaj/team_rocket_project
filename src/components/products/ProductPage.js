import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { ButtonGroup, Dropdown } from "react-bootstrap";

// component imports
import ProductReviews from "./ProductReviews";
import { AddToCart } from "../index";
import TypeMapper from "./TypeMapper";

// function imports
import { getProductById } from "../../api";

const ProductPage = ({ cart, setCart, cartID, isLoggedIn, user, setUser }) => {
  const [orderAmount, setOrderAmount] = useState(1);
  const [currentPoke, setCurrentPoke] = useState({});
  const [ maxQuantity, setMaxQuantity ] = useState(currentPoke.quantity || 0);

  let { product_id } = useParams();

  useEffect(() => {
    getProductById(product_id).then((response) => {
      setCurrentPoke(response);
    });
  }, []);
  useEffect(()=>{
    if (currentPoke.quantity) {
      setMaxQuantity(currentPoke.quantity);
      for (let item of cart) {
        console.log('item.prod_id', item.prod_id, ' product_id ', parseInt(product_id))
        if ( item.prod_id === parseInt(product_id)) {
          console.log('setting new max q', maxQuantity)
          console.log(currentPoke.quantity , item.cart_quantity);
          setMaxQuantity(currentPoke.quantity - parseInt(item.cart_quantity))
          break;
        } 
      }
      
    }
    console.log('useEffect ran');
  },[currentPoke, cart]);

  const {
    dex_id,
    name,
    type,
    description,
    height,
    weight,
    price,
    quantity,
    reviews,
  } = currentPoke;

  function typeMapper(typeArray) {
    return typeArray.map((type, index) => {
      return (
        <span
          className={`${type} nes-container is-rounded`}
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            padding: "2px",
          }}
          key={index}
        >
          {type}
        </span>
      );
    });
  }


  if (currentPoke.name) {
    return (
      <div
        className="product-page nes-container "
        style={{
          width: "80vw",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr",
          gridTemplateRows: "1fr 1fr auto",
          backgroundColor: "#abbbd1",
        }}
      >
        <section
          className="pokedex-entry"
          className="nes-container is-rounded"
          style={{
            gridColumn: "2/4",
            gridRow: "1/3",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            girdTempalteColumns: "1fr 1fr",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div
            className="poke-top-left"
            style={{
              gridRow: "1/2",
              gridColumn: "2/3",
              display: "grid",
              placeItems: "center",
            }}
          >
            <img
              style={{
                height: "300px",
                width: "300px",
                marginTop: "-50px",
                marginLeft: "-50px",
                marginRight: "-50px",
                float: "top",
              }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
              alt={`a very happy ${name}`}
            />
            <p
              style={{
                marginTop: "-30px",
                fontSize: "1.5rem",
              }}
            >
              No.{dex_id}
            </p>
          </div>
          <div
            className="poke-top-right"
            style={{
              gridRow: "1/2",
              gridColumn: "3/4",
              display: "grid",
              placeItems: "center",
            }}
          >
            <div>
              <h4
                style={{
                  textTransform: "capitalize",
                  marginTop: "30px",
                  fontSize: "1.6rem",
                }}
              >
                {name}
              </h4>
              <div style={{ marginBottom: "10px" }}>
                <TypeMapper typeArray={type} />
              </div>
              <p>Height: {height / 10}m</p>
              <p>Weight: {weight / 10}kg</p>
              <p>{maxQuantity} available</p>
              <p style={{ fontSize: "1.6rem" }}>${price}</p>
            </div>
          </div>
          <div
            style={{
              gridRow: "2/3",
              gridColumn: "2/4",
              display: "grid",
            }}
          >
            <div
              className="nes-container with-title is-dark"
              style={{ textAlign: "left" }}
            >
              <p className="title">Description</p>
              <p>{description}</p>
            </div>
            { maxQuantity ? 
            <ButtonGroup style={{ placeSelf: "center", marginTop: "25px" }}>
              <div className='nes-field is-inline'>
                <label htmlFor='order-amount'>Quantity:</label>
                <input type='number' id='order-amount' className='nes-input is-success' value={orderAmount} min={1} max={maxQuantity} onChange={(e)=>setOrderAmount(parseInt(e.target.value))} />
              </div>
              <AddToCart
                product={currentPoke}
                isLoggedIn={isLoggedIn}
                orderAmount={orderAmount}
                cart={cart}
                setCart={setCart}
                cartID={cartID}
                user={user}
                setUser={setUser}
              />
            </ButtonGroup> 
            :
            <div className='nes-container is-dark is-rounded'>
              <p>{currentPoke.name} is OUT OF STOCK! Jessie, James and Meowth are currently out trying to "catch" more.</p>
            </div>
            }
          </div>
        </section>
        <ProductReviews
          reviews={reviews}
          product_id={product_id}
          isLoggedIn={isLoggedIn}
          user={user}
        />
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default ProductPage;

/*
todo add scroll bar to the dropdown menu for quantity
 */
