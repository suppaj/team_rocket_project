
import React, { useState }from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import { addCartItem, patchCartItem } from "../api";

const AddToCart = ({
  product,
  isLoggedIn,
  cartID,
  orderAmount,
  cart,
  user,
  setUser,
}) => {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleAddToCart = async () => {
    product.cart_quantity = orderAmount;
    const { cart_quantity, price, prod_id } = product;
    const currCart = [...cart];
    let noDuplicate = true;
    if (isLoggedIn) {
      currCart.map(async (item) => {
        if (item.prod_id === prod_id) {
          noDuplicate = false;
          item.cart_quantity =
            parseInt(item.cart_quantity) + parseInt(orderAmount);
          await patchCartItem(cartID, item.cart_quantity, prod_id);
          return item;
        } else {
          return item;
        }
      });
      if (noDuplicate) {
        const copy = { ...product };
        delete copy.reviews;
        currCart.push(copy);
        await addCartItem(cartID, prod_id, cart_quantity, price, user.token);
      }
      localStorage.setItem("user", JSON.stringify({ ...user, cart: currCart }));
      setUser({ ...user, cart: currCart });
    } else {
      currCart.map(async (item) => {
        if (item.prod_id === prod_id) {
          item.cart_quantity += orderAmount;
          noDuplicate = false;
          return item;
        } else {
          return item;
        }
      });

      if (noDuplicate) {
        const copy = { ...product };
        delete copy.reviews;
        currCart.push(copy);
      }
      localStorage.setItem("user", JSON.stringify({ ...user, cart: currCart }));
      setUser({ ...user, cart: currCart });
    }
    setShow(true);
  };

  const handleGoToCheckout = () => {
    setShow(false);
    history.push("/checkout");
  };

  const imageLoop = (n) => {
      if (n >6 ) {
        n = 6
      }
      if (n <=  1) {
        return <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.dex_id}.png`} alt=''/>
      }
    
      return (<><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.dex_id}.png`} alt='' />  {imageLoop(n-1)} </>)
    
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="nes-btn is-success add-to-cart-btn"
      >
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
          }
          alt='masterball'
        />
        <span>Add to Cart</span>
      </button>

      <Modal
        className="nes-dialog"
        centered
        size="lg"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Body>
          <form method="dialog">
            <p className="text-center">Added To Cart</p>
            <div className="d-flex justify-content-center">
              {orderAmount || orderAmount > 0 ? imageLoop(orderAmount) : ""}
            </div>
            <p className="text-center">
              {orderAmount} {product.name.toUpperCase()}(s) has been added to
              your cart.
            </p>
            <div className="d-flex justify-content-around">
              <button
                className="nes-btn is-success"
                onClick={() => setShow(false)}
              >
                Continue Shopping
              </button>
              {"  "}
              <button
                className="nes-btn is-primary"
                onClick={handleGoToCheckout}
              >
                Checkout
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddToCart;
