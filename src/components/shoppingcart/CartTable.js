import React from "react";
import { Table } from "react-bootstrap";
import { calculateOrderAmount } from "../checkout/utilities";

const CartTable = ({ cart }) => {
  const cartCount = () => {
    let count = 0;
    cart.map((item) => (count += parseInt(item.cart_quantity)));
    return count;
  };

  return (
    <div>
      <br />
      <Table striped={false} hover style={{ fontSize: ".7rem" }}>
        <thead>
          <tr className="text-center">
            <th className="text-center">Item</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Unit Price</th>
            <th className="text-center">Item Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.name}>
                <td className="text-left">{item.name}</td>
                <td className="text-center">{item.cart_quantity}</td>
                <td className="text-right">${item.price}</td>
                <td className="text-center">
                  ${(item.cart_quantity * item.price).toFixed(2)}
                </td>
              </tr>
            );
          })}
          <tr>
            <td>Total Items</td>
            <td className="text-center">{cartCount()}</td>
            <td className="text-right">Cart Total</td>
            <td className="text-center">${calculateOrderAmount(cart)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CartTable;
