import React from "react";
import { Button, Badge, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CartOverlay } from "./index";

const CartButton = ({ cart, cartCount }) => {
  return (
    <Col sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip>
            <CartOverlay cart={cart} />
          </Tooltip>
        }
      >
        <Button href="/shoppingcart" variant="link" id="shop-cart-icon">
          <span>
            {cartCount}
            <Badge>
              <i className="fas fa-shopping-cart"></i>
            </Badge>
          </span>
          <span className="sr-only">total items in cart</span>
        </Button>
      </OverlayTrigger>
    </Col>
  );
};

export default CartButton;
