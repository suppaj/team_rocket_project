import axios from "axios";
import { combineCarts } from "./utils";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function adminGetAllProducts() {
  try {
    const { data } = await axios.get("/api/admin/view_products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllTypes() {
  try {
    const { data } = await axios.get("/api/products/types");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(product_id) {
  try {
    const { data } = await axios.get(`/api/products/${product_id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addCartItem(cart_id, prod_id, cart_quantity, price) {
  try {
    const { data } = await axios.post(`/api/cart/${cart_id}/${prod_id}`, {
      cart_quantity,
      price,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginCustomer(cust_email, cust_pwd, cart) {
  try {
    const { data } = await axios.post(`/api/customers/login`, {
      cust_email,
      cust_pwd,
    });
    console.log("login response", data);
    if (cart.length) {
      const newCart = combineCarts(cart, data.cart);
      const { data: masterCart } = await axios.patch(
        `/api/cart/${data.cartID}`,
        newCart
      );
      console.log("masterCart", masterCart);
      data.cart = masterCart;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchCartItem(cart_id, cart_quantity, prod_id) {
  try {
    const { data } = await axios.patch(`/api/cart/${cart_id}/${prod_id}`, {
      cart_quantity,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCartItem(cart_id, prod_id) {
  try {
    const { data } = await axios.delete(`/api/cart/${cart_id}/${prod_id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerCustomer(
  first_name,
  last_name,
  cust_email,
  cust_pwd,
  is_admin
) {
  try {
    const { data } = await axios.post(`/api/customers/register`, {
      first_name,
      last_name,
      cust_email,
      cust_pwd,
      is_admin,
    });

    console.log("register response", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCheckoutSession(sessionArr) {
  try {
    const { data } = await axios.post(
      "/api/checkout/create-checkout-session",
      sessionArr
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postPaymentIntent(cart) {
  try {
    const { data } = await axios.post(
      "/api/checkout/create-payment-intent",
      cart
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function recordGuestOrder(cart, formInfo) {
  try {
    await axios.post("/api/checkout/guestorder", { cart, formInfo });
    return;
  } catch (error) {
    throw error;
  }
}

export async function getUserShipInfo(cust_id) {
  try {
    const { data } = await axios.get(`/api/users/${cust_id}/ship`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function recordShipandBill(formInfo, cust_id) {
  try {
    await axios.post(`/api/users/${cust_id}/ship`, formInfo.shipInfo);
    console.log("finished shipping, doing billing");
    await axios.post(`/api/users/${cust_id}/bill`, formInfo.billInfo);
    return;
  } catch (error) {
    throw error;
  }
}

export async function recordUserOrder(cust_id, cart) {
  try {
    const { data } = await axios.post(`/api/orders/${cust_id}/createorderId`);
    await axios.post(`/api/orders/${cust_id}/${data.order_id}`, cart);
    return;
  } catch (error) {
    throw error;
  }
}

export async function getAllCustomers() {
  try {
    const { data } = await axios.get(`/api/admin/view_customers`);
    console.log("these are customers", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCustomerByEmail(cust_email) {
  try {
    const { data } = await axios.get(`api/admin/customers_email`, {
      cust_email,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderHistoryByCustomerId(customerId) {
  try {
    const { data } = await axios.get(
      `api/admin/customers_history/${customerId}`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderDetailsbyOrderId(orderId) {
  try {
    const { data } = await axios.get(`api/admin/customers_orders/${orderId}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function clearUserCart(cart_id) {
  try {
    const { data } = await axios.delete(`api/cart/${cart_id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function submitCustomerReview(reviewObject) {
  try {
    const { data } = await axios.post("/api/products/review", reviewObject);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTopSalesDatabyMonth(month, year) {
  try {
    const { data } = await axios.get(`api/admin/top_sales/${month}/${year}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSalesDatabyMonth(month, year) {
  try {
    const { data } = await axios.get(
      `api/admin/product_sales/${month}/${year}`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSalesDatabyProductID(prodID) {
  try {
    const { data } = await axios.get(`api/admin/product_sales/${prodID}`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSalesData() {
  try {
    const { data } = await axios.get(`/api/admin/view_sales`);
    console.log("sales data", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserOrderHistory(cust_id) {
  try {
    const { data: order_history } = await axios.get(
      `/api/users/${cust_id}/history`
    );
    console.log("order history", order_history);
    return order_history;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile(cust_id) {
  try {
    const { data } = await axios.get(`/api/users/${cust_id}/profile`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserContact(user, token) {
  console.log(token)
  try {
    const { data } = await axios.patch(
      `/api/users/${user.cust_id}/update/contact`, user, 
      {headers: {'Authorization': `Bearer ${token}`} }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserShipping(user) {
  try {
    const { data } = await axios.patch(
      `/api/users/${user.cust_id}/update/shipping`,
      user
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserBilling(user) {
  try {
    const { data } = await axios.patch(
      `/api/users/${user.cust_id}/update/billing`,
      user
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(prod_id, attributes) {
  try {
    const { data } = await axios.post("/api/admin/update_product", {
      prod_id,
      attributes,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// updateProduct(1, { price: 1, quantity: 12.0, is_active: false });
