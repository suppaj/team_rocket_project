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

export async function addCartItem(
  cart_id,
  prod_id,
  cart_quantity,
  price,
  token
) {
  try {
    const { data } = await axios.post(
      `/api/cart/${cart_id}/${prod_id}`,
      {
        cart_quantity,
        price,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
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

    if (cart.length) {
      const newCart = combineCarts(cart, data.cart);
      const { data: masterCart } = await axios.patch(
        `/api/cart/${data.cartID}`,
        newCart,
        { headers: { Authorization: `Bearer ${data.token}` } }
      );
      data.cart = masterCart;
    }

    console.log("login data", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchCartItem(cart_id, cart_quantity, prod_id, token) {
  try {
    const { data } = await axios.patch(
      `/api/cart/${cart_id}/${prod_id}`,
      { cart_quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCartItem(cart_id, prod_id, token) {
  try {
    const { data } = await axios.delete(`/api/cart/${cart_id}/${prod_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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

export async function postPaymentIntent(cart, user) {
  try {
    const { data } = await axios.post("/api/checkout/create-payment-intent", {
      cart,
      user,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function recordGuestOrder(cart, formInfo, ckoutToken) {
  try {
    await axios.post("/api/checkout/guestorder", {
      cart,
      formInfo,
      ckoutToken,
    });
    return;
  } catch (error) {
    throw error;
  }
}

export async function getUserShipInfo(cust_id, token) {
  try {
    const { data } = await axios.get(`/api/users/${cust_id}/ship`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function recordShipandBill(formInfo, cust_id, token) {
  try {
    await axios.post(`/api/users/${cust_id}/ship`, formInfo.shipInfo, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("finished shipping, doing billing");
    await axios.post(`/api/users/${cust_id}/bill`, formInfo.billInfo, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return;
  } catch (error) {
    throw error;
  }
}

export async function recordUserOrder(cust_id, cart, token) {
  try {
    const { data } = await axios.post(
      `/api/orders/${cust_id}/createorderId`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await axios.post(`/api/orders/${cust_id}/${data.order_id}`, cart, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return;
  } catch (error) {
    throw error;
  }
}

export async function getAllCustomers() {
  try {
    const { data } = await axios.get(`/api/admin/view_customers`);

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

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderDetailsbyOrderId(orderId) {
  try {
    const { data } = await axios.get(`api/admin/customers_orders/${orderId}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function clearUserCart(cart_id, token) {
  try {
    const { data } = await axios.delete(`api/cart/${cart_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function submitCustomerReview(reviewObject, token) {
  try {
    const { data } = await axios.post("/api/products/review", reviewObject, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTopSalesDatabyMonth(month, year) {
  try {
    const { data } = await axios.get(`api/admin/top_sales/${month}/${year}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTotalSalesValue(month, year) {
  try {
    const { data } = await axios.get(`api/admin/total_sales/${month}/${year}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSalesForecast(month, year) {
  try {
    const { data } = await axios.get(
      `api/admin/forecast_sales/${month}/${year}`
    );

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

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSalesDataLastSixMonths(month, year) {
  try {
    const { data } = await axios.get(
      `api/admin/historical_view/${month}/${year}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSalesDatabyProductID(prodID) {
  try {
    const { data } = await axios.get(`api/admin/product_sales/${prodID}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSalesData() {
  try {
    const { data } = await axios.get(`/api/admin/view_sales`);

    return data;
  } catch (error) {
    throw error;
  }
}
export async function getActive() {
  try {
    const { data } = await axios.get(`/api/admin/active_products`);

    return data.active;
  } catch (error) {
    throw error;
  }
}
export async function getInactive() {
  try {
    const { data } = await axios.get(`/api/admin/inactive_products`);

    return data.inactive;
  } catch (error) {
    throw error;
  }
}

export async function getUserOrderHistory(cust_id, token) {
  try {
    const { data: order_history } = await axios.get(
      `/api/users/${cust_id}/history`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return order_history;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile(cust_id, token) {
  try {
    const { data } = await axios.get(`/api/users/${cust_id}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserContact(user, token) {
  try {
    const { data } = await axios.patch(
      `/api/users/${user.cust_id}/update/contact`,
      user,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserShipping(user, token) {
  try {
    const { data } = await axios.patch(
      `/api/users/${user.cust_id}/update/shipping`,
      user,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserBilling(user, token) {
  try {
    const { data } = await axios.patch(
      `/api/users/${user.cust_id}/update/billing`,
      user,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
